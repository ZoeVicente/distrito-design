import { escritorios } from "../data/productos"
import CategoryPage from "../components/CategoryPage"

function Escritorios() {
  return <CategoryPage title="Escritorios" products={escritorios} />
}

export default Escritorios