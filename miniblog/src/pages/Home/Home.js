import React, { useState } from "react";

// CSS
import styles from "./Home.module.css";

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value.trim())}>
        </input>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {/* Carregando posts... */}
        {loading && <p>Carregando...</p>}

        {/* Exibindo posts */}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}

        {/* Não foram encontrados posts */}
        {posts && posts.length === 0 && (
          <div className='noposts'>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home