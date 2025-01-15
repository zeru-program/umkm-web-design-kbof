import React from "react";

const TheadUsers = () => {
  const UsersTh = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.img && row.username && row.id_user,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center gap-2">
            <img
              src={row.img}
              alt={row.name}
              style={{objectFit: "cover"}}
              className="img-tbody img-thumbnail"
              />
              <div className="d-flex flex-column gap-2">
                <span>{row.username}</span>
                <span>#{row.id_user}</span>
              </div>
          </div>
        );
      },
      width: "200px",
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      cell: (row) => {
        if (row.gender == true) {
          return <div className="badge bg-primary p-1 text-light">Male</div>;
        } else if (row.gender == false) {
          return <div className="badge bg-danger text-light">Female</div>;
        } else {
          return <div className="badge bg-dark text-light">Unknown</div>;
        }
      },
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (row) => {
        if (row.role === "pembeli") {
          return <div className="badge bg-info p-1 text-light">Pembeli</div>;
        } else if (row.role === "admin") {
          return <div className="badge bg-primary text-light">Admin</div>;
        } else if (row.role === "administrator") {
          return <div className="badge bg-primary text-light">Administrator</div>;
        } else if (row.role === "developer") {
          return <div className="badge bg-primary text-light">Developer</div>;
        }
      },
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

  return { UsersTh };
};

export default TheadUsers;
