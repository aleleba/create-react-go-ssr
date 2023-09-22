import { defineConfig } from 'cypress';
import webpackConfig from './webpack.cy.config';

export default defineConfig({
	env: {},
	e2e: {
		/*setupNodeEvents(on, config) {
			// implement node event listeners here
		},*/
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
		experimentalRunAllSpecs: true,
	},
	component: {
		specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig: webpackConfig,
		},
		viewportWidth: 1280,
		viewportHeight: 720,
	}
});
