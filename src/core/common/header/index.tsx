import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../imageWithBasePath";
import { all_routes } from "../../../feature-module/router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpandMenu,
  setMiniSidebar,
  setMobileSidebar,
} from "../../data/redux/commonSlice";
import { HorizontalSidebarData } from "../../data/json/horizontalSidebar";
const Header = () => {

  const [subOpen, setSubopen] = useState<any>("");
  const [subsidebar, setSubsidebar] = useState("");

  const [isFullscreen, setIsFullscreen] = useState(false);
  const route = all_routes;
  const location = useLocation();
  const dispatch = useDispatch();
  const mobileSidebar = useSelector((state: any) => state.commonSlice.mobileSidebar);
  const miniSidebar = useSelector((state: any) => state.commonSlice.miniSidebar);

  const toggleMobileSidebar = () => {
    dispatch(setMobileSidebar(!mobileSidebar));
  };
  const toggleMiniSidebar = () => {
    dispatch(setMiniSidebar(!miniSidebar));
  };
  const toggleExpandMenu = () => {
    dispatch(setExpandMenu(true));
  };
  const toggleExpandMenu2 = () => {
    dispatch(setExpandMenu(false));
  };

  const [layoutBs, setLayoutBs] = useState(localStorage.getItem("dataTheme"));
  const isLockScreen = location.pathname === "/lock-screen";

  if (isLockScreen) {
    return null;
  }
  const LayoutDark = () => {
    localStorage.setItem("dataTheme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    setLayoutBs("dark");
  };
  const LayoutLight = () => {
    localStorage.setItem("dataTheme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    setLayoutBs("light");
  };


  const toggleSidebar = (title: any) => {
    localStorage.setItem("menuOpened", title);
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem: any) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
        });
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((err) => {
          });
        }
        setIsFullscreen(false);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="header-left active" onMouseEnter={toggleExpandMenu} onMouseLeave={toggleExpandMenu2}>
          <Link to={route.dealsDashboard} className="logo logo-normal">
            {/* {layoutBs === "dark" ? (
              <>
                <ImageWithBasePath
                  src="assets/img/white-logo.svg"
                  className="white-logo"
                  alt="Logo"
                />
              </>
            ) : (
              <ImageWithBasePath src="assets/img/logo.svg" alt="Logo" />
            )} */}
            <ImageWithBasePath src="assets/img/logo.svg" alt="Logo" />
            <ImageWithBasePath src="assets/img/white-logo.svg" className="white-logo" alt="Logo" />
          </Link>
          <Link to={route.dealsDashboard} className="logo-small">
            <ImageWithBasePath src="assets/img/logo-small.svg" alt="Logo" />
          </Link>
          <Link id="toggle_btn" to="#" onClick={toggleMiniSidebar}>
            <i className="ti ti-arrow-bar-to-left" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#sidebar"
          onClick={toggleMobileSidebar}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        <div className="header-user">
          <ul className="nav user-menu">
            {/* Search */}
            <li className="nav-item nav-search-inputs me-auto">
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="fa fa-search" />
                </Link>
                <form className="dropdown">
                  <div className="searchinputs" id="dropdownMenuClickable">
                    <input type="text" placeholder="Search" />
                    <div className="search-addon">
                      <button type="submit">
                        <i className="ti ti-command" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {/* /Search */}
            <li>
              <div className="sidebar sidebar-horizontal" id="horizontal-single">
                <div className="sidebar-menu">
                  <div className="main-menu">
                    <ul className="nav-menu">
                      <li className="menu-title">
                        <span>Main</span>
                      </li>
                      {HorizontalSidebarData?.map((mainMenu, index) => (
                        <React.Fragment key={`main-${index}`}>
                          {mainMenu?.menu?.map((data, i) => (
                            <li className="submenu" key={`menu-${i}`}>
                              <Link to="#" className={`
														${data?.subMenus
                                  ?.map((link: any) => link?.route)
                                  .includes(location.pathname)
                                  ? "active"
                                  : ""
                                } ${subOpen === data.menuValue ? "subdrop" : ""}`} onClick={() => toggleSidebar(data.menuValue)}>
                                <i className={`ti ti-${data.icon}`}></i>
                                <span>{data.menuValue}</span>
                                <span className="menu-arrow"></span>
                              </Link>

                              {/* First-level Submenus */}
                              <ul style={{ display: subOpen === data.menuValue ? "block" : "none" }}>
                                {data?.subMenus?.map((subMenu: any, j) => (
                                  <li
                                    key={`submenu-${j}`}
                                    className={subMenu?.customSubmenuTwo ? "submenu" : ""}
                                  >
                                    <Link to={subMenu?.route || "#"} className={`${subMenu?.subMenusTwo
                                      ?.map((link: any) => link?.route)
                                      .includes(location.pathname) || subMenu?.route === location.pathname
                                      ? "active"
                                      : ""
                                      } ${subsidebar === subMenu.menuValue ? "subdrop" : ""}`} onClick={() => toggleSubsidebar(subMenu.menuValue)}>
                                      <span>{subMenu?.menuValue}</span>
                                      {subMenu?.customSubmenuTwo && <span className="menu-arrow"></span>}
                                    </Link>

                                    {/* Check if `customSubmenuTwo` exists */}
                                    {subMenu?.customSubmenuTwo && subMenu?.subMenusTwo && (
                                      <ul style={{ display: subsidebar === subMenu.menuValue ? "block" : "none" }}>
                                        {subMenu.subMenusTwo.map((subMenuTwo: any, k: number) => (
                                          <li key={`submenu-two-${k}`}>
                                            <Link className={subMenuTwo.route === location.pathname ? 'active' : ''} to={subMenuTwo.route}>{subMenuTwo.menuValue}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* Nav List */}
            <li className="nav-item nav-list">
              <ul className="nav">
                <li>
                  <Link to="#" onClick={toggleFullscreen} className="btn btn-icon border btn-menubar btnFullscreen">
                    <i className="ti ti-maximize"></i>
                  </Link>
                </li>

                <li className="dark-mode-list">
                  <Link
                    to="#"
                    className={`dark-mode-toggle ${layoutBs ? "" : "active"}`}
                    id="dark-mode-toggle"
                  >
                    <i
                      className={`ti ti-sun light-mode ${layoutBs === "dark" ? "" : "active"
                        }`}
                      onClick={LayoutLight}
                    >
                      {" "}
                    </i>
                    <i
                      className={`ti ti-moon dark-mode ${layoutBs === "dark" ? "active" : ""
                        }`}
                      onClick={LayoutDark}
                    ></i>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="btn btn-header-list"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-layout-grid-add" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end menus-info">
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="menu-list">
                          <li>
                            <Link to={route.contactList}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-violet">
                                  <i className="ti ti-user-up" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Contacts</p>
                                  <span>Add New Contact</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.pipeline}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-green">
                                  <i className="ti ti-timeline-event-exclamation" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Pipline</p>
                                  <span>Add New Pipline</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.activities}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-pink">
                                  <i className="ti ti-bounce-right" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Activities</p>
                                  <span>Add New Activity</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.analytics}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-info">
                                  <i className="ti ti-analyze" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Analytics</p>
                                  <span>Shows All Information</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.projects}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-danger">
                                  <i className="ti ti-atom-2" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Projects</p>
                                  <span>Add New Project</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="menu-list">
                          <li>
                            <Link to={route.deals}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-info">
                                  <i className="ti ti-medal" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Deals</p>
                                  <span>Add New Deals</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.leads}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-secondary">
                                  <i className="ti ti-chart-arcs" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Leads</p>
                                  <span>Add New Leads</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.companies}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-tertiary">
                                  <i className="ti ti-building-community" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Company</p>
                                  <span>Add New Company</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.tasks}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-success">
                                  <i className="ti ti-list-check" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Tasks</p>
                                  <span>Add New Task</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to={route.campaign}>
                              <div className="menu-details">
                                <span className="menu-list-icon bg-purple">
                                  <i className="ti ti-brand-campaignmonitor" />
                                </span>
                                <div className="menu-details-content">
                                  <p>Campaign</p>
                                  <span>Add New Campaign</span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to={route.faq} className="btn btn-help">
                    <i className="ti ti-help-hexagon" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="btn btn-chart-pie">
                    <i className="ti ti-chart-pie" />
                  </Link>
                </li>
              </ul>
            </li>
            {/* /Nav List */}
            {/* Email */}
            <li className="nav-item nav-item-email nav-item-box">
              <Link to={route.email}>
                <i className="ti ti-message-circle-exclamation" />
                <span className="badge rounded-pill">14</span>
              </Link>
            </li>
            {/* /Email */}
            {/* Notifications */}
            <li className="nav-item dropdown nav-item-box">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
                <i className="ti ti-bell" />
                <span className="badge rounded-pill">13</span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end notification-dropdown">
                <div className="topnav-dropdown-header">
                  <h4 className="notification-title">Notifications</h4>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <Link to={route.activities}>
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-02.jpg"
                              alt="Profile"
                            />
                            <span className="badge badge-info rounded-pill" />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              Ray Arnold left 6 comments on Isla Nublar SOC2
                              compliance report
                            </p>
                            <p className="noti-time">
                              Last Wednesday at 9:42 am
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to={route.activities}>
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-03.jpg"
                              alt="Profile"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              Denise Nedry replied to Anna Srzand
                            </p>
                            <p className="noti-sub-details">
                              “Oh, I finished de-bugging the phones, but the
                              system's compiling for eighteen minutes, or
                              twenty. So, some minor systems may go on and off
                              for a while.”
                            </p>
                            <p className="noti-time">
                              Last Wednesday at 9:42 am
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to={route.activities}>
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <ImageWithBasePath
                              alt=""
                              src="assets/img/profiles/avatar-06.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              John Hammond attached a file to Isla Nublar SOC2
                              compliance report
                            </p>
                            <div className="noti-pdf">
                              <div className="noti-pdf-icon">
                                <span>
                                  <i className="ti ti-chart-pie" />
                                </span>
                              </div>
                              <div className="noti-pdf-text">
                                <p>EY_review.pdf</p>
                                <span>2mb</span>
                              </div>
                            </div>
                            <p className="noti-time">
                              Last Wednesday at 9:42 am
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <Link to={route.activities} className="view-link">
                    View all
                  </Link>
                  <Link to="#" className="clear-link">
                    Clear all
                  </Link>
                </div>
              </div>
            </li>
            {/* /Notifications */}
            {/* Profile Dropdown */}
            <li className="nav-item dropdown has-arrow main-drop">
              <Link
                to="#"
                className="nav-link userset"
                data-bs-toggle="dropdown"
              >
                <span className="user-info">
                  <span className="user-letter">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-20.jpg"
                      alt="Profile"
                    />
                  </span>
                  <span className="badge badge-success rounded-pill" />
                </span>
              </Link>
              <div className={` dropdown-menu  menu-drop-user `}>
                <div className="profilename">
                  <Link className="dropdown-item" to={route.dealsDashboard}>
                    <i className="ti ti-layout-2" /> Dashboard
                  </Link>
                  <Link className="dropdown-item" to={route.profile}>
                    <i className="ti ti-user-pin" /> My Profile
                  </Link>
                  <Link className="dropdown-item" to={route.login}>
                    <i className="ti ti-lock" /> Logout
                  </Link>
                </div>
              </div>
            </li>
            {/* /Profile Dropdown */}
          </ul>
        </div>
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className={` dropdown-menu `}>
            <Link className="dropdown-item" to={route.dealsDashboard}>
              <i className="ti ti-layout-2" /> Dashboard
            </Link>
            <Link className="dropdown-item" to={route.profile}>
              <i className="ti ti-user-pin" /> My Profile
            </Link>
            <Link className="dropdown-item" to={route.login}>
              <i className="ti ti-lock" /> Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}

      </div>

    </>
  );
};

export default Header;
