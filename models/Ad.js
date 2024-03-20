import mongoose from 'mongoose'

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['items wanted', 'items for sale', 'academic services'],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      _id: { type: String, required: [true, 'image-id-required-error'] },
      url: { type: String, required: [true, 'image-url-required-error'] },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema)
