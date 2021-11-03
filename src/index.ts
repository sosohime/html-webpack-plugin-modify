import * as HtmlWebpackPlugin from 'html-webpack-plugin';

interface HtmlWebpackPluginModifyProps {
    remove?: RegExp
}

export = class HtmlWebpackPluginModify {
    options: HtmlWebpackPluginModifyProps = {

    }
    constructor(options: HtmlWebpackPluginModifyProps) {
        this.options = options
    }
    apply(compiler) {
        const { remove } = this.options
        const pluginName = 'HtmlWebpackPluginRemove';
        if ('hooks' in compiler) {
            // v4 approach:
            compiler.hooks.compilation.tap(pluginName, (compilation) => {
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                    pluginName,
                    (data, cb) => {
                        if(remove) {
                            data.html = data.html.replace(remove, '');
                        }
                        cb(null, data)
                    }
                )
            });
        } else {
            compiler.plugin("compilation", function (compilation) {
                // Hook into html-webpack-plugin event
                compilation.plugin('html-webpack-plugin-after-html-processing', function (pluginData, cb) {
                    if(remove) {
                        pluginData.html = pluginData.html.replace(remove, '');
                    }
    
                    if (cb) {
                        cb(null, pluginData);
                    } else {
                        return Promise.resolve(pluginData)
                    }
                });
            });
        }
    }
}