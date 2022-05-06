import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";
import checkLogined  from "../lambdas/checkLogined";

export function* fetchMealCosts() {
	try {
		checkLogined();
		const response = yield fetch("/api/mealCosts");

		const mealCostList = yield response.json();

		yield put({
			type: t.MEALCOST_FETCH_SUCCEEDED,
			payload: mealCostList.data,
		});
	} catch (error) {
		yield put({
			type: t.MEALCOST_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchMealCosts() {
	yield takeLatest(t.MEALCOST_FETCH_REQUESTED, fetchMealCosts);
}

export function* addMealCost(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/mealCosts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		const newMealCost = yield response.json();

		yield put({
			type: t.MEALCOST_ADD_SUCCEEDED,
			payload: newMealCost.data,
		});
	} catch (error) {
		yield put({
			type: t.MEALCOST_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddMealCost() {
	yield takeLatest(t.MEALCOST_ADD_REQUESTED, addMealCost);
}

export function* deleteMealCost(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/mealCosts/" + action.payload, {
			method: "DELETE",
		});

		const deletedMealCost = yield response.json();

		yield put({
			type: t.MEALCOST_DELETE_SUCCEEDED,
			payload: deletedMealCost.data.id,
		});
	} catch (error) {
		yield put({
			type: t.MEALCOST_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveMealCost() {
	yield takeLatest(t.MEALCOST_DELETE_REQUESTED, deleteMealCost);
}

export function* updateMealCost(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/mealCosts/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedMealCost = yield response.json();

		yield put({
			type: t.MEALCOST_UPDATE_SUCCEEDED,
			payload: updatedMealCost.data,
		});
	} catch (error) {
		yield put({
			type: t.MEALCOST_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateMealCost() {
	yield takeLatest(t.MEALCOST_UPDATE_REQUESTED, updateMealCost);
}

