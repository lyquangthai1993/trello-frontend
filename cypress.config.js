const {startDevServer} = require("@cypress/vite-dev-server");

module.exports = {
	component: {
		// specPattern : "src/components",
		supportFile: "cypress/support/commands.js",
		// specPattern: "**/*.spec.{js,jsx,ts,tsx}",
		devServer: {
			framework: 'react',
			bundler: 'vite',
			start: startDevServer,
			options: {
				server: {command: "vite", port: 5000},
				projectRoot: process.cwd(),
			},
		},
	},
	
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
};
