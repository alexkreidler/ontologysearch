module.exports = {
  future: {
    webpack5: true,
  },
  /** @type function(import('webpack').Configuration) */
  webpack(config) {
    config.resolve.alias["mapbox-gl"] = "maplibre-gl";
    config.module.rules.push({
      test: /\.nq$/,
      use: ["raw-loader"],
    });
    // config.resolve.alias["stream"] = "stream-browserify";
    return config
  },
};
