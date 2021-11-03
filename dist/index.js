"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = class HtmlWebpackPluginModify {
    constructor(options) {
        this.options = {};
        this.options = options;
    }
    apply(compiler) {
        const { remove } = this.options;
        const pluginName = 'HtmlWebpackPluginRemove';
        if ('hooks' in compiler) {
            compiler.hooks.compilation.tap(pluginName, (compilation) => {
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(pluginName, (data, cb) => {
                    if (remove) {
                        data.html = data.html.replace(remove, '');
                    }
                    cb(null, data);
                });
            });
        }
        else {
            compiler.plugin("compilation", function (compilation) {
                compilation.plugin('html-webpack-plugin-after-html-processing', function (pluginData, cb) {
                    if (remove) {
                        pluginData.html = pluginData.html.replace(remove, '');
                    }
                    if (cb) {
                        cb(null, pluginData);
                    }
                    else {
                        return Promise.resolve(pluginData);
                    }
                });
            });
        }
    }
};
