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
    },
    {
      name: "Blog Title",
      selector: (row) => row.blogTitle,
      sortable: true,
    },
    {
      name: "Blog Short Desc",
      selector: (row) => row.blogShortDesc,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
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

  return { BlogsTh };
};

export default TheadBlogs;
