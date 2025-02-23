import React, { useEffect, useState } from "react";
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'
import BoxDash from "../../components/dashboard/BoxDash";
import DataTable from "react-data-table-component";
import Thead from "../../../be/datatables/Thead";
import OrdersGet from "../../../be/get/OrdersGet";
import Modal from "../../components/dashboard/Modal";
import FormCreateOrders from "../../components/dashboard/FormCreateOrders";
import Toast from "../../components/Toast";
import OrdersDelete from "../../../be/delete/OrdersDelete";
import FormEditOrders from "../../components/dashboard/FormEditOrders";
import Select from "react-select";
import StatusOption from "../../../be/options/StatusOption";
import FormDetailOrders from "../../components/dashboard/FormDetailOrders";


const Orders = () => {
  const { Orders } = Thead();
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = OrdersDelete();
  const { statusOptOrders } = StatusOption();
  const {
    dataOrders,
    dataTableOrders,
    loadOrders,
    dataFilterOrders,
    setSearchOrders,
    searchOrders,
    setFilterOrders,
    filterOrders,
    FetchDataOrders
  } = OrdersGet();

  const customStylesSelect = {
    container: (provided) => ({
      ...provided,
      width: "auto !important",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? "#496653" : state.isFocused ? "#496653" : "#FFF",
      // background: "red",
      color: state.isSelected ? "#FFF" : state.isFocused ? "#FFF" : "#333",
      cursor: "pointer",
      fontFamily: "var(--satoshi)",
      // paddingTop: "0",
      "&:active": {
        background: "#ddd",
      },
    }),
  };

  useEffect(() => {
    setValSelect(statusOptOrders.find(
      (opt) => opt.value === filterOrders.status
    ))
  }, [filterOrders])

  return (
    <BoxDash
      title={"Orders Record"}
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchOrders(e.target.value)}
                value={searchOrders}
                placeholder="Search orders.."
              />
              <Select
                options={statusOptOrders}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterOrders({ ...filterOrders, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataOrders()
                setFilterOrders({...filterOrders, status: ""})
                setValSelect(null)
                setSearchOrders('')
              }}
            >
              <i className="bi-arrow-clockwise"></i>
            </button>
            <button
              className="btn text-light bg-secondary"
              onClick={(e) => {
                if (!selectedRow || selectedRow.length === 0) {
                  e.preventDefault();
                  Toast.fire({
                    icon: "error",
                    title: "Please select the data!",
                  });
                  return;
                } else if (selectedRow && selectedRow.length > 1) {
                  e.preventDefault();
                  Toast.fire({
                    icon: "error",
                    title: "Please select only 1 data!",
                  });
                  return;
                }
              }}
              {...(selectedRow && selectedRow.length == 1
                ? { "data-bs-toggle": "modal", "data-bs-target": "#detail" }
                : {})}
            >
              <i className="bi-eye-fill"></i>
            </button>
            <button
              className="btn text-light"
              style={{ background: "#19459D" }}
              data-bs-toggle="modal"
              data-bs-target="#create"
            >
              <i className="bi-plus-lg"></i>
            </button>
            <button
              className="btn text-light bg-accent"
              onClick={(e) => {
                if (!selectedRow || selectedRow.length === 0) {
                  e.preventDefault();
                  Toast.fire({
                    icon: "error",
                    title: "Please select the data!",
                  });
                  return;
                } else if (selectedRow && selectedRow.length > 1) {
                  e.preventDefault();
                  Toast.fire({
                    icon: "error",
                    title: "Please select only 1 data!",
                  });
                  return;
                }
              }}
              {...(selectedRow && selectedRow.length == 1
                ? { "data-bs-toggle": "modal", "data-bs-target": "#edit" }
                : {})}
            >
              <i className="bi-pencil-fill"></i>
            </button>
            <button
              className="btn text-light bg-danger"
              onClick={(e) => {
                if (!selectedRow || selectedRow.length === 0) {
                  e.preventDefault();
                  Toast.fire({
                    icon: "error",
                    title: "Please select the data!",
                  });
                  return;
                }
              }}
              {...(selectedRow && selectedRow.length > 0
                ? { "data-bs-toggle": "modal", "data-bs-target": "#delete" }
                : {})}
            >
              <i className="bi-trash-fill"></i>
            </button>
          </div>
        </>
      }
      content={
        <>
          <div className="pt-3 mt-3 ">
            <DataTable
              columns={Orders}
              data={dataFilterOrders}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadOrders}
              progressComponent={
                <div className="py-2 mt-4 px-4">
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              selectableRows
              onRowClicked={(row) => console.log(row)}
              onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
              persistTableHead
              striped
              responsive
            />
          </div>

          {/* modal  */}
          <Modal
            modalName={"detail"}
            modalLable={"detailModal"}
            modalTitle={"Detail"}
            confirmButton={false}
            cancelButton={false}
            modalContent={
              <>
              <FormDetailOrders dataDetail={selectedRow} />
              </>
            }
          />
          <Modal
            modalName={"create"}
            modalLable={"createModal"}
            modalTitle={"Create"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormCreateOrders />
              </>
            }
            modalConfirmText={"Create"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formCreateOrder");
              if (form) {
                if (form.checkValidity()) {
                  // Jika validasi berhasil, kirim form
                  setIsDisabledButton(true)
                  form.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                } else {
                  // Jika validasi gagal, tampilkan pesan error
                  form.reportValidity();
                }
              }
            }}
          />
          <Modal
            modalName={"edit"}
            modalLable={"editModal"}
            modalTitle={"Edit"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormEditOrders dataEdit={selectedRow} />
              </>
            }
            modalConfirmText={"Save changes"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formEditOrder");
              if (form) {
                if (form.checkValidity()) {
                  // Jika validasi berhasil, kirim form
                  setIsDisabledButton(true)
                  form.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                } else {
                  // Jika validasi gagal, tampilkan pesan error
                  form.reportValidity();
                }
              }
            }}
          />
          <Modal
            modalName={"delete"}
            modalLable={"deleteModal"}
            modalTitle={"Delete"}
            isDisabled={isDisabledButton}
            modalContent={<>Are you sure to delete?</>}
            modalConfirmText={"Yes"}
            modalConfirmClicked={() => {
              setIsDisabledButton(true)
              handleDeleteRow(selectedRow)
            }}
          />
        </>
      }
    />
  );
};


const DOrders = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Orders'} pageName={'Orders'} />
         <Orders />
      </div>
    </>} />
  )
}

export default DOrders