import { all } from "redux-saga/effects";
// export {rootSaga} from "./employee";
// export {rootSaga} from "./mealCost";
import * as employee from "./employee";
import * as mealCost from "./mealCost";
import * as auth from "./auth";

export default function* rootSaga() {
	yield all([
		employee.watchFetchEmployees(),
		employee.watchAddEmployee(),
		employee.watchRemoveEmployee(),
		employee.watchUpdateEmployee(),
        
		mealCost.watchFetchMealCosts(),
		mealCost.watchAddMealCost(),
		mealCost.watchRemoveMealCost(),
		mealCost.watchUpdateMealCost(),
        
		auth.watchFetchUsers(),
		auth.watchAddUser(),
		auth.watchRemoveUser(),
		auth.watchUpdateUser(),
		auth.watchLoginUser(),
		auth.watchLogoutUser()
	]);
}