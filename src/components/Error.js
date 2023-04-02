import React from "react";

const Error = () => {
  return (
    <div  style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
		backgroundColor:"rgba(0,0,0,0.3)",
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
      }}>
      <div className="alert alert-warning" role="alert">
        Sayfa Yüklenirken hata oluştu.
      </div>
    </div>
  );
};

export default Error;
