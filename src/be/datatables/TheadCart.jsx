import React, { useEffect, useState } from "react";
import CartsDelete from "../delete/CartsDelete";
import CartsGet from "../get/CartsGet";

const TheadCart = () => {
  const { handleDelete } = CartsDelete()
  const [qtyAll, setQtyAll] = useState({})
  const { dataTableCarts } = CartsGet()
  const [totalAll, setTotalAll] = useState({})
  const [priceAll, setPriceAll] = useState({})
  const handleRemove = async (key) => {
    // alert(key)
    try {
      const res = await handleDelete(key)
      
      if (res) {
        sessionStorage.setItem(
          "success",
          `Success remove item in cart`
        );
        location.reload();
      } else {
        console.log('error', res)
      }
    } catch (error) {
      console.error(error)
      alert('ups something wrong..')
    }
  }
  const handleQtyChange = (index, price, increment) => {
    setQtyAll((prevQtyAll) => {
      const newQty = Math.max(0, (prevQtyAll[index] || 0) + increment);
      if (newQty == 0) {
        return  { ...prevQtyAll, [index]: 1 };
      }
      // Update total saat qty berubah
      setTotalAll((prevTotalAll) => ({
        ...prevTotalAll,
        [index]: newQty * price,
      }));
      return { ...prevQtyAll, [index]: newQty };
    });
  };
  
  useEffect(() => {
    if (dataTableCarts) {
      dataTableCarts.map((item, index) => {
        const newQty = Math.max(0, (qtyAll[index] || 1));
        setTotalAll((prevTotalAll) => ({
          ...prevTotalAll,
          [index]: newQty * priceAll[index],
        }))
      })
    }
  }, [dataTableCarts, qtyAll, priceAll])
  
  const CartTh = [
    {
      name: "Product",
      selector: (row) => row.product,
      width: "300px",
      sortable: true,
      style: { textAlign: "center" },
      cell: (row) => {
        return (
        <div className="d-flex gap-3 align-items-center">
          <img
            src={row.product_img}
            alt={row.product_name}
            className="img-tbody img-thumbnail"
            />
            <div className="d-flex flex-column text-left">
            <span className="fw-bold text-satoshi">{row.product_name}</span>
            <span className="text-satoshi">{row.product_id}</span>
            <span className="text-satoshi">{row.product_spec.height}cm Height, {row.product_spec.weight}kg Height</span>
            </div>
        </div>
        );
      },
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      cell: (row) => {
        if (row.product_price) {
          return <span className="fw-bold">Rp{parseFloat(row.product_price).toLocaleString("id-ID")}</span>
        }
        return "Rp0"
      }
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    //   width: "100px",
      cell: (row, index) => {
        if (row.qty) {
          useEffect(() => {
            setPriceAll((prev) => ({...prev, [index]: row.product_price}))
          }, [row])
          return (
            <div className="d-flex align-items-center gap-2">
              <button className="btn bg-transparent" onClick={() => handleQtyChange(index, row.product_price, -1)}>-</button>
              <span className="text-nowrap">{parseFloat(qtyAll[index] || row.qty).toLocaleString("id-ID")}</span>
              <button className="btn bg-transparent" onClick={() => handleQtyChange(index, row.product_price, 1)}>+</button>
            </div>
          )
        }
        return "Rp0"
      }
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      cell: (row, index) => {
        useEffect(() => {
          setQtyAll((prev) => ({...prev, [index]: row.qty}))
        }, [row])
        const qty = qtyAll[index] || row.qty; // Gunakan qty terbaru jika ada
        const total = qty * row.product_price; // Hitung total berdasarkan qty
        return <span className="fw-bold">Rp{parseFloat(total).toLocaleString("id-ID")}</span>
      },
    },    
    {
      name: "",
      selector: (row) => row.total,
      sortable: true,
      width: "150px",
      cell: (row) => {
        if (row) {
          return (
            <button className="btn bg-transparent" onClick={() => handleRemove(row.key)}><i className="bi-trash"></i></button>
          )
        }
        return "Empty Data"
      }
    },
  ];

  return { CartTh, qtyAll, totalAll };
};

export default TheadCart;
