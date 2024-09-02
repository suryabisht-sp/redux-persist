import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/productCard';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const allProduct = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setTimeout(() => {
        setLoading(false);
        setProductList(data);
        setFilteredProducts(data); // Initialize with full product list
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    allProduct();
  }, []);

  const search = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query").toLowerCase();

    // Optimistically update the filtered products list
    const filtered = productList.filter((prod) =>
      prod.title.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
    console.log(`You searched for '${query}'`);
  };

  return (
    <div className="flex flex-col p-4">
      <form onSubmit={search} className="mb-4 flex justify-end w-full">
        <input className="border border-1 p-2 mr-2 rounded-md" name="query" placeholder="Search products..." />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">Search</button>
      </form>
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} prods={prod} />
          ))}
        </div>
      ) : (
        <div className="container1">
          <div className="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
