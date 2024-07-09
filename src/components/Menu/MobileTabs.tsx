import Navbar from "react-bootstrap/Navbar";
import HomeIcon from "../svg/HomeIcon";
import SearchIcon from "../svg/SearchIcon";
import ResourcesIcon from "../svg/ResourcesIcon";
import MobileTabItem from "./MobileTabItem";

export default function MobileTabs() {
  return (
    <Navbar fixed="bottom" className="bg-white shadow shadow-lg d-md-none">
      <div className="d-flex align-items-center w-100 h-100 py-1">
        <MobileTabItem icon={<HomeIcon />} label="Home" to="/" />
        <MobileTabItem
          icon={<SearchIcon />}
          label="Rate my PO"
          to="/rate-my-po"
        />
        <MobileTabItem
          icon={<ResourcesIcon />}
          label="Resources"
          to="/resources"
        />
      </div>
    </Navbar>
  );
}
