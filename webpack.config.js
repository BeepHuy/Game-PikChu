module.exports = {
    // Mô tả chế độ
    mode: "development",
    // Các mục chính main user 
    entry: {
        main: "./src/frontend/App.ts",
        user: "./src/frontend/UserApp.ts"
    },

    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        path:__dirname + "/dist/frontend",
        publicPath: "/assets/"
    },
    devtool: "source-map",
    // Định nghĩa đường dẩn
    resolve: {
        extensions:[".ts", ".js", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                }]
            }]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        usedExports: true
    }
}