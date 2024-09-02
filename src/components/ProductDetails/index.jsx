import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import validateAndCorrectImageUrl from '../../utils/urlCheck'
import Loader from '../loader'

export const ProductDetails  = () => {

  const id = useParams()  
  const [productList, setProductList]=useState()
  const [loading, setLoading]=useState(false)

  const productDetails = async () => {
    try {
      // Fetch the data from the API
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the response JSON
      const data = await response.json();
      // Log the data
      setProductList(data)
      setTimeout(() => {
        setLoading(true)
      }, 2000);

    } catch (error) {
      // Handle any errors that occurred during the fetch or parsing
      console.error("Error fetching products:", error);
    }
  };

  console.log("thigns",productList)
  
useEffect(()=>{
  productDetails()
},[id])


const correctedImageUrl = productList && validateAndCorrectImageUrl(productList?.images[0])

  return (
   <div className="w-full h-full">
  {loading ? (
    <div className="w-9/12 mx-auto bg-white rounded-lg overflow-hidden p-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Adjust the size of the image */}
        <img
          className="w-full md:w-4/12 h-auto object-cover rounded-lg"
          src={correctedImageUrl}
          alt={productList?.title}
        />
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {productList?.title}
            </h2>
            <div className="px-6 pt-4 pb-2">
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src={productList && validateAndCorrectImageUrl(productList?.category?.image)}
                alt="Category"
              />
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-xl">Price: ${productList?.price}</p>
          <p className="text-gray-600 mt-4">
            {productList?.description}
          </p>
          <div className="flex items-center justify-end gap-4 mt-2">
  {/* Dropdown for item count */}
  <select
     className="border-2 border-yellow-300 p-4 text-gray-600 rounded-lg font-bold bg-transparent focus:border-yellow-200 active:border-yellow-500 focus:outline-none hover:border-yellow-400 "
     aria-label="Select quantity"
   >
    {[...Array(10).keys()].map((num) => (
      <option className='bg-white'  key={num + 1} value={num + 1}>
      {num + 1}
      </option>
    ))}
  </select>

  {/* Add to Cart button */}
  <button className='border-2 hover:text-white border-yellow-200 hover:shadow-md hover:bg-yellow-500 hover:border-yellow-500 p-4 rounded-lg font-bold'>
    Add to Cart
  </button>
</div>

        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )}
</div>

  )
}
