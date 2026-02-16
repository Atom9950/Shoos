'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='inline-flex items-center text-lg font-medium mb-6 hover:text-gray-600'
    >
      Back
    </button>
  )
}

export default BackButton
