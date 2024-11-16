/** @type {import('next').NextConfig} */
const config = {
    eactStrictMode: true,
    transpilePackages: ["@simplifi-pay/common", "@simplifi-pay/sdk"],
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false
        }
        return config
    },
    distDir: 'build',
};

module.exports = config;
