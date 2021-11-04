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
