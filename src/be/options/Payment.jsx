import React, { useEffect, useState } from "react";

const Payment = () => {
  const [paymentOpt, setStatusOpt] = useState([
    { value: "cod", label: "COD" },
    { value: "digital", label: "E-Money / Bank transfer" },
  ]);
  return { paymentOpt };
};

export default Payment;
