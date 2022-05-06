import mongoose from "mongoose";
 

const MealCostSchema = new mongoose.Schema({
	provincial_office: {
		type: String,
		required: [false],
		trim: true,
	},
	regional_office: {
		type: String,
		required: [false],
		trim: true,
	},
	region: {
		type: String,
		required: [false],
		trim: true,
	},
	school_code: {
		type: String,
		required: [false],
		trim: true,
	},
	school_name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	school_level_code: {
		type: String,
		required: [false],
		trim: true,
	},
	establishment_classification: {
		type: String,
		required: [false],
		trim: true,
	},
	exclusion: {
		type: String,
		required: [false],
		trim: true,
	},
	meal_cost: {
		type: Number,
		required: [true, "Cost is required!"],
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MealCost ||
	mongoose.model("MealCost", MealCostSchema);

   