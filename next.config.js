/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-param-reassign
        config.resolve.extensionAlias = {
            ".js": [".ts", ".tsx", ".js"],
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
    },
};

module.exports = nextConfig;
