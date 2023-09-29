import React,{useState} from 'react';
import AccordionChild from './AccordionChild';
import AccordionTableHead from './AccordionTableHead';
import { useSelector, useDispatch } from 'react-redux';
import { ChannelDataAction } from '../../../Redux/slices';
import { ViewershipTableChild } from '../../../api/api';

function AccordionBlock({ title, isOpen, onToggle,filter }) {

  // const [isOpen, setIsOpen] = useState(false);

    // Toggle the isOpen state when the link is clicked
    const [clickedData, setClickedData] = useState(null);

    // Function to handle the click event from AccordionTableHead
    const handleTableHeadClick = (data) => {
      // Store the clicked data in state
      setClickedData(data);

    };

  return (
    <div className="accordion-block">
      <a  className={isOpen ? "toggle active" : "toggle"}>
      <AccordionTableHead data={title} onToggle={onToggle} onTableHeadClick={handleTableHeadClick} />
      </a>
      {isOpen && (
        
          <AccordionChild data={title} filter={filter} clickedData={clickedData} />
   
      )}
    </div>
  );
}

export default AccordionBlock;
