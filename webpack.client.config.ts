import webpack, { DefinePlugin } from "webpack";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default function config(env: any): webpack.Configuration {

    // injected via --env webpack cli argument
    const isProduction = !!env.PRODUCTION;
    const isHot = (!isProduction && !!env.HOT);

    return {

        mode: isProduction ? "production" : "development",
    
        devtool: isProduction ? false : "source-map",
    
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        target: "web",

        context: path.resolve(__dirname, "client"),

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        },

        entry: {
            index: "./src/Index.tsx"
        },

        output: {
            path: path.resolve(__dirname, "dist", "public"),
            filename: isProduction ? "js/[name].[chunkhash].js" : "js/[name].js"
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/, exclude: /node_modules/, use: {
                        loader: "babel-loader",
                        options: getBabelConfig(isHot)
                    }
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),

            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),

            new CopyPlugin({
                patterns: [
                    // copy all assets from the resources folder to the output root
                    // ex: the file "src/images/foo.png" can be fetched at http://<domain>/images/foo.png
                    {from: "src/resources"}
                ]
            }),

            new DefinePlugin({
                __SERVER__: JSON.stringify(false),
                __PRODUCTION__: JSON.stringify(isProduction),
            }),

            isHot && new ReactRefreshPlugin()
        
        ].filter(Boolean),

        devServer: {
            hot: isHot,
            port: 9000,
            historyApiFallback: true
        }

    }; // end configuration

    
}

function getBabelConfig(hot: boolean) {
    return {
        presets: [
        
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
        
        ],

        plugins: [
        
            "@babel/plugin-transform-runtime",
            hot && require.resolve("react-refresh/babel")
        
        ].filter(Boolean)
    }
}
