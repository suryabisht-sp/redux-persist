import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import validateAndCorrectImageUrl from '../../utils/urlCheck'

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
      {loading ?
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden p-20">
      <div className='flex flex-col md:flex-row gap-[10%]'>
    <img className="w-72 h-full object-cover" src={correctedImageUrl} alt="Elegant Purple Leather Loafers"/>    
    <div className="p-6">
      <div className='flex items-center'>
        <h2 className="text-xl font-semibold text-gray-800">{productList?.title}</h2>
        <div className="px-6 pt-4 pb-2">
        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={productList && validateAndCorrectImageUrl(productList?.category?.image)} alt="2"/>
    </div>
    </div>
        <p className="text-gray-600 mt-2">Price: ${productList?.price}</p>
        <p className="text-gray-600 mt-4">
          {productList?.description}
        </p>
    </div>
</div>
</div> : <div className="container1">
  <div className="loadingspinner">
    <div id="square1"></div>
    <div id="square2"></div>
    <div id="square3"></div>
    <div id="square4"></div>
    <div id="square5"></div>
  </div>
</div>}
</div>
  )
}
