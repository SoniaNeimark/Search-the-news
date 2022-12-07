import TopNavBar from "./TopNavBar/TopNavBar";
import Hamburger from "./Hamburger/Hamburger";
import NavMenuGroup from "./NavMenuGroup/NavMenuGroup";

function Navigation(props) {
  return (
    <TopNavBar {...props}>
      <Hamburger {...props} />
      <NavMenuGroup {...props} wide={true} />
    </TopNavBar>
  );
}

export default Navigation;
