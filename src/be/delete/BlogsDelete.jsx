import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig";

const BlogsDelete = () => {
  const handleDelete = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DB}education/${data}.json`,
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
      console.log("error while created acount", error);
      throw error;
    }
  };

  const handleDeleteRow = async (selectedRow) => {
    if (selectedRow && selectedRow.length > 0) {
      try {
        // Hapus semua data secara paralel
        const results = await Promise.all(
          selectedRow.map(async (item) => {
            if (!item.img.toLowerCase().includes("news/800a/2020/plant")) {
              const oldFilePath = item.img.replace(
                `${
                  import.meta.env.VITE_SUPABASE_URL
                }/storage/v1/object/public/educations/`,
                ""
              );
              const { error } = await supabase.storage
                .from("educations")
                .remove([oldFilePath]); // Hapus file lama

              if (error) {
                throw new Error("Failed to delete old image.");
              }
            }
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

export default BlogsDelete;
