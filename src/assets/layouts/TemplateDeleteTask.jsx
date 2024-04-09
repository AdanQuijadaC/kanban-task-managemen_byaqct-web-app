import { useEffect, useRef, useState } from "react";

// REVISED OK

function TemplateDeleteTask({
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
  openDeleteTask,
  setOpenDeleteTask,
}) {
  function deleteTask(e) {
    e.preventDefault();

    data.boards[openViewTask.board].columns[openViewTask.column].tasks.splice(openViewTask.task, 1);

    setData({ ...data });
    setOpenViewTask({ ...openViewTask, isOpen: false });
    setOpenDeleteTask({ ...openDeleteTask, isOpen: false });
  }
  return (
    <>
      <section
        onClick={(e) => {
          //   e.stopPropagation();
          if (!e.target.closest(".modalDeleteTask")) {
            setOpenDeleteTask({ ...openDeleteTask, isOpen: false });
          }
        }}
        className="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      >
        <form className="modalDeleteTask flex flex-col gap-6 w-11/12 mx-auto relative  p-4 bg-white max-w-[480px] rounded-lg dark:bg-second_black">
          {/* title board*/}

          <h3 className="text-[18px] text-[#EA5555] font-bold">Delete this task?</h3>

          {/* description */}
          <p className="text-[#828FA3] text-[13px] font-medium">
            Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This
            action cannot be reversed.
          </p>
          {/*buttons  */}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => deleteTask(e)}
              className="bg-first_red text-white rounded-[20px] hover:bg-second_red w-full"
            >
              <p className="font-bold text-[13px]  text-center py-2 px-6">Delete</p>
            </button>
            <button
              onClick={() => {
                setOpenDeleteTask({ ...openDeleteTask, isOpen: false });
              }}
              type="button"
              className="bg-[#625fc71a] text-first_indigo rounded-[20px] hover:bg-[#625fc740] flex items-center justify-center dark:bg-white dark:hover:bg-second_gray w-full"
            >
              <p
                className="font-bold text-[13px]  text-center py-2 
        "
              >
                Cancel
              </p>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default TemplateDeleteTask;
