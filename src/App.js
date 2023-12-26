import Navbar from "./Navbar"
import Services from "./pages/Services"
import Work from "./pages/Work"
import About from "./pages/About"
import { Route, Routes } from "react-router-dom"
import Ideas from "./pages/Ideas"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ideas" element={<Ideas />} />
        </Routes>
      </div>
    </>
  )
}

export default App
