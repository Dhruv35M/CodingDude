import React, { useState } from "react";

function PlateformCard({ name, url, imgUrl, isChecked, toggleCheckBox }) {
  const [checked, setChecked] = useState(isChecked);

  const togglePlateforms = (e) => {
    checked === true ? setChecked(false) : setChecked(true);
    checked === true ? toggleCheckBox(name, false) : toggleCheckBox(name, true);
  };

  return (
    <div className="plateform-container">
      <div className="contest-logo-heading">
        <a href={url} target="_blank" className="link">
          <img src={imgUrl} alt="contest-image" className="plateform-logo" />
          <h3 className="plateform-name">{name}</h3>
        </a>
      </div>

      <div className="plateform-checkbox">
        <input
          type="checkbox"
          className="checkbox"
          value={checked}
          checked={checked}
          onChange={(e) => togglePlateforms(e)}
        />
      </div>
    </div>
  );
}

export default PlateformCard;
