import { useState } from 'react';
const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  //const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateLikes(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };
  return (
    <div className='blog'>
      <div className='blog-title'>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        <button onClick={toggleVisibility} className='toggle-button'>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <p>Likes: <span className='blog-likes'>{blog.likes}</span> <button onClick={handleLike} className='like-button'>like</button> </p>
        Url: <a href={`${blog.url}`} target='_blank' rel='noreferrer'>{blog.url}</a>
        <button className='remove-button' onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
};

export default Blog;