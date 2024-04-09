import { useState } from "react";
import logoMobile from "../images/logo-mobile.svg";

function MobileNavBarLayout({
  data,
  setData,
  setPlatformLaunch,
  setMarkingPlan,
  setRoadmap,
  togglesButtonBoards,
  setTogglesButtonBoards,
  fetchBoardsList,
  setBoardsList,
  boardActivated,
  setBoardActivated,
  allBoard,
  setAllBoard,
  opeAddBoard,
  setOpenAddBoard,
  darkMode,
  setDarkMode,
  setOpenAddTask,
  openAddTask,
  toggleAddNewTask,
  setOpenMenuBoard,
  openMenuBoard,
  setOpenEditBoard,
  openEditBoard,
  setOpenDeleteBoard,
  openDeleteBoard,
}) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  return (
    <>
      <header className="flex flex-row  p-4  gap-4 bg-white dark:bg-third_black dark:text-white">
        <div className="flex mx-auto w-[100%]">
          <a className="" href="">
            <img src={logoMobile} alt="" />
          </a>
          <button
            className="flex items-center gap-2 dropdownMobileMenu"
            onClick={() => {
              if (allBoard) {
                setAllBoard(false);
              } else {
                setAllBoard(true);
              }

              if (activeDropdown) {
                setActiveDropdown(false);
              } else {
                setActiveDropdown(true);
              }
            }}
          >
            <p className="font-bold text-[18px]">Platform Launch</p>
            <figure className={`${!activeDropdown && "rotate-180"}`}>
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
              </svg>
            </figure>
          </button>
          <div className="flex gap-4 ml-auto">
            {/* + button */}
            <button
              type="button"
              disabled={toggleAddNewTask ? false : true}
              onClick={() => {
                setOpenAddTask({ ...openAddTask, isOpen: true });
              }}
              className={` text-white rounded-[24px] hover:bg-second_indigo flex items-center justify-center px-4 ${
                toggleAddNewTask ? "bg-first_indigo" : "bg-second_indigo"
              }`}
            >
              <figure>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#FFF"
                    d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                  />
                </svg>
              </figure>
            </button>
            {/* dots button */}
            <button
              type="button"
              onClick={() => {
                setOpenMenuBoard({ ...openMenuBoard, isOpen: true });
              }}
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
            </button>
            {/* menu board */}
            {openMenuBoard && (
              <div className="menuBoard absolute left-[38%] top-[4rem]  rounded-lg shadow-2xl p-4 bg-white  min-w-[240px] dark:bg-second_black">
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
            )}
          </div>
        </div>

        {/* hidden */}
        <nav
          id="allboards-mobile"
          className={`fixed z-10 ${
            !allBoard && "hidden"
          }  top-[59px] left-0 w-full h-full bg-black/30`}
        >
          <section className="bg-white mt-6 pb-4 rounded-md w-9/12 mx-auto dark:bg-third_black">
            <ul className="flex flex-col">
              <p className="text-[#828FA3] tracking-[2.4px] px-4 py-4 font-bold text-[12px]">
                ALL BOARDS ({data.boards.length})
              </p>
              {/* templates */}
              {fetchBoardsList.map((item, key) => (
                <button
                  key={key}
                  onClick={() => {
                    setBoardActivated({
                      ...boardActivated,
                      boardselected: key,
                    });
                  }}
                  type="button"
                  className={`flex items-center w-11/12 rounded-tr-[2rem] rounded-br-[2rem] gap-4 px-4 py-4 ${
                    boardActivated.boardselected === key ? "bg-first_indigo text-white" : ""
                  } `}
                >
                  <figure>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                        fill={`${boardActivated.boardselected === key ? "#fff" : "#828FA3"}`}
                      />
                    </svg>
                  </figure>
                  <p
                    className={`text-[15px] text-[#828FA3]
                    ${boardActivated.boardselected === key ? " text-white" : "text-[#828FA3]"}`}
                  >
                    {item.name}
                  </p>
                </button>
              ))}

              {/* create new board button */}
              <button
                onClick={() => {
                  setOpenAddBoard({ ...opeAddBoard, isOpen: true });
                }}
                type="button"
                className="flex items-center w-11/12 rounded-tr-[2rem] rounded-br-[2rem] gap-4 px-4 py-4 "
              >
                <figure>
                  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill="#635FC7"
                    />
                  </svg>
                </figure>
                <div className="flex items-center">
                  <figure className="scale-75">
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#635FC7"
                        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      />
                    </svg>
                  </figure>
                  <p className="text-[15px] text-[#635FC7] font-bold">Create New Board</p>
                </div>
              </button>
            </ul>
            {/* toggles */}
            <div className="bg-second_gray rounded-md justify-center gap-7 flex items-center py-4 mx-4 dark:bg-second_black">
              <figure>
                <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                    fill="#828FA3"
                  />
                </svg>
              </figure>
              <button
                onClick={() => {
                  if (darkMode) {
                    setDarkMode(false);
                    localStorage.theme = "light";
                  } else {
                    setDarkMode(true);
                    localStorage.theme = "dark";
                  }
                }}
                className="bg-first_indigo p-1 rounded-xl gap-2 flex"
              >
                <div className={`w-[20px] h-[20px] rounded-full  ${!darkMode && "bg-white"}`}></div>
                <div className={`w-[20px] h-[20px] rounded-full ${darkMode && "bg-white"}`}></div>
              </button>
              <figure>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                    fill="#828FA3"
                  />
                </svg>
              </figure>
            </div>
          </section>
        </nav>
      </header>
    </>
  );
}

export default MobileNavBarLayout;
