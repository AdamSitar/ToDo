import React from "react";

export type TFilterOption = "checked" | "unchecked";

interface IFilterButtonProps {
  filterState: (TFilterOption | undefined)[];
  setFilterState: React.Dispatch<
    React.SetStateAction<(TFilterOption | undefined)[]>
  >;
}

const FilterButtons: React.FC<IFilterButtonProps> = ({
  filterState,
  setFilterState,
}) => {
  const toggle = (type: TFilterOption) => {
    filterState.find((item) => item === type)
      ? setFilterState(filterState.filter((item) => item !== type))
      : setFilterState([...filterState, type]);
  };

  const getButtonColor = (type: TFilterOption): string => {
    const lightGray = "text-gray-300";
    const darkGrey = "text-gray-700";
    return filterState.find((item) => item === type)
      ? darkGrey
      : lightGray;
  };

  return (
    <div className="flex flex-row mt-2">
      <button
        className={`border rounded rounded-r-none border-r-0 p-1 ${getButtonColor(
          "checked"
        )}`}
        onClick={() => toggle("checked")}
      >
        Checked
      </button>
      <button
        className={`border rounded rounded-l-none p-1 ${getButtonColor(
          "unchecked"
        )}`}
        onClick={() => toggle("unchecked")}
      >
        Unchecked
      </button>
    </div>
  );
};

export default FilterButtons;
