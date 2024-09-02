import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();

  const notification = useSelector((state) => {
    return state.notification;
  });

  // dispatch(setNotification("wop"));

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
