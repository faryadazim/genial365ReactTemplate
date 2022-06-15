import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form"; 
import { useSelector } from "react-redux";


import Select from "react-select";







const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border
 
  // })
  control: (provided, state , base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius:"none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base,    boxShadow: 'none'
  }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px  #003a4d",
      color: state.isSelected ? "#f79c74" : "#003a4d",
      background: '#fff',
   
    }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px' ,  
      // background: '#fff',
    
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
    
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    
  }),
  
}
const RolePermission = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(false);
  const [pagePermissionList , setpagePermissionList] = useState([])
  

  const [roleValue, setRoleVAlue] = useState(""); 
  const [roleOptions , setRoleOptions] = useState([]);

const [RoleToBeSearch ,setRoleToBeSearch] = useState("4f9d320b4b9f4d61b2589686b65180f6")


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 


const fetchAllData = ()=>{
 
  fetch(url +`api/PagePermissions?roleId=${RoleToBeSearch}`, {
    method: "GET",
    headers: {
      // Authorization: "bearer" + " " + e,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      response.json().then((data) => {
   
        setpagePermissionList(data)
        fetch(url + "api/Roles"  , {
          method: "GET",
          headers: {
            // Authorization: "bearer" + " " + e,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((response) => {
          response.json().then((data) => { 
          var arr= []
          data.map((item)=>{
              arr.push({label:item.Name , value:item.Id})
          })
        setRoleOptions(arr)
          });
        })
          
      });
    })
    .catch((error) => console.log("error", error));
}
  useEffect(() => {fetchAllData()}, []);

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
            <div className="field item form-group d-flex justify-content-center ">
              <div className="col-md-6 col-sm-6   d-flex justify-content-around align-items-center">
                {/* <Form.Select
                  aria-label="Default select example"
                  className="form-control text-center w-75" 
                >
                  
                  <option value="1">Admin</option>
                  <option value="3">Cashier</option>
                  <option value="2">USer</option>
              
                </Form.Select> */}
                 <Select
                      required
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Active"}
                        value={roleValue.value}
                        onChange={(value) => { 
          
                          setRoleToBeSearch(value.value)
                          fetchAllData()
                        }} 
                        isSearchable={true}
                        name="color"
                        options={roleOptions}
                        styles={customStyles}
                      />
       
              </div>
            </div>
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
                    Username<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Ali A.Khan"
                      required="required"
                      // value={currentEditUser.userName}
                      // onChange={(e) =>
                      //   setcurrentEditUser({
                      //     ...currentEditUser,
                      //     userName: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    email<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="email"
                      required="required"
                      type="email"
                      // value={currentEditUser.email}
                      // onChange={(e) =>
                      //   setcurrentEditUser({
                      //     ...currentEditUser,
                      //     email: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="btn-sm px-3 ModalButtonPositionAdjectment 
                  "
                  onClick={() => {
                    handleClose();
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
                  <table className="table  jambo_table  ">
                    <thead>
                      <tr className="headings">
                        <th className="column-title" width="334px">
                          {" "}
                          Title{" "}
                        </th>
                        <th className="column-title text-center">View </th>
                        <th className="column-title text-center">Delete </th>
                        <th className="column-title text-center">Add </th>
                        <th className="column-title text-center">Add </th>
                        <th className="column-title text-center">Update </th>
                      </tr>
                    </thead>

                    <tbody>
                      {pagePermissionList.map((item, index) => {
                        return (
                          <>
                          
                            <tr className="moduleBgColor">
                              <td colSpan="6" className="py-2">
                                <div>{item.module_name}</div>
                              </td>
                            </tr>
                            {

item.pages.map((arr)=>{
  return <> 
  
   <tr className="even pointer">
  
  <td className=" pl-5 ">{arr.pageName}</td>
  <td className=" text-center ">
    
      <input
        type="checkbox"
        className="flat"
        checked={true}
      />

  </td>
  <td className=" text-center ">
    
    <input
      type="checkbox"
      className="flat"
      checked={true}
    />

</td>

<td className=" text-center ">
    
    <input
      type="checkbox"
      className="flat"
      checked={true}
    />

</td><td className=" text-center ">
    
    <input
      type="checkbox"
      className="flat"
      checked={true}
    />

</td>
  <td className="a-right a-right  text-center ">
    <i
      className="fa fa-edit pr-2"
      onClick={() => {
        handleShow();
      }}
    ></i>
  </td>
</tr>
</>
})
                            }
                         
                        
                          </>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* <div className="  d-flex justify-content-between pr-3 pt-2">
                    <div className="d-flex  ml-3 mb-3">
                      <span className="pt-1 pr-2">Show</span>
                      <div className="wisthOfOtions">


                      ----------
                        {" "}  
                              ---------
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
                  </div> */}

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

export default RolePermission;
