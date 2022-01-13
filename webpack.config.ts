import { DefinePlugin, Configuration } from "webpack";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { merge } from "webpack-merge";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

interface Env {
    production: boolean;
    hot: boolean;
}

function createBaseConfig(env: Env): Configuration {
    return {



        mode: env.production ? "production" : "development",

        devtool: env.production ? false : "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()]
        },

        plugins: [

            new DefinePlugin({
                __SERVER__: JSON.stringify(true),
                __PRODUCTION__: JSON.stringify(env.production),
            })
        ]
    }
} // end base config

function createServerConfig(env: Env): Configuration {
    return {

        name: "server",

        target: "node",

        context: path.resolve(__dirname, "src/server"),

        externalsPresets: {
            node: true
        },

        ignoreWarnings: [
            {
                /* 
                * Express compilation issue:
                * WARNING in ../node_modules/express/lib/view.js 81:13-25 Critical dependency: the request of a dependency is an expression
                * more at: https://github.com/webpack/webpack/issues/1576
                */
                module: /express/,
                message: /Critical\sdependency:\sthe\srequest\sof\sa\sdependency\sis\san\sexpression/,
            }
        ],

        entry: "./app.ts",

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "app.js"
        },

        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
            ]
        },

        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["!public/**"]
            }),
        ]

    }
}

function createClientConfig(env: Env): Configuration {

    const babelConfig = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
            env.hot && require.resolve("react-refresh/babel")
        ].filter(Boolean)
    }

    return {

        name: "client",

        target: "web",

        context: path.resolve(__dirname, "src/client"),

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        },

        entry: {
            index: "./Index.tsx"
        },

        output: {
            path: path.resolve(__dirname, "dist", "public"),
            filename: env.production ? "js/[name].[chunkhash].js" : "js/[name].js"
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: { loader: "babel-loader", options: babelConfig },
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),

            new HtmlWebpackPlugin({
                template: "./index.html"
            }),

            new CopyPlugin({
                patterns: [
                    // copy all assets from the resources folder to the output root
                    // ex: the file "src/images/foo.png" can be fetched at http://<domain>/images/foo.png
                    { from: "resources" }
                ]
            }),

            env.hot && new ReactRefreshPlugin()

        ].filter(Boolean),

        devServer: {
            hot: env.hot,
            port: 9000,
            historyApiFallback: true
        }

    };

} // end client configuration

export default function (e: any) {

    const env: Env = {
        hot: !!e["HOT"],
        production: !!e["PRODUCTION"]
    }

    const baseConfig = createBaseConfig(env);
    const clientConfig = merge(baseConfig, createClientConfig(env));
    const serverConfig = merge(baseConfig, createServerConfig(env));

    return [clientConfig, serverConfig];

}