import React from "react";

const TheadReviews = () => {
  const ReviewsTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Id Order",
      selector: (row) => row.id_order,
      width: "200px",
      sortable: true,
    },
    {
      name: "Id Product",
      selector: (row) => row.id_product,
      sortable: true,
    },
    {
      name: "Id User",
      selector: (row) => row.id_user,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      cell: (row) => {
        return (
          <span>⭐{row.rating}</span>
        )
      }
    },
    {
      name: "Feeling",
      selector: (row) => row.feeling,
      sortable: true,
      cell: (row) => {
        if (row.feeling === "happy") {
          return <div className="badge bg-primary p-1 text-light">Happy</div>;
        } else if (row.feeling === "not bad") {
          return <div className="badge bg-warning text-light">Not Bad</div>;
        } else if (row.feeling === "poor") {
          return <div className="badge bg-danger text-light">Poor</div>;
        } else {
          return <div className="badge bg-dark text-light">Unknown</div>;
        }
      },
    },
  ];

  return { ReviewsTh };
};

export default TheadReviews;
