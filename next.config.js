/** @type {import('next').NextConfig} */

module.exports = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'le-quai-antique-images.s3.eu-west-3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};
