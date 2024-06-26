import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect
  const { id } = params

  try {
    const product = await ProductModel.findById(id).lean()
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  await dbConnect()
  const { _id } = params
  const { name, price, description, image } = await req.json()

  try {
    const product = await ProductModel.findByIdAndUpdate(
      _id,
      { name, price, description, image },
      { new: true }
    ).lean()
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  await dbConnect()
  const { _id } = params

  try {
    const product = await ProductModel.findByIdAndDelete(_id).lean()
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
