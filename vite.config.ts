import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// environment: "happy-dom",
		include: ["index.html","test/**/*.{js,ts}"],
	},
});
