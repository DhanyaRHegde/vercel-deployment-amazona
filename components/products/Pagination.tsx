'use client'

import { useState } from 'react'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    onPageChange(nextPage)
  }

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1)
    setCurrentPage(prevPage)
    onPageChange(prevPage)
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
