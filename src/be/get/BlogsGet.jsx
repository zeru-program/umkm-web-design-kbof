import React, { useEffect, useMemo, useState } from "react";

const BlogsGet = () => {
  const [dataBlogs, setDataBlogs] = useState([]);
  const [dataTableBlogs, setDataTableBlogs] = useState([]);
  const [dataFilterBlogs, setDataFilterBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState("");
  const [filterBlogs, setFilterBlogs] = useState({
    status: "",
  });
  const [loadBlogs, setLoadBlogs] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataBlogs
  const FetchDataBlogs = () => {
    setLoadBlogs(true);
    fetch(`${import.meta.env.VITE_DB}education.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataBlogs(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadBlogs(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataBlogs();
  }, []);

  // set data untuk data table react memakai use memo dan dipanggil dengan dataTableBlogs: transformedBlogs di return
  const transformedBlogs = useMemo(() => {
    setLoadBlogs(true);
    if (Array.isArray(dataBlogs) && dataBlogs.length > 0) {
      const transformedData = dataBlogs.map((data, index) => ({
        key: data.key,
        id: index + 1,
        img: data.img,
        blogID: data.id,
        blogTitle: data.title || "Unknown",
        blogShortDesc: data.short_desc || 0,
        category: data.category || "",
        created_at: data.created_at || "",
        content: data.content || "",
        status: data.status || "",
      }));

      setDataTableBlogs(transformedData);
      setDataFilterBlogs(transformedData);
      setLoadBlogs(false);
    }
  }, [dataBlogs]);

  // kondisikan data yang terfilter setiap perubahan filter data
  useEffect(() => {
    const filtered = dataTableBlogs.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(
          searchBlogs.toLowerCase() || filterBlogs.status.toLowerCase()
        )
    );
    setDataFilterBlogs(filtered);
  }, [searchBlogs, filterBlogs, dataTableBlogs]);

  return {
    dataBlogs,
    setDataBlogs,
    dataTableBlogs: transformedBlogs,
    setDataTableBlogs,
    dataFilterBlogs,
    setDataFilterBlogs,
    searchBlogs,
    setSearchBlogs,
    filterBlogs,
    setFilterBlogs,
    loadBlogs,
    FetchDataBlogs,
  };
};

export default BlogsGet;
