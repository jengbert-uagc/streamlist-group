import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VideosPage({ mediaList, setMediaList }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  const filteredList = mediaList.filter((item) => {
    if (!filter) return true;
    return item.status === filter;
  });

  const getPageTitle = () => {
    if (filter === "to-watch") return "🎬 All To Watch";
    if (filter === "completed") return "✅ All Completed";
    if (filter === "watch-again") return "⭐ All Watch Again";
    return "All Videos";
  };

  const deleteItem = (id) => {
    setMediaList((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const updateTitle = (id) => {
    if (!editText.trim()) return;

    setMediaList((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              title: editText.trim(),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );

    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="videos-page-card">
      <h2>{getPageTitle()}</h2>
      <p>Here is the full list for this category.</p>

      <button
        type="button"
        className="videos-back-btn btn-primary"
        onClick={() => navigate("/")}
      >
        Back to StreamList
      </button>

      {filteredList.length === 0 ? (
        <p>No videos found in this category.</p>
      ) : (
        <div className="videos-list">
          {filteredList.map((item) => (
            <div key={item.id} className="videos-item">
              <div className="videos-info">
                {filter === "to-watch" && editingId === item.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <strong>{item.title}</strong>
                )}

                {item.rating && (
                  <p>
                    Rating: {item.rating} Star
                    {Number(item.rating) > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="videos-buttons">
                {filter === "to-watch" && editingId === item.id ? (
                  <>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => updateTitle(item.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {filter === "to-watch" && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditText(item.title);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosPage;