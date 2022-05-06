import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addUser,
	setRegisterModalOpen,
	setSelectedUser,
	updateUser,
} from "@/modules";

export function RegisterModal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setRegisterModalOpen(false));
		dispatch(setSelectedUser(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
        console.log(state.selectedUser);

		if (state.selectedUser !== undefined) {
        console.log('hi1');
        dispatch(
				updateUser({
					_id: state.selectedUser._id,
					...data,
				})
			);
		} else {
        console.log('hi1');
			dispatch(addUser(data));
		}
	};

	useEffect(() => {
		if (state.selectedUser) {
			setValue("_id", state.selectedUser._id);
			setValue("userid", state.selectedUser.userid);
			setValue("password", state.selectedUser.password);
			setValue("name", state.selectedUser.name);
			// setValue("email", state.selectedUser.email);
			// setValue("address", state.selectedUser.address);
			// setValue("phone", state.selectedUser.phone);
		}
	}, [state.selectedUser, setValue]);

	return state.isRegisterModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">rgrg
								{state.selectedUser ? (
									<>
										Edit <span>User</span>
									</>
								) : (
									<>
										Add <span>User</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="userid"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="text"
									id="userid"
									name="userid"
									placeholder="ID"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<label
									htmlFor="password"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="password"
									id="password"
									name="password"
									placeholder="password"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<label
									htmlFor="name"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedUser ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
