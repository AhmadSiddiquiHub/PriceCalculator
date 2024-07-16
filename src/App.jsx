import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductScreen1 from "./screens/products/ProductScreen1";
import ProductScreen2 from "./screens/products/ProductScreen2";
import ProductScreen3 from "./screens/products/ProductScreen3";
import ProductScreen4 from "./screens/products/ProductScreen4";
import ProductScreen5 from "./screens/products/ProductScreen5";
import ProductScreen6 from "./screens/products/ProductScreen6";
import ProductScreen7 from "./screens/products/ProductScreen7";
import ProductScreen8 from "./screens/products/ProductScreen8";
import CheckoutScreen from "./screens/checkout/CheckoutScreen";
import cartStore from "./store";
import { ToastContainer } from "react-toastify";

function App() {
  const handleAddToCart = (product) => {
    cartStore.addItem(product);
  };
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<ProductScreen1 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/2"
            element={<ProductScreen2 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/3"
            element={<ProductScreen3 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/4"
            element={<ProductScreen4 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/5"
            element={<ProductScreen5 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/6"
            element={<ProductScreen6 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/7"
            element={<ProductScreen7 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/8"
            element={<ProductScreen8 onAddToCart={handleAddToCart} s />}
          />
          <Route path="/checkout" element={<CheckoutScreen />} />
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
