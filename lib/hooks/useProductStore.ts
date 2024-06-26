// import { create } from 'zustand'
// import { combine } from 'zustand/middleware'
// import { Product } from '../models/ProductModel'

// const useProductStore = create(
//   combine(
//     {
//       products: [] as Product[],
//     },
//     (set) => ({
//       setProducts: (products: Product[]) => set({ products }),
//       addProduct: (product: Product) =>
//         set((state) => ({ products: [...state.products, product] })),
//       updateProduct: (product: Product) =>
//         set((state) => ({
//           products: state.products.map((p) =>
//             p._id === product._id ? product : p
//           ),
//         })),
//       removeProduct: (id: string) =>
//         set((state) => ({
//           products: state.products.filter((p) => p._id !== id),
//         })),
//     })
//   )
// )

// export default useProductStore

import create from 'zustand'
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
