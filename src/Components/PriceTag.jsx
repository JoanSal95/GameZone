import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { CartContext } from '../context/CartContext.jsx'

const PriceTag = ({ game, size = 'normal' }) => {
  const { getGamePrice, getGameDiscount, getFinalPrice } = useContext(CartContext)

  const originalPrice = getGamePrice(game)
  const discount = getGameDiscount(game)
  const finalPrice = getFinalPrice(game)

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }

  const sizeClass = size === 'large' ? 'fs-5' : size === 'small' ? 'small' : ''

  
  return (
    <div className={`price-container ${sizeClass}`}>
      {discount ? (
        <div className="price-with-discount">
          <Badge bg="danger" className="discount-badge mb-1">
            -{discount}%
          </Badge>
          <div className="d-flex align-items-center gap-2">
            <span className="original-price text-muted text-decoration-line-through">
              {formatPrice(originalPrice)}
            </span>
            <Badge bg="primary" className="final-price">
              {formatPrice(finalPrice)}
            </Badge>
          </div>
        </div>
      ) : (
        <Badge bg="primary" className="final-price">
          {formatPrice(finalPrice)}
        </Badge>
      )}
    </div>
  )
}

export default PriceTag
