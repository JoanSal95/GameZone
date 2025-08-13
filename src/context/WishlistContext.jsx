import React, { createContext, useState, useContext, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist debe ser usado dentro de un WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  
  useEffect(() => {
    const savedWishlist = localStorage.getItem('gamezone-wishlist')
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Error al cargar la lista de deseos:', error)
        setWishlistItems([])
      }
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem('gamezone-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (game) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === game.id)
      if (exists) {
        return prev 
      }
      return [...prev, game]
    })
  }

  const removeFromWishlist = (gameId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== gameId))
  }

  const isInWishlist = (gameId) => {
    return wishlistItems.some(item => item.id === gameId)
  }

  const getWishlistItemsCount = () => {
    return wishlistItems.length
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItemsCount,
    clearWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export { WishlistContext }
