import React, { useEffect, useState, useMemo } from "react";
import CryptoJS from "crypto-js";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataTableUsers, setDataTableUsers] = useState([]);
  const [dataFilterUsers, setDataFilterUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const [filterUsers, setFilterUsers] = useState({
    status: "",
  });
  const [loadUsers, setLoadUsers] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataUsers
  const FetchDataUsers = () => {
    setLoadUsers(true);
    fetch(`${import.meta.env.VITE_DB}users.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataUsers(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadUsers(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataUsers();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableUsers: transformedUsers di return
  const transformedUsers = useMemo(() => {
    setLoadUsers(true);
    if (Array.isArray(dataUsers) && dataUsers.length > 0) {
      const transformedData = dataUsers.map((data, index) => ({
        key: data.key,
        id: index + 1,
        img: data.img,
        id_user: data.id,
        username: data.username,
        // password: data.password,
        password: CryptoJS.AES.encrypt('password', data.password).toString(),
        email: data.email,
        phone: data.phone,
        role: data.role,
        gender: data.gender,
        status: data.status || "Draft",
        statusDisplay: data.status || "Draft",
      }));

      setDataTableUsers(transformedData);
      setDataFilterUsers(transformedData);
      setLoadUsers(false);
    }
  }, [dataUsers]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTableUsers.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchUsers.toLowerCase() || filterUsers.status.toLowerCase())
    );
    setDataFilterUsers(filtered);
  }, [searchUsers, filterUsers, dataTableUsers]);

  return { 
    dataUsers,
    setDataUsers,
    dataTableUsers: transformedUsers,
    setDataTableUsers,
    dataFilterUsers,
    setDataFilterUsers,
    searchUsers,
    setSearchUsers,
    filterUsers,
    setFilterUsers,
    loadUsers,
    FetchDataUsers,
  };
};

export default Users;
