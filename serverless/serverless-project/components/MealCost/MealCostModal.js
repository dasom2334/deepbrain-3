import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addMealCost,
	setMealCostModalOpen,
	setSelectedMealCost,
	updateMealCost,
} from "@/modules";

export function MealCostModal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.mealCost);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setMealCostModalOpen(false));
		dispatch(setSelectedMealCost(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedMealCost) {
			dispatch(
				updateMealCost({
					_id: state.selectedMealCost._id,
					...data,
				})
			);
		} else {
			dispatch(addMealCost(data));
		}
	};

	useEffect(() => {
		if (state.selectedMealCost) {
			setValue("provincial_office", state.selectedMealCost.provincial_office);
			setValue("regional_office", state.selectedMealCost.regional_office);
			setValue("region", state.selectedMealCost.region);
			setValue("school_code", state.selectedMealCost.school_code);
			setValue("school_name", state.selectedMealCost.school_name);
			setValue("school_level_code", state.selectedMealCost.school_level_code);
			setValue("establishment_classification", state.selectedMealCost.establishment_classification);
			setValue("exclusion", state.selectedMealCost.exclusion);
			setValue("meal_cost", state.selectedMealCost.meal_cost);
		}
	}, [state.selectedMealCost, setValue]);

	return state.isMealCostModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedMealCost ? (
									<>
										Edit <span>MealCost</span>
									</>
								) : (
									<>
										Add <span>MealCost</span>
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
							<input
								type="text"
								id="provincial_office"
								name="provincial_office"
								placeholder="provincial_office"
								className={cx("input", errors.name && "input--error")}
								ref={register({ required: true })}
							/>
						</div>
							<div className="form__element">
								<input
									type="text"
									id="regional_office"
									name="regional_office"
									placeholder="regional_office"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="region"
									name="region"
									placeholder="region"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="school_code"
									name="school_code"
									placeholder="school_code"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="school_name"
									name="school_name"
									placeholder="school_name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="school_level_code"
									name="school_level_code"
									placeholder="school_level_code"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="establishment_classification"
									name="establishment_classification"
									placeholder="establishment_classification"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="exclusion"
									name="exclusion"
									placeholder="exclusion"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<input
									type="text"
									id="meal_cost"
									name="meal_cost"
									placeholder="meal_cost"
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
									<CheckSVG /> {state.selectedMealCost ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
