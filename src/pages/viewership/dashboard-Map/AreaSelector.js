import React, { useState } from "react";
import  ReactTooltip  from 'react-tooltip'
import MapChart from './MapChart';
import MapDialog from './MapDialog';



const AreaSelector = ({zooms}) => {
    const [content, setContent] = useState("");
    const [STName, setSTName] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
// console.log("zoom",zooms);
    return (
       <>
            {/* <MapDialog show={show} StateName={STName} closeModal={handleClose} /> */}
            <div >
                <MapChart setTooltipContent={setContent} setStateName={setSTName} setShowDistrict={setShow} setzoom={zooms} />
                <ReactTooltip>{content}</ReactTooltip>
            </div>
            </>
    );
}

export default AreaSelector;