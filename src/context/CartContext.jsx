import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [cartMessage, setCartMessage] = useState("")

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(product) {
    const item = cart.find((p) => p.id === product.id)
    const cantidadActual = item?.cantidad || 0
    const stockDisponible = product.stock || 5

    if (cantidadActual >= stockDisponible) {
      setCartMessage(`No hay más stock disponible de "${product.nombre}".`)
      return false
    }

    setCartMessage("")
    setCart((prevCart) => {
      const existe = prevCart.some((p) => p.id === product.id)
      if (!existe) return [...prevCart, { ...product, cantidad: 1 }]
      return prevCart.map((p) =>
        p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    })

    return true
  }

  function removeFromCart(id) {
    setCart((prevCart) =>
      prevCart
        .map((p) =>
          p.id === id ? { ...p, cantidad: (p.cantidad || 0) - 1 } : p
        )
        .filter((p) => (p.cantidad || 0) > 0)
    )
  }

  function clearCart() {
    setCart([])
  }

  function clearCartMessage() {
    setCartMessage("")
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartMessage,
        clearCartMessage
      }}
    >
      {children}
    </CartContext.Provider>
  )
}