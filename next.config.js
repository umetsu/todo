const { merge } = require('webpack-merge')
const withPWA = require('next-pwa')

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

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
  },
})
