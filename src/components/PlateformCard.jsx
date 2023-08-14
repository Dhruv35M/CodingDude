import { useState } from "react";

function PlateformCard({ name, url, imgUrl, isChecked, toggleCheckBox }) {
  const [checked, setChecked] = useState(isChecked);

  const togglePlateforms = () => {
    const updatedCheckbox = !checked;
    setChecked(updatedCheckbox);
    toggleCheckBox(name, updatedCheckbox);
  };

  return (
    <div className="plateform-container">
      <div className="contest-logo-heading">
        <a
          href={url}
          target="_blank"
          className="link"
          rel="noopener noreferrer"
        >
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
          onChange={togglePlateforms}
        />
      </div>
    </div>
  );
}

export default PlateformCard;
