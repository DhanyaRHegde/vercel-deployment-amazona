import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ConfirmationDialog from '@/app/(front)/product/DeleteDialog' // Replace with your ConfirmationDialog component
import ModifyDialog from './UpdateDialog' // Replace with your ModifyDialog component
import useProductStore from '@/lib/hooks/useProductStore' // Adjust the path as per your project structure
import { Product } from '@/lib/models/ProductModel'
import { ProductItemProps } from '@/lib/interfaces/interface'

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  fetchProducts,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false)
  const removeProduct = useProductStore((state) => state.removeProduct)
  const modifyProduct = useProductStore((state) => state.updateProduct)

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        removeProduct(product._id)
        fetchProducts()

        setIsDeleteDialogOpen(false)
      } else {
        console.error('Failed to delete the product')
      }
    } catch (error) {
      console.error('Failed to delete the product', error)
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  const handleModifyClick = () => {
    setIsModifyDialogOpen(true)
  }

  const handleModifyConfirm = async (modifiedProduct: Product) => {
    try {
      const response = await fetch(`/api/products/${modifiedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedProduct),
      })

      if (response.ok) {
        modifyProduct(modifiedProduct)
        fetchProducts()
      } else {
        console.error('Failed to update the product')
      }
    } catch (error) {
      console.error('Failed to update the product', error)
    } finally {
      setIsModifyDialogOpen(false)
    }
  }

  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title font-normal">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">${product.price}</span>
        </div>
      </div>
      <div className="flex">
        <button className="btn btn-ghost" onClick={handleModifyClick}>
          Modify
        </button>
        <button className="btn btn-ghost" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isDeleting={false} // Pass appropriate loading state
      />
      <ModifyDialog
        isOpen={isModifyDialogOpen}
        product={product}
        onConfirm={handleModifyConfirm}
        onCancel={() => setIsModifyDialogOpen(false)}
      />
    </div>
  )
}

export default ProductItem
