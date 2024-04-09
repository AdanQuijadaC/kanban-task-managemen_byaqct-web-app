import { useEffect, useState } from "react";

function Checkbox({
  data,
  setData,
  indexCheckBox,
  subtaskName,
  subtaskIsCompleted,
  setNewData,
  openViewTask,
  newData,
  refresh,
  setRefresh,
}) {
  const [dataSubtasksShort] = useState(
    data.boards[openViewTask.board].columns[openViewTask.column].tasks[
      openViewTask.task
    ].subtasks
  );

  return (
    <>
      <button
        className={`p-3 bg-[#F4F7FD] w-full rounded-[4px]
         hover:bg-[rgba(98,95,199,0.25)]`}
        onClick={(e) => {
          dataSubtasksShort.map((item, index) => {
            if (!refresh) {
              setRefresh(true);
            } else {
              setRefresh(false);
            }

            if (indexCheckBox == index) {
              if (dataSubtasksShort[index].isCompleted) {
                console.log("clicked on index " + index);

                // update
                dataSubtasksShort[index].isCompleted = false;
                setData(data);
                localStorage.setItem("kanbanData", JSON.stringify(data));
              } else {
                console.log("clicked on index " + index);

                // update
                dataSubtasksShort[index].isCompleted = true;
                setData(data);
                localStorage.setItem("kanbanData", JSON.stringify(data));
              }
            }
          });
        }}
      >
        <div className="flex flex-row gap-4 items-center">
          <div
            className={`h-[16px] w-[16px] pb-1 flex items-end justify-center  border-[#828FA3] rounded-[2px] ${
              subtaskIsCompleted ? "bg-first_indigo" : "bg-white "
            }`}
          >
            {subtaskIsCompleted && (
              <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#FFF"
                  strokeWidth="2"
                  fill="none"
                  d="m1.276 3.066 2.756 2.756 5-5"
                />
              </svg>
            )}
          </div>

          <div>
            <p
              className={`font-bold text-[12px] ${
                subtaskIsCompleted ? "line-through text-[#00000059]" : ""
              } "
              `}
            >
              {subtaskName}
            </p>
          </div>
        </div>
      </button>
    </>
  );
}

export default Checkbox;
