import React, { useState } from 'react';
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

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

    if(!title || !image || !tags || !body) return setFormError("Por favor, preencha todos os campos!");

    // check all the values
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName
    });
    
    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <label>
          <span>Título:</span>
          <input
            type='text'
            name='title'
            placeholder='Pense num bom título...'
            onChange={(e) => setTitle(e.target.value.trim())}
            value={title}
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
            onChange={(e) => setImage(e.target.value.trim())}
            value={image}
            required
          />
        </label>

        {/* Contéudo */}
        <label>
          <span>Contéudo:</span>
          <textarea
            name='body'
            placeholder='Insira o contéudo do post'
            onChange={(e) => setBody(e.target.value.trim())}
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
            value={tags}
            required
          />
        </label>

        {/* Botões */}
        {!response.loading ? <button className="btn">Cadastrar</button> : <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;