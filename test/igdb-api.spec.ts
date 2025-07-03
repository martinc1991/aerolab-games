import { igdbQuery } from '@/lib/igdb/api'

// Mock environment variables
const mockEnv = {
	CLIENT_ID: 'test-client-id',
	ACCESS_TOKEN: 'test-access-token',
}

const mockFetch = jest.fn()
global.fetch = mockFetch

const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation()
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()

describe('IGDB API Retry Mechanism', () => {
	beforeEach(() => {
		jest.clearAllMocks()

		process.env.CLIENT_ID = mockEnv.CLIENT_ID
		process.env.ACCESS_TOKEN = mockEnv.ACCESS_TOKEN
	})

	afterAll(() => {
		mockConsoleWarn.mockRestore()
		mockConsoleLog.mockRestore()
	})

	describe('igdbQuery', () => {
		it('should succeed on first attempt with valid response', async () => {
			const mockResponse = { data: 'test' }
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValue(mockResponse),
			})

			const result = await igdbQuery('test query')

			expect(result).toEqual(mockResponse)
			expect(mockFetch).toHaveBeenCalledTimes(1)
		})

		it('should retry on 429 error and eventually succeed', async () => {
			const mockResponse = { data: 'success after retry' }

			// Mock 429 responses for first 2 attempts, then success
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: true,
					json: jest.fn().mockResolvedValue(mockResponse),
				})

			const startTime = Date.now()
			const result = await igdbQuery('test query')
			const endTime = Date.now()

			expect(result).toEqual(mockResponse)
			expect(mockFetch).toHaveBeenCalledTimes(3)

			// Should have waited at least 3 seconds (1s + 2s delays)
			expect(endTime - startTime).toBeGreaterThanOrEqual(3000)

			// Should have logged retry attempts
			expect(mockConsoleWarn).toHaveBeenCalledTimes(2)
			expect(mockConsoleWarn).toHaveBeenCalledWith(
				expect.stringContaining('IGDB API rate limited (429). Retrying in 1000ms... (attempt 1/3)')
			)
			expect(mockConsoleWarn).toHaveBeenCalledWith(
				expect.stringContaining('IGDB API rate limited (429). Retrying in 2000ms... (attempt 2/3)')
			)
		}, 10000) // 10 second timeout

		it('should throw error after max retries exceeded', async () => {
			// Mock 429 responses for all attempts
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})

			await expect(igdbQuery('test query')).rejects.toThrow('IGDB API error: 429 Too Many Requests')
			expect(mockFetch).toHaveBeenCalledTimes(4) // 1 initial + 3 retries
		}, 10000) // 10 second timeout

		it('should not retry on non-429 errors', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: 'Internal Server Error',
			})

			await expect(igdbQuery('test query')).rejects.toThrow('IGDB API error: 500 Internal Server Error')
			expect(mockFetch).toHaveBeenCalledTimes(1)
			expect(mockConsoleWarn).not.toHaveBeenCalled()
		})

		it('should use exponential backoff timing', async () => {
			const mockResponse = { data: 'success' }

			// Mock 429 for first 2 attempts, then success
			mockFetch
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 429,
					statusText: 'Too Many Requests',
				})
				.mockResolvedValueOnce({
					ok: true,
					json: jest.fn().mockResolvedValue(mockResponse),
				})

			const startTime = Date.now()
			await igdbQuery('test query')
			const endTime = Date.now()

			// Should have waited approximately 3 seconds (1s + 2s)
			const elapsed = endTime - startTime
			expect(elapsed).toBeGreaterThanOrEqual(3000)
			expect(elapsed).toBeLessThan(4000) // Allow some buffer
		}, 10000) // 10 second timeout
	})

	describe('API Configuration', () => {
		it('should use correct headers and body', async () => {
			const mockResponse = { data: 'test' }
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValue(mockResponse),
			})

			await igdbQuery('test query')

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String), // IGDB_API_URL
				{
					method: 'POST',
					headers: {
						'Client-ID': mockEnv.CLIENT_ID,
						Authorization: `Bearer ${mockEnv.ACCESS_TOKEN}`,
						'Content-Type': 'text/plain',
					},
					body: 'test query',
				}
			)
		})
	})
})
