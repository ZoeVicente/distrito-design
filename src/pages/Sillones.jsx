import { sillones } from "../data/productos"
import CategoryPage from "../components/CategoryPage"

function Sillones() {
  return <CategoryPage title="Sillones" products={sillones} />
}

export default Sillones