import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import { setNavMd } from "../store/actions/NavState";




const Nav = ({ navigationResult, isLogin }) => {
  const [multiLevelDropDown, setMultiLevelDropSown] = useState(false)
  const showNavMenu = useSelector((state) => state.NavState);
  const [currentBlock, setCurrentBlock] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(navigationResult.navigationResult);
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <>
            {" "}
            {showNavMenu == true ? (
              <>
                <div className="col-md-3 left_col">
                  <div className="left_col scroll-view">
                    {/* Logo */}
                    <div className="navbar nav_title" style={{ border: 0 }}>
                      <a href="#" className="site_title">
                        <img src="images/logo.svg" alt className="md-logo" />
                        <img
                          src="images/logo_icon.svg"
                          alt
                          className="sm-logo"
                        />
                      </a>
                    </div>
                    <div className="clearfix" />

                    {/* Sidebar Menu */}
                    <div className="main_menu_side hidden-print main_menu sidebar-menu">
                      <div className="menu_section">
                        {/*<h3>General</h3>*/}
                        <ul className="nav side-menu">
                          {navigationResult.navigationResult.map(
                            (module, index) => {
                              return (
                                <li
                                  //  className={`list-header ${currentBlock==(index+1?"happy" : console.log("null"))}`}
                                  className={`   ${currentBlock === index + 1 ? "active" : " "
                                    }  `}
                                >
                                  <a
                                    onClick={(e) => {
                                      if (currentBlock === index + 1) {
                                        setCurrentBlock("0");
                                      } else {
                                        setCurrentBlock(index + 1);
                                      }
                                    }}
                                  >
                                    <i className={`${module.module_icon}`} />{" "}
                                    {module.module_name}
                                    <span className="fa fa-chevron-down" />
                                  </a>
                                  <ul
                                    className={`nav child_menu ${currentBlock === index + 1
                                      ? "d-block"
                                      : " d-none"
                                      }`}
                                  >
                                    {module.pages.map((page) => {
                                      return (
                                        <li>
                                          <NavLink to={page.pageURL} >
                                            {page.pageName}
                                          </NavLink>
                                        </li>
                                      );
                                    })}


                                  </ul>
                                </li>
                              );
                            }
                          )}




























{/* 
                          <li>
                            <a><i className="fa fa-sitemap" /> Multilevel Menu
                              <span className="fa fa-chevron-down" /></a>
                            <ul className="nav child_menu d-block">
                              <li>
                                <a>Level One<span className="fa fa-chevron-down" /></a>
                                <ul className="nav child_menu  >
                            <li class=" sub_menu">
                                <a href="level2.html">Level Two</a>
                                <li><a href="#level2_1">Level Two</a></li>
                                <li><a href="#level2_2">Level Two</a></li>
                            </ul>
                          </li>
                          <li><a href="#level1_2">Level One</a></li>
                        </ul>
                      </li> */}




















                      {/* <li 
                          >
                            <a>
                              <i className="fa fa-windows" /> Role Management
                              <span className="fa fa-chevron-down" />
                            </a>
                            <ul className={`nav child_menu    
                            `}> 
                              <li>
                                <NavLink to="RoleAccess">Add Role </NavLink>
                              </li>
                              <li>
                                <NavLink to="UserAccess">Add User</NavLink>
                              </li>
                              <li>
                                <NavLink to="ModuleAccess">Add Modules</NavLink>
                              </li>
                              <li>
                                <NavLink to="PagesAccess">Add Pages</NavLink>
                              </li>

                              <li>
                                <NavLink to="PermissionAccess">
                                  Add Permission
                                </NavLink>
                              </li>
                            </ul>
                          </li> */}
                    </ul>
                  </div>
                </div>
                {/* /sidebar menu */}
                {/* /menu footer buttons */}
                <div className="sidebar-footer hidden-small">
                  {/* <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Settings"
                      >
                        
                      </a> */}

                  <NavLink to="UserProfile" data-toggle="tooltip"
                    data-placement="top"
                    title="FullScreen"
                  > <span
                      className="glyphicon glyphicon-cog"
                      aria-hidden="true"
                    /> </NavLink>

                  <NavLink to="RoleAccess" data-toggle="tooltip"
                    data-placement="top"
                    title="FullScreen"
                  > <span
                      className="glyphicon glyphicon-fullscreen"
                      aria-hidden="true"
                    /> </NavLink>







                  <NavLink to="EmployeesList" data-toggle="tooltip"
                    data-placement="top"
                    title="Lock"
                  >  <span
                      className="glyphicon glyphicon-user"
                      aria-hidden="true"
                    /> </NavLink>






                  <a
                    onClick={() => dispatch(setNavMd)}
                  >
                    <span
                      className="glyphicon glyphicon-off"
                      aria-hidden="true" />
                  </a>
                </div>
              </div>
                </div>
        </>
      ) : (
        <></>
      )}
    </>
        </>
      ) : (
  <>not load yet</>
)}
    </>
  );
};

export default Nav;
