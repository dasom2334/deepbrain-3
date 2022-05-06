import * as t from "../types";

export const setUserModalOpen = (isAuthModalOpen) => {
	return {
		type: t.MODAL_OPEN_AUTH,
		payload: isAuthModalOpen,
	};
};

export const setLoginModalOpen = (isLoginModalOpen) => {
	return {
		type: t.MODAL_OPEN_LOGIN,
		payload: isLoginModalOpen,
	};
};

export const setRegisterModalOpen = (isRegisterModalOpen) => {
	return {
		type: t.MODAL_OPEN_REGISTER,
		payload: isRegisterModalOpen,
	};
};


export const logout = (user) => {
	return {
		type: t.LOGOUT_REQUESTED,
		payload: user,
	};
};

export const login = (user) => {
	return {
		type: t.LOGIN_REQUESTED,
		payload: user,
	};
};
export const fetchUsers = (user) => {
	return {
		type: t.USER_FETCH_REQUESTED,
		payload: user
	};
};

export const addUser = (user) => {
	return {
		type: t.USER_ADD_REQUESTED,
		payload: user,
	};
};

export const updateUser = (user) => {
	return {
		type: t.USER_UPDATE_REQUESTED,
		payload: user,
	};
};

export const deleteUser = (id) => {
	return {
		type: t.USER_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedUser = (id) => {
	return {
		type: t.USER_SELECTED,
		payload: id,
	};
};