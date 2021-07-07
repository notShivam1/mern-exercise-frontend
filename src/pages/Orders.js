import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";

export default function Orders() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [inputs, setInputs] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  }, []);

  const deleteItem = (orderNumber) => {
    fetch("http://localhost:5000/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: orderNumber,
      }),
    }).then(async (response) => {
      if (response.ok) {
        console.log("done");
        window.location.reload();
      } else {
        console.log("problem");
      }
    });
  };
  const editItem = (orderNumber) => {
    console.log(orderNumber);
    const order = orders.filter((o) => o.orderNumber === orderNumber);
    console.log(order);
    setEditingItem(order);
    handleShow();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs, editingItem[0].orderNumber);
    fetch("http://localhost:5000/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: editingItem[0].orderNumber,
        orderDueDate: inputs.orderDueDate,
        customerBuyerName: inputs.customerBuyerName,
        customerAddress: inputs.customerAddress,
        customerPhone: inputs.customerPhone,
        orderTotal: inputs.orderTotal,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log("done");
        } else {
          console.log("problem");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    console.log(editingItem);
  }, [editingItem]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orders ? (
        orders?.map((o, i) => {
          return (
            <Card
              as="ul"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "baseline",
              }}
            >
              <div>
                <Card.Body>
                  <Card.Title>Order No. {o.orderNumber}</Card.Title>
                  <Card.Text>Order Due Date: {o.orderDueDate}</Card.Text>
                  <Card.Text>
                    Customer Buyer Name: {o.customerBuyerName}
                  </Card.Text>
                  <Card.Text>Customer Address: {o.customerAddress}</Card.Text>
                  <Card.Text>
                    Customer Phone Number: {o.customerPhone}
                  </Card.Text>
                  <Card.Text>Order Total: {o.orderTotal}</Card.Text>
                </Card.Body>
              </div>
              <Button
                variant="primary"
                onClick={() => deleteItem(o.orderNumber)}
              >
                Delete
              </Button>
              <Button variant="primary" onClick={() => editItem(o.orderNumber)}>
                Edit
              </Button>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="orderDueDate">
            <Form.Label>Order Due Date:</Form.Label>
            <Form.Control
              name="orderDueDate"
              value={inputs.orderDueDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group id="customerBuyerName">
            <Form.Label>Customer Buyer Name:</Form.Label>
            <Form.Control
              name="customerBuyerName"
              value={inputs.customerBuyerName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group id="customerAddress">
            <Form.Label>Customer Address: </Form.Label>
            <Form.Control
              name="customerAddress"
              value={inputs.customerAddress}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group id="customerPhone">
            <Form.Label>Customer Phone Number: </Form.Label>
            <Form.Control
              name="customerPhone"
              value={inputs.customerPhone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group id="orderTotal">
            <Form.Label>Order Total: </Form.Label>
            <Form.Control
              name="orderTotal"
              value={inputs.orderTotal}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
