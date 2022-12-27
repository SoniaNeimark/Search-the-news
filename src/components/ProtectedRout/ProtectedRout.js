import { Navigate } from "react-router-dom";
const ProtectedRout = (props) => {
  if (!props.loggedIn) {
    setTimeout(() => {props.signIn()}, 100) ;
    return <Navigate to={props.home} replace={true} />;
  }
  return props.children;
};

export default ProtectedRout;
