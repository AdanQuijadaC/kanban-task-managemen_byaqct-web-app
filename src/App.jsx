import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import logoMobile from "./assets/images/logo-mobile.svg";
import MobileNavBarLayout from "./assets/layouts/MobileNavBarLayout";
import ButtonPrimaryS from "./assets/components/buttons/ButtonPrimaryS";
import ButtonPrimaryL from "./assets/components/buttons/ButtonPrimaryL";
import TabletNavbarLayout from "./assets/layouts/TabletNavbarLayout";
import dataJSON from "./data.json";
import Checkbox from "./assets/components/checkboxes/Checkbox";
import DropDown from "./assets/components/dropdown/DropDown";
import MenuTask from "./assets/components/MenuTask";
import TemplateViewTaskLayout from "./assets/layouts/TemplateViewTaskLayout";
import TemplateAddTaskLayout from "./assets/layouts/TemplateAddTaskLayout";
import TemplateAddNewBoardLayout from "./assets/layouts/TemplateAddNewBoardLayout";
import TemplateDeleteTask from "./assets/layouts/TemplateDeleteTask";
import TemplateDeleteBoard from "./assets/layouts/TemplatedDeleteBoard";
import TemplateMenuBoard from "./assets/layouts/TemplateMenuBoard";
import TemplateEditTaskLayout from "./assets/layouts/TemplateEditTaskLayout";
import TemplateEditBoardLayout from "./assets/layouts/TemplateEditBoardLayout";

function App() {
  const [data, setData] = useState([]);
  const arrayColorsColumns = ["bg-[#49C4E5]", "bg-first_indigo", "bg-[#67E2AE]"];
  const [togglesButtonBoards, setTogglesButtonBoards] = useState([]);
  const [allBoard, setAllBoard] = useState(false);
  const [headerLayout, setHeaderLayout] = useState({
    mobile: "",
    tablet: "",
    desktop: "",
  });

  const [fetchBoardsList, setBoardsList] = useState([]);
  const [boardActivated, setBoardActivated] = useState({
    boardselected: 0,
  });

  const [editSubmitted, setEditSubmitted] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  const [openViewTask, setOpenViewTask] = useState({
    isOpen: false,
    board: null,
    column: null,
    task: null,
  });

  const [openMenuBoard, setOpenMenuBoard] = useState(false);

  const [openEditTask, setOpenEditTask] = useState({
    isOpen: false,
  });

  const [openAddTask, setOpenAddTask] = useState({
    isOpen: false,
  });

  const [openAddBoard, setOpenAddBoard] = useState({
    isOpen: false,
  });

  const [openDeleteTask, setOpenDeleteTask] = useState({
    isOpen: false,
  });

  const [openDeleteBoard, setOpenDeleteBoard] = useState({
    isOpen: false,
  });

  const [openEditBoard, setOpenEditBoard] = useState({
    isOpen: false,
  });

  const [refresh, setRefresh] = useState(false);
  const [toggleAddNewTask, setToggleAddNewTask] = useState(true);

  const [toggleSidebar, setToggleSidebar] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const kanbanData = localStorage.getItem("kanbanData");

    if (!kanbanData) {
      localStorage.setItem("kanbanData", JSON.stringify(dataJSON));
      setData(dataJSON);
    } else {
      setData(JSON.parse(kanbanData));
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }

    if (typeof data === "object") {
      if (data.hasOwnProperty("boards")) {
        const myItem = data.boards.map((item) => {
          return item;
        });

        // all boards list
        setBoardsList(myItem);
        setTogglesButtonBoards(data.boards.map((item) => ({ boardname: item.name })));

        if (data.boards.length < 1) {
          setToggleAddNewTask(false);
        } else {
          if (data.boards[boardActivated.boardselected].columns.length < 1) {
            setToggleAddNewTask(false);
          } else {
            setToggleAddNewTask(true);
          }
        }

        localStorage.setItem("kanbanData", JSON.stringify(data));
      }
    }
  }, [data, refresh, boardActivated, toggleAddNewTask, editedTask, darkMode]); // Run when data changes

  useEffect(() => {
    //resize
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 525) {
        setHeaderLayout({
          ...headerLayout,
          mobile: true,
          tablet: false,
          desktop: false,
        });
      } else if (windowWidth > 525) {
        setHeaderLayout({
          ...headerLayout,
          mobile: false,
          tablet: true,
          desktop: false,
        });
        setAllBoard(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="bg-[#F4F7FD] min-h-screen flex flex-col  sm:flex sm:flex-row dark:bg-second_black"
        onClick={(e) => {
          if (!openMenuBoard) {
            if (e.target.closest(".menuBoard")) {
              setOpenMenuBoard(true);
            }
          } else {
            setOpenMenuBoard(false);
          }
        }}
      >
        {/* DESKTOP LAYOUT */}
        {/* TABLE LAYOUT */}
        {headerLayout.tablet && toggleSidebar && (
          <TabletNavbarLayout
            data={data}
            setData={setData}
            setTogglesButtonBoards={setTogglesButtonBoards}
            togglesButtonBoards={togglesButtonBoards}
            fetchBoardsList={fetchBoardsList}
            setBoardsList={setBoardsList}
            boardActivated={boardActivated}
            setBoardActivated={setBoardActivated}
            openAddBoard={openAddBoard}
            setOpenAddBoard={setOpenAddBoard}
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          ></TabletNavbarLayout>
        )}

        {/* MOBILE LAYOUT */}
        {headerLayout.mobile && (
          <MobileNavBarLayout
            data={data}
            setData={setData}
            allBoard={allBoard}
            setAllBoard={setAllBoard}
            setTogglesButtonBoards={setTogglesButtonBoards}
            togglesButtonBoards={togglesButtonBoards}
            boardActivated={boardActivated}
            setBoardActivated={setBoardActivated}
            fetchBoardsList={fetchBoardsList}
            openAddBoard={openAddBoard}
            setOpenAddBoard={setOpenAddBoard}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setOpenAddTask={setOpenAddTask}
            openAddTask={openAddTask}
            toggleAddNewTask={toggleAddNewTask}
            openMenuBoard={openMenuBoard}
            setOpenEditBoard={setOpenEditBoard}
            setOpenMenuBoard={setOpenMenuBoard}
            openDeleteBoard={openDeleteBoard}
            setOpenDeleteBoard={setOpenDeleteBoard}
          ></MobileNavBarLayout>
        )}

        <main className={`p-4  h-full  sm:p-0 sm:w-full sm:h-min dark:bg-[#20212C]`}>
          {/* top nav */}
          {!toggleSidebar && headerLayout.tablet && (
            <header className="w-full flex justify-between bg-white dark:bg-third_black">
              <div className="pl-4 pb-4 pt-4 pr-2 sm:border-r-[2px] sm:border-b-[2px] sm:border-[#97979744]  lg:w-3/12">
                <a className="" href="">
                  <figure className="translate-y-1">
                    <svg
                      className="text-black dark:text-white"
                      width="153"
                      height="26"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z"
                          fill="currentColor"
                          fillRule="nonzero"
                        />
                        <g transform="translate(0 1)" fill="#635FC7">
                          <rect width="6" height="25" rx="2" />
                          <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                          <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                        </g>
                      </g>
                    </svg>
                  </figure>
                </a>
              </div>

              <section
                className={`bg-white p-4 w-full flex justify-between items-center sm:border-b-[2px] sm:border-[#97979744] ${
                  toggleSidebar && "hidden"
                } dark:bg-third_black dark:text-white`}
              >
                <h1 className="text-[20px] font-bold">
                  <p>
                    {data.hasOwnProperty("boards") && data.boards.length !== 0
                      ? data.boards[boardActivated.boardselected].name
                      : ""}
                  </p>
                </h1>
                <div className="flex gap-4 items-center">
                  <button
                    disabled={toggleAddNewTask ? false : true}
                    onClick={() => {
                      setOpenAddTask({ ...openAddTask, isOpen: true });
                    }}
                    className={` text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8 ${
                      toggleAddNewTask ? "bg-first_indigo" : "bg-second_indigo"
                    }`}
                  >
                    <figure className="scale-50">
                      <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill="#fff"
                          d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                        />
                      </svg>
                    </figure>
                    <p className="font-medium text-[15px] text-center py-2">Add New Task</p>
                  </button>

                  {/* elipse button */}
                  <button
                    onClick={() => {
                      setOpenMenuBoard({ ...openMenuBoard, isOpen: true });
                    }}
                    type="button"
                    className="px-4 menuBoard relative"
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
                    {/* template menu board */}

                    {openMenuBoard && (
                      <TemplateMenuBoard
                        openMenuBoard={openMenuBoard}
                        setOpenMenuBoard={setOpenMenuBoard}
                        openDeleteBoard={openDeleteBoard}
                        setOpenDeleteBoard={setOpenDeleteBoard}
                        openEditBoard={openEditBoard}
                        setOpenEditBoard={setOpenEditBoard}
                      ></TemplateMenuBoard>
                    )}
                  </button>
                </div>
              </section>
              <section className="pl-4 left-0 absolute bottom-[82px]">
                {/* toggles */}

                <button
                  onClick={() => {
                    setToggleSidebar(true);
                  }}
                  type="button"
                  className="flex px-4 py-3 text-[#828FA3] bg-first_indigo  rounded-tr-[2rem] rounded-br-[2rem] gap-2 items-center hover:bg-second_indigo hover:text-[#635FC7] translate-x-[-1rem] "
                >
                  <figure>
                    <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                        fill="#FFF"
                      />
                    </svg>
                  </figure>
                </button>
              </section>
            </header>
          )}

          {headerLayout.tablet && data.hasOwnProperty("boards") && data.boards.length !== 0 && (
            <section
              className={`bg-white p-4 flex justify-between items-center sm:border-b-[2px] sm:border-[#97979744] ${
                !toggleSidebar && "hidden"
              } dark:bg-[#2B2C37]
              `}
            >
              <h1 className="text-[20px] font-bold dark:text-white">
                <p>
                  {data.hasOwnProperty("boards") && data.boards.length !== 0
                    ? data.boards[boardActivated.boardselected].name
                    : ""}
                </p>
              </h1>
              <div className="flex gap-4 items-center">
                <button
                  disabled={toggleAddNewTask ? false : true}
                  onClick={() => {
                    setOpenAddTask({ ...openAddTask, isOpen: true });
                  }}
                  className={` text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8 ${
                    toggleAddNewTask ? "bg-first_indigo" : "bg-second_indigo"
                  }`}
                >
                  <figure className="scale-50">
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#fff"
                        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      />
                    </svg>
                  </figure>
                  <p className="font-medium text-[15px] text-center py-2">Add New Task</p>
                </button>

                {/* elipse button */}
                <button
                  onClick={() => {
                    setOpenMenuBoard({ ...openMenuBoard, isOpen: true });
                  }}
                  type="button"
                  className="px-4 menuBoard relative"
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
                  {/* template menu board */}

                  {openMenuBoard && (
                    <TemplateMenuBoard
                      openMenuBoard={openMenuBoard}
                      setOpenMenuBoard={setOpenMenuBoard}
                      openDeleteBoard={openDeleteBoard}
                      setOpenDeleteBoard={setOpenDeleteBoard}
                      openEditBoard={openEditBoard}
                      setOpenEditBoard={setOpenEditBoard}
                    ></TemplateMenuBoard>
                  )}
                </button>
              </div>
            </section>
          )}

          {/* dashboard empty*/}
          {data.hasOwnProperty("boards")
            ? data.boards.length > 0
              ? data.boards[boardActivated.boardselected].columns.length == 0 && (
                  <section className="absolute top-[46%] flex flex-col gap-4 sm:absolute sm:left-[46%] sm:top-[46%] sm:w-max ">
                    <div className="w-8/12 mx-auto">
                      <p className="text-center text-[18px] text-[#828FA3]">
                        This board is empty. Create a new column to get started.
                      </p>
                    </div>
                    <div className="w-full flex">
                      <button
                        onClick={() => {
                          setOpenEditBoard({ ...openEditBoard, isOpen: true });
                        }}
                        type="button"
                        className="bg-first_indigo mx-auto text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-8"
                      >
                        <figure className="scale-50">
                          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="#fff"
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
                  </section>
                )
              : ""
            : ""}

          {/* dashboard with data */}

          {data.hasOwnProperty("boards") ? (
            boardActivated.boardselected != null && data.boards.length > 0 ? (
              <section className={"w-full sm:p-4"}>
                <div className="flex gap-6 overflow-x-auto">
                  {data.boards[boardActivated.boardselected].columns.map((item2, index2) => (
                    // columns

                    <div
                      key={uuidv4()}
                      className="flex flex-col gap-6 w-full min-w-[280px] sm:min-w-min sm:flex-wrap lg:max-w-[360px]"
                    >
                      <div className="flex items-center gap-4">
                        <figure
                          className={`h-[15px] w-[15px] rounded-full ${
                            arrayColorsColumns[index2 % arrayColorsColumns.length]
                          }`}
                        ></figure>

                        <p className="text-[#828FA3] text-[12px] font-bold tracking-[2.4px] uppercase">
                          {` ${item2.name} (${item2.tasks.length})`}
                        </p>
                      </div>
                      {/* template todo item */}
                      {data.boards[boardActivated.boardselected].columns[index2].tasks.map(
                        (item3, index3) => (
                          <button
                            key={index3}
                            onClick={() => {
                              setOpenViewTask({
                                ...openViewTask,
                                board: boardActivated.boardselected,
                                column: index2,
                                task: index3,
                                isOpen: true,
                              });
                            }}
                            type="button"
                            className="bg-white text-left p-4 font-bold rounded-md shadow-lg hover:text-[#635FC7] dark:bg-[#2B2C37] dark:text-white dark:hover:text-first_indigo"
                          >
                            <div className="flex flex-col gap-2">
                              <p className="text-[15px] font-semibold">{item3.title}</p>
                              <p className="text-[#828FA3] text-[12px]">
                                {item3.hasOwnProperty("subtasks") &&
                                  item3.subtasks.reduce((acc, item4) => {
                                    if (item4.isCompleted) {
                                      return acc + 1;
                                    } else {
                                      return acc;
                                    }
                                  }, 0)}
                                {} of {item3.hasOwnProperty("subtasks") && item3.subtasks.length}
                              </p>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  ))}

                  {data.boards[boardActivated.boardselected].columns.length >= 1 && (
                    <button
                      onClick={() => {
                        setOpenEditBoard({ ...openEditBoard, isOpen: true });
                      }}
                      type="button"
                      className="bg-[#E9EFFA] text-[#828FA3] rounded-md w-full h-[calc(100vh-145px)] min-w-[280px] sm:min-w-min sm:flex-wrap lg:max-w-[360px] mt-[40px] dark:bg-[#2B2C37] dark:hover:text-first_indigo hover:text-first_indigo"
                    >
                      <div className="flex items-center justify-center">
                        <figure className="scale-100">
                          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="currentColor"
                              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                            />
                          </svg>
                        </figure>
                        <p
                          className="font-bold text-[24px]  text-center py-2 dark:hover:text-first_indigo 
        "
                        >
                          Add New Column
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              </section>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </main>

        {/* template view task */}

        {openViewTask.board != null &&
          openViewTask.column != null &&
          openViewTask.task != null &&
          openViewTask.isOpen == true && (
            <TemplateViewTaskLayout
              openViewTask={openViewTask}
              setOpenViewTask={setOpenViewTask}
              data={data}
              setData={setData}
              setRefresh={setRefresh}
              refresh={refresh}
              openDeleteTask={openDeleteBoard}
              setOpenDeleteTask={setOpenDeleteTask}
              openEditTask={openEditTask}
              setOpenEditTask={setOpenEditTask}
              editSubmitted={editSubmitted}
              setEditSubmitted={setEditSubmitted}
              editedTask={editedTask}
              setEditedTask={setEditedTask}
            ></TemplateViewTaskLayout>
          )}

        {/* template add task */}
        {openAddTask.isOpen && (
          <TemplateAddTaskLayout
            data={data}
            setData={setData}
            openAddTask={openAddTask}
            setOpenAddTask={setOpenAddTask}
            boardActivated={boardActivated}
          ></TemplateAddTaskLayout>
        )}

        {/* template add column */}
        {openAddBoard.isOpen && (
          <TemplateAddNewBoardLayout
            data={data}
            setData={setData}
            openAddBoard={openAddBoard}
            setOpenAddBoard={setOpenAddBoard}
            openViewTask={openViewTask}
            setOpenViewTask={setOpenViewTask}
          ></TemplateAddNewBoardLayout>
        )}

        {/* templated delete task */}
        {openDeleteTask.isOpen && (
          <TemplateDeleteTask
            openDeleteTask={openDeleteTask}
            setOpenDeleteTask={setOpenDeleteTask}
            openViewTask={openViewTask}
            setOpenViewTask={setOpenViewTask}
            data={data}
            setData={setData}
          ></TemplateDeleteTask>
        )}

        {/* template delete board */}
        {openDeleteBoard.isOpen && (
          <TemplateDeleteBoard
            openDeleteTask={openDeleteTask}
            setOpenDeleteTask={setOpenDeleteTask}
            openViewTask={openViewTask}
            setOpenViewTask={setOpenViewTask}
            data={data}
            setData={setData}
            boardActivated={boardActivated}
            setBoardActivated={setBoardActivated}
            openDeleteBoard={openDeleteBoard}
            setOpenDeleteBoard={setOpenDeleteBoard}
          ></TemplateDeleteBoard>
        )}

        {/* template edit task */}
        {openEditTask.isOpen && (
          <TemplateEditTaskLayout
            data={data}
            setData={setData}
            openEditTask={openEditTask}
            setOpenEditTask={setOpenEditTask}
            openViewTask={openViewTask}
            setOpenViewTask={setOpenViewTask}
            refresh={refresh}
            setRefresh={setRefresh}
            editSubmitted={editSubmitted}
            setEditSubmitted={setEditSubmitted}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
          ></TemplateEditTaskLayout>
        )}

        {/* template edit board */}
        {openEditBoard.isOpen && (
          <TemplateEditBoardLayout
            refresh={refresh}
            setRefresh={setRefresh}
            data={data}
            setData={setData}
            openEditBoard={openEditBoard}
            setOpenEditBoard={setOpenEditBoard}
            boardActivated={boardActivated}
          ></TemplateEditBoardLayout>
        )}
      </div>
    </>
  );
}

export default App;
