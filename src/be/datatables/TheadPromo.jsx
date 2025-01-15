import React from "react";

const TheadPromo = () => {
  const PromoTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Percentage Promo",
      selector: (row) => row.percentage_promo,
    },
    {
      name: "Initial Price",
      selector: (row) => row.initial_price,
      sortable: true,
      cell: (row) => {
        if (row.initial_price) {
          return "Rp" + parseFloat(row.initial_price).toLocaleString("id-ID")
        }
      }
    },
    {
      name: "Result Price",
      selector: (row) => row.result_price,
      sortable: true,
      cell: (row) => {
        if (row.result_price) {
          return "Rp" + parseFloat(row.result_price).toLocaleString("id-ID")
        }
      }
    },
    {
      name: "Periode",
      selector: (row) => row.periode,
      width: "200px",
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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

  return { PromoTh };
};

export default TheadPromo;
