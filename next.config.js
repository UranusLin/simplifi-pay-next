/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // 修正拼寫錯誤 eactStrictMode -> reactStrictMode
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false
        }
        return config
    },
    // 移除 distDir: 'build', 讓 Next.js 使用默認的 .next 目錄
};

module.exports = nextConfig;