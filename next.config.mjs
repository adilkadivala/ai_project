import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "node:async_hooks": "async_hooks",
      };
    }

    config.plugins = [...config.plugins, new NodePolyfillPlugin()];

    return config;
  },
};

export default nextConfig;
