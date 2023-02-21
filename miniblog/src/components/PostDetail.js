import React from 'react';
import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      {/* Image */}
      <img src={post.image} alt={post.title}></img>

      {/* Title */}
      <h2>
        {post.title}
      </h2>

      {/* Created by */}
      <p className={styles.createby}>
        {post.createBy}
      </p>

      {/* Tags */}
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>

      {/* Body */}
      <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail