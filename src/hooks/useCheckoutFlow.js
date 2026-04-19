import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"

const CHECKOUT_STORAGE_KEY = "checkoutData"

const initialForm = {
  nombre: "",
  direccion: "",
  ciudad: "",
  email: "",
  telefono: ""
}

const initialCardData = {
  numero: "",
  titular: "",
  vencimiento: "",
  cvv: ""
}

export default function useCheckoutFlow({ isModal, isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, cartMessage, clearCartMessage } =
    useContext(CartContext)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialForm)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardData, setCardData] = useState(initialCardData)

  function setStepWithCleanError(value) {
    setError("")
    setStep(value)
  }

  useEffect(() => {
    if (!isOpen) return
    const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY)
    if (!saved) return
    try {
      const parsed = JSON.parse(saved)
      setStep(parsed.step || 1)
      setFormData(parsed.formData || initialForm)
      setPaymentMethod(parsed.paymentMethod || "")
      setCardData(parsed.cardData || initialCardData)
    } catch {
      localStorage.removeItem(CHECKOUT_STORAGE_KEY)
    }
  }, [isOpen])

  useEffect(() => {
    if (cart.length === 0 && step !== 6) {
      setStep(1)
      setPaymentMethod("")
      setError("")
      localStorage.removeItem(CHECKOUT_STORAGE_KEY)
    }
  }, [cart, step])

  useEffect(() => {
    if (isOpen) return
    setStep(1)
    setFormData(initialForm)
    setPaymentMethod("")
    setCardData(initialCardData)
    setError("")
    setIsSubmitting(false)
    clearCartMessage()
  }, [isOpen])

  useEffect(() => {
    if (step === 6) {
      localStorage.removeItem(CHECKOUT_STORAGE_KEY)
      return
    }
    localStorage.setItem(
      CHECKOUT_STORAGE_KEY,
      JSON.stringify({ step, formData, paymentMethod, cardData })
    )
  }, [step, formData, paymentMethod, cardData])

  const total = cart.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  )
  const cantidadTotal = cart.reduce(
    (acc, p) => acc + (p.cantidad || 0),
    0
  )

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleCardDataChange(e) {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  function validateUserData() {
    const nombre = formData.nombre.trim()
    const direccion = formData.direccion.trim()
    const ciudad = formData.ciudad.trim()
    const email = formData.email.trim()
    const telefono = formData.telefono.trim()

    if (!nombre || !direccion || !ciudad || !email || !telefono) {
      setError("Completá todos los campos para continuar.")
      return false
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nombre)) {
      setError("El nombre solo debe contener letras.")
      return false
    }
    if (direccion.length < 6) {
      setError("Ingresá una dirección más completa.")
      return false
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(ciudad)) {
      setError("La ciudad solo debe contener letras.")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresá un email válido.")
      return false
    }
    if (!/^[0-9]{8,15}$/.test(telefono)) {
      setError("Ingresá un teléfono válido (solo números).")
      return false
    }
    setError("")
    return true
  }

  function goToStepCheckingCart(nextStep, emptyMessage, backToStep1 = false) {
    if (cart.length > 0) return setStepWithCleanError(nextStep)
    setError(emptyMessage)
    if (backToStep1) setStep(1)
  }

  function goToStep5() {
    if (!paymentMethod) {
      setError("Seleccioná un método de pago.")
      return
    }
    if (paymentMethod !== "Tarjeta de crédito") return setStepWithCleanError(5)

    const numero = cardData.numero.trim().replaceAll(" ", "")
    const titular = cardData.titular.trim()
    const vencimiento = cardData.vencimiento.trim()
    const cvv = cardData.cvv.trim()

    if (!numero || !titular || !vencimiento || !cvv) {
      setError("Completá todos los datos de la tarjeta.")
      return
    }
    if (!/^[0-9]+$/.test(numero) || numero.length < 13) {
      setError("Ingresá un número de tarjeta válido.")
      return
    }
    if (!/^[0-9]+$/.test(cvv) || (cvv.length !== 3 && cvv.length !== 4)) {
      setError("Ingresá un CVV válido.")
      return
    }
    setStepWithCleanError(5)
  }

  function finishCheckout() {
    setIsSubmitting(true)
    setError("")
    setTimeout(() => {
      clearCart()
      setStep(6)
      setIsSubmitting(false)
      clearCartMessage()
    }, 1200)
  }

  const hidden = isModal && !isOpen

  return {
    hidden,
    step,
    setStep,
    setStepWithCleanError,
    cart,
    total,
    cantidadTotal,
    formData,
    cardData,
    paymentMethod,
    setPaymentMethod,
    error,
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
  }
}
