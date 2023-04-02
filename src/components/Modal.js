import React from "react";

const Modal = ({
  title = "",
  description = "",
  closeBtnText = "Kapat",
  closeBtnType="danger",
  confirmBtnText = "Onayla",
  confirmBtnType="success",
  hasConfirmBtn = "false",
  visible = "false",
  closeBtnClick=()=>{},
  confirmBtnClick=()=>{}
}) => {
  if (visible !== "true") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "50%",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{description}</p>
        <div className="d-flex justify-content-center gap-2 my-3">
          <button onClick={closeBtnClick} className={`btn btn-${closeBtnType}`}>{closeBtnText}</button>
          {hasConfirmBtn === "true" && (
            <button onClick={confirmBtnClick} className={`btn btn-${confirmBtnType}`}>{confirmBtnText}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
