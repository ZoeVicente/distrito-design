import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import carrito from "../assets/img/carrito.png"
import Cart from "./Cart"

function Navbar() {
  const { cart } = useContext(CartContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const totalCantidad = cart.reduce(
    (acc, producto) => acc + (producto.cantidad || 0),
    0
  )

  useEffect(() => {
    const bloquearScroll = menuOpen || cartOpen
    document.body.classList.toggle("nav-drawer-open", bloquearScroll)
    return () => document.body.classList.remove("nav-drawer-open")
  }, [menuOpen, cartOpen])

  function cerrarMenu() {
    setMenuOpen(false)
  }

  function abrirCarrito() {
    setCartOpen(true)
  }

  function cerrarCarrito() {
    setCartOpen(false)
  }

  function alternarMenu() {
    setMenuOpen(!menuOpen)
  }

  const claseBackdrop = menuOpen ? "nav-backdrop is-open" : "nav-backdrop"
  const claseNavbar = menuOpen ? "navbar open" : "navbar"
  const claseNavLinks = menuOpen ? "nav-links open" : "nav-links"

  return (
    <>
      <div
        className={claseBackdrop}
        aria-hidden="true"
        onClick={cerrarMenu}
      />

      <nav className={claseNavbar}>
        <button
          className="menu-btn"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={alternarMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <h3 className="h3-carrito">DISTRITO DESIGN.</h3>

        <div className={claseNavLinks}>
          <Link to="/" onClick={cerrarMenu}>
            Inicio
          </Link>
          <Link to="/mesas" onClick={cerrarMenu}>
            Mesas
          </Link>
          <Link to="/sillas" onClick={cerrarMenu}>
            Sillas
          </Link>
          <Link to="/sillones" onClick={cerrarMenu}>
            Sillones
          </Link>
          <Link to="/escritorios" onClick={cerrarMenu}>
            Escritorios
          </Link>
        </div>

        <button
          type="button"
          className="carrito-link"
          aria-label={`Carrito (${totalCantidad} productos)`}
          onClick={abrirCarrito}
        >
          <img src={carrito} alt="Carrito" className="carrito-icon" />
          {totalCantidad > 0 ? (
            <span className="carrito-badge">{totalCantidad}</span>
          ) : null}
        </button>
      </nav>

      <Cart isModal isOpen={cartOpen} onClose={cerrarCarrito} />
    </>
  )
}

export default Navbar
