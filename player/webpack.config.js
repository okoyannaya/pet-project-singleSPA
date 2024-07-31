const {merge} = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "dubass",
    projectName: "player",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
