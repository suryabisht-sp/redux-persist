import React from 'react'
import validateAndCorrectImageUrl from '../../utils/urlCheck'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ prods }) => {
  const prod = prods
const navigate = useNavigate()
  const handleDetails = (id) => {
    // Implement functionality if needed
    navigate(`/product/${id}`)
  }

  const correctedImageUrl = validateAndCorrectImageUrl(prod.images[0])

  return (
  
    <div
      className="relative max-w-sm rounded overflow-hidden bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg card-shadow-animation"
      onClick={() => handleDetails(prod?.id)}
    >
      <div className="relative w-full h-64">
        <img
          className="absolute inset-0 w-full h-full object-fill"
          src={correctedImageUrl}
          alt={prod.title}
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-2">{prod.title}</h2>
        <p className="text-gray-600 text-base mb-4 truncate"
           style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {prod.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">${prod.price}</span>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={prod.category.image}
            alt={prod.category.name}
          />
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-sm font-medium text-gray-700">{prod.category.name}</span>
      </div>
    </div>
  )
}

export default ProductCard
