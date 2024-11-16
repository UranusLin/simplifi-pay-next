import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    transpilePackages: ["@simplifi-pay/common", "@simplifi-pay/sdk"],
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false
        }
        return config
    },
};

export default nextConfig;
