import Tile from "../Tile";
import { useNavigate } from "react-router-dom";

const AllPlans = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/txplan/${id}`);
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <div className="p-[24px]">
        <h1 className="text-5xl font-medium mb-4">All TxPlans</h1>
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          <p>
            Unlock the world of web development effortlessly with our innovative
            e-learning courses.
          </p>
          <p>
            Elevate your skills, build a dynamic portfolio, and launch your web
            development or no-code career
          </p>
          <p>
            with our industry-aligned certifications and dedicated job placement
            assistance.
          </p>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Tile
            title="Patient: Johanna Doe"
            description="Details about Johanna's treatment plan"
            onClick={() => handleClick("johanna-doe")}
          />
          <Tile
            title="Patient: Lisa Ann"
            description="Details about Lisa's treatment plan"
            onClick={() => handleClick("lisa-ann-implants")}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default AllPlans;
