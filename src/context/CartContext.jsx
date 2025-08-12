import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('gameZoneCart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('gameZoneCart', JSON.stringify(cartItems))
  }, [cartItems])

  // Función para generar precio consistente del juego
  const getGamePrice = (game) => {
    if (!game || typeof game !== 'object') {
      return 19.99 // Precio por defecto si no hay juego
    }
    
    const basePrice = 15.99
    const ratingMultiplier = game.rating ? (game.rating / 5) : 0.7
    const popularityMultiplier = game.ratings_count ? Math.min(game.ratings_count / 1000, 3) : 1
    
    const releaseYear = game.released ? new Date(game.released).getFullYear() : 2020
    const currentYear = new Date().getFullYear()
    const ageMultiplier = Math.max(0.4, 1 - (currentYear - releaseYear) * 0.08)
    
    // Usar el ID del juego para generar un valor pseudoaleatorio pero consistente
    const gameId = game.id || 1
    const pseudoRandom = (gameId * 9301 + 49297) % 233280 / 233280 // Generador pseudoaleatorio
    
    let finalPrice = basePrice * ratingMultiplier * popularityMultiplier * ageMultiplier
    
    if (finalPrice < 5) finalPrice = 5 + pseudoRandom * 5
    else if (finalPrice < 15) finalPrice = Math.ceil(finalPrice)
    else if (finalPrice < 35) finalPrice = Math.ceil(finalPrice / 5) * 5
    else finalPrice = Math.ceil(finalPrice / 10) * 10
    
    return Math.max(5, Math.min(finalPrice, 79.99))
  }

  // Función para obtener descuento consistente
  const getGameDiscount = (game) => {
    if (!game || typeof game !== 'object') {
      return null // Sin descuento si no hay juego válido
    }
    
    const gameId = game.id || 0
    const hasDiscount = (gameId % 10) < 3
    if (!hasDiscount) return null
    
    const discountPercentages = [10, 15, 20, 25, 30, 40, 50, 75]
    const discountIndex = gameId % discountPercentages.length
    return discountPercentages[discountIndex]
  }

  // Calcular precio final con descuento
  const getFinalPrice = (game) => {
    if (!game || typeof game !== 'object') {
      return 19.99 // Precio por defecto si no hay juego válido
    }
    
    const originalPrice = getGamePrice(game)
    const discount = getGameDiscount(game)
    
    if (discount) {
      const discountedPrice = originalPrice * (1 - discount / 100)
      return Math.max(5, discountedPrice)
    }
    
    return originalPrice
  }

  // Agregar juego al carrito
  const addToCart = (game, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.game.id === game.id)
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevItems.map(item =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { game, quantity, price: getFinalPrice(game) }]
      }
    })
  }

  // Remover juego del carrito
  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.game.id !== gameId))
  }

  // Actualizar cantidad
  const updateQuantity = (gameId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(gameId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.game.id === gameId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([])
  }

  // Obtener total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  // Obtener cantidad total de items
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Verificar si un juego está en el carrito
  const isInCart = (gameId) => {
    return cartItems.some(item => item.game.id === gameId)
  }

  // Obtener cantidad de un juego específico
  const getGameQuantity = (gameId) => {
    const item = cartItems.find(item => item.game.id === gameId)
    return item ? item.quantity : 0
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getGameQuantity,
    getFinalPrice,
    getGamePrice,
    getGameDiscount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
