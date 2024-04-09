import { useEffect, useRef, useState } from "react";
// REVISED OK
function TemplateAddTaskLayout({
  data,
  setData,
  openViewTask,
  setOpenViewTask,
  setOpenAddTask,
  refresh,
  setRefresh,
  openAddTask,
  boardActivated,
}) {
  const arrayOldSubtask = data.boards[boardActivated.boardselected].columns.filter((item) => {
    return item;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activedDropdown, setActiveDropdown] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [createNewTask, setCreateNewTask] = useState({
    title: "",
    description: "",
    status: "",
    subtasks: [],
  });
  const [column, setColumn] = useState();

  function handleInputsStatic(e) {
    const { name, value } = e.target;
    setCreateNewTask({ ...createNewTask, [name]: value });
  }

  function handleInputsDinamic(e, index) {
    const { name, value } = e.target;
    setCreateNewTask((createNewTask) => ({
      ...createNewTask,
      subtasks: createNewTask.subtasks.map((item, index2) => {
        if (index === index2) {
          return { ...item, [name]: value };
        }
        return { ...item };
      }),
    }));
  }

  function addSubTask() {
    const addSubTask = {
      title: "",
      isCompleted: false,
    };
    createNewTask.subtasks.push(addSubTask);
    setCreateNewTask({ ...createNewTask });
  }

  function deleteSubtask(index) {
    const arraySubTasks = createNewTask.subtasks.filter((item, index2) => {
      return index !== index2;
    });

    createNewTask.subtasks = arraySubTasks;
    setCreateNewTask({ ...createNewTask });
  }

  function selectStatus(e) {
    const value = e.target.dataset.option;
    setCreateNewTask({ ...createNewTask, status: value });

    arrayOldSubtask.forEach((item, index) => {
      if (item.name == value && item.name !== createNewTask.title) {
        setColumn(index);
      }
    });
  }

  function CreateTaskSubmit(e) {
    e.preventDefault();
    const checkSubtasks = createNewTask.subtasks.reduce((acc, value) => {
      if (value.title.trim() == "" || createNewTask.subtasks.length == 0) {
        acc++;
      }

      return acc;
    }, 0);

    if (
      checkSubtasks == 0 &&
      createNewTask.title.trim() &&
      createNewTask.title !== "" &&
      createNewTask.status !== ""
    ) {
      data.boards[boardActivated.boardselected].columns[column].tasks.push(createNewTask);

      setData({ ...data });
      setOpenAddTask({ ...openAddTask, isOpen: false });
    }
    setIsSubmitted(true);
  }

  return (
    <>
      <section
        onClick={(e) => {
          //   e.stopPropagation();
          if (!e.target.closest(".modalAddNewTask")) {
            setOpenAddTask({ ...openAddTask, isOpen: false });
            setActiveDropdown(false);
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <form
          onClick={(e) => {
            if (e.target.closest(".dropdownAddTask")) {
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
          onSubmit={(e) => CreateTaskSubmit(e)}
          className="modalAddNewTask flex flex-col gap-6 w-11/12 mx-auto relative  p-4 bg-white max-w-[480px] rounded-lg dark:text-white dark:bg-second_black"
        >
          {/* title add task */}

          <div className="flex flex-col gap-1 relative">
            <h2 className="mb-4 text-[18px] font-bold">Add New Task</h2>
            <label className="text-[12px] text-[#828FA3] font-bold" htmlFor={"title"}>
              {"Title"}
            </label>
            <input
              className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                isSubmitted &&
                createNewTask.title == "" &&
                "border-[#EA5555] hover:border-[#EA5555]"
              } 
                dark:bg-second_black`}
              name={"title"}
              placeholder={"e.g. Take coffe break"}
              type="text"
              id={"title"}
              value={createNewTask.title}
              onChange={(e) => handleInputsStatic(e)}
            />
            {/* show error */}
            {isSubmitted && createNewTask.title == "" && (
              <div className="absolute bottom-[9px] right-[9px]">
                <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
              </div>
            )}
          </div>

          {/* description view task */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#828FA3] font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              className="outline-none border-[#828fa340] rounded border font-medium text-[13px]  w-full p-2  placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] dark:bg-second_black"
              id="description"
              cols="30"
              rows="5"
              name="description"
              onChange={(e) => handleInputsStatic(e)}
              value={createNewTask.description}
              placeholder="e.g. It's always good to take a break. this 15 minutes break will recharge the batteries a litle."
            ></textarea>
          </div>

          {/* subtask add task */}
          <div className="flex flex-col max-h-[210px] overflow-y-auto">
            <p className="text-[12px] font-bold text-[#828FA3]">Subtasks</p>

            {createNewTask.subtasks.length > 0
              ? createNewTask.subtasks.map((item, index) => (
                  <div key={index} className="flex items-center gap-5 relative">
                    <input
                      onChange={(e) => handleInputsDinamic(e, index)}
                      className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2  placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                        isSubmitted &&
                        createNewTask.subtasks[index].title == "" &&
                        "border-[#EA5555] hover:border-[#EA5555]"
                      } dark:bg-second_black`}
                      placeholder="e.g. Make coffe"
                      name="title"
                      value={createNewTask.subtasks[index].title}
                    />
                    <button
                      onClick={() => deleteSubtask(index)}
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
                    {isSubmitted && createNewTask.subtasks[index].title == "" && (
                      <div className="absolute bottom-[13px] right-[44px]">
                        <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
                      </div>
                    )}
                  </div>
                ))
              : ""}
            <button
              type="button"
              onClick={() => addSubTask()}
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
          {/* current status add task */}
          <div className="flex flex-col">
            <p className="text-[12px] text-[#828FA3] font-bold mb-2">Status</p>
            {/* dropdown */}
            <div className="dropdownAddTask flex flex-col gap-1">
              <div className="relative inline-block w-full dropdownEditTask">
                <button
                  name="status"
                  onClick={(e) => selectStatus(e)}
                  data-option={createNewTask.status}
                  value={createNewTask.status}
                  type="button"
                  className={`text-left block text-[13px] relative font-medium appearance-none w-full rounded bg-white border border-[#828fa340] hover:border-[#635FC7] outline-none px-4 py-2 pr-8 cursor-pointer ${
                    createNewTask.status == "" && "py-[calc(17.75px)]"
                  } dark:bg-second_black`}
                >
                  {createNewTask.status}
                </button>
                {isDropDownOpen && (
                  <div className="absolute flex flex-col bg-white border border-[#828fa340] w-full top-[calc(100%+8px)] dark:bg-second_black rounded z-10 ">
                    <button
                      name="status"
                      value={""}
                      type="button"
                      onClick={(e) => selectStatus(e)}
                      data-option={""}
                      className={`px-4 text-left text-[13px] font-medium text-[#828FA3] hover:text-black hover:cursor-pointer hover:bg-[#625fc740] py-[calc(17.75px)] dark:bg-second_black
                      dark:hover:text-white`}
                    >
                      {""}
                    </button>
                    {arrayOldSubtask.map((item, index) => {
                      if (item.name != createNewTask.status) {
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
            className="bg-first_indigo text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8 "
          >
            <p className="font-medium text-[15px] text-center py-2">Create Task</p>
          </button>
        </form>
      </section>
    </>
  );
}

export default TemplateAddTaskLayout;
