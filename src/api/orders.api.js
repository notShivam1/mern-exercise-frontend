function updateOrder(inputs, orderNumber) {
  const {
    orderDueDate,
    customerBuyerName,
    customerAddress,
    customerPhone,
    orderTotal,
  } = inputs;

  fetch("http://localhost:5000/orders", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderNumber: orderNumber,
      orderDueDate: orderDueDate,
      customerBuyerName: customerBuyerName,
      customerAddress: customerAddress,
      customerPhone: customerPhone,
      orderTotal: orderTotal,
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
}

function addOrder(inputs) {
  const {
    orderDueDate,
    customerBuyerName,
    customerAddress,
    customerPhone,
    orderTotal,
  } = inputs;

  fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderNumber: Date.now(),
      orderDueDate: orderDueDate,
      customerBuyerName: customerBuyerName,
      customerAddress: customerAddress,
      customerPhone: customerPhone,
      orderTotal: orderTotal,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
      } else {
        console.log("problem");
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

module.exports = {
  updateOrder,
  addOrder,
};
