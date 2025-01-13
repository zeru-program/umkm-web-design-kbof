import React, { useEffect, useState } from "react";
import CartsDelete from "../delete/CartsDelete";

const TheadCart = () => {
  const { handleDelete } = CartsDelete()
  const [qtyAll, setQtyAll] = useState({})
  const [totalAll, setTotalAll] = useState({})
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
  const handleQtyChange = (index, increment) => {
    setQtyAll((prevQtyAll) => ({
      ...prevQtyAll,
      [index]: Math.max(0, (prevQtyAll[index] || 0) + increment),
    }));
  };
  
  useEffect(() => {
    console.log(qtyAll[0])
  }, [qtyAll])
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
            <div className="d-flex flex-column">
            <span className="fw-bold text-satoshi">{row.product_name}</span>
            <span className="text-satoshi">{row.product_id}</span>
            <span className="text-satoshi">{row.product_spec.height}{row.product_spec.weight}{row.product_spec.height}</span>
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
          return "Rp" + parseFloat(row.product_price).toLocaleString("id-ID") 
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
          return (
            <div className="d-flex align-items-center gap-2">
              <button className="btn bg-transparent" onClick={() => handleQtyChange(index, -1)}>-</button>
              <span>{parseFloat(qtyAll[index] || row.qty).toLocaleString("id-ID")}</span>
              <button className="btn bg-transparent" onClick={() => handleQtyChange(index, 1)}>+</button>
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
      cell: (row) => {
        if (row.total) {
          return "Rp" + parseFloat(row.total).toLocaleString("id-ID") 
        }
        return "Rp0"
      }
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

  return { CartTh };
};

export default TheadCart;
