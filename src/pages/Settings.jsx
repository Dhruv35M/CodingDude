import plateforms from "../shared/plateformsList";
import PlateformCard from "../components/PlateformCard";
import plateformImage from "../shared/GetPlateformImage";

const Settings = () => {
  // geting already selected plateforms
  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));

  // toggle user selection
  const toggleCheckBox = (name, updatedStatus) => {
    selectedSites[name]
      ? (selectedSites[name] = false)
      : (selectedSites[name] = true);
    localStorage.setItem("selected_sites", JSON.stringify(selectedSites));
  };

  return (
    <>
      <div className="fixed-menu">
        <h2>Plateforms</h2>
      </div>
      <div className="plateform-list">
        {plateforms.map((plateform) => (
          <PlateformCard
            key={plateform.name}
            url={plateform.url}
            imgUrl={plateformImage(plateform.name)}
            name={plateform.name}
            isChecked={selectedSites[plateform.name]}
            toggleCheckBox={toggleCheckBox}
          />
        ))}
      </div>
    </>
  );
};

export default Settings;
