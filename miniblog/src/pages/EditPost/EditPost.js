import React, { useEffect, useState } from 'react';
import styles from "./EditPost.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setTags(post.tags && post.tags.join(", "));
    }

  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL.");
    }

    // create array of tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) return setFormError("Por favor, preencha todos os campos!");

    // check all the values
    const data = {
      title: title.trim(),
      image: image.trim(),
      body: body.trim(),
      tags: tagsArray,
      uid: user.uid,
      createBy: user.displayName
    };

    updateDocument(id, data)

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
          <form onSubmit={handleSubmit}>
            {/* Título */}
            <label>
              <span>Título:</span>
              <input
                type='text'
                name='title'
                placeholder='Pense num bom título...'
                onChange={(e) => setTitle(e.target.value)}
                value={title || ''}
                required
              />
            </label>

            {/* URL */}
            <label>
              <span>URL da imagem:</span>
              <input
                type='text'
                name='image'
                placeholder='Insira uma imagem que represente o seu post'
                onChange={(e) => setImage(e.target.value)}
                value={image || ''}
                required
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title}></img>

            {/* Contéudo */}
            <label>
              <span>Contéudo:</span>
              <textarea
                name='body'
                placeholder='Insira o contéudo do post'
                onChange={(e) => setBody(e.target.value)}
                value={body || ''}
                required
              >
              </textarea>
            </label>

            {/* Tags */}
            <label>
              <span>Tags:</span>
              <input
                type='text'
                name='tags'
                placeholder='Insira as tags separadas por vírgula'
                onChange={(e) => setTags(e.target.value)}
                value={tags || ''}
                required
              />
            </label>

            {/* Botões */}
            {!response.loading ? <button className="btn">Editar</button> : <button className="btn" disabled>Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost;