import React, { useState } from 'react'

const Modal = ({modalName, modalLable, modalContent, modalTitle, modalConfirmClicked, cancelButton = true, confirmButton = true, isDisabled = false, modalConfirmText, customClass}) => {
  return (
    <div className={`modal fade text-satoshi h-auto ${customClass}`} id={modalName} tabIndex={-1} aria-labelledby={modalLable} aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title text-satoshi fs-5" id={modalLable}>{modalTitle}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
            {modalContent}
        </div>
        <div className="modal-footer">
            <button type="button" style={{display: cancelButton ? "flex" : "none"}} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" style={{display: confirmButton ? "flex" : "none"}} disabled={isDisabled} className="btn btn-primary" onClick={modalConfirmClicked}>{modalConfirmText}</button>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Modal