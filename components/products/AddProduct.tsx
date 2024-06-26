import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog'
import ProductForm from './ProductForm'

const AddProduct = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[sm] px-2 py-1 mt-3 mb-3 tablet:text-lg tablet:px-4 tablet:py-2 bg-gray-600 text-white rounded-md w-full ">
          Add Product
        </button>
      </DialogTrigger>

      <DialogContent className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg ipad:max-w-md tablet:max-w-lg bg-slate-300">
          <DialogTitle className="text-lg font-bold mb-4">
            Add Product
          </DialogTitle>

          <ProductForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddProduct
