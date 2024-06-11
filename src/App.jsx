import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductScreen1 from "./screens/ProductScreen1";
import ProductScreen2 from "./screens/ProductScreen2";
import ProductScreen3 from "./screens/ProductScreen3";
import ProductScreen4 from "./screens/ProductScreen4";
import ProductScreen5 from "./screens/ProductScreen5";
import ProductScreen6 from "./screens/ProductScreen6";
import ProductScreen7 from "./screens/ProductScreen7";
import ProductScreen8 from "./screens/ProductScreen8";

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route exact path="/" element={<ProductScreen1 />} />
          <Route exact path="/2" element={<ProductScreen2 />} />
          <Route exact path="/3" element={<ProductScreen3 />} />
          <Route exact path="/4" element={<ProductScreen4 />} />
          <Route exact path="/5" element={<ProductScreen5 />} />
          <Route exact path="/6" element={<ProductScreen6 />} />
          <Route exact path="/7" element={<ProductScreen7 />} />
          <Route exact path="/8" element={<ProductScreen8 />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
