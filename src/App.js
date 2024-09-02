import "./App.css";
import { Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import ProductList from "./Pages/ProductLisintg";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
