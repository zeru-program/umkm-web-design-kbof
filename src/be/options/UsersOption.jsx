import React, { useEffect, useState } from "react";
import Users from "../get/Users";

const UsersOption = () => {
  const { dataUsers } = Users();
  const [usersOpt, setusersOpt] = useState([]);
  useEffect(() => {
    if (Array.isArray(dataUsers) && dataUsers.length > 0) {
      const transformedData = dataUsers.map((data) => ({
        value: data.id,
        label: data.username + " - " + data.id,
      }));
      setusersOpt(transformedData);
      //   console.log(productOpt)
    }
  }, [dataUsers]);
  return { usersOpt };
};

export default UsersOption;
