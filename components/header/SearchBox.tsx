'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const SearchBox = () => {
  const [userData, setUserData] = useState('')
  const router = useRouter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setUserData(query)
    router.push(`/?search=${query}`, undefined)
  }

  return (
    <div className="flex items-center lg:w-[40%]">
      <input
        type="text"
        placeholder="Search..."
        value={userData}
        onChange={handleSearchChange}
        className="px-4 py-2 mr-4 rounded-lg bg-gray-800 text-white focus:outline-none w-full"
      />
    </div>
  )
}
