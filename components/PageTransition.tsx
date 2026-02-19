'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [nextChildren, setNextChildren] = useState(children)

  useEffect(() => {
    setIsVisible(false)
    
    const timer = setTimeout(() => {
      setNextChildren(children)
      setIsVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-[0.98]'
      }`}
    >
      {nextChildren}
    </div>
  )
}
