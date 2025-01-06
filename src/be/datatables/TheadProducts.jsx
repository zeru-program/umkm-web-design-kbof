import React from "react";

const TheadProducts = () => {
  const ProductsTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.img,
      cell: (row) => {
        return (
          <img
            src={row.img}
            alt={row.name}
            className="img-tbody img-thumbnail"
          />
        );
      },
      sortable: true,
    },
    {
      name: "Product ID",
      selector: (row) => row.productID,
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Pouplar",
      selector: (row) => row.popular,
      cell: (row) => {
        if (row.popular == true) {
          return <div className="badge bg-success p-1 text-light">Yes</div>;
        } else if (row.popular == false) {
          return <div className="badge bg-danger text-light">No</div>;
        }
      },
      sortable: true,
    },
    {
      name: "Promo",
      selector: (row) => row.promo,
      cell: (row) => {
        if (row.promo == true) {
          return <div className="badge bg-success p-1 text-light">Yes</div>;
        } else if (row.promo == false) {
          return <div className="badge bg-danger text-light">No</div>;
        }
      },
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
        if (row.status === "active") {
          return <div className="badge bg-success p-1 text-light">Active</div>;
        } else if (row.status === "draft") {
          return <div className="badge bg-danger text-light">Draft</div>;
        }
      },
      sortable: true,
    },
  ];

  return { ProductsTh };
};

export default TheadProducts;
