import { useSelector } from "react-redux";
// import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => {
    console.log(state.notification);
    return state.notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
