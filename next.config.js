/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.externals.push({
            bufferutil: 'bufferutil',
            'utf-8-validate': 'utf-8-validate',
        });
        return config;
    },
    async headers() {
        return [
            {
                source: '/api/socketio',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
