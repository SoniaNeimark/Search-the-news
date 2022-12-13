import { Navigate } from "react-router-dom";
const ProtectedRout = (props) => {
  if (!props.loggedIn) {
    return <Navigate to={"/"} replace={true}/>;
  }
  return props.children;
};

export default ProtectedRout;
