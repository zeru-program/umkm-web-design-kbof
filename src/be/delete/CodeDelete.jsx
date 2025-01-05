import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig";
import ProductsGet from "../get/ProductsGet";
import ProductsEdit from "../edit/ProductsEdit";

const CodeDelete = () => {
  const { handleEdit } = ProductsEdit();
  const { dataProducts } = ProductsGet();
  const handleDelete = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DB}product_code/${data}.json`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.log("error while deleted", error);
      throw error;
    }
  };

  const handleDeleteRow = async (selectedRow) => {
    if (selectedRow && selectedRow.length > 0) {
      try {
        // Hapus semua data secara paralel
        const results = await Promise.all(
          selectedRow.map(async (item) => {
            const res = await handleDelete(item.key);
            return res;
          })
        );
        sessionStorage.setItem(
          "success",
          `Success remove ${selectedRow.length} data`
        );
        location.reload();
      } catch (error) {
        console.error("Error during deletion:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to delete some data!",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please select the data!",
      });
    }
  };
  
  return { handleDelete, handleDeleteRow };
};

export default CodeDelete;
