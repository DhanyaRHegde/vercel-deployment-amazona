import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { productAuthorisation } from '@/lib/models/ProductModel'
import { addProduct } from '@/lib/methodAPI'
import { useAddStore } from '@/lib/AddFormStore'

type Data = z.infer<typeof productAuthorisation>

const ProductForm = ({ setOpen }: any) => {
  const { setIsValid, setFormData, resetFormData } = useAddStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Data>({
    resolver: zodResolver(productAuthorisation),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<Data> = async (data: Data) => {
    await addProduct(data)
    setFormData(data)
    resetFormData()
    setOpen(false)
  }

  useEffect(() => {
    setIsValid(isValid)
  }, [isValid, setIsValid])

  return (
    <div>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Name<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Product name"
            id="name"
            {...register('name')}
          />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Price<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Price"
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
          />
          <span className="text-red-500 text-sm">{errors.price?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Description<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Description"
            id="description"
            {...register('description')}
          />
          <span className="text-red-500 text-sm">
            {errors.description?.message}
          </span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Brand<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Brand"
            id="brand"
            {...register('brand')}
          />
          <span className="text-red-500 text-sm">{errors.brand?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Image URL<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="URL"
            id="image"
            {...register('image')}
          />
          <span className="text-red-500 text-sm">{errors.image?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Slug<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Slug"
            id="slug"
            {...register('slug')}
          />
          <span className="text-red-500 text-sm">{errors.slug?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Rating<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Rating"
            id="rating"
            type="number"
            {...register('rating', { valueAsNumber: true })}
          />
          <span className="text-red-500 text-sm">{errors.rating?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Category<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Category"
            id="category"
            {...register('category')}
          />
          <span className="text-red-500 text-sm">
            {errors.category?.message}
          </span>
        </label>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-black rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              isValid
                ? 'bg-orange-600 text-white'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
