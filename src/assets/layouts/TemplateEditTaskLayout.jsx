import { useState } from "react";

// REVISED OK
function TemplateEditTaskLayout({
  data,
  setData,
  openViewTask,
  setOpenViewTask,
  setOpenAddTask,
  refresh,
  setRefresh,
  openAddTask,
  boardActivated,
  setOpenEditTask,
  openEditTask,
  editSubmitted,
  setEditSubmitted,
  editedTask,
  setEditedTask,
}) {
  const board = openViewTask.board;
  const column = openViewTask.column;
  const task = openViewTask.task;

  const arrayTask = data.boards[board].columns[column].tasks.filter((item) => {
    return item;
  });
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activedDropdown, setActiveDropdown] = useState(false);
  const [editTask, setEditTask] = useState({
    title: arrayTask[task].title,
    description: arrayTask[task].description,
    status: arrayTask[task].status,
    subtasks: arrayTask[task].subtasks,
  });

  const [targetColumn, setTargetColumn] = useState(() => {
    return data.boards[openViewTask.board].columns.findIndex(
      (item, index) => item.name == editTask.status
    );
  });

  // onChange inputs statics
  function handleInputsOnChange(e, index) {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });

    const findIndexColumn = data.boards[openViewTask.board].columns.findIndex(
      (item, index) => item.name == value
    );

    setTargetColumn(findIndexColumn);
  }

  // onChange inputs dinamic
  function handleInputsOnChange2(e, index) {
    const { name, value } = e.target;

    setEditTask((editTask) => ({
      ...editTask,
      subtasks: editTask.subtasks.map((item, index2) => {
        if (index === index2) {
          return { ...item, [name]: value };
        }
        return item;
      }),
    }));
  }

  // delete task
  function deleteSubTask(index) {
    const arrayFilterSubtasks = editTask.subtasks.filter((item, index2) => {
      return index2 != index;
    });
    editTask.subtasks = arrayFilterSubtasks;
    setEditTask({ ...editTask });
  }

  // add task
  function AddSubTask() {
    const templateSubTask = {
      title: "",
      isCompleted: false,
    };

    setEditTask((editTask) => ({
      ...editTask,
      subtasks: editTask.subtasks.concat(templateSubTask),
    }));
  }

  // submit task
  function handleSubmit(e) {
    e.preventDefault();

    const checkEmptySubtasks = editTask.subtasks.reduce((acc, item) => {
      if (item.title == "") {
        acc++;
      }
      return acc;
    }, 0);

    // submit
    if (editTask.title.trim() != "" && editTask.title !== "" && checkEmptySubtasks == 0) {
      if (data.boards[board].columns[column].tasks[task].status == editTask.status) {
        data.boards[board].columns[column].tasks[task] = editTask;
        setData({ ...data });
        setOpenEditTask({ ...openEditTask, isOpen: false });
        setOpenViewTask({ ...openViewTask, isOpen: false });
      } else if (data.boards[board].columns[column].tasks[task].status !== editTask.status) {
        data.boards[board].columns[column].tasks.splice(task, 1);
        data.boards[board].columns[targetColumn].tasks.push(editTask);
        setData({ ...data });
        setOpenEditTask({ ...openEditTask, isOpen: false });
        setOpenViewTask({ ...openViewTask, isOpen: false });
      }
    }

    setIsSubmitted(true);
  }

  function selectStatus(e) {
    const value = e.target.dataset.option;
    setEditTask({ ...editTask, status: value });

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
          if (!e.target.closest(".modalAddEditTask")) {
            setOpenEditTask({ ...openEditTask, isOpen: false });
            setActiveDropdown(false);
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          onClick={(e) => {
            if (e.target.closest(".dropdownEditTask")) {
              if (activedDropdown) {
                setActiveDropdown(false);
                setIsDropDownOpen(false);
              } else {
                setActiveDropdown(true);
                setIsDropDownOpen(true);
              }
            } else {
              setActiveDropdown(false);
              setIsDropDownOpen(false);
            }
          }}
          className="modalAddEditTask flex flex-col gap-6 w-11/12 mx-auto relative p-4 bg-white max-w-[480px] rounded-lg dark:bg-second_black dark:text-white"
        >
          {/* title edit task */}

          <div className="flex flex-col gap-1 relative">
            <h2 className="text-black font-bold text-[18px] mb-4 dark:text-white">Edit Task</h2>
            <label className="text-[12px] text-[#828FA3] font-bold" htmlFor={"title"}>
              Title
            </label>
            <input
              className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                isSubmitted && editTask.title == "" && "border-[#EA5555]"
              } dark:bg-second_black`}
              placeholder={"e.g. Make coffe"}
              type="text"
              id={"title"}
              name="title"
              value={editTask.title}
              onChange={(e) => handleInputsOnChange(e)}
            />
            {/* show error */}
            {isSubmitted && editTask.title == "" && (
              <div className="absolute bottom-[9px] right-[9px]">
                <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
              </div>
            )}
          </div>

          {/* description edit task */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#828FA3] font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              onChange={(e) => handleInputsOnChange(e)}
              value={editTask.description}
              className="outline-none border-[#828fa340] rounded border font-medium text-[13px]  w-full p-2  placeholder:text-[13px] placeholder:font-medium hover:cursor-pointer hover:border-[#635FC7] dark:bg-second_black"
              id="description"
              cols="30"
              rows="5"
              placeholder="e.g. It's always good to take a break. this 15 minutes break will recharge the batteries a litle."
            ></textarea>
          </div>

          {/* subtask edit task */}
          <div className="flex flex-col max-h-[210px] overflow-y-auto">
            <p className="text-[12px] font-bold text-[#828FA3] dark:text-white">Subtasks</p>

            {/* Inputs subtasks */}

            {editTask.subtasks.length !== 0
              ? editTask.subtasks.map((item2, index2) => (
                  <div key={index2} className="flex items-center relative gap-5">
                    <input
                      name="title"
                      value={editTask.subtasks[index2].title}
                      onChange={(e) => handleInputsOnChange2(e, index2)}
                      className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                        isSubmitted && editTask.subtasks[index2].title == ""
                          ? "border-[#EA5555]"
                          : ""
                      } dark:bg-second_black`}
                      placeholder="e.g. Make coffe"
                    />
                    {/* detele button */}
                    <button
                      onClick={() => deleteSubTask(index2)}
                      className="py-4 text-[#828FA3] hover:text-[#EA5555]"
                      type="button"
                    >
                      <figure>
                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                          <g fill="currentColor" fillRule="evenodd">
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                          </g>
                        </svg>
                      </figure>
                    </button>

                    {isSubmitted && editTask.subtasks[index2].title == "" && (
                      <div className="absolute bottom-[13px] right-[44px]">
                        <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
                      </div>
                    )}
                  </div>
                ))
              : ""}

            <button
              onClick={AddSubTask}
              type="button"
              className="bg-[#625fc71a] text-first_indigo rounded-[20px] hover:bg-[#625fc740] flex items-center justify-center mt-2 dark:bg-white dark:hover:bg-second_gray"
            >
              <figure className="scale-50">
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#635FC7"
                    d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                  />
                </svg>
              </figure>
              <p
                className="font-bold text-[15px]  text-center py-2 
        "
              >
                Add New Subtask
              </p>
            </button>
          </div>
          {/* current status edit task */}
          <div className="flex flex-col">
            <p className="text-[12px] text-[#828FA3] font-bold mb-2 dark:text-white">Status</p>

            {/* dropdown */}
            <div className="dropdownEditTask flex flex-col gap-1">
              <div className="relative inline-block w-full dropdownEditTask">
                <button
                  name="status"
                  onClick={(e) => selectStatus(e)}
                  data-option={editTask.status}
                  value={editTask.status}
                  type="button"
                  className={` text-left block text-[13px] relative font-medium appearance-none w-full rounded bg-white border border-[#828fa340] hover:border-[#635FC7] outline-none px-4 py-2 pr-8 cursor-pointer ${
                    editTask.status == "" && "py-[calc(17.75px)]"
                  } dark:bg-second_black`}
                >
                  {editTask.status}
                </button>
                {isDropDownOpen && (
                  <div className="absolute flex flex-col bg-white border border-[#828fa340] w-full top-[calc(100%+8px)] rounded z-10 dark:bg-second_black">
                    {data.boards[openViewTask.board].columns.map((item, index) => {
                      if (item.name != editTask.status) {
                        return (
                          <button
                            name="status"
                            value={item.name}
                            type="button"
                            onClick={(e) => selectStatus(e)}
                            data-option={item.name}
                            key={item.name}
                            className="px-4 py-2 text-left text-[13px] font-medium text-[#828FA3] hover:text-black hover:cursor-pointer hover:bg-[#625fc740] dark:hover:text-white"
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
          <button
            type="submit"
            className="bg-first_indigo text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8"
          >
            <p className="font-medium text-[15px] text-center py-2">Save Changes</p>
          </button>
        </form>
      </section>
    </>
  );
}

export default TemplateEditTaskLayout;
