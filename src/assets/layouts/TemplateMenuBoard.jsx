// REVISED OK
function TemplateMenuBoard({
  openDeleteBoard,
  setOpenDeleteBoard,
  openMenuBoard,
  setOpenMenuBoard,
  openEditBoard,
  setOpenEditBoard,
}) {
  return (
    <>
      <div className="menuBoard  rounded-lg shadow-2xl p-4 bg-white right-[50%] absolute mt-6 top-[100%] min-w-[240px] dark:bg-second_black">
        <ul className="flex flex-col text-left ">
          <li className="py-3">
            <div
              className="cursor-pointer menuBoard text-[#828FA3]"
              onClick={() => {
                setOpenMenuBoard({ ...openMenuBoard, isOpen: false });
                setOpenEditBoard({ ...openEditBoard, isOpen: true });
              }}
            >
              Edit Board
            </div>
          </li>
          <li className="py-3">
            <div
              onClick={() => {
                setOpenDeleteBoard({ ...openDeleteBoard, isOpen: true });
                setOpenMenuBoard({ ...openMenuBoard, isOpen: false });
              }}
              className="menuBoard cursor-pointer text-[#EA5555]"
            >
              Delete Board
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TemplateMenuBoard;
