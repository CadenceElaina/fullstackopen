import { useSelector } from "react-redux";
/* const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification && <div style={style}>{notification}</div>
}
export default Notification */
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) return null;

  if (notification.includes("error")) {
    return <div className="error">{notification}</div>;
  }

  return <div className="success">{notification}</div>;
};

export default Notification;
