import React from "react";

const TheadCode = () => {
  const CodeTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Code ID",
      selector: (row) => row.code_id,
      sortable: true,
    },
    {
      name: "Code Name",
      selector: (row) => row.code_name,
    },
    {
      name: "Percentage Promo",
      selector: (row) => row.percentage_promo,
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

  return { CodeTh };
};

export default TheadCode;
