'use client'
import useCartService from '@/lib/hooks/useCartStore'
import useLayoutService from '@/lib/hooks/useLayout'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchBox } from './SearchBox'

const Menu = () => {
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div>
        <ul className="flex items-stretch">
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/cart">
              Cart
              {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{' '}
                </div>
              )}
            </Link>
          </li>
          <li>
            <button className="btn btn-ghost rounded-btn" type="button">
              Sign in
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menu
