import React from "react";

const Price = ({ title, textType = "danger" }) => {
  return (
    <div className={`text-${textType}`}>
      <b> {`${title} ₺`}</b>
    </div>
  );
};

export default Price;
