import React, { useState, useEffect } from 'react'
import "./Store.css"
import Loading from '../UI/Loading/Loading'
import Products from '../../products'
import Product from './Product/Product'
import { BytesToFile } from '../Utils/BytesToFile'

const Store = () => {
    let producstElement;
    const [products, setProducts] = useState();
    useEffect(() => {
      const getData = ()=>{
          fetch('http://localhost:8080/api/products').then(res =>{
              if(res.ok){
                  return res.json();
              }
          }).then(data =>{
              console.log(data)
              data.map(item =>{
                  item.image = BytesToFile(item.image, {contentType: "image/png"})
                  return item
              })
              setProducts(data);
          })
      }
    
      return getData();
    }, [])
    
    if (products) {
        producstElement = (
            <div className="store store-entering">
                <div className="product-list">
                    {products.map((item) => (
                        <Product
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        )
    } else {
        producstElement = (
            <Loading />
        )
    }
    return (
        <div className={`store store-entering`}>
            <h2 className="product">Products</h2>
            {producstElement}
        </div>
    )
}

export default Store