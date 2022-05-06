import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	login,
	setLoginModalOpen,
	setSelectedUser,
	updateUser,
} from "@/modules";

export function LoginModal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setLoginModalOpen(false));
		dispatch(setSelectedUser(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
        dispatch(login(data));
	};

	useEffect(() => {
		if (state.selectedUser) {
			setValue("userid", state.selectedUser.userid);
			setValue("password", state.selectedUser.password);
		}
	}, [state.selectedUser, setValue]);

	return state.isLoginModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
                                Login
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
                                htmlFor="naeeemeInput"
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
									htmlFor="naeeemeInput"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="password"
									id="password"
									name="password"
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
									<CheckSVG /> Submit
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
