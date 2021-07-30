import React from "react";
import "./Checkboxes.css";

const Checkboxes = (props) => {
  const { type, name, types, onChangeType } = props;

  const listCheckboxes = types.map((e, i) => (
    <label key={i} className="containerLabel">
      <input
        type="checkbox"
        name={name}
        checked={type === e.value}
        onChange={() => onChangeType(e.value)}
      />
      <span className="textLabel">{e.name}</span>
    </label>
  ));

  return <div className="containerListCheckboxes">{listCheckboxes}</div>;
};

export default Checkboxes;
