import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function ProductCard({ producto }) {
  const { addToCart, cart, cartMessage, clearCartMessage } = useContext(CartContext)
  const stockDisponible = producto.stock || 5
  const itemEnCarrito = cart.find((p) => p.id === producto.id)
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0
  const sinStock = cantidadEnCarrito >= stockDisponible

  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>

      <button
        onClick={() => addToCart(producto) && clearCartMessage()}
        disabled={sinStock}
      >
        {sinStock ? "Sin stock" : "Agregar al carrito"}
      </button>

      {cartMessage && sinStock && <p className="producto-error">{cartMessage}</p>}
    </div>
  )
}

export default ProductCard