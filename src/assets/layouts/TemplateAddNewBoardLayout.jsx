import { useEffect, useRef, useState } from "react";
// REVISED OK
function TemplateAddNewBoardLayout({
  data,
  setData,
  openViewTask,
  setOpenViewTask,
  setOpenAddTask,
  refresh,
  setRefresh,
  openAddTask,
  boardActivated,
  openAddBoard,
  setOpenAddBoard,
}) {
  const [addNewBoard, setAddNewBoard] = useState({
    name: "",
    columns: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInputsStatic(e) {
    const { name, value } = e.target;
    setAddNewBoard({ ...addNewBoard, [name]: value });
  }

  function handleInputsDinamic(e, index) {
    const { name, value } = e.target;
    setAddNewBoard((addNewBoard) => ({
      ...addNewBoard,
      columns: addNewBoard.columns.map((item, index2) => {
        if (index === index2) {
          return { ...item, [name]: value };
        }
        return item;
      }),
    }));
  }

  function addColumn() {
    const addNewColumn = {
      name: "",
      tasks: [],
    };

    addNewBoard.columns.push(addNewColumn);
    setAddNewBoard({ ...addNewBoard });
  }

  function deleteColumn(index) {
    const arrayColumns = addNewBoard.columns.filter((item, index2) => {
      return index !== index2;
    });

    addNewBoard.columns = arrayColumns;
    setAddNewBoard({ ...addNewBoard });
  }

  function newBoardSubmit(e) {
    e.preventDefault();
    const checkColumns = addNewBoard.columns.reduce((acc, value) => {
      if (value.name.trim() == "") {
        acc++;
      }
      return acc;
    }, 0);

    if (checkColumns == 0 && addNewBoard.name.trim() != "" && addNewBoard.name !== "") {
      data.boards.push(addNewBoard);
      setData({ ...data });
      setOpenAddBoard({ ...openAddBoard, isOpen: false });
    }
    setIsSubmitted(true);
  }

  return (
    <>
      <section
        onClick={(e) => {
          if (!e.target.closest(".modalAddNewBoard")) {
            setOpenAddBoard({ ...openAddBoard, isOpen: false });
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <form
          onSubmit={(e) => newBoardSubmit(e)}
          className="modalAddNewBoard flex flex-col gap-6 w-11/12 mx-auto relative  p-4 bg-white max-w-[480px] rounded-lg dark:bg-second_black dark:text-white"
        >
          {/* title board*/}
          <div className="flex flex-col gap-1 relative">
            <h2 className="text-[18px] font-bold mb-4">Add New Board</h2>
            <label
              className="text-[12px] text-[#828FA3] font-bold dark:text-white"
              htmlFor={"boardname"}
            >
              Board Name
            </label>
            <input
              onChange={(e) => handleInputsStatic(e)}
              className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2 placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                isSubmitted && addNewBoard.name == "" && "border-[#EA5555]"
              } 
                dark:bg-second_black`}
              name={"name"}
              value={addNewBoard.name}
              placeholder={"e.g. Web Design"}
              type="text"
              id={"boardname"}
            />
            {/* show error */}
            {isSubmitted && addNewBoard.name == "" && (
              <div className="absolute bottom-[9px] right-[9px]">
                <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
              </div>
            )}
          </div>
          {/*boards columns  */}
          <div className="flex flex-col max-h-[210px] overflow-y-auto">
            <p className="text-[12px] font-bold text-[#828FA3] dark:text-white">Board Columns</p>

            {addNewBoard.columns.length > 0
              ? addNewBoard.columns.map((item, index) => (
                  <div key={index} className="flex items-center gap-5 relative">
                    <input
                      onChange={(e) => handleInputsDinamic(e, index)}
                      className={`outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2  placeholder:text-[13px] placeholder:font-medium focus:border-[#635FC7] hover:cursor-pointer hover:border-[#635FC7] ${
                        isSubmitted && addNewBoard.columns[index].name == "" && "border-[#EA5555]"
                      } dark:bg-second_black`}
                      placeholder="e.g. Todo"
                      name="name"
                      value={addNewBoard.columns[index].name}
                    />
                    <button
                      onClick={() => deleteColumn(index)}
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
                    {isSubmitted && addNewBoard.columns[index].name == "" && (
                      <div className="absolute bottom-[13px] right-[44px]">
                        <p className="text-[#EA5555] font-medium text-[13px]">Can't be empty</p>
                      </div>
                    )}
                  </div>
                ))
              : ""}
            <button
              onClick={() => addColumn()}
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
          <button className="bg-first_indigo text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8">
            <p className="font-medium text-[15px] text-center py-2">Create New Board</p>
          </button>
        </form>
      </section>
    </>
  );
}

export default TemplateAddNewBoardLayout;
