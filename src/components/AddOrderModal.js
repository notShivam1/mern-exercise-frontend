import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addOrder } from "../api/orders.api";

export default function OrderModal({ show, handleClose }) {
  const [inputs, setInputs] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    addOrder(inputs);
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
        <Form.Group style={{ margin: 20 }} id="orderDueDate">
          <Form.Label>Order Due Date:</Form.Label>
          <Form.Control
            name="orderDueDate"
            type="date"
            value={inputs?.orderDueDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group style={{ margin: 20 }} id="customerBuyerName">
          <Form.Label>Customer Buyer Name:</Form.Label>
          <Form.Control
            name="customerBuyerName"
            value={inputs?.customerBuyerName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group style={{ margin: 20 }} id="customerAddress">
          <Form.Label>Customer Address: </Form.Label>
          <Form.Control
            name="customerAddress"
            value={inputs?.customerAddress}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group style={{ margin: 20 }} id="customerPhone">
          <Form.Label>Customer Phone Number: </Form.Label>
          <Form.Control
            name="customerPhone"
            type="number"
            value={inputs?.customerPhone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group style={{ margin: 20 }} id="orderTotal">
          <Form.Label>Order Total: </Form.Label>
          <Form.Control
            name="orderTotal"
            type="number"
            value={inputs?.orderTotal}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <div style={{ display: "flex", alignSelf: "center", margin: 10 }}>
          <Button className="w-100" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
