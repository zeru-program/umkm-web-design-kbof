import React from "react";

const TheadBlogs = () => {
  const BlogsTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.img,
      width: "100px",
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
      name: "Blog ID",
      selector: (row) => row.blogID,
      width: "100px",
    },
    {
      name: "Blog Title",
      selector: (row) => row.blogTitle,
      width: "200px",
      sortable: true,
    },
    {
      name: "Blog Short Desc",
      selector: (row) => row.blogShortDesc,
      width: "200px",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      width: "100px",
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      width: "150px",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.statusDisplay,
      width: "100px",
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

  return { BlogsTh };
};

export default TheadBlogs;
