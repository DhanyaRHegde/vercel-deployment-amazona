'use client'

import { Suspense, useEffect, useState } from 'react'
import { convertDocToObj, itemsPerPage } from '@/lib/utils'
import { Product } from '@/lib/models/ProductModel'
import Pagination from '@/components/products/Pagination'
import Link from 'next/link'
import useProductStore from '@/lib/hooks/useProductStore'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductItem from '@/components/products/ProductItem'
import AddProduct from './AddProduct'
import { ProductsProps } from '@/lib/interfaces/interface'

const PAGE_SIZE = itemsPerPage

const Products: React.FC<ProductsProps> = ({
  featuredProducts,
  latestProducts,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('search') || ''
  const setProducts = useProductStore((state) => state.setProducts)
  const products = useProductStore((state) => state.products)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, query])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)

    const filteredProducts = data.filter((product: Product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )

    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const paginated = filteredProducts.slice(startIndex, endIndex)

    setPaginatedProducts(paginated)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value
    router.push(`/?search=${searchQuery}`)
  }

  return (
    <>
      <div className="flex items-center w-full mt-2">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          className="px-4 py-2 mr-4 rounded-lg focus:outline-none w-full"
        />
      </div>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} className="w-full" alt={product.name} />
            </Link>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl py-2">Latest Products</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductItem
            key={product.slug}
            product={convertDocToObj(product)}
            fetchProducts={fetchProducts}
          />
        ))}
      </div>

      <Pagination
        totalItems={
          latestProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          ).length
        }
        itemsPerPage={PAGE_SIZE}
        onPageChange={handlePageChange}
      />

      <div className="flex items-center">
        <AddProduct />
      </div>
    </>
  )
}

export default Products
