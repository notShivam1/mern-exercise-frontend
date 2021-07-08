import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateOrder } from "../api/orders.api";
import "../styles/modal.css";

export default function OrderModal({ show, handleClose, initialValues }) {
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    setInputs(initialValues);
  }, [initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateOrder(inputs, initialValues.orderNumber);
    handleClose();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="Marginform" id="orderDueDate">
          <Form.Label>Order Due Date:</Form.Label>
          <Form.Control
            name="orderDueDate"
            type="date"
            value={inputs?.orderDueDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="Marginform" id="customerBuyerName">
          <Form.Label>Customer Buyer Name:</Form.Label>
          <Form.Control
            name="customerBuyerName"
            value={inputs?.customerBuyerName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="Marginform" id="customerAddress">
          <Form.Label>Customer Address: </Form.Label>
          <Form.Control
            name="customerAddress"
            value={inputs?.customerAddress}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="Marginform" id="customerPhone">
          <Form.Label>Customer Phone Number: </Form.Label>
          <Form.Control
            name="customerPhone"
            type="number"
            value={inputs?.customerPhone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="Marginform" id="orderTotal">
          <Form.Label>Order Total: </Form.Label>
          <Form.Control
            name="orderTotal"
            type="number"
            value={inputs?.orderTotal}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <div className="ButtonContainer">
          <Button className="w-100" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
