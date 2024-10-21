function PlateformCard({ name, url, imgUrl, isChecked, toggleCheckBox }) {
  return (
    <div className="plateform-container">
      <div className="contest-logo-heading" title="go to website">
        <a
          href={url}
          target="_blank"
          className="link"
          rel="noopener noreferrer"
        >
          <img
            src={imgUrl}
            alt="contest-image"
            draggable={false}
            loading="lazy"
            className="plateform-logo"
          />
          <h3 className="plateform-name">{name}</h3>
        </a>
      </div>

      <div className="checkbox-wrapper-8">
        <input
          type="checkbox"
          className="tgl tgl-skewed"
          id={name}
          checked={isChecked}
          onChange={() => toggleCheckBox(name)}
        />
        <label
          className="tgl-btn"
          data-tg-off="OFF"
          data-tg-on="ON"
          htmlFor={name}
        ></label>
      </div>
    </div>
  );
}

export default PlateformCard;
