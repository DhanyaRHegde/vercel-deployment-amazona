import mongoose from 'mongoose'
import { z } from 'zod'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: String,
  },
  {
    timestamps: true,
  }
)

const ProductModel =
  mongoose.models?.Product || mongoose.model('Product', productSchema)

export default ProductModel

export type Product = {
  _id: string
  name: string
  slug: string
  image: string
  banner?: string
  price: number
  brand: string
  description?: string
  category: string
  rating: number
  numReviews?: number
  countInStock: number
  colors?: []
  sizes?: []
}

export const productAuthorisation = z.object({
  name: z.string().nonempty({ message: 'Product Name is required' }),
  slug: z.string().nonempty({ message: 'Slug is required' }),
  price: z
    .number({ message: 'Price is Required' })
    .nonnegative({ message: 'Invalid Price' })
    .positive(),
  description: z.string().nonempty({ message: 'Description is required' }),
  brand: z.string().nonempty({ message: 'Brand is required' }),
  image: z.string().nonempty({ message: 'Image is required' }),
  rating: z.number().nonnegative({ message: 'Invalid Rating' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  countInStock: z.number().nonnegative({ message: 'Add Count' }),
})
