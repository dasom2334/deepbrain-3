import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import { setMealCostModalOpen, setUserModalOpen, setEmployeeModalOpen } from "@/modules";

export function Header() {
	const dispatch = useDispatch();
	return (
		<header className="header">
			<h1 className="header__h1">
				Manage <span>Employees</span>
			</h1>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setMealCostModalOpen(true));
				}}
			>
				<PersonAddSVG /> <span>Add new Meal Cost</span>
			</button>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setEmployeeModalOpen(true));
				}}
			>
				<PersonAddSVG /> <span>Add new Employee</span>
			</button>
		</header>
	);
}
