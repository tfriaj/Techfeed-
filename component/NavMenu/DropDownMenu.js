import Link from "next/dist/client/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import NavMenu from "../../config/menu.json";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropDownMenu = ({ isOpen, toggle }) => {
  const [isDropdown, setDropDown] = useState(false);
  const { header } = NavMenu;
  const NavElement = header;
  const handleDropdown = () => {
    toggle();
    if (isDropdown) {
      setDropDown(!isDropdown);
    }
  };

  return (
    <div
      className={
        isOpen
          ? "transition-all duration-700 ease-in-out text-center visible opacity-100  border-b h-auto border-borderColor text-textColor"
          : "invisible opacity-0 h-0 "
      }
    >
      <header className=" transition-all duration-700 ease-in-out flex justify-center items-center py-8">
        <div className="text-center ">
          <h1 className="menuButton text-textColor" onClick={handleDropdown}>
            <AiOutlineClose /> Close
          </h1>
        </div>
      </header>

      <ul className="visible opacity-100 transition duration-700 ease-in-out py-4 animate-nav-animate">
        {NavElement.map((data) => (
          <li
            key={data.menu}
            className="p-3 navItem relative"
            onClick={data.menu != "Pages" ? toggle : undefined}
          >
            <Link href={data.link}>
              <a
                className="relative"
                onClick={() => {
                  data.submenu[0].page != "" && setDropDown(!isDropdown);
                }}
              >
                {data.menu}
                <i
                  className={
                    data.menu == "Pages transition-all delay-700 duration-300 ease-in-out"
                      ? "visible opacity-100 text-textDark text-h4 absolute top-0 left-14"
                      : "invisible opacity-0"
                  }
                >
                  <RiArrowDropDownLine />
                </i>
              </a>
            </Link>

            <ul
              className={
                data.submenu[0].page != "" && isDropdown
                  ? " block subMenu  static  w-full "
                  : "  hidden "
              }
            >
              {data.submenu[0].page != "" &&
                data.submenu.map((p) => (
                  <Link href={`/${p.pagelink}`} key={p.page}>
                    <a
                      className="text-black  "
                      onClick={handleDropdown}
                      key={p.page}
                    >
                      <li
                        key={p.page}
                        className="rounded-sm  px-2 py-1 capitalize hover:text-primaryColor text-textColor hover:font-extralight z-10 "
                      >
                        {p.page}
                      </li>
                    </a>
                  </Link>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
