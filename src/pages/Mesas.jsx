import { mesas } from "../data/productos"
import CategoryPage from "../components/CategoryPage"

function Mesas() {
  return <CategoryPage title="Mesas" products={mesas} />
}

export default Mesas