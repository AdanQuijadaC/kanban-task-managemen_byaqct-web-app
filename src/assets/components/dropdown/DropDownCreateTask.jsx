import { useState } from "react";

function DropDownCreateTask({
  data,
  boardActivated,
  activedDropdown,
  setActiveDropdown,
  href,
}) {
  const [defaultItem, setDefaultItem] = useState("");
  const dataTaskDropdownListShort =
    data.boards[boardActivated.boardselected].columns;
  //   console.log(dataTaskDropdownListShort);
  const handleChange = (e) => {
    setDefaultItem(e.target.value);
  };
  return (
    <>
      <div className="dropdownViewTask flex flex-col gap-1">
        <div className="relative">
          <select
            ref={href}
            value={defaultItem}
            onChange={handleChange}
            className="block text-[13px] dropdown font-medium appearance-none w-full bg-white border border-[#828fa340] hover:border-[#635FC7] outline-none px-4 py-2 pr-8 cursor-pointer rounded"
          >
            <option
              className="text-[13px] dropdown font-medium text-[#828FA3]"
              value={""}
            >
              {""}
            </option>
            {dataTaskDropdownListShort.map((item, index) => (
              <option
                key={item.name}
                className="text-[13px] dropdown font-medium text-[#828FA3]"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
            <figure className={`${activedDropdown ? "rotate-180" : ""}`}>
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDownCreateTask;
