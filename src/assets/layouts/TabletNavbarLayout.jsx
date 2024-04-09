import { useState } from "react";

function TabletNavbarLayout({
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
  opeAddBoard,
  setOpenAddBoard,
  setToggleSidebar,
  toggleSidebar,
  darkMode,
  setDarkMode,
}) {
  return (
    <>
      <header className="w-6/12 pb-4 dark:bg-[#2B2C37] pr-4 min-h-screen flex flex-col bg-white sm:border-r-[2px] sm:border-[#97979744] lg:w-3/12">
        <a className="pl-4 pt-4 " href="">
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
        <nav id="allboards-tablet" className={`w-full h-full flex flex-col `}>
          <section className="mt-6 flex flex-col ">
            <ul className="flex flex-col">
              <p className="text-[#828FA3] tracking-[2.4px] px-4 py-4 font-bold text-[12px]">
                ALL BOARDS ({fetchBoardsList.length})
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
                  className={`flex font-bold items-center text-[#828FA3] w-11/12 rounded-tr-[2rem] rounded-br-[2rem] gap-4 px-4 py-2 ${
                    boardActivated.boardselected === key
                      ? "bg-first_indigo text-white"
                      : " hover:bg-[rgba(98,95,199,0.14)] hover:text-[#635FC7] dark:hover:bg-white"
                  } `}
                >
                  <figure>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                        fill={`${boardActivated.boardselected === key ? "#fff" : "currentColor"}`}
                      />
                    </svg>
                  </figure>
                  <p
                    className={`text-[15px] text-[#currentColor]
                    ${
                      boardActivated.boardselected === key ? " text-white" : "text-[#currentColor]"
                    }`}
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
                className="flex items-center w-11/12 rounded-tr-[2rem] rounded-br-[2rem] gap-4 px-4 py-2 "
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
          </section>
          {/* toggle dark mode */}
          <section className="mt-auto mb-10 pl-4 sticky bottom-20">
            {/* toggles */}
            <div className="bg-second_gray rounded-md justify-center gap-7 flex items-center py-2 mb-6 dark:bg-[#20212C]">
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
                type="button"
                className="bg-first_indigo p-1 rounded-xl gap-2 flex hover:bg-second_indigo"
              >
                <div className={`w-[14px] h-[14px] rounded-full ${!darkMode && "bg-white"}`}></div>
                <div className={`w-[14px] h-[14px] rounded-full ${darkMode && "bg-white"}`}></div>
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
            <button
              onClick={() => {
                setToggleSidebar(false);
              }}
              type="button"
              className="flex px-4 py-2 text-[#828FA3]  rounded-tr-[2rem] rounded-br-[2rem] gap-2 w-[calc(100%+1rem)] items-center hover:bg-[rgba(98,95,199,0.14)] hover:text-[#635FC7] translate-x-[-1rem] dark:hover:bg-white"
            >
              <figure>
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    fill="currentColor"
                  />
                </svg>
              </figure>
              <p className="text-[#currentColor] text-[15px] font-bold">Hide Sidebar</p>
            </button>
          </section>
        </nav>
      </header>
    </>
  );
}

export default TabletNavbarLayout;
