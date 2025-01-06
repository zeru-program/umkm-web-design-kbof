import React, { useState, useRef, useEffect } from 'react'
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'
import BoxDash from "../../components/dashboard/BoxDash";
import DataTable from "react-data-table-component";
import Thead from "../../../be/datatables/Thead";
import Users from '../../../be/get/Users';
import Modal from "../../components/dashboard/Modal";
import FormCreateUsers from "../../components/dashboard/FormCreateUsers";
import Toast from "../../components/Toast";
import UsersDelete from "../../../be/delete/UsersDelete";
import FormEditUsers from "../../components/dashboard/FormEditUsers";
import Select from "react-select";
import StatusOption from "../../../be/options/StatusOption";
import FormDetailUsers from "../../components/dashboard/FormDetailUsers";
import TheadUsers from '../../../be/datatables/TheadUsers';
import UsersOption from '../../../be/options/UsersOption';


const UsersData = () => {
  // const { Users } = Thead();
  const { UsersTh } = TheadUsers()
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = UsersDelete();
  const { statusOptUsers } = StatusOption();
  const {
    dataUsers,
    dataTableUsers,
    loadUsers,
    dataFilterUsers,
    setSearchUsers,
    searchUsers,
    setFilterUsers,
    filterUsers,
    FetchDataUsers
  } = Users();

  const customStylesSelect = {
    container: (provided) => ({
      ...provided,
      width: "auto !important",
    }),
  };

  useEffect(() => {
    setValSelect(statusOptUsers.find(
      (opt) => opt.value === filterUsers.user
    ))
  }, [filterUsers])

  return (
    <BoxDash
      title={"Users Record"}
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchUsers(e.target.value)}
                value={searchUsers}
                placeholder="Search Users.."
              />
              <Select
                options={statusOptUsers}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterUsers({ ...filterUsers, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataUsers()
                setFilterUsers({...filterUsers, status: ""})
                setValSelect(null)
                setSearchUsers('')
              }}
            >
              <i className="bi-arrow-clockwise"></i>
            </button>
            {/* <button
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
            </button> */}
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
              columns={UsersTh}
              data={dataFilterUsers}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadUsers}
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
              <FormDetailUsers dataDetail={selectedRow} />
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
                <FormCreateUsers />
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
                <FormEditUsers dataEdit={selectedRow} />
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

const DUsers = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Users/Accounts Management'} pageName={'Users'} />
         <UsersData />
      </div>
    </>} />
  )
}

export default DUsers