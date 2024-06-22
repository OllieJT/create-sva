"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsup_1 = require("tsup");
var isDev = process.env.npm_lifecycle_event === 'dev';
exports.default = (0, tsup_1.defineConfig)({
    clean: true,
    entry: ['src/index.ts'],
    format: ['esm'],
    minify: !isDev,
    target: 'esnext',
    outDir: 'dist',
    onSuccess: isDev ? 'node dist/index.js' : undefined,
});
