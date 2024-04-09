import { useEffect, useState } from "react";

/* REVISED OK */

function TemplateViewTaskLayout({
  data,
  setData,
  openViewTask,
  setOpenViewTask,
  refresh,
  setRefresh,
  openDeleteTask,
  setOpenDeleteTask,
  openEditTask,
  setOpenEditTask,
  editSubmitted,
  setEditSubmitted,
  editedTask,
  setEditedTask,
}) {
  const arrayTasks = data.boards[openViewTask.board].columns[openViewTask.column].tasks.filter(
    (item) => {
      return item;
    }
  );

  const [isOpenTaskMenu, setIsOpenTaskMenu] = useState(false);
  const [activedDropdown, setActiveDropdown] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [editViewTask, setEditViewTask] = useState({
    description: arrayTasks[openViewTask.task].description,
    status: arrayTasks[openViewTask.task].status,
    title: arrayTasks[openViewTask.task].title,
    subtasks: arrayTasks[openViewTask.task].subtasks,
  });

  const [targetColumn, setTargetColumn] = useState(() => {
    return data.boards[openViewTask.board].columns.findIndex(
      (item, index) => item.name == editViewTask.status
    );
  });

  function editButtonMenu() {
    setOpenEditTask({ ...openEditTask, isOpen: true });
  }

  function deleteButtonMenu() {
    setOpenDeleteTask({
      ...openDeleteTask,
      isOpen: true,
    });
  }

  function viewTaskMenu(e) {
    if (e.target.closest(".viewTaskMenu")) {
      if (isOpenTaskMenu) {
        setIsOpenTaskMenu(false);
      } else {
        setIsOpenTaskMenu(true);
      }
    } else {
      setIsOpenTaskMenu(false);
    }
  }

  function handleInputs(e) {
    const { name, value } = e.target;
    setEditViewTask({ ...editViewTask, [name]: value });

    const findIndexColumn = data.boards[openViewTask.board].columns.findIndex(
      (item, index) => item.name == value
    );

    setTargetColumn(findIndexColumn);
  }

  function handleCheckBox(index) {
    setEditViewTask((editViewTask) => ({
      ...editViewTask,
      subtasks: editViewTask.subtasks.map((item, index2) => {
        if (index === index2) {
          if (item.isCompleted) {
            return { ...item, isCompleted: false };
          } else {
            return { ...item, isCompleted: true };
          }
        }
        return item;
      }),
    }));
  }

  function selectStatus(e) {
    const value = e.target.dataset.option;
    setEditViewTask({ ...editViewTask, status: value });

    const findIndexColumn = data.boards[openViewTask.board].columns.findIndex(
      (item, index) => item.name == value
    );

    setTargetColumn(findIndexColumn);
  }

  return (
    <>
      <section
        onClick={(e) => {
          e.stopPropagation();
          if (!e.target.closest(".modal")) {
            setOpenViewTask({ ...openViewTask, isOpen: false });

            // checkChanges
            let arrayIndexOld = [];
            let arrayIndexNew = [];

            data.boards[openViewTask.board].columns[openViewTask.column].tasks[
              openViewTask.task
            ].subtasks.forEach((item, index) => {
              if (item.isCompleted) {
                arrayIndexOld.push(index);
              }
            });

            editViewTask.subtasks.forEach((item, index) => {
              if (item.isCompleted) {
                arrayIndexNew.push(index);
              }
            });

            if (
              arrayIndexNew.toString() !== arrayIndexOld.toString() ||
              data.boards[openViewTask.board].columns[openViewTask.column].tasks[openViewTask.task]
                .status == editViewTask.status
            ) {
              data.boards[openViewTask.board].columns[openViewTask.column].tasks[
                openViewTask.task
              ] = editViewTask;
              setData({ ...data });
            } else if (
              arrayIndexNew.toString() !== arrayIndexOld.toString() ||
              data.boards[openViewTask.board].columns[openViewTask.column].tasks[openViewTask.task]
                .status !== editViewTask.status
            ) {
              data.boards[openViewTask.board].columns[openViewTask.column].tasks.splice(
                openViewTask.task,
                1
              );
              data.boards[openViewTask.board].columns[targetColumn].tasks.push(editViewTask);
              setData({ ...data });
            }
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <div
          onClick={(e) => {
            if (e.target.closest(".dropdownViewTask")) {
              if (data.boards[openViewTask.board].columns.length > 1) {
                if (activedDropdown) {
                  setActiveDropdown(false);
                  setIsDropDownOpen(false);
                } else {
                  setActiveDropdown(true);
                  setIsDropDownOpen(true);
                }
              }
            } else {
              setActiveDropdown(false);
              setIsDropDownOpen(false);
            }

            if (e.target.closest(".viewTaskMenu")) {
              if (isOpenTaskMenu) {
                setIsOpenTaskMenu(false);
              } else {
                setIsOpenTaskMenu(true);
              }
            } else {
              setIsOpenTaskMenu(false);
            }
          }}
          className="modal flex flex-col gap-6 w-11/12 mx-auto relative p-4 bg-white max-w-[480px] rounded-lg dark:bg-[#2B2C37] dark:text-white"
        >
          {/* title view task */}
          <div className="flex justify-between gap-4 items-center">
            <h2 className="text-[18px] font-bold">{editViewTask.title}</h2>

            {/* view task menu */}
            <button
              onClick={(e) => viewTaskMenu(e)}
              className="relative px-4 viewTaskMenu"
              type="button"
            >
              <figure>
                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <circle cx="2.308" cy="2.308" r="2.308" />
                    <circle cx="2.308" cy="10" r="2.308" />
                    <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
                </svg>
              </figure>
              {/* menu task */}

              {isOpenTaskMenu && (
                <div className="rounded-lg shadow-2xl p-4 bg-white right-[50%] md:translate-x-[50%] absolute mt-6 top-[100%] min-w-[240px] dark:bg-second_black">
                  <ul className="flex flex-col text-left ">
                    <li className="py-3">
                      <div
                        className="cursor-pointer text-[#828FA3]"
                        onClick={() => editButtonMenu()}
                      >
                        Edit Task
                      </div>
                    </li>
                    <li className="py-3">
                      <div
                        onClick={() => deleteButtonMenu()}
                        className="cursor-pointer text-[#EA5555]"
                      >
                        Delete Task
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
          {/* description view task */}
          <p className="text-[13px] text-[#828FA3] font-medium">{editViewTask.description}</p>

          {/* subtask view task */}
          <div className="flex flex-col">
            <p className="text-[13px] font-bold text-[#828FA3] mb-4 dark:text-white">
              Subtasks (
              {editViewTask.subtasks.length > 0 &&
                editViewTask.subtasks.reduce((acc, item4) => {
                  if (item4.isCompleted) {
                    return acc + 1;
                  } else {
                    return acc;
                  }
                }, 0)}
              {} of {""} {editViewTask.subtasks > 0 ? "" : editViewTask.subtasks.length})
            </p>
            <ul className="flex flex-col gap-2">
              {editViewTask.subtasks.length > 0 &&
                editViewTask.subtasks.map((itemSubtask, index) => (
                  <li key={index}>
                    <button
                      className={`p-3 text-left bg-[#F4F7FD] w-full rounded-[4px]
         hover:bg-[#625fc740] dark:bg-second_black dark:text-first_gray`}
                      onClick={() => handleCheckBox(index)}
                    >
                      <div className="flex flex-row gap-4 items-center">
                        <div
                          className={`h-[16px] w-[16px] min-w-[16px] pb-1 flex items-end justify-center  border-[#828FA3] rounded-[2px] ${
                            itemSubtask.isCompleted
                              ? "bg-first_indigo "
                              : "bg-white dark:bg-first_gray "
                          }`}
                        >
                          {itemSubtask.isCompleted && (
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
                              itemSubtask.isCompleted
                                ? "line-through text-[#00000059] dark:text-first_gray"
                                : " dark:text-white"
                            } "
              `}
                          >
                            {itemSubtask.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          {/* current status view task */}
          <div className="flex flex-col">
            <p className="text-[12px] text-[#828FA3] font-bold mb-2 dark:text-white">
              Current Status
            </p>

            {/* dropdown */}
            <div className="dropdownViewTask flex flex-col gap-1 ">
              <div className="relative inline-block w-full dropdownViewTask">
                <button
                  name="status"
                  onClick={(e) => selectStatus(e)}
                  data-option={editViewTask.status}
                  value={editViewTask.status}
                  type="button"
                  className={`text-left block text-[13px] relative font-medium appearance-none w-full rounded bg-white border border-[#828fa340] hover:border-[#635FC7] outline-none px-4 py-2 pr-8 cursor-pointer ${
                    editViewTask.status == "" && "py-[calc(17.75px)]"
                  } dark:bg-second_black`}
                >
                  {editViewTask.status}
                </button>
                {isDropDownOpen && data.boards[openViewTask.board].columns.length > 1 && (
                  <div className="absolute flex flex-col bg-white border border-[#828fa340] w-full top-[calc(100%+8px)] dark:bg-second_black rounded z-10">
                    {data.boards[openViewTask.board].columns.map((item, index) => {
                      if (item.name != editViewTask.status) {
                        return (
                          <button
                            name="status"
                            value={item.name}
                            type="button"
                            onClick={(e) => selectStatus(e)}
                            data-option={item.name}
                            key={item.name}
                            className="px-4 py-2 text-left text-[13px] font-medium text-[#828FA3] hover:text-black hover:cursor-pointer hover:bg-[#625fc740] dark:bg-second_black dark:hover:text-white"
                          >
                            {item.name}
                          </button>
                        );
                      }
                    })}
                  </div>
                )}

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <figure className={`${activedDropdown ? "rotate-180" : ""}`}>
                    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
                    </svg>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TemplateViewTaskLayout;
