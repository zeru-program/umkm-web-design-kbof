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
import TheadReviews from '../../../be/datatables/TheadReviews';
import Reviews from '../../../be/get/Reviews';


const UsersData = () => {
  // const { Users } = Thead();
  const { UsersTh } = TheadUsers()
  const { ReviewsTh } = TheadReviews()
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
  const {
    dataReviews,
    dataTableReviews,
    loadReviews,
    dataFilterReviews,
    setSearchReviews,
    searchReviews,
    setFilterReviews,
    filterReviews,
    FetchDataReviews
  } = Reviews();

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
      title={"Reviews"}
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchReviews(e.target.value)}
                value={searchReviews}
                placeholder="Search Reviews.."
              />
              {/* <Select
                options={statusOptUsers}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterUsers({ ...filterUsers, status: item.value });
                }}
                value={valSelect || null}
                required
              /> */}
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataReviews()
                // setFilterUsers({...filterUsers, status: ""})
                setValSelect(null)
                setSearchReviews('')
              }}
            >
              <i className="bi-arrow-clockwise"></i>
            </button>
          </div>
        </>
      }
      content={
        <>
          <div className="pt-3 mt-3 ">
            <DataTable
              columns={ReviewsTh}
              data={dataFilterReviews}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadReviews}
              progressComponent={
                <div className="py-2 mt-4 px-4">
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              persistTableHead
              striped
              responsive
            />
          </div>

          {/* modal  */}
          {/* <Modal
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
          /> */}
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
              const form = document.getElementById("formCreateUser");
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
              const form = document.getElementById("formEditUser");
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

const DReviews = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Reviews'} pageName={'Reviews'} />
         <UsersData />
      </div>
    </>} />
  )
}

export default DReviews