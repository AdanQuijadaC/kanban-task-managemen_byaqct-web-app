import { useEffect, useRef, useState } from "react";
// REVISED OK
function TemplateEditBoardLayout({
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
  setOpenEditBoard,
  openEditBoard,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentBoard = boardActivated.boardselected;
  const arrayBoards = data.boards.filter((item) => {
    return item;
  });

  const [editBoard, setEditBoard] = useState({
    name: arrayBoards[currentBoard].name,
    columns: arrayBoards[currentBoard].columns,
  });

  function handleInputsOnChange(e) {
    const { name, value } = e.target;
    setEditBoard({ ...editBoard, [name]: value });
  }

  function handleInputsOnChange2(e, index) {
    const { name, value } = e.target;

    setEditBoard((editBoard) => ({
      ...editBoard,
      columns: editBoard.columns.map((column, i) =>
        i === index ? { ...column, [name]: value } : column
      ),
    }));
  }

  function AddNewColumn() {
    const column = {
      name: "",
      tasks: [],
    };
    editBoard.columns.push(column);
    setEditBoard({ ...editBoard });
  }

  function DeleteColumn(index) {
    const arrayNewColumns = editBoard.columns.filter((item, index2) => {
      return index2 !== index;
    });
    editBoard.columns = arrayNewColumns;
    setEditBoard({ ...editBoard });
  }

  function submitChanges(e) {
    e.preventDefault();

    const checkColumns = editBoard.columns.reduce((acc, value) => {
      if (value.name.trim() == "") {
        acc++;
      }
      return acc;
    }, 0);

    if (checkColumns == 0 && editBoard.name.trim() && editBoard.name !== "") {
      data.boards[currentBoard] = editBoard;
      setData({ ...data });
      setOpenEditBoard({ ...openEditBoard, isOpen: false });
    }

    setIsSubmitted(true);
  }

  return (
    <>
      <section
        onClick={(e) => {
          e.stopPropagation();
          if (!e.target.closest(".modalAddEditBoard")) {
            setOpenEditBoard({ ...openEditBoard, isOpen: false });
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <form
          onSubmit={(e) => submitChanges(e)}
          className="modalAddEditBoard flex flex-col gap-6 w-11/12 mx-auto relative h-max p-4 bg-white max-w-[480px] rounded-lg dark:bg-second_black dark:text-white"
        >
          {/* title edit board */}

          <div className="flex flex-col gap-1 relative">
            <h2 className="text-black font-bold text-[18px] mb-4 dark:text-white">Edit Board</h2>
            <label className="text-[12px] text-[#828FA3] font-bold" htmlFor={"board_name"}>
              Board Name
            </label>
            <input
              className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                isSubmitted && editBoard.name == "" && "border-[#EA5555]"
              } 
                dark:bg-second_black`}
              placeholder={"e.g. Make coffe"}
              type="text"
              id={"board_name"}
              name="name"
              value={editBoard.name}
              onChange={(e) => handleInputsOnChange(e)}
            />
            {/* show error */}
            {isSubmitted && editBoard.name == "" && (
              <div className="absolute bottom-[9px] right-[9px]">
                <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
              </div>
            )}
          </div>

          <div className="flex flex-col max-h-[210px] overflow-y-auto">
            <p className="text-[12px] font-bold text-[#828FA3]">Board Columns</p>

            {/* Inputs boards columns */}

            {editBoard.columns.map((item, index) => (
              <div key={index} className="flex items-center relative gap-5">
                <input
                  name="name"
                  value={editBoard.columns[index].name}
                  onChange={(e) => handleInputsOnChange2(e, index)}
                  className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                    isSubmitted && editBoard.columns[index].name == "" && "border-[#EA5555]"
                  } dark:bg-second_black`}
                  placeholder="e.g. Make coffe"
                />
                <button
                  onClick={() => DeleteColumn(index)}
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

                {isSubmitted && editBoard.columns[index].name == "" && (
                  <div className="absolute bottom-[13px] right-[44px]">
                    <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={AddNewColumn}
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
                Add New Column
              </p>
            </button>
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

export default TemplateEditBoardLayout;
