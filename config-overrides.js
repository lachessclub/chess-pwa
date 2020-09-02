module.exports = function override(config, env) {
  config.module.rules.push({
    // https://stackoverflow.com/questions/29302742/is-there-a-way-to-disable-amdplugin
    test: /chess.js/,
    parser: {
      amd: false,
    },
  });

  //do stuff with the webpack config...
  return config;
};
