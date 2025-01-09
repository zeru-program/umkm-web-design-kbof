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
      name: "Product ID",
      selector: (row) => row.id_product,
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
    },
    {
      name: "Result Price",
      selector: (row) => row.result_price,
      sortable: true,
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
