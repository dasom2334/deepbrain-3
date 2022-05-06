import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteMealCost,
	fetchMealCosts,
	setMealCostModalOpen,
	setSelectedMealCost,
} from "@/modules";
import { useEffect } from "react";

export function MealCostTable() {
	const state = useSelector((state) => {
		console.log(state.mealCost);
		return state.mealCost;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMealCosts());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>provincial_office</th>
					<th>regional_office</th>
					<th>region</th>
					<th>school_code</th>
					<th>school_name</th>
					<th>school_level_code</th>
					<th>establishment_classification</th>
					<th>exclusion</th>
					<th>meal_cost</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.mealCostList.map(({ _id, provincial_office, regional_office, region, school_code, school_name, school_level_code, establishment_classification, exclusion, meal_cost }) => (
					<tr key={_id}>
						<td>{provincial_office}</td>
						<td>{regional_office}</td>
						<td>{region}</td>
						<td>{school_code}</td>
						<td>{school_name}</td>
						<td>{school_level_code}</td>
						<td>{establishment_classification}</td>
						<td>{exclusion}</td>
						<td>{meal_cost}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedMealCost(_id));
									dispatch(setMealCostModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteMealCost(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
