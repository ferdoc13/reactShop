import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setProducts(json);
      });
  };

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      });
  };
  const handleCategory = (categItem) => {
    fetch(`https://fakestoreapi.com/products/category/${categItem}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  };
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const toggleCartView = () => {
    setShowCart(!showCart);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );


  return (
    <div className="wrapper">
      <header className='container-fluid py-3 bg-dark'>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className='text-white'>Ferdoc</h1>
            </div>
            <div className="col">
              <div className="search">
                <input
                  type="text"
                  className='form-control container-fluid'
                  id="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="col text-end">
              <button className="btn btn-secondary basket-icon" onClick={toggleCartView}>
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                <span className='ms-2 text-danger' id="basket-count">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>

        </div>
      </header>
      <div className="categories container-fluid py-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <button className='btn btn-dark' onClick={getProducts}>All Products</button>
              {categories.map((item) => (
                <button className='btn btn-dark mx-2' key={item} onClick={() => handleCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="products container-fluid">
          <div className="container">
            <div className="row">
              {filteredProducts.map((item) => (
                <div className="col-sm-4" key={item.id}>
                  <div key={item.id} className="card product-item p-3 mb-4">
                    <div className='product-image'><img src={item.image} alt={item.title} /></div>
                    <div className='product-title'><h3>{item.title}</h3></div>
                    <div className='product-price text-danger fs-4'>Price: {item.price}$</div>
                    <div className='product-desc'><p>{item.description}</p></div>
                    <button className='btn btn-primary mt-3' onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="cart-modal">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h4>{item.title}</h4>
                <p>Price: {item.price}$</p>
                <button
                  className="remove-item btn btn-danger"
                  onClick={() => removeFromCart(index)}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            ))
          )}
          <button className="btn btn-danger" onClick={toggleCartView}>
            Close Cart
          </button>
        </div>
      )}


    </div>
  )
}

export default App
