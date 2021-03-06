import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddPages = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage, setpostsPerPage] = useState(50);
  const [Module, setModule] = useState([]);
  const [UserRegistered, setUserRegistered] = useState([]);
  const [pageRegisteredAdd, setPageRegisteredAdd] = useState({
    page_name: "",
    page_link: "",
    module_id: "",
  });
  

  const [currentEditPage, setCurrentEditPage] = useState({
    page_id: "",
    page_name: "",
    page_link: "",
    module_id: "",
  });
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);

  const notifyAdd = () => toast("User Created Successfully!");
  const notifyDelete = () => toast("User Deleted Successfully!");
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = UserRegistered.slice(indexOfFirstPost, indexOfLastPost);

  const fetchAllData = () => {
    fetch(url + "api/Pages" ,  {
      method: "GET",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((json) => { 
        setUserRegistered(json);
        fetch(url + "/api/Modules",{
          method: "GET",
          headers: {
            Authorization:
            `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => response.json())
          .then((ModuleList) => {

 
            setModule(ModuleList);

            // setPageRegisteredAdd({
            //   ...pageRegisteredAdd,
            //   // module_id: ModuleList[0].module_id,
            // })




            setisLoading(false);
          });
      });
  };
  const AddPageRegistered = () => {
console.log(pageRegisteredAdd , "added to be data");

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization:
            `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(pageRegisteredAdd),
    };
    console.log(requestOptions.body);
    fetch(url + "/api/Pages", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "added user");
        fetchAllData();
        setPageRegisteredAdd({
          page_name: "",
          page_link: "",
          module_id: "",
        });
        notifyAdd();
      })
      .catch((err) => {
        console.log("err", err);
      });
      
      setPageRegisteredAdd({
        page_name: "",
        page_link: "",
        module_id: "",
      });
  };
  const deletePage = (e) => { 
    fetch(`${url}/api/Pages/${e}`,{
      method: "DELETE",
      headers: {
        Authorization:
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        // deleteing Role for this Id

        fetchAllData();
        notifyDelete();
      })
      .catch((error) => console.log("error", error));
  };
  const updatePage = () => { 
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentEditPage),
    };
    
    fetch(url + "/api/Pages", requestOptions)
      .then((response) => response)
      .then((data) => {
        fetchAllData();
        console.log(data, "updated user");
        
        notifyAdd();
      })
      .catch((err) => {
        console.log("err", err);
      });
      fetchAllData();
  };

  useEffect(() => {
    fetchAllData();

  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          <div
            className={`right_col  h-100  ${
              showNavMenu === false ? "footer-margin-remove" : " "
            } `}
            role="main"
          >
            {/* Registration Form  */}

            {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Page Creation</h2>
                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                      <li>
                        <a
                          className="close-link"
                          onClick={() => setdisplayUserRegBox(false)}
                        >
                          <i className="fa fa-close" />
                        </a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <form>
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Page Title<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Purchases"
                            value={pageRegisteredAdd.page_name}
                            onChange={(e) =>
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                page_name: e.target.value,
                              })
                            }
                            required="required"
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Url<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            name="url"
                            // required="required"
                            type="text"
                            value={pageRegisteredAdd.page_link}
                            onChange={(e) =>
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                page_link: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Select Module<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            className="form-control text-center w-50"
                      
                            onChange={(e) =>
                              setPageRegisteredAdd({
                                ...pageRegisteredAdd,
                                module_id: e.target.value,
                              })
                            }
                          >
                            {Module.map((item) => {
                              return (
                                <>
                                  <option value={item.module_id}>
                                    {item.module_name}
                                  </option>
                                </>
                              );
                            })}
                          </Form.Select>
                        </div>
                      </div>

                      {/* <div className="ln_solid"> */}
                      <div className="form-group">
                        <div className="col-md-6 offset-md-3 pb-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3"
                            onClick={(e) => {
                              e.preventDefault();
                              AddPageRegistered();
                            }}
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => {
                              console.log("added");
                            }}
                            className="btn btn-success btn-sm ml-2 px-3"
                          >
                            Reset
                          </button>
                          {/* </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Model  */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Update User</Modal.Title>
                <i onClick={handleClose} className="fa fa-close"></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Page Title<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Ali A.Khan"
                      required="required" 
                      value={currentEditPage.page_name}
                      onChange={(e) =>
                        setCurrentEditPage({
                          ...currentEditPage,
                          page_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Page Url<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="text"
                      required="required"
                      type="text"
                      value={currentEditPage.page_link}
                      onChange={(e) =>
                        setCurrentEditPage({
                          ...currentEditPage,
                          page_link: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select Module<span className="required">*</span>
                  </label>
                  <div className="col-md-6 col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control text-center w-75"
                      value={currentEditPage.module_id}
                      onChange={(e) =>
                        setCurrentEditPage({
                          ...currentEditPage,
                          module_id: e.target.value,
                        })
                      }  >
                      {Module.map((item) => {
                        return (
                          <>
                            <option value={item.module_id}>
                              {item.module_name}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button
                variant="primary"
                className="btn-sm px-3"
                onClick={handleClose}
              >
                Update
              </Button> */}
                <Button
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment 
                "
                  onClick={() => {
                    handleClose();
                    updatePage()
                    
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Model  */}

            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th className="column-title"> Sr. </th>
                        <th className="column-title">Page Title </th>
                        <th className="column-title">Page Url </th>
                        <th className="column-title">Module </th>
                        <th className="column-title text-center">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentPosts.map((Page, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {Page.name} </td>
                            <td className=" ">{Page.pageUrl}</td>
                            <td className=" ">{Page.module}</td>

                            <td className="a-right a-right  text-center ">
                              <i
                                className="fa fa-edit pr-2"
                                onClick={() => {
                                  handleShow();
                                  setCurrentEditPage({
                                    page_id:Page.id,
                                    page_name: Page.name,
                                    page_link:Page.pageUrl,
                                    module_id: Page.moduleId,
                                  })
                                }}
                              ></i>
                              <i
                                className="fa fa-trash-o"
                                onClick={() => {
                                  deletePage(Page.id);
                                }}
                              ></i>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="  d-flex justify-content-between pr-3 pt-2">
                    <div className="d-flex  ml-3 mb-3">
                      <span className="pt-1 pr-2">Show</span>
                      <div className="wisthOfOtions">
                        {" "}
                        <Form.Select
                          onChange={(e) =>
                            postsPerPage(parseInt(e.target.value))
                          }
                          aria-label="Default select example"
                          className="form-control  wisthOfOtions"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </Form.Select>
                      </div>
                      <span className="pt-1 pl-2">Entities</span>
                    </div>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={UserRegistered.length}
                      paginate={paginate}
                    />
                  </div>

                  {/* Pagination  */}

                  {/* Pagination  */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddPages;
