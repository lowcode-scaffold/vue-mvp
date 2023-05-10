module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: "[local]_[hash:base64:5]",
          auto: (resourcePath) => {
            return resourcePath.indexOf(".module") > -1;
          },
        },
        localsConvention: "camelCaseOnly",
      },
    },
  },
};
