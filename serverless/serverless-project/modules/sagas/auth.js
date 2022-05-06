import { put, takeLatest } from "redux-saga/effects";
import * as t from "../types";
import checkLogined  from "../lambdas/checkLogined";

export const initialState = {
    loginedUser: {},
    loginError: null,
    isLoggined: false,
    token: ''
};
export function* fetchUsers() {
	try {
		checkLogined();
		const response = yield fetch("/api/users");

		const userList = yield response.json();
		yield put({
			type: t.USER_FETCH_SUCCEEDED,
			payload: userList.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_FETCH_FAILED,
			payload: error.message,
		});
	}
}

export function* watchFetchUsers() {
	yield takeLatest(t.USER_FETCH_REQUESTED, fetchUsers);
}

export function* addUser(action) {
	try {
		const response = yield fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newUser = yield response.json();

		yield put({
			type: t.USER_ADD_SUCCEEDED,
			payload: newUser.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_ADD_FAILED,
			payload: error.message,
		});
	}
}

export function* watchAddUser() {
	yield takeLatest(t.USER_ADD_REQUESTED, addUser);
}

export function* deleteUser(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/users/" + action.payload, {
			method: "DELETE",
		});

		const deletedUser = yield response.json();

		yield put({
			type: t.USER_DELETE_SUCCEEDED,
			payload: deletedUser.data.id,
		});
	} catch (error) {
		yield put({
			type: t.USER_DELETE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchRemoveUser() {
	yield takeLatest(t.USER_DELETE_REQUESTED, deleteUser);
}

export function* updateUser(action) {
	try {
		checkLogined();
		const response = yield fetch("/api/users/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedUser = yield response.json();

		yield put({
			type: t.USER_UPDATE_SUCCEEDED,
			payload: updatedUser.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

export function* watchUpdateUser() {
	yield takeLatest(t.USER_UPDATE_REQUESTED, updateUser);
}

export function* loginUser(action) {
	try {
		const response = yield fetch("/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const loginedUser = yield response.json();
		localStorage.setItem("loginedUser", JSON.stringify(loginedUser));
		window.location.href = '/'
		yield put({
			type: t.LOGIN_REQUESTED_SUCCEEDED,
			payload: loginedUser.data,
		});
		yield put({
			type: t.SAVE_TOKEN,
			payload: loginedUser.token,
		});
		
	} catch (error) {
		yield put({
			type: t.LOGIN_REQUESTED_FAILED,
			payload: error.message,
		});
		yield put({
			type: t.DELETE_TOKEN,
			payload: error.message,
		});
	}
}

export function* watchLoginUser() {
	yield takeLatest(t.LOGIN_REQUESTED, loginUser);
}

export function* logoutUser(action) {
	try {
		const response = yield fetch("/api/users/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});
		localStorage.clear();
		window.location.href = '/'
		
		yield put({
			type: t.LOGOUT_REQUESTED_SUCCEEDED,
			payload: logoutUser.data,
		});
		yield put({
			type: t.DELETE_TOKEN,
			payload: logoutUser.token,
		});
		
	} catch (error) {
		yield put({
			type: t.LOGOUT_REQUESTED_FAILED,
			payload: error.message,
		});
	}
}

export function* watchLogoutUser() {
	yield takeLatest(t.LOGOUT_REQUESTED, logoutUser);
}