module.exports = {
    publicPath: '/Aare_V2/aare/dist/',
    pwa: {
        name: "grrd's Splash!",
        appleMobileWebAppCapable: 'yes',
        iconPaths: {
            favicon32: '/img/icons/icon.svg',
            favicon16: '/img/icons/icon.svg',
            appleTouchIcon: '/img/icons/apple-touch-icon.png',
            maskIcon: '/img/icons/mask-icon.svg',
            msTileImage: '/img/icons/icon.svg'
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Splash!';
            return args;
        });
    }
}
