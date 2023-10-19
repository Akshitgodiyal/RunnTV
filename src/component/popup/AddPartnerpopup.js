import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddPartnerpopup.scss';
import { Partner_create, Partner_update } from '../../api/api'; // Assuming you have an API for creating and updating partners

const AddPartnerpopup = ({ show, handleClose, isEditing, partnerData }) => {
    const [partnerName, setPartnerName] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (isEditing) {
            // Pre-populate the form fields with partnerData if in edit mode
            setPartnerName(partnerData.name);
            setPartnerId(partnerData.code);
            setStartDate(new Date(partnerData.createdAt));
            setEndDate(new Date(partnerData.updatedAt));
        } else {
            // Reset the form fields when in add mode
            setPartnerName('');
            setPartnerId('');
            setStartDate(null);
            setEndDate(null);
        }
    }, [isEditing, partnerData]);

    const addPartner = async () => {
        if (isEditing) {
            // Handle the update logic here
            const updatedPartnerData = {

                name: partnerName,
                startDate: startDate.getTime(),
                endDate: endDate.getTime(),
            };
           


            await Partner_update(updatedPartnerData,partnerData.id);
        } else {
            // Handle the create logic here
            const newPartnerData = {
                code: partnerId,
                name: partnerName,
                startDate: startDate ? startDate.getTime() : null,
                endDate: endDate ? endDate.getTime() : null,
            };
            await Partner_create(newPartnerData);
        }
        handleClose(); // Close the modal after adding/editing
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
    disabled={isEditing} // Disable in edit mode
/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date <span style={{ color: "red" }}>*</span></Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()} // Disable all back dates
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date <span style={{ color: "red" }}>*</span></Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            minDate={new Date()} // Disable all back dates
                        />
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
