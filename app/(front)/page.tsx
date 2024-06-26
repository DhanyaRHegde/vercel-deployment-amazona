import { Metadata } from 'next'
import productService from '@/lib/services/productService'
import Products from '@/components/products/Products'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Amazona',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
      <Products
        featuredProducts={featuredProducts}
        latestProducts={latestProducts}
      />
    </>
  )
}
