import React, { useEffect, useRef, useState } from "react";
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'
import BoxDash from "../../components/dashboard/BoxDash";
import DataTable from "react-data-table-component";
import Modal from "../../components/dashboard/Modal";
import Toast from "../../components/Toast";
import Select from "react-select";
import StatusOption from "../../../be/options/StatusOption";
import TheadProducts from "../../../be/datatables/TheadProducts";
import ProductsGet from "../../../be/get/ProductsGet";
import FormCreateProducts from "../../components/dashboard/FormCreateProducts";
import FormEditProducts from "../../components/dashboard/FormEditProducts";
import ProductsDelete from "../../../be/delete/ProductsDelete";
import FormDetailProducts from "../../components/dashboard/FormDetailProducts";
import TheadPromo from "../../../be/datatables/TheadPromo";
import PromoGet from "../../../be/get/PromoGet";
import FormCreatePromo from "../../components/dashboard/FormCreatePromo";
import FormEditPromo from "../../components/dashboard/FormEditPromo";
import PromoDelete from "../../../be/delete/PromoDelete";
import FormCreateCode from "../../components/dashboard/FormCreateCode";
import CodeDelete from "../../../be/delete/CodeDelete";
import TheadCode from "../../../be/datatables/TheadCode";
import CodeGet from "../../../be/get/CodeGet";
import FormEditCode from "../../components/dashboard/FormEditCode";

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

const ManagePromoCta = () => {
  return (
    <BoxDash title={"Manage Your Promo Products"} anyOptionBeetwen={<a className="font-style-underline" href="#promo-product">Click here</a>} />
  )
}

const ManageCodePromo = () => {
  return (
    <BoxDash title={"Manage Code Promo"} anyOptionBeetwen={<a className="font-style-underline" href="#code-promo">Click here</a>} />
  )
}

const ProductsData = () => {
  const { ProductsTh } = TheadProducts();
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const formRef = useRef(null);
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = ProductsDelete();
  const { statusOptProducts } = StatusOption();
  const {
    dataProducts,
    dataTableProducts,
    loadProducts,
    dataFilterProducts,
    setSearchProducts,
    searchProducts,
    setFilterProducts,
    filterProducts,
    FetchDataProducts
  } = ProductsGet();

  useEffect(() => {
    setValSelect(statusOptProducts.find(
      (opt) => opt.value === filterProducts.status
    ))
  }, [filterProducts])
  return (
    <BoxDash
      title={"Data Products"}
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchProducts(e.target.value)}
                value={searchProducts}
                placeholder="Search products.."
              />
              <Select
                options={statusOptProducts}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterProducts({ ...filterProducts, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataProducts()
                setFilterProducts({...filterProducts, status: ""})
                setValSelect(null)
                setSearchProducts('')
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
              columns={ProductsTh}
              data={dataFilterProducts}
              pagination
              paginationPerPage={10}
              highlightOnHover
              progressPending={loadProducts}
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
                <FormDetailProducts dataDetail={selectedRow} />
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
                <FormCreateProducts />
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
                <FormEditProducts ref={formRef} dataEdit={selectedRow} />
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


const PromoManagement = () => {
  const { PromoTh } = TheadPromo();
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const formRef = useRef(null);
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = PromoDelete();
  const { statusOptPromo } = StatusOption();
  const {
    dataPromo,
    dataTablePromo,
    loadPromo,
    dataFilterPromo,
    setSearchPromo,
    searchPromo,
    setFilterPromo,
    filterPromo,
    FetchDataPromo
  } = PromoGet();

  useEffect(() => {
    setValSelect(statusOptPromo.find(
      (opt) => opt.value === filterPromo.status
    ))
  }, [filterPromo])
  return (
    <BoxDash
      idAdd={'promo-product'}
      title={"Promo Management"}
      classAdd="mb-4"
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchPromo(e.target.value)}
                value={searchPromo}
                placeholder="Search Promo.."
              />
              <Select
                options={statusOptPromo}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterPromo({ ...filterPromo, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataPromo()
                setFilterPromo({...filterPromo, status: ""})
                setValSelect(null)
                setSearchPromo('')
              }}
            >
              <i className="bi-arrow-clockwise"></i>
            </button>
            <button
              className="btn text-light"
              style={{ background: "#19459D" }}
              data-bs-toggle="modal"
              data-bs-target="#createPromo"
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
                ? { "data-bs-toggle": "modal", "data-bs-target": "#editPromo" }
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
                ? { "data-bs-toggle": "modal", "data-bs-target": "#deletePromo" }
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
              columns={PromoTh}
              data={dataFilterPromo}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadPromo}
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
                <FormDetailProducts dataDetail={selectedRow} />
              </>
            }
          />
          <Modal
            modalName={"createPromo"}
            modalLable={"createModal"}
            modalTitle={"Create"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormCreatePromo />
              </>
            }
            modalConfirmText={"Create"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formCreatePromo");
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
            modalName={"editPromo"}
            modalLable={"editModal"}
            modalTitle={"Edit"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormEditPromo ref={formRef} dataEdit={selectedRow} />
              </>
            }
            modalConfirmText={"Save changes"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formEditPromo");
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
            modalName={"deletePromo"}
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

const CodeManagement = () => {
  const { CodeTh } = TheadCode();
  const [selectedRow, setSelectedRow] = useState([]);
  const [valSelect, setValSelect] = useState(null)
  const formRef = useRef(null);
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const { handleDeleteRow } = CodeDelete();
  const { statusOptCode } = StatusOption();
  const {
    dataCode,
    dataTableCode,
    loadCode,
    dataFilterCode,
    setSearchCode,
    searchCode,
    setFilterCode,
    filterCode,
    FetchDataCode
  } = CodeGet();
  
  useEffect(() => {
    setValSelect(statusOptCode.find(
      (opt) => opt.value === filterCode.status
    ))
  }, [filterCode])
  return (
    <BoxDash
      idAdd={'code-promo'}
      title={"Code Management"}
      classAdd="mb-4"
      anyOptionBeetwen={
        <>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap gap-3">
              <input
                type="text"
                className="form-control w-auto"
                onInput={(e) => setSearchCode(e.target.value)}
                value={searchCode}
                placeholder="Search Code.."
              />
              <Select
                options={statusOptCode}
                className="text-nowrap w-auto"
                styles={customStylesSelect}
                placeholder="Sort By Status.."
                onChange={(item) => {
                  setFilterCode({ ...filterCode, status: item.value });
                }}
                value={valSelect || null}
                required
              />
            </div>
            <button
              className="btn text-light bg-primary"
              onClick={() => {
                FetchDataCode()
                setFilterCode({...filterCode, status: ""})
                setValSelect(null)
                setSearchCode('')
              }}
            >
              <i className="bi-arrow-clockwise"></i>
            </button>
            <button
              className="btn text-light"
              style={{ background: "#19459D" }}
              data-bs-toggle="modal"
              data-bs-target="#createCode"
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
                ? { "data-bs-toggle": "modal", "data-bs-target": "#editCode" }
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
                ? { "data-bs-toggle": "modal", "data-bs-target": "#deleteCode" }
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
              columns={CodeTh}
              data={dataFilterCode}
              pagination
              paginationPerPage={20}
              highlightOnHover
              progressPending={loadCode}
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
            modalName={"createCode"}
            modalLable={"createModal"}
            modalTitle={"Create"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormCreateCode />
              </>
            }
            modalConfirmText={"Create"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formCreateCode");
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
            modalName={"editCode"}
            modalLable={"editModal"}
            modalTitle={"Edit"}
            isDisabled={isDisabledButton}
            modalContent={
              <>
                <FormEditCode ref={formRef} dataEdit={selectedRow} />
              </>
            }
            modalConfirmText={"Save changes"}
            modalConfirmClicked={() => {
              const form = document.getElementById("formEditCode");
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
            modalName={"deleteCode"}
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

const DProducts = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Products'} pageName={'Products'} />
         {/* <ManagePromoCta />
         <ManageCodePromo /> */}
         <ProductsData />
         <PromoManagement />
         <CodeManagement />
      </div>
    </>} />
  )
}

export default DProducts