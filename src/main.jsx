import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import "./style/style.css"
import "./style/productos.css"
import "./style/carrito.css"
import "./style/index.css"
import "./style/footer.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
)