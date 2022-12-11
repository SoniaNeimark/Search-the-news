import Popup from "../Popup/Popup";
import TopNavBar from "../../Navigation/TopNavBar/TopNavBar";
import Hamburger from "../../Navigation/Hamburger/Hamburger";
import NavMenuGroup from "../../Navigation/NavMenuGroup/NavMenuGroup";
function DropOutPopup(props) {
  return (
    <Popup
      opened={props.popup.clicked}
      nav={props.popup.clicked}
      {...props}
    >
      <div className="drop-out">
        <TopNavBar {...props} >
          <Hamburger {...props}/>
        </TopNavBar>
        <NavMenuGroup {...props} />
      </div>
    </Popup>
  );
}
export default DropOutPopup;
