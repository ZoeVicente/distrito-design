import ProductCard from "./ProductCard"

function CategoryPage({ title, products }) {
  return (
    <>
      <h1>{title}</h1>
      <div className="productos">
        {products.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}

export default CategoryPage
