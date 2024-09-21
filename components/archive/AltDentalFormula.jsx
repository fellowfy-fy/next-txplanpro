import React from "react";

// зубы
import tooth11 from "../assets/allteeth/tooth11.svg";
import tooth12 from "../assets/allteeth/tooth12.svg";
import tooth13 from "../assets/allteeth/tooth13.svg";
import tooth14 from "../assets/allteeth/tooth14.svg";
import tooth15 from "../assets/allteeth/tooth15.svg";
import tooth16 from "../assets/allteeth/tooth16.svg";
import tooth17 from "../assets/allteeth/tooth17.svg";
import tooth18 from "../assets/allteeth/tooth18.svg";
import tooth21 from "../assets/allteeth/tooth21.svg";
import tooth22 from "../assets/allteeth/tooth22.svg";
import tooth23 from "../assets/allteeth/tooth23.svg";
import tooth24 from "../assets/allteeth/tooth24.svg";
import tooth25 from "../assets/allteeth/tooth25.svg";
import tooth26 from "../assets/allteeth/tooth26.svg";
import tooth27 from "../assets/allteeth/tooth27.svg";
import tooth28 from "../assets/allteeth/tooth28.svg";
import tooth31 from "../assets/allteeth/tooth31.svg";
import tooth32 from "../assets/allteeth/tooth32.svg";
import tooth33 from "../assets/allteeth/tooth33.svg";
import tooth34 from "../assets/allteeth/tooth34.svg";
import tooth35 from "../assets/allteeth/tooth35.svg";
import tooth36 from "../assets/allteeth/tooth36.svg";
import tooth37 from "../assets/allteeth/tooth37.svg";
import tooth38 from "../assets/allteeth/tooth38.svg";
import tooth41 from "../assets/allteeth/tooth41.svg";
import tooth42 from "../assets/allteeth/tooth42.svg";
import tooth43 from "../assets/allteeth/tooth43.svg";
import tooth44 from "../assets/allteeth/tooth44.svg";
import tooth45 from "../assets/allteeth/tooth45.svg";
import tooth46 from "../assets/allteeth/tooth46.svg";
import tooth47 from "../assets/allteeth/tooth47.svg";
import tooth48 from "../assets/allteeth/tooth48.svg";

// коронки
import c11 from "../assets/koronki/c11.svg";
import c12 from "../assets/koronki/c12.svg";
import c13 from "../assets/koronki/c13.svg";
import c14 from "../assets/koronki/c14.svg";
import c15 from "../assets/koronki/c15.svg";
import c16 from "../assets/koronki/c16.svg";
import c17 from "../assets/koronki/c17.svg";
import c18 from "../assets/koronki/c18.svg";
import c21 from "../assets/koronki/c21.svg";
import c22 from "../assets/koronki/c22.svg";
import c23 from "../assets/koronki/c23.svg";
import c24 from "../assets/koronki/c24.svg";
import c25 from "../assets/koronki/c25.svg";
import c26 from "../assets/koronki/c26.svg";
import c27 from "../assets/koronki/c27.svg";
import c28 from "../assets/koronki/c28.svg";
import c31 from "../assets/koronki/c31.svg";
import c32 from "../assets/koronki/c32.svg";
import c33 from "../assets/koronki/c33.svg";
import c34 from "../assets/koronki/c34.svg";
import c35 from "../assets/koronki/c35.svg";
import c36 from "../assets/koronki/c36.svg";
import c37 from "../assets/koronki/c37.svg";
import c38 from "../assets/koronki/c38.svg";
import c41 from "../assets/koronki/c41.svg";
import c42 from "../assets/koronki/c42.svg";
import c43 from "../assets/koronki/c43.svg";
import c44 from "../assets/koronki/c44.svg";
import c45 from "../assets/koronki/c45.svg";
import c46 from "../assets/koronki/c46.svg";
import c47 from "../assets/koronki/c47.svg";
import c48 from "../assets/koronki/c48.svg";

// прочие элементы
import desnaverh from "../assets/diagnosis/desnaverh.svg";
import desnaniz from "../assets/diagnosis/desnaniz.svg";
import implan_niz from "../assets/diagnosis/implan_niz.svg";
import implant_verh from "../assets/diagnosis/implant_verh.svg";
import caries_kornya from "../assets/diagnosis/caries_kornya.svg";
import treshina_kornya from "../assets/diagnosis/treshina_kornya.svg";
import short_zub_verh from "../assets/diagnosis/short_zub_verh.svg";
import short_zub_niz from "../assets/diagnosis/short_zub_niz.svg";
import recession_verh_big from "../assets/diagnosis/recession_verh_big.svg";
import recession_verh_small from "../assets/diagnosis/recession_verh_small.svg";
import recession_niz_big from "../assets/diagnosis/recession_niz_big.svg";
import recession_niz_small from "../assets/diagnosis/recession_niz_small.svg";

const DentalFormula = ({ handleTabChange }) => {
  const handleNext = () => {
    handleTabChange("2 - Guidelines");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-4 rounded-xl border border-neutral-300 relative">
        <h2 className="text-lg font-medium mb-4">
          Fill in patient's dental formula
        </h2>

        <div className="relative mb-4">
          <img
            src={desnaverh}
            alt="desnaverh"
            className="absolute w-full top-[69px]"
          />

          <div className="flex flex-wrap justify-center">
            <img
              src={tooth18}
              alt="tooth18"
              className="h-[135px] mt-[-5px] mr-[-5px]"
            />
            <img
              src={tooth17}
              alt="tooth17"
              className="h-[145px] mt-[-7px] mr-[-3px]"
            />
            <img
              src={tooth16}
              alt="tooth16"
              className="h-[145px] mt-[3px] ml-[-3px]"
            />
            <img
              src={tooth15}
              alt="tooth15"
              className="h-[135px] mt-[17px] ml-[-3px]"
            />
            <img
              src={tooth14}
              alt="tooth14"
              className="h-[160px] mt-[-8px] ml-[-3px]"
            />
            <img
              src={tooth13}
              alt="tooth13"
              className="h-[185px] mt-[-24px] ml-[-2px]"
            />
            <img
              src={tooth12}
              alt="tooth12"
              className="h-[150px] mt-[1px] ml-[-2px]"
            />
            <img
              src={tooth11}
              alt="tooth11"
              className="h-[155px] mt-[-1px] mx-[-2px]"
            />

            <img
              src={tooth21}
              alt="tooth21"
              className="h-[155px] mt-[-1px] mx-[-2px]"
            />
            <img
              src={tooth22}
              alt="tooth22"
              className="h-[150px] mt-[1px] mr-[-2px] "
            />
            <img
              src={tooth23}
              alt="tooth23"
              className="h-[185px] mt-[-24px] mr-[-2px]"
            />
            <img
              src={tooth24}
              alt="tooth24"
              className="h-[160px] mt-[-8px] mr-[-3px]"
            />
            <img
              src={tooth25}
              alt="tooth25"
              className="h-[135px] mt-[17px] mr-[-3px]"
            />
            <img
              src={tooth26}
              alt="tooth26"
              className="h-[145px] mt-[3px] mr-[-3px]"
            />
            <img
              src={tooth27}
              alt="tooth27"
              className="h-[145px] mt-[-7px] ml-[-3px]"
            />
            <img
              src={tooth28}
              alt="tooth28"
              className="h-[135px] mt-[-5px] ml-[-5px]"
            />
          </div>
        </div>

        <div className="relative mb-4">
          <img
            src={desnaniz}
            alt="desnaniz"
            className="absolute w-full top-10"
          />

          <div className="flex flex-wrap flex-row-reverse justify-center">
            <img
              src={tooth38}
              alt="tooth38"
              className="h-[125px] mt-[6px] ml-[-10px]"
            />
            <img
              src={tooth37}
              alt="tooth37"
              className="h-[135px] mt-[10px] ml-[-9px]"
            />
            <img
              src={tooth36}
              alt="tooth36"
              className="h-[155px] mt-[15px] ml-[-3px]"
            />
            <img
              src={tooth35}
              alt="tooth35"
              className="h-[150px] mt-[24px] ml-[-5px]"
            />
            <img
              src={tooth34}
              alt="tooth34"
              className="h-[160px] mt-[20px] ml-[-19px]"
            />
            <img
              src={tooth33}
              alt="tooth33"
              className="h-[167px] mt-[24px] mr-[17px] ml-[-4px]"
            />
            <img
              src={tooth32}
              alt="tooth32"
              className="h-[155px] mt-[32px] ml-[-2px]"
            />
            <img
              src={tooth31}
              alt="tooth31"
              className="h-[152px] mt-[30px] ml-[-2px]"
            />

            <img
              src={tooth41}
              alt="tooth41"
              className="h-[152px] mt-[30px] mr-[-2px]"
            />
            <img
              src={tooth42}
              alt="tooth42"
              className="h-[155px] mt-[32px] mr-[-2px]"
            />
            <img
              src={tooth43}
              alt="tooth43"
              className="h-[167px] mt-[24px] ml-[17px] mr-[-4px]"
            />
            <img
              src={tooth44}
              alt="tooth44"
              className="h-[160px] mt-[20px] mr-[-19px]"
            />
            <img
              src={tooth45}
              alt="tooth45"
              className="h-[150px] mt-[24px] mr-[-3px]"
            />
            <img
              src={tooth46}
              alt="tooth46"
              className="h-[155px] mt-[15px] mr-[-3px]"
            />
            <img
              src={tooth47}
              alt="tooth47"
              className="h-[135px] mt-[10px] mr-[-9px]"
            />
            <img
              src={tooth48}
              alt="tooth48"
              className="h-[125px] mt-[6px] mr-[-10px]"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-4">
          <img src={c18} alt="c18" className="h-[50px]" />
          <img src={c17} alt="c17" className="h-[50px]" />
          <img src={c16} alt="c16" className="h-[50px]" />
          <img src={c15} alt="c15" className="h-[50px]" />
          <img src={c14} alt="c14" className="h-[50px]" />
          <img src={c13} alt="c13" className="h-[50px]" />
          <img src={c12} alt="c12" className="h-[50px]" />
          <img src={c11} alt="c11" className="h-[50px]" />
          <img src={c21} alt="c21" className="h-[50px]" />
          <img src={c22} alt="c22" className="h-[50px]" />
          <img src={c23} alt="c23" className="h-[50px]" />
          <img src={c24} alt="c24" className="h-[50px]" />
          <img src={c25} alt="c25" className="h-[50px]" />
          <img src={c26} alt="c26" className="h-[50px]" />
          <img src={c27} alt="c27" className="h-[50px]" />
          <img src={c28} alt="c28" className="h-[50px]" />
        </div>

        <div className="flex flex-wrap mb-4">
          <img src={c38} alt="c38" className="h-[50px]" />
          <img src={c37} alt="c37" className="h-[50px]" />
          <img src={c36} alt="c36" className="h-[50px]" />
          <img src={c35} alt="c35" className="h-[50px]" />
          <img src={c34} alt="c34" className="h-[50px]" />
          <img src={c33} alt="c33" className="h-[50px]" />
          <img src={c32} alt="c32" className="h-[50px]" />
          <img src={c31} alt="c31" className="h-[50px]" />
          <img src={c41} alt="c41" className="h-[50px]" />
          <img src={c42} alt="c42" className="h-[50px]" />
          <img src={c43} alt="c43" className="h-[50px]" />
          <img src={c44} alt="c44" className="h-[50px]" />
          <img src={c45} alt="c45" className="h-[50px]" />
          <img src={c46} alt="c46" className="h-[50px]" />
          <img src={c47} alt="c47" className="h-[50px]" />
          <img src={c48} alt="c48" className="h-[50px]" />
        </div>

        <div className="flex flex-wrap mb-4">
          <img src={implan_niz} className="h-[50px]" />
          <img src={implant_verh} className="h-[50px]" />
          <img src={caries_kornya} className="h-[50px]" />
          <img src={treshina_kornya} className="h-[50px]" />
          <img src={short_zub_verh} className="h-[50px]" />
          <img src={short_zub_niz} className="h-[50px]" />
          <img src={recession_verh_big} className="h-[50px]" />
          <img src={recession_niz_big} className="h-[50px]" />
          <img src={recession_verh_small} className="h-[50px]" />
          <img src={recession_niz_small} className="h-[50px]" />
        </div>

        <p className="text-gray-600 mb-4">
          1 - Click on the buttons to choose the right current status for the
          tooth or several teeth.
          <br />2 - Click on every tooth to change its status. You can choose
          several teeth at once to set the same status for them.
        </p>
        <button
          className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
          onClick={handleNext}
        >
          Save Dental Formula
        </button>
      </div>
    </div>
  );
};

export default DentalFormula;
