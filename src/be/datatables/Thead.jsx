import React from "react";

const Thead = () => {
  const Orders = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Order ID",
      selector: (row) => row.orderID,
      width: "100px",
    },
    {
      name: "Product ID",
      selector: (row) => row.productID,
      width: "100px",
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      width: "160px",
      sortable: true,
    },
    {
      name: "Orderer",
      selector: (row) => row.orderer,
      width: "130px",
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      width: "100px",
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.statusDisplay,
      cell: (row) => {
        if (row.status === "success") {
          return <div className="badge bg-success p-1 text-light">Success</div>;
        } else if (row.status === "pending") {
          return <div className="badge bg-warning p-1 text-light">Pending</div>;
        } else if (row.status === "shipping") {
          return <div className="badge bg-info p-1 text-light">Shipping</div>;
        } else {
          return <div className="badge bg-secondary text-light">Unknow</div>;
        }
      },
      sortable: true,
    },
  ];

  return { Orders };
};

export default Thead;
