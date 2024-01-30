"use client";

export interface Drug {
  id: bigint;
  name: string;
  quantity?: number;
  patientId?: string;
}

export interface DrugsProps {
  drugs: Drug[];
  isSelectable?: boolean;
  setDrugs?: (id: bigint) => void;
  selectedDrugs?: bigint[];
}

const Drugs = ({
  drugs,
  isSelectable,
  setDrugs,
  selectedDrugs,
}: DrugsProps) => {
  return (
    <div className="flex gap-1 flex-row flex-wrap">
      {drugs.map((drug: Drug, index: number) => (
        <div
          onClick={() => setDrugs?.(drug.id)}
          key={index}
          className={` ${isSelectable ? "cursor-pointer" : ""} ${
            isSelectable
              ? selectedDrugs?.includes(drug.id)
                ? "border-[#E9EDDE] text-[#E9EDDE] hover:before:content-['-'] hover:before:mr-2 before:w-0 hover:before:w-full hover:before:transition-all hover:before:text-md transition duration-200 ease-in-out"
                : " hover:before:content-['+'] hover:before:mr-2 before:w-0 hover:before:w-full hover:before:transition-all hover:before:text-md transition duration-1000 ease-in-out"
              : ""
          }  border-2 border-solid rounded-lg border-[#18283A] bg-[#0B131D] py-1 px-3 text-[#BBD1EA]`}
        >
          {drug.name}
        </div>
      ))}
    </div>
  );
};

export default Drugs;
