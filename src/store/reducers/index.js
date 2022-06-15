import { combineReducers } from "redux";

import NavState from "./NavState";
import UserReducer from "./RoleReducers/user"; 
import IdToBeUpdate from "./IdToBeUpdate"; 


export const reducers = combineReducers({ NavState ,UserReducer , IdToBeUpdate });
