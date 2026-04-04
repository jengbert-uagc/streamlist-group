import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import VideosPage from "./pages/VideosPage";

function App() {
  const [mediaList, setMediaList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedMedia = localStorage.getItem("mediaList");
    if (savedMedia) {
      setMediaList(JSON.parse(savedMedia));
    }

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mediaList", JSON.stringify(mediaList));
  }, [mediaList]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (movie) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === movie.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === movie.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        {
          id: movie.id,
          title: movie.title,
          price: Number((movie.vote_average * 2 || 9.99).toFixed(2)),
          quantity: 1,
          posterPath: movie.poster_path || "",
        },
        ...prevItems,
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    const parsedQuantity = Number(quantity);
    if (parsedQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parsedQuantity } : item
      )
    );
  };

  return (
    <div className="app">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={<StreamList mediaList={mediaList} setMediaList={setMediaList} />}
          />
          <Route
            path="/movies"
            element={
              <Movies
                mediaList={mediaList}
                setMediaList={setMediaList}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/videos"
            element={<VideosPage mediaList={mediaList} setMediaList={setMediaList} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
