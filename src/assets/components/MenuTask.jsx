function MenuTask({
  data,
  setData,
  openViewTask,
  setOpenedTaskMenu,
  openDeleteTask,
  setOpenDeleteTask,
  openEditTask,
  setOpenEditTask,
}) {
  return (
    <>
      <div className="rounded-lg shadow-2xl p-4 bg-white right-[50%] md:translate-x-[50%] absolute mt-6 top-[100%] min-w-[240px]">
        <ul className="flex flex-col text-left ">
          <li className="py-3">
            <div
              className="cursor-pointer text-[#828FA3]"
              onClick={() => {
                console.log("clicked on edit task");
                setOpenEditTask({ ...openEditTask, isOpen: true });
              }}
            >
              Edit Task
            </div>
          </li>
          <li className="py-3">
            <div
              onClick={() => {
                console.log("clicked on delete task");
                setOpenDeleteTask({ ...openDeleteTask, isOpen: true });
              }}
              className="cursor-pointer text-[#EA5555]"
            >
              Delete Task
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuTask;
