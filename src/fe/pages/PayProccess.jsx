import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import OrdersEdit from '../../be/edit/OrdersEdit';
import OrdersGet from '../../be/get/OrdersGet';

const PayProccess = () => {
  const [searchParams] = useSearchParams();
  const idPay = searchParams.get("order_id");
  const navigate = useNavigate();
  const { handleEdit } = OrdersEdit();
  const { dataOrders } = OrdersGet();

  useEffect(() => {
    console.log(typeof idPay)
    return
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-transaction/${idPay}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.transaction_status) {
            if (data.transaction_status === "settlement") {
              console.log('Payment success:', data);
              if (dataOrders && Array.isArray(dataOrders)) {
                const find = dataOrders.find((item) => item.id_order === idPay);
                if (find) {
                  const editRes = await handleEdit({ status: "success" }, find.key);
                  if (editRes) {
                    navigate(`/payment?order_id=${idPay}`);
                  }
                }
              } else {
                console.error("Orders data is not loaded or invalid.");
              }
            } else {
              console.log('Transaction status:', data.transaction_status);
            }
          }
        } else {
          alert('Failed to fetch transaction details.');
        }
      } catch (error) {
        alert('Something went wrong.');
        console.error('Error fetching transaction:', error);
      }
    };

    if (idPay && dataOrders) {
      fetchTransaction();
    }
  }, [idPay, dataOrders, handleEdit, navigate]);

  return <></>;
};

export default PayProccess;
