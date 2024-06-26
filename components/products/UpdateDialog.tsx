import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Product } from '@/lib/models/ProductModel'
import useProductStore from '@/lib/hooks/useProductStore' // Adjust path as per your project structure
import { ModifyDialogProps } from '@/lib/interfaces/interface'

const ModifyDialog: React.FC<ModifyDialogProps> = ({
  product,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const [modifiedProduct, setModifiedProduct] = useState<Product>(product)

  useEffect(() => {
    setModifiedProduct(product)
  }, [product])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setModifiedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleArrayChange = (name: keyof Product, value: string) => {
    const arrayValue = value.split(',').map((item) => item.trim())
    setModifiedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: arrayValue,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(modifiedProduct)
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Modify Product
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={modifiedProduct.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={modifiedProduct.brand}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={modifiedProduct.price}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={modifiedProduct.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Count In Stock</label>
              <input
                type="number"
                name="countInStock"
                value={modifiedProduct.countInStock}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={modifiedProduct.colors?.join(', ')}
                onChange={(e) => handleArrayChange('colors', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={modifiedProduct.sizes?.join(', ')}
                onChange={(e) => handleArrayChange('sizes', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-ghost mr-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ModifyDialog
