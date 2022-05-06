import { combineReducers } from "redux";
import employeeReducer from "./employee";
import authReducer from "./auth";
import mealCostReducer from "./mealCost";

const rootReducer = combineReducers({
	employee: employeeReducer,
	auth: authReducer,
	mealCost: mealCostReducer,
});

export default rootReducer;