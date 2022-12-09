import { Navigate } from "react-router-dom";
const ProtectedRout = (props) => {
  //const visited = localStorage.getItem("savedNewsPage");
  if (!props.loggedIn) {
    return <Navigate to={"/"} />;
  } /*else if (!visited) {
    //props.getSavedArticles();
    localStorage.setItem("savedNewsPage", "visited");
    return props.children;
  }*/

  return props.children;
};

export default ProtectedRout;
