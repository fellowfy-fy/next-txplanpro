import Tile from "../Tile";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import ClinicPhotosUpload from "./ClinicPhotosUpload";
import StaticText from "../StaticText";
import Prices from "../Prices";

const Settings = () => {
  const { auth } = useAuth();
  const [selectedTile, setSelectedTile] = useState(null);

  const renderComponent = () => {
    switch (selectedTile) {
      case "Clinic Photos":
        return <ClinicPhotosUpload />;
      case "Static Texts":
        return <StaticText />;
      case "Prices":
        return <Prices />;
      default:
        return null;
    }
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <div className="p-[24px]">
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          Upload Your clinic specific photos and information to be used in Your
          treatment plans templates
        </h1>
        <h1 className="text-5xl font-medium mb-4">Dr. {auth.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Tile
            title="Clinic Photos"
            description="Interior and exterior photos of clinic"
            onClick={() => setSelectedTile("Clinic Photos")}
          />
          <Tile
            title="Static Texts"
            description="Describe your clinic and your care"
            onClick={() => setSelectedTile("Static Texts")}
          />
          <Tile
            title="Prices"
            description="Add Your prices here"
            onClick={() => setSelectedTile("Prices")}
          />
        </div>
        <div className="mt-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Settings;
