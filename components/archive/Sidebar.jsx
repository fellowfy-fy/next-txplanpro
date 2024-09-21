import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-100  fixed flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-light">TxPlanPro</h1>
      </div>
      <nav className="flex-1 px-6">
        <ul>
          <p className="p-4 font-light text-[14px]">MENU</p>
          <div className="pl-4 text-[14px]">
            {auth?.username ? (
              <p className="p-4 font-light text-[14px]">Dr. {auth.username}</p>
            ) : (
              <></>
            )}

            <li>
              {!auth?.username ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block py-2.5 px-4 ${
                          isActive
                            ? "bg-gray-900 text-gray-100 rounded-[48px]"
                            : "hover:text-gray-500"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `block py-2.5 px-4  ${
                          isActive
                            ? "bg-gray-900 text-gray-100 rounded-[48px]"
                            : "hover:text-gray-500"
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2.5 px-4 text-gray-900 hover:text-gray-500"
                  >
                    Logout
                  </button>
                </li>
              )}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2.5 px-4 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/all-plans"
                className={({ isActive }) =>
                  `block py-2.5 px-4 text-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                All Plans
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/present"
                                className={({ isActive }) =>
                  `block py-2.5 px-4 text-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Ready to present
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/todo"
                                className={({ isActive }) =>
                  `block py-2.5 px-4 text-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                To-do plans
              </NavLink>
            </li> */}
            {/* плейсхолдер */}
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `block py-2.5 px-4 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Create
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/patients"
                                className={({ isActive }) =>
                  `block py-2.5 px-4 text-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Patients
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block py-2.5 px-4 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/help"
                                className={({ isActive }) =>
                  `block py-2.5 px-4 text-gray-900 ${
                    isActive
                      ? "bg-gray-900 text-gray-100 rounded-[48px]"
                      : "hover:text-gray-500"
                  }`
                }
              >
                Help & Support
              </NavLink>
            </li> */}
          </div>
          {/* <li>
            <NavLink
              to="/search"
              className="py-2 my-4 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
            >
              Search
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
