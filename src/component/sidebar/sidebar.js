import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import asseticon from "../../assets/images/asset-icon.svg"
import channelicon from "../../assets/images/channel-icon.svg"
import Engineicon from "../../assets/images/Engine-icon.svg"
import scheduling from "../../assets/images/scheduling-icon.svg"
import management from "../../assets/images/management-icon.svg"
import backicon from "../../assets/images/back-icon.svg"
import "../../assets/css/style.scss"

function SlideBar() {
    const [menuStatus, setMenuStatus] = useState(false);
    const location = useLocation(); // Get the current location from react-router-dom
    const [activeItem, setActiveItem] = useState(""); // State to keep track of the active item

    const backMenu = () => {
        if (menuStatus) {
            setMenuStatus(false);
        } else {
            setMenuStatus(true);
        }
    };

    const handleItemClick = (itemValue) => {
        setActiveItem(itemValue); // Set the active item when it's clicked
    };
console.log(location.pathname);
    return (
        <div className={menuStatus ? 'sidebar-menu menu-icon' : 'sidebar-menu'}>
            <div className="back-menu">
                <a onClick={backMenu}><img src={backicon} alt="Back Icon" /></a>
            </div>
            <div className="menu">
                <ul>
                <li className={location.pathname === "/Asset" ||"/CmsChannelDetail" ? 'active' : ''}>
                        <Link to="/Asset" >
                            <img src={asseticon} alt="Asset Icon" /><span>Asset Management</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/Channel" ? 'active' : ''}>
                        <Link to="/Channel" >
                            <img src={channelicon} alt="Channel Icon" /><span>Channel Setup</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/RuleEngine" ? 'active' : ''}>
                        <Link to="/RuleEngine">
                            <img src={Engineicon} alt="Engine Icon" /><span>Rule Engine</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/Scheduling" ? 'active' : ''}>
                        <Link to="/Scheduling" >
                            <img src={scheduling} alt="Scheduling Icon" /><span>Scheduling</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/Inventory" ? 'active' : ''}>
                        <Link to="/Inventory" >
                            <img src={management} alt="Management Icon" /><span>Inventory Management</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
