import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
})

const config: Config = {
	// The test environment that will be used for testing
	testEnvironment: 'jsdom',

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1',
	},

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',
}

export default createJestConfig(config)
