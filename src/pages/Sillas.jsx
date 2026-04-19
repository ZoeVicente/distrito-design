import { sillas } from "../data/productos"
import CategoryPage from "../components/CategoryPage"

function Sillas() {
  return <CategoryPage title="Sillas" products={sillas} />
}

export default Sillas