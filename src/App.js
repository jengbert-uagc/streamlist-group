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

  useEffect(() => {
    const savedMedia = localStorage.getItem("mediaList");
    if (savedMedia) {
      setMediaList(JSON.parse(savedMedia));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mediaList", JSON.stringify(mediaList));
  }, [mediaList]);

  return (
    <div className="app">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <StreamList
                mediaList={mediaList}
                setMediaList={setMediaList}
              />
            }
          />
          <Route path="/movies" element={<Movies
          mediaList={mediaList}
          setMediaList={setMediaList} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/videos"
            element={<VideosPage 
              mediaList={mediaList}
              setMediaList={setMediaList}
               />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;