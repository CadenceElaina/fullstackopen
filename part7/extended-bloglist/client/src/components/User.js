import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}'s blogs</h2>
      {user.blogs.length > 0 ? (
        <div className="user">
          <ul>
            {user.blogs.map((blog) => (
              <Link to={`/blogs/${blog.id}`}>
                {" "}
                <li key={blog.id}>{blog.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p>{user.name} has no blogs...</p>
      )}
    </div>
  );
};

export default User;
