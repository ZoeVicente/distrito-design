import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Mesas from "./pages/Mesas"
import Sillas from "./pages/Sillas"
import Sillones from "./pages/Sillones"
import Escritorios from "./pages/Escritorios"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const routes = [
  { path: "/", Component: Home },
  { path: "/mesas", Component: Mesas },
  { path: "/sillas", Component: Sillas },
  { path: "/sillones", Component: Sillones },
  { path: "/escritorios", Component: Escritorios }
]

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>

      <Footer />
    </div>
  )
}

export default App