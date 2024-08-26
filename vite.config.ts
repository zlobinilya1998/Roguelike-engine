import { defineConfig } from "vite";
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html'
import checker from 'vite-plugin-checker'
export default defineConfig({
    plugins: [
        createHtmlPlugin({
            entry: 'src/index',
            template: 'index.html',
        }),
        checker({
            typescript: true,
          }),
    ],
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, './src/') },
            { find: "models", replacement: path.resolve(__dirname, 'src/models') },
            { find: "game", replacement: path.resolve(__dirname, 'src/models/game') },
            { find: "event", replacement: path.resolve(__dirname, 'src/models/events') },
            { find: "components", replacement: path.resolve(__dirname, 'src/components') },
            { find: "utils", replacement: path.resolve(__dirname, 'src/utils') },
            { find: "assets", replacement: path.resolve(__dirname, 'src/assets') },
            { find: "core", replacement: path.resolve(__dirname, 'src/core') },
        ],
    }
})