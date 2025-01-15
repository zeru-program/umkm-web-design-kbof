import React, { useState, useRef, useEffect } from 'react'
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'
import BoxDash from "../../components/dashboard/BoxDash";
import DataTable from "react-data-table-component";
import Modal from "../../components/dashboard/Modal";
import Toast from "../../components/Toast";
import Select from "react-select";
import StatusOption from "../../../be/options/StatusOption";
import TheadBlogs from "../../../be/datatables/TheadBlogs";
import BlogsGet from "../../../be/get/BlogsGet";
import FormCreateBlogs from "../../components/dashboard/FormCreateBlogs";
import FormEditBlogs from "../../components/dashboard/FormEditBlogs";
import BlogsDelete from "../../../be/delete/BlogsDelete";
import FormDetailBlogs from "../../components/dashboard/FormDetailBlogs";
import TextEditor from '../../components/dashboard/TextEditor';

const BlogData = () => {
  const { BlogsTh } = TheadBlogs();
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const formRef = useRef(null);
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = BlogsDelete();
  const { statusOptBlogs } = StatusOption();
  const {
    dataBlogs,
    dataTableBlogs,
    loadBlogs,
    dataFilterBlogs,
    setSearchBlogs,
    searchBlogs,
    setFilterBlogs,
    filterBlogs,
    FetchDataBlogs
  } = BlogsGet();

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
    setValSelect(statusOptBlogs.find(
      (opt) => opt.value === filterBlogs.status
    ))
  }, [filterBlogs])
  return (
    <BoxDash
      title={"Data Blogs"}
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchBlogs(e.target.value)}
                value={searchBlogs}
                placeholder="Search Blogs.."
              />
              <Select
                options={statusOptBlogs}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterBlogs({ ...filterBlogs, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataBlogs()
                setFilterBlogs({...filterBlogs, status: ""})
                setValSelect(null)
                setSearchBlogs('')
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
              columns={BlogsTh}
              data={dataFilterBlogs}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadBlogs}
              progressComponent={
                <div className="py-2 mt-4 px-4">
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              selectableRows
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
            cancelButton={false}
            confirmButton={false}
            modalContent={
              <>
                <FormDetailBlogs dataDetail={selectedRow} />
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
                <FormCreateBlogs />
              </>
            }
            modalConfirmText={"Create"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formCreateProduct");
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
                <FormEditBlogs ref={formRef} dataEdit={selectedRow} />
              </>
            }
            modalConfirmText={"Save changes"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formEditProduct");
              if (form) {
                if (form.checkValidity()) {
                  // Jika validasi berhasil, kirim form
                  setIsDisabledButton(true)
                  if (formRef.current) {
                    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); 
                  }
                } else {
                  // Jika validasi gagal, tampilkan pesan error
                  form.reportValidity();
                }
              } else {
                console.error("Form element not found!");
              }
            }}
          />
          <Modal
            modalName={"delete"}
            modalLable={"deleteModal"}
            isDisabled={isDisabledButton}
            modalTitle={"Delete"}
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

const DBlogs = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Blog/Educations'} pageName={'Blogs'} />
         {/* <BoxDash content={<>
          <TextEditor />
          </>} /> */}
         <BlogData />
      </div>
    </>} />
  )
}

export default DBlogs