/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.pexels.com',
            },
            {
              protocol: 'https',
              hostname: 'www.allrecipes.com',
            },
            {
              protocol: 'https',
              hostname: 'imagesvc.meredithcorp.io',
            },
            
            {
              protocol: 'https',
              hostname: 'img.freepik.com',
            },
            
            {
              protocol: 'https',
              hostname: 'www.eatingwell.com',
            },
            {
              protocol: 'https',
              hostname: 'cdn.create.vista.com',
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
            },
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
            },
          ]
    }
    }
    module.exports = nextConfig
