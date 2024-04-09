function ButtonPrimaryL({
  text,
  setOpenAddTask,
  openAddTask,
  tag,
  data,
  satData,
  setBoardActivated,
  boardActivated,
}) {
  return (
    <>
      <button
        disabled={
          data.boards[boardActivated.boardselected].columns.lenght > 0
            ? true
            : false
        }
        onClick={() => {
          setOpenAddTask({ ...openAddTask, isOpen: true });
        }}
        className="bg-first_indigo text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8"
      >
        {tag}
        <p className="font-medium text-[15px] text-center py-2">
          {text ? text : "Button Primary L"}
        </p>
      </button>
    </>
  );
}

export default ButtonPrimaryL;
