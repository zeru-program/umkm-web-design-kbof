import React, { useEffect, useMemo, useState } from "react";
import ProductsGet from "./ProductsGet";

const ReviewsGet = () => {
  const [dataReviews, setDataReviews] = useState([]);
  const [loadReview, setLoadReview] = useState(true);

  // init atau fetch pertama kali lalu set data ke dataReview
  const FetchDataReview = () => {
    setLoadReview(true);
    fetch(`${import.meta.env.VITE_DB}reviews.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataReviews(
          Object.entries(data).map(([key, value]) => ({ key, ...value }))
        );
        setLoadReview(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchDataReview();
  }, []);

  return {
    dataReviews,
    setDataReviews,
    loadReview,
    FetchDataReview,
  };
};

export default ReviewsGet;
