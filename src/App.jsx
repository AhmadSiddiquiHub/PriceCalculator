import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductScreen1 from "./screens/products/ProductScreen1";
import ProductScreen2 from "./screens/products/ProductScreen2";
import ProductScreen3 from "./screens/products/ProductScreen3";
import ProductScreen4 from "./screens/products/ProductScreen4";
import ProductScreen5 from "./screens/products/ProductScreen5";
import ProductScreen6 from "./screens/products/ProductScreen6";
import ProductScreen7 from "./screens/products/ProductScreen7";
import ProductScreen8 from "./screens/products/ProductScreen8";
import ProductScreen9 from "./screens/products/ProductScreen9";
import ProductScreen10 from "./screens/products/ProductScreen10";
import ProductScreen11 from "./screens/products/ProductScreen11";
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
            element={<ProductScreen8 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/9"
            element={<ProductScreen9 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/10"
            element={<ProductScreen10 onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/11"
            element={<ProductScreen11 onAddToCart={handleAddToCart} />}
          />
          <Route path="/checkout" element={<CheckoutScreen />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
