import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export async function GET(req: NextRequest) {
  await dbConnect()

  try {
    const products = await ProductModel.find({}).lean()
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    const { name, slug, price, brand, description, image, category, rating } =
      await req.json()

    const product = new ProductModel({
      name,
      price,
      slug,
      brand,
      description,
      image,
      category,
      rating,
    })
    await product.save()

    return NextResponse.json(product.toObject(), { status: 201 })
  } catch (error) {
    console.error('Error saving product:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
