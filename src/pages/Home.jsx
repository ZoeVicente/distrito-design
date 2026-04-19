import { useNavigate } from "react-router-dom"

const sections = [
  {
    className: "Sillones",
    title: "Sillones",
    text: "Tu lugar favorito en el mundo te está esperando en casa.",
    path: "/sillones"
  },
  {
    className: "Mesas",
    title: "Mesas",
    text: "El escenario perfecto para tus mejores cenas y encuentros.",
    path: "/mesas"
  },
  {
    className: "Escritorios",
    title: "Escritorios",
    text: "Creá un rincón de inspiración que potencie tus grandes ideas.",
    path: "/escritorios"
  },
  {
    className: "Sillas",
    title: "Sillas",
    text: "El detalle de diseño que tus invitados van a notar (y disfrutar).",
    path: "/sillas"
  }
]

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <main>
        <div className="presentacion">
          <h1>DISTRITO DESIGN.</h1>
          <p><b>El arte de habitar.</b></p>
          <p>Nuestra colección combina líneas contemporáneas con la calidez que tu hogar merece.</p>
          <p>Descubrí diseños pensados para perdurar, donde la estética y la funcionalidad conviven en perfecto equilibrio.</p>
        </div>
        {sections.map(({ className, title, text, path }) => (
          <div key={path} className={`seccion ${className}`}>
            <h4>{title}</h4>
            <p>{text}</p>
            <button type="button" onClick={() => navigate(path)}>
              Explorar
            </button>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home