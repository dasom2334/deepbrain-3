import * as t from "../types";

export const setMealCostModalOpen = (isMealCostModalOpen) => {
	return {
		type: t.MODAL_OPEN_MEALCOST,
		payload: isMealCostModalOpen,
	};
};

export const fetchMealCosts = () => {
	return {
		type: t.MEALCOST_FETCH_REQUESTED,
	};
};

export const addMealCost = (mealCost) => {
	return {
		type: t.MEALCOST_ADD_REQUESTED,
		payload: mealCost,
	};
};

export const updateMealCost = (mealCost) => {
	return {
		type: t.MEALCOST_UPDATE_REQUESTED,
		payload: mealCost,
	};
};

export const deleteMealCost = (id) => {
	return {
		type: t.MEALCOST_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedMealCost = (id) => {
	return {
		type: t.MEALCOST_SELECTED,
		payload: id,
	};
};