import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductScreen1 from "./screens/ProductScreen1";
import ProductScreen2 from "./screens/ProductScreen2";

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route exact path="/" element={<ProductScreen1 />} />
          <Route exact path="/2" element={<ProductScreen2 />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
