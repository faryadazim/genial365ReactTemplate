import {endPoint} from '../../../config/Config.js'
import {
    CREATE_NEW_USER ,UPDATE_USER , DELETE_USER , FETCH_ALL_USER
} from '../../constants/actionTypes.js'




export const fetchAllUser = (setisLoading)=> async (dispatch)=>{
    try {
        let fetchAllUser =await fetch(endPoint + "/api/Users")
        .then((response) => response.json())
        .then((json) => { 
         return json
         
        });
        dispatch({
            type:FETCH_ALL_USER  ,
            payload:fetchAllUser
        })
    } catch (error) {
        console.log("Error In Action/UserAction", error) ;
    }finally{
         setisLoading(false)
        console.log("Api called");
    }
}
export const deleteUser = (id)=> async (dispatch)=>{
    try {
      await  fetch(`${endPoint}/api/Users/${id}`, {
            method: "DELETE",
            // headers: {
            //   Authorization:
            //     JSON.parse(localStorage.getItem("authUser")).token_type +
            //     " " +
            //     JSON.parse(localStorage.getItem("authUser")).access_token,
            //   "Content-Type": "application/x-www-form-urlencoded",
            // },
          })
            .then((response) => {
             console.log(response); 
            })
            .catch((error) => console.log("error", error));

            dispatch({type:DELETE_USER , payload:id})
    } catch (error) {
        console.log("Error In Action/UserAction", error) ;
    }finally{
         console.log("succed");
    }
}