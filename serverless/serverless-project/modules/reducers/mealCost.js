import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	mealCostList: [],
	selectedMealCost: undefined,
	isMealCostModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN_MEALCOST:
			return {
				...state,
				isMealCostModalOpen: action.payload,
			};
		case t.MEALCOST_FETCH_SUCCEEDED:
			return {
				...state,
				mealCostList: action.payload,
			};
		case t.MEALOCST_ADD_SUCCEEDED:
			return {
				...state,
				mealCostList: [action.payload, ...state.mealCostList],
			};
		case t.MEALOCST_UPDATE_SUCCEEDED:
			const updatedMealCost = state.mealCostList.map((mealCost) => {
				if (mealCost._id === action.payload._id) {
					return {
						...mealCost,
                        provincial_office: action.payload.provincial_office,
                        regional_office: action.payload.regional_office,
                        region: action.payload.region,
                        school_code: action.payload.school_code,
                        school_name: action.payload.school_name,
                        school_level_code: action.payload.school_level_code,
                        establishment_classification: action.payload.establishment_classification,
                        exclusion: action.payload.exclusion,
                        meal_cost: action.payload.meal_cost,
					};
				}
				return mealCost;
			});

			return { ...state, mealCostList: updatedMealCost };
		case t.MEALOCST_DELETE_SUCCEEDED:
			const newMealCostList = state.mealCostList.filter(
				(mealCost) => mealCost._id !== action.payload
			);
			return {
				...state,
				mealCostList: newMealCostList,
			};
		case t.MEALOCST_SELECTED:
			const selectedMealCost = state.mealCostList.find(
				(mealCost) => mealCost._id === action.payload
			);
			return {
				...state,
				selectedMealCost,
			};
		default:
			return state;
	}
};

export default mainReducer;