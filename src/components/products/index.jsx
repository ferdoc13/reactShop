import React, { useState } from "react";


const Products = () => {

    const [products, setProducts] = useState([]);
    const getProducts = () => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => {
            setIsLoading(false);
            setProducts(json);
          });
      };
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
    );
    return (
        <div className="products container-fluid">
            <div className="container">
                <div className="row">
                    {filteredProducts.map((item) => (
                        <div className="col-sm-4">
                            <div key={item.id} className="card product-item p-3">
                                <img className='product-image' src={item.image} alt={item.title} />
                                <h3 className='product-title'>{item.title}</h3>
                                <p className='product-price'>Price: {item.price}$</p>
                                <p className='product-desc'>{item.description}</p>
                                <button className='btn btn-primary' onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products