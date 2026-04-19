import useCheckoutFlow from "../hooks/useCheckoutFlow"
import CartSteps from "./cart/CartSteps"

/**
 * Carrito + checkout en varios pasos.
 * La lógica vive en `useCheckoutFlow`; la UI de cada paso en `cart/CartSteps`.
 */
function Cart({ isModal = false, isOpen = true, onClose = () => {} }) {
  const flow = useCheckoutFlow({ isModal, isOpen, onClose })
  const { hidden, error, cantidadTotal, ...pasos } = flow

  if (hidden) return null

  const contenido = (
    <div className="carrito-contenido">
      <h2>Carrito ({cantidadTotal} productos)</h2>
      <CartSteps {...pasos} />
      {error ? <p className="checkout-error">{error}</p> : null}
    </div>
  )

  if (!isModal) {
    return <div className="carrito-page">{contenido}</div>
  }

  const claseOverlay = isOpen
    ? "cart-modal-overlay open"
    : "cart-modal-overlay"
  const claseModal = isOpen ? "cart-modal open" : "cart-modal"

  return (
    <div className={claseOverlay} onClick={onClose}>
      <div className={claseModal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cart-modal-close" onClick={onClose}>
          X
        </button>
        {contenido}
      </div>
    </div>
  )
}

export default Cart
