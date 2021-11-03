interface HtmlWebpackPluginModifyProps {
    remove?: RegExp;
}
declare const _default: {
    new (options: HtmlWebpackPluginModifyProps): {
        options: HtmlWebpackPluginModifyProps;
        apply(compiler: any): void;
    };
};
export = _default;
