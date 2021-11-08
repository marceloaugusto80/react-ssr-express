import webpack from "webpack";
import path from "path";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

export default function config(env: any): webpack.Configuration {

    // injected via --env webpack cli argument
    const isProduction = !!env.PRODUCTION;

    return {
        
        mode: isProduction ? "production" : "development",
    
        devtool: isProduction ? false : "source-map",
    
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
    
        target: "node",

        context: path.resolve(__dirname, "server"),
    
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
    
        entry: "./src/app.ts",
    
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
    
            
            new webpack.DefinePlugin({
                __SERVER__: JSON.stringify(true),
                __PRODUCTION__: JSON.stringify(isProduction),
            })
        ]
    
    }; // end configuration

    
}
