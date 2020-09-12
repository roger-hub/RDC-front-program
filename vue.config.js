module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://aniun.top/first',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}