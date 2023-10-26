import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; // Use this CSS module
import './AddPartnerpopup.scss';
import { Partner_create, Partner_update } from '../../api/api';

const AddPartnerpopup = ({ show, handleClose, isEditing, partnerData }) => {
    const [partnerName, setPartnerName] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [startDate, setStartDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
// console.log(startTime);
    useEffect(() => {
        if (isEditing) {
            setPartnerName(partnerData.name);
            setPartnerId(partnerData.code);
            setStartDate(new Date(partnerData.startDate));
            setEndDate(new Date(partnerData.endDate));
            const startDateTime = new Date(partnerData.startDate);
            const endDateTime = new Date(partnerData.endDate);
    
            const startTime = startDateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // Use 24-hour format
            });
    
            const endTime = endDateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // Use 24-hour format
            });
    
            setStartTime(startTime);
            setEndTime(endTime);
        } else {
         
            setPartnerName('');
            setPartnerId('');
            setStartDate(null);
            setEndDate(null);
            setStartTime(null); // Set it to an empty string, not null
            setEndTime(null);
        }
    }, [isEditing, partnerData]);

    const addPartner = async () => {
        if (isEditing) {
            const updatedPartnerData = {
                name: partnerName,
                startDate: new Date(`${startDate.toDateString()} ${startTime}`).getTime(),
                endDate: new Date(`${endDate.toDateString()} ${endTime}`).getTime(),
            };
            await Partner_update(updatedPartnerData, partnerData.id);
        } else {
            const newPartnerData = {
                code: partnerId,
                name: partnerName,
                startDate: startDate ? new Date(`${startDate.toDateString()} ${startTime}`).getTime() : null,
                endDate: endDate ? new Date(`${endDate.toDateString()} ${endTime}`).getTime() : null,
            };
            await Partner_create(newPartnerData);
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Partner' : 'Add New Content Partner'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Partner Name <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control
                            placeholder='Enter partner’s name'
                            type="text"
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Partner Code <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control
                            placeholder="Enter Partner’s code"
                            type="text"
                            value={partnerId}
                            onChange={(e) => setPartnerId(e.target.value)}
                            disabled={isEditing}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date <span style={{ color: "red" }}>*</span></Form.Label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <DatePicker
                                selected={startDate || null}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/dd/yyyy"
                                isClearable  // This allows the user to clear the selected date
                            />

<Form.Control
    placeholder="HH:MM"
    className="starttime"
    type="time"
    value={startTime || "00:00"} // Use '00:00' as the default time
    onChange={(e) => {
        const inputTime = e.target.value;
        setStartTime(inputTime);
    }}
/>
                           
                        </div>


                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date <span style={{ color: "red" }}>*</span></Form.Label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <DatePicker
                                selected={endDate || null}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/dd/yyyy"
                                isClearable  // This allows the user to clear the selected date
                            />

                            <Form.Control
                                isClearable  // This allows the user to clear the selected date
                                placeholder='HH:MM'
                                className='starttime'
                                type="time"
                                defaultValue={endTime || "00:00"}
                                onChange={(e) => {
                                    const inputTime = e.target.value;
                                    setEndTime(inputTime);
                                }}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='Cancel' onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='Add' onClick={addPartner}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPartnerpopup;
