import PixPage from "./Pages/PixPage/PixPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/pix" element={<PixPage />} /> {/* Nova rota Pix */}
      </Routes>

      <Location />
      <OrderSteps />
      <Footer />
      <WhatsappButton />
    </Router>
  );
}

export default App;
