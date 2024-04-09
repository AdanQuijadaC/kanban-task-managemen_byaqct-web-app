import React, { useState } from "react";
import iconArrow from "../../images/icon-chevron-down.svg";
function DropDown({
  data,
  setData,
  openViewTask,
  refresh,
  setRefresh,
  targetColumn,
  setTargetColumn,
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [activedDropdown, setActiveDropdown] = useState(false);
  const [dataTaskDropdownStatusShort] = useState(
    data.boards[openViewTask.board].columns[openViewTask.column].tasks[
      openViewTask.task
    ].status
  );
  const [dataTaskDropdownListShort] = useState(
    data.boards[openViewTask.board].columns
  );

  const [dataTaskShort] = useState(
    data.boards[openViewTask.board].columns[openViewTask.column].tasks
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setTargetColumn(event.target.value);

    if (!refresh) {
      setRefresh(true);
    } else {
      setRefresh(false);
    }
    data.boards[openViewTask.board].columns[openViewTask.column].tasks[
      openViewTask.task
    ].status = event.target.value;
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="relative">
          <select
            value={selectedValue}
            onChange={handleChange}
            onClick={() => {
              // console.log("clicked on select");
              if (!activedDropdown) {
                setActiveDropdown(true);
              } else {
                setActiveDropdown(false);
              }
            }}
            className="block text-[13px] font-medium appearance-none w-full bg-white border border-[#828fa340] hover:border-[#635FC7] outline-none px-4 py-2 pr-8 cursor-pointer rounded"
          >
            <option
              key={dataTaskDropdownStatusShort}
              className="text-[13px] font-medium text-[#828FA3]"
              value={dataTaskDropdownStatusShort}
            >
              {dataTaskDropdownStatusShort}
            </option>
            {dataTaskDropdownListShort.map((item, index) => (
              <option
                key={item.name}
                className="text-[13px] font-medium text-[#828FA3]"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
            <img
              className={`${!activedDropdown && "rotate-180"}`}
              src={iconArrow}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDown;
