import React, { useState } from "react";

// CSS
import styles from "./Home.module.css";

// Hooks
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value.trim())}></input>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
      </div>
    </div>
  )
}

export default Home