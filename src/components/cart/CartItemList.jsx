function CartItemList({ cart, mostrarEliminar, onRemove }) {
  return (
    <ul className="lista-carrito">
      {cart.map((producto) => (
        <li className="carrito-item" key={producto.id}>
          <div className="carrito-item-info">
            <p className="carrito-item-nombre">{producto.nombre}</p>
            <p className="carrito-item-precio">
              ${producto.precio} x {producto.cantidad}
            </p>
          </div>
          {mostrarEliminar ? (
            <button type="button" onClick={() => onRemove(producto.id)}>
              Eliminar
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export default CartItemList
