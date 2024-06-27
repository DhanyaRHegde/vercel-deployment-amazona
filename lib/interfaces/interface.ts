import { Product } from '../models/ProductModel'

export interface ProductsProps {
  featuredProducts: Product[]
  latestProducts: Product[]
}

export interface ProductItemProps {
  product: Product
  fetchProducts: any
}

export interface ModifyDialogProps {
  product: Product
  isOpen: boolean
  onConfirm: (modifiedProduct: Product) => void
  onCancel: () => void
}

export interface ConfirmationDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isDeleting: boolean
}
