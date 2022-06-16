// React Import
import { useEffect, useState } from "react";
//  Style Module Import 
import "./App.css";
// Router Import 
import { Routes, Route } from "react-router-dom";
// Notifier (Toastify) Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Component Import
import Loader from "./Layout/Loader/Loader";
//Layout ---
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Login from "./Auth/Login";
//Role Module ---
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import RolePermission from "./Pages/Role/RolePermission.js";
import { endPoint } from "./config/Config";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const [navigationData, setNavigationData] = useState("");
  const [showMainLoader, setShowMainLoader] = useState(true);

  const fetchNavigation = (e) => {
    fetch(endPoint + "api/navigation", {
      method: "GET",
      headers: {
        Authorization:
          "bearer" +
          " " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => { 
          setNavigationData(data); 
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("roleName", data.RoleName);
          localStorage.setItem("loginId", data.LoginName); 
          setisLogin(true);
          setShowMainLoader(false);
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    localStorage.setItem("authUser", endPoint);
    var newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
      fetchNavigation();
    }
  }, []);

  return (
    <> 
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {!isLogin ? (
        <>
          <Login
            setisLogin={setisLogin}
            isLogin={isLogin}
            fetchNavigation={fetchNavigation}
            setShowMainLoader={setShowMainLoader}
          />
        </>
      ) : (
        <>
          {showMainLoader ? (
            <>
              {" "}
              <div class="lds-dual-ring-ForMain-Page "></div>
            </>
          ) : (
            <>
              <div className="container body">
                <div className="main_container">
                  <Nav navigationResult={navigationData} isLogin={isLogin} />
                  <Header
                    roleName={navigationData.RoleName}
                    setisLogin={setisLogin}
                  />
                  <Routes>

                    <Route path="RoleAccess" element={<AddRole />} />
                    <Route path="ModuleAccess" element={<AddModules />} />
                    <Route path="UserAccess" element={<AddUser />} />
                    <Route path="PagesAccess" element={<AddPages />} />
                    <Route
                      path="PermissionAccess"
                      element={<RolePermission />}
                    />
                     
                  </Routes>
                  <Footer />
                </div>
              </div>
            </>
          )}{" "}
        </>
      )}
    </>
  );
}

export default App;

// {isLogin===true && showMainLoader===false ? (
//
// ) : (

//     <>
//     {isLogin===false &&  showMainLoader===false &&

//     }
//     {
//       showMainLoader===true && isLogin===true && <>Loader </>
//     }

//     </>

// )}
