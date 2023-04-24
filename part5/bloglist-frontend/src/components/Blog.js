import { useState } from 'react';
const Blog = ({ blog, updateLikes }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
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
    };
    updateLikes(blog.id, updatedBlog);
  };
  return (
    <div>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.likes} <button onClick={handleLike}>like</button> </p>
        <a href={`${blog.url}`} target='_blank' rel='noreferrer'>{blog.url}</a>
      </div>
    </div>
  )
};

export default Blog;