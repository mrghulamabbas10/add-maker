module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_PUBLISHABLE_KEY: process.env.CLOUDINARY_PUBLISHABLE_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    APPNAME: process.env.APPNAME,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
