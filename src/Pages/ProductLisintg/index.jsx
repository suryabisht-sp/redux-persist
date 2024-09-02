import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/slices/productslice'; // Adjust the path to your slice
import ProductCard from '../../components/productCard';
import Loader from '../../components/loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const search = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query").toLowerCase();

    // Filter products based on search query
    const filtered = products.filter((prod) =>
      prod.title.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
    console.log(`You searched for '${query}'`);
  };


  const logIn= async(email, password)=> {
    try {
        return await (email, password);
    }
    catch (error) {
        throw error
    }
}


const login = async (e,...data) => {
  e.preventDefault()  

        const session = await logIn(data)
        if (session) {
            // const userData = await getCurrentUser()
            // if (userData) {
            //     dispatch(authlogin(userData))
            //     navigate("/")
            // }
        }
}

  return (
    <div className="flex flex-col p-4 w-full">
      <form onSubmit={search} className="mb-4 flex justify-end w-full">
      {/* <form onSubmit={(e)=>{login(e, {email:"ritesh88822@gmail.com",password:"Abcd"})}}> */}
        <input
          className="border border-1 p-2 mr-2 rounded-md"
          name="query"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <Loader /> // Ensure Loader component is styled and functioning
      ) : (
        <div className="flex justify-center items-center w-full">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((prod) => (
        <ProductCard key={prod.id} prods={prod} />
      ))
    ) : (
      <p>No products found</p>
    )}
  </div>
</div>

      )}
    </div>
  );
};

export default ProductList;
