const { merge } = require('webpack-merge')

const nextConfig = {
  distDir: './.next',
  webpack: (config) => {
    return merge(config, {
      resolve: {
        alias: {
          firebaseui: 'firebaseui-ja',
        },
      },
    })
  },
}

module.exports = nextConfig
