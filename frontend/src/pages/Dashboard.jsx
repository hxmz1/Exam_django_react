import React, { useEffect, useState, useContext } from 'react';
import { getPosts, updatePost, deletePost, createPost } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);

  const fetchPosts = () => {
    if (auth?.access) {
      getPosts(auth.access)
        .then(res => setPosts(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [auth]);

  const buildFormData = (title, content, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    return formData;
  };

  // Sauvegarder édition
  const savePost = () => {
    if (!editingPost) return;
    const formData = buildFormData(newTitle, newContent, newImage);
    updatePost(editingPost.id, formData, auth.access)
      .then(() => {
        setEditingPost(null);
        setNewTitle('');
        setNewContent('');
        setNewImage(null);
        fetchPosts();
      })
      .catch(err => console.error(err));
  };

  // Supprimer post
  const removePost = (id) => {
    deletePost(id, auth.access)
      .then(() => fetchPosts())
      .catch(err => console.error(err));
  };

  // Ajouter un nouveau post
  const addPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const formData = buildFormData(newTitle, newContent, newImage);
    createPost(formData, auth.access)
      .then(() => {
        setNewTitle('');
        setNewContent('');
        setNewImage(null);
        fetchPosts();
      })
      .catch(err => console.error(err));
  };

  // Gérer la sélection d'image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Mes posts</h1>

      {/* Création nouveau post */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Titre du nouveau post"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "70%", padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Contenu du nouveau post"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ width: "70%", padding: 8, minHeight: 60, marginBottom: 10 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 10 }}
        />
        <button onClick={addPost} style={{ padding: 8 }}>
          Ajouter
        </button>
      </div>

      {/* Liste des posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingPost && editingPost.id === post.id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  flexGrow: 1,
                  marginRight: 10,
                  padding: 6,
                  marginBottom: 5,
                }}
                placeholder="Titre"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                style={{
                  flexGrow: 1,
                  marginRight: 10,
                  padding: 6,
                  minHeight: 50,
                  marginBottom: 5,
                }}
                placeholder="Contenu"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: 5 }}
              />
              <button onClick={savePost} style={{ marginRight: 5 }}>
                Sauvegarder
              </button>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setNewTitle("");
                  setNewContent("");
                  setNewImage(null);
                }}
              >
                Annuler
              </button>
            </>
          ) : (
            <>
              <div style={{ flexGrow: 1 }}>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
                {post.image && (
                  <img
                    src={
                      post.image.startsWith("https")
                        ? post.image
                        : `https://localhost:8000${post.image}`
                    }
                    alt={post.title}
                    style={{ maxWidth: "100%", maxHeight: 200, marginTop: 10 }}
                  />
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setNewTitle(post.title);
                    setNewContent(post.content);
                    setNewImage(null);
                  }}
                  style={{ marginRight: 5 }}
                >
                  Modifier
                </button>
                <button onClick={() => removePost(post.id)}>Supprimer</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
