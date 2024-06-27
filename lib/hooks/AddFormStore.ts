import create from 'zustand'

interface FormState {
  isValid: boolean
  formData: {
    name: string
    price: number
    description: string
    brand: string
    image: string
    rating: number
    slug: string
    category: string
    countInStock: number
  }
  setIsValid: (isValid: boolean) => void
  setFormData: (data: Partial<FormState['formData']>) => void
  resetFormData: () => void
}

export const useAddStore = create<FormState>((set) => ({
  isValid: false,
  formData: {
    name: '',
    price: 0,
    description: '',
    brand: '',
    image: '',
    rating: 0,
    slug: '',
    category: '',
    countInStock: 0,
  },
  setIsValid: (isValid) => set({ isValid }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () =>
    set({
      formData: {
        name: '',
        price: 0,
        description: '',
        brand: '',
        image: '',
        rating: 0,
        slug: '',
        category: '',
        countInStock: 0,
      },
    }),
}))
