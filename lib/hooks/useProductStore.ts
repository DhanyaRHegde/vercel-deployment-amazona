import { create } from 'zustand'
import { Product } from '@/lib/models/ProductModel'

interface ProductStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  removeProduct: (productId: string) => void
  updateProduct: (modifiedProduct: Product) => void
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    })),
  updateProduct: (modifiedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product._id === modifiedProduct._id ? modifiedProduct : product
      ),
    })),
}))

export default useProductStore
