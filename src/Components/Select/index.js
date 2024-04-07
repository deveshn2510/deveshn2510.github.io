import React, { useState } from "react";

const Select = (props) => {
  const { label, options, value, onChange } = props;

  return (
    <div>
      <label
        htmlFor="selectOption"
        style={{ color: "#919192", fontSize: "12px" }}
      >
        {label}
      </label>
      <select
        style={{ marginLeft: "32px" }}
        id="selectOption"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((el) => {
          return <option value={el}>{el}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
