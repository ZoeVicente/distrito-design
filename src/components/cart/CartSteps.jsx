import CartItemList from "./CartItemList"

function BarraPasos({ step }) {
  if (step >= 6) return null
  return (
    <div className="checkout-progress">
      <span className={step >= 1 ? "activo" : ""}>Carrito</span>
      <span className={step >= 2 ? "activo" : ""}>Productos</span>
      <span className={step >= 3 ? "activo" : ""}>Datos</span>
      <span className={step >= 4 ? "activo" : ""}>Pago</span>
      <span className={step >= 5 ? "activo" : ""}>Final</span>
    </div>
  )
}

export default function CartSteps(props) {
  const {
    step,
    setStep,
    setStepWithCleanError,
    cart,
    total,
    formData,
    cardData,
    paymentMethod,
    setPaymentMethod,
    cartMessage,
    isSubmitting,
    removeFromCart,
    clearCart,
    handleInputChange,
    handleCardDataChange,
    validateUserData,
    goToStepCheckingCart,
    goToStep5,
    finishCheckout,
    onClose
  } = props

  const infoTransferencia =
    paymentMethod === "Transferencia bancaria" ? (
      <div className="payment-info-box">
        <p>
          <strong>Alias:</strong> distrito.design.hogar
        </p>
        <p>
          <strong>CBU:</strong> 0000003100000000000000
        </p>
        <p>
          Enviá el comprobante por WhatsApp al{" "}
          <a
            href="https://wa.me/5491112345678"
            target="_blank"
            rel="noreferrer"
          >
            +54 9 11 1234-5678
          </a>
          .
        </p>
      </div>
    ) : null

  const formularioTarjeta =
    paymentMethod === "Tarjeta de crédito" ? (
      <div className="checkout-form">
        <input
          type="text"
          name="numero"
          placeholder="Número de tarjeta"
          value={cardData.numero}
          onChange={handleCardDataChange}
        />
        <input
          type="text"
          name="titular"
          placeholder="Titular de la tarjeta"
          value={cardData.titular}
          onChange={handleCardDataChange}
        />
        <input
          type="text"
          name="vencimiento"
          placeholder="Vencimiento (MM/AA)"
          value={cardData.vencimiento}
          onChange={handleCardDataChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cardData.cvv}
          onChange={handleCardDataChange}
        />
      </div>
    ) : null

  return (
    <>
      <BarraPasos step={step} />

      {step === 1 ? (
        <>
          {cart.length === 0 ? (
            <p className="carrito-vacio">El carrito está vacío</p>
          ) : (
            <CartItemList
              cart={cart}
              mostrarEliminar
              onRemove={removeFromCart}
            />
          )}
          <h3 className="total-carrito">Total: ${total}</h3>
          <div className="carrito-acciones">
            <button type="button" className="btn-vaciar" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button
              type="button"
              onClick={() =>
                goToStepCheckingCart(2, "Agregá productos al carrito para avanzar.")
              }
            >
              Continuar compra
            </button>
          </div>
          {cartMessage ? (
            <p className="checkout-error">{cartMessage}</p>
          ) : null}
        </>
      ) : null}

      {step === 2 ? (
        <div className="checkout-step">
          <h3>Confirmación de productos</h3>
          <p>Revisá los productos antes de seguir con tus datos.</p>
          <CartItemList
            cart={cart}
            mostrarEliminar={false}
            onRemove={removeFromCart}
          />
          <h3 className="total-carrito">Total: ${total}</h3>
          <div className="carrito-acciones">
            <button type="button" onClick={() => setStep(1)}>
              Volver
            </button>
            <button
              type="button"
              onClick={() =>
                goToStepCheckingCart(3, "El carrito está vacío.", true)
              }
            >
              Confirmar productos
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="checkout-step">
          <h3>Datos de envío</h3>
          <div className="checkout-form">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono (solo números)"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>
          <div className="carrito-acciones">
            <button type="button" onClick={() => setStep(2)}>
              Volver
            </button>
            <button
              type="button"
              onClick={() =>
                validateUserData() && setStepWithCleanError(4)
              }
            >
              Continuar
            </button>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="checkout-step">
          <h3>Método de pago</h3>
          <div className="checkout-payment">
            <label>
              <input
                type="radio"
                name="metodoPago"
                value="Tarjeta de crédito"
                checked={paymentMethod === "Tarjeta de crédito"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Tarjeta de crédito
            </label>
            <label>
              <input
                type="radio"
                name="metodoPago"
                value="Transferencia bancaria"
                checked={paymentMethod === "Transferencia bancaria"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Transferencia bancaria
            </label>
            <label>
              <input
                type="radio"
                name="metodoPago"
                value="Pago en efectivo"
                checked={paymentMethod === "Pago en efectivo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pago en efectivo
            </label>
          </div>
          {infoTransferencia}
          {formularioTarjeta}
          <div className="carrito-acciones">
            <button type="button" onClick={() => setStep(3)}>
              Volver
            </button>
            <button type="button" onClick={goToStep5}>
              Continuar
            </button>
          </div>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="checkout-step">
          <h3>Confirmación final</h3>
          <p>
            <strong>Cliente:</strong> {formData.nombre}
          </p>
          <p>
            <strong>Dirección:</strong> {formData.direccion}, {formData.ciudad}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {formData.telefono}
          </p>
          <p>
            <strong>Método de pago:</strong> {paymentMethod}
          </p>
          {paymentMethod === "Transferencia bancaria" ? (
            <p>
              <strong>Pago:</strong> Transferencia a alias distrito.design.hogar
            </p>
          ) : null}
          <h3 className="total-carrito">Total a pagar: ${total}</h3>
          <div className="carrito-acciones">
            <button type="button" onClick={() => setStep(4)}>
              Volver
            </button>
            <button
              type="button"
              onClick={finishCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando pago..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="checkout-step checkout-success">
          <h3>Compra realizada con éxito</h3>
          <p>
            Gracias por tu compra. En breve te enviaremos la confirmación por
            email.
          </p>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      ) : null}
    </>
  )
}
