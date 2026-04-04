import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import VideosPage from "./pages/VideosPage";
import Subscriptions from "./pages/Subscriptions";

function App() {
  const [mediaList, setMediaList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const addToCart = (itemToAdd) => {
    const isSubscriptionItem = itemToAdd.service
      ?.toLowerCase()
      .includes("subscription");

    if (isSubscriptionItem && cartItems.some((item) => item.isSubscription)) {
      return {
        success: false,
        message: "Only one subscription can be in your cart at a time.",
      };
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        {
          id: itemToAdd.id,
          title: itemToAdd.title || itemToAdd.service,
          price: Number(
            itemToAdd.price ?? (itemToAdd.vote_average * 2 || 9.99).toFixed(2)
          ),
          quantity: 1,
          posterPath: itemToAdd.poster_path || "",
          isSubscription: isSubscriptionItem,
        },
        ...prevItems,
      ];
    });

    return { success: true };
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    const parsedQuantity = Number(quantity);
    if (parsedQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.isSubscription ? 1 : parsedQuantity,
            }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount} />
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
            path="/subscriptions"
            element={<Subscriptions addToCart={addToCart} />}
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
