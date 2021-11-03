# html-webpack-plugin-modify

## Usage

### Install 
```shell script
npm html-webpack-plugin-modify
```

### Webpack Configuration
```javascript
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            // ...
        }),
        new HtmlWebpackPluginModify({
            // eg. if you want to remove <script type="module" scr="./index.ts"></script>
            remove: /<script.*?type="module".*?<\/script>/
        }),
    ]
}
```