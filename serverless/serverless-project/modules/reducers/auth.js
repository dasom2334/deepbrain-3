import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	userList: [],
	selectedUser: undefined,
	isAuthModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN_AUTH:
			return {
				...state,
				isAuthModalOpen: action.payload,
			};
		case t.MODAL_OPEN_LOGIN:
			return {
				...state,
				isLoginModalOpen: action.payload,
			};
		case t.MODAL_OPEN_REGISTER:
			return {
				...state,
				isRegisterModalOpen: action.payload,
			};
		case t.LOGIN_REQUESTED:
			return { ...state, ...action.payload };
		case t.LOGOUT_REQUESTED:
			return { ...state, ...action.payload };
		case t.USER_FETCH_SUCCEEDED:
			return {
				...state,
				userList: action.payload,
			};
		case t.USER_ADD_SUCCEEDED:
			return {
				...state,
				userList: [action.payload, ...state.userList],
			};
		case t.USER_UPDATE_SUCCEEDED:
			const updatedUser = state.userList.map((user) => {
				if (user._id === action.payload._id) {
					return {
						...user,
                        userid: action.payload.userid,
                        password: action.payload.password,
                        name: action.payload.name,
                        email: action.payload.email,
                        address: action.payload.address,
                        phone: action.payload.phone,
					};
				}
				return user;
			});

			return { ...state, userList: updatedUser };
		case t.USER_DELETE_SUCCEEDED:
			const newUserList = state.userList.filter(
				(user) => user._id !== action.payload
			);
			return {
				...state,
				userList: newUserList,
			};
		case t.USER_SELECTED:
			const selectedUser = state.userList.find(
				(user) => user._id === action.payload
			);
			return {
				...state,
				selectedUser,
			};
		case t.LOGIN_REQUESTED_SUCCEEDED:
			   
			return {
				...state,
				loginedUser,
			};
		case t.SAVE_TOKEN:
			return {
				...state,
				token: action.payload.token
			};
		case t.DELETE_TOKEN:
			return {
				...state,
				token: ''
			};
		default:
			return state;
	}
};

export default mainReducer;