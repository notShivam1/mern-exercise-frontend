import React, { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import EditOrderModal from "../components/EditOrderModal";
import AddOrderModal from "../components/AddOrderModal";
import { useHistory } from "react-router-dom";
import "../styles/orders.css";

export default function Orders() {
  const [error, setError] = useState("");
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [show, showAddModal]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const deleteItem = (orderNumber) => {
    fetch("http://localhost:5000/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: orderNumber,
      }),
    }).then(async (response) => {
      if (response.ok) {
        fetchData();
      } else {
        setError("couldnt delete item");
      }
    });
  };

  const editItem = (orderNumber) => {
    const order = orders.filter((o) => o.orderNumber === orderNumber);
    setEditingItem(order);
    handleShow();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="Container">
        {error && <Alert variant="danger">{error}</Alert>}
        <Button
          variant="primary"
          onClick={handleShowAddModal}
          className="MarginButton"
        >
          Add order
        </Button>
        <Button
          variant="primary"
          onClick={() => history.push("/")}
          className="MarginButton"
        >
          Log Out
        </Button>
      </div>
      {orders.length ? (
        orders?.map((o, i) => {
          return (
            <Card as="ul" className="Card">
              <div>
                <Card.Body>
                  <Card.Title>
                    Order No. {o.orderNumber}
                    <Button
                      variant="danger"
                      onClick={() => deleteItem(o.orderNumber)}
                      className="MarginButton"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => editItem(o.orderNumber)}
                    >
                      Edit
                    </Button>
                  </Card.Title>
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
            </Card>
          );
        })
      ) : (
        <div>No orders</div>
      )}
      <EditOrderModal
        show={show}
        handleClose={() => handleClose()}
        initialValues={editingItem[0] || {}}
      ></EditOrderModal>
      <AddOrderModal
        show={showAddModal}
        handleClose={() => handleCloseAddModal()}
      ></AddOrderModal>
    </div>
  );
}
