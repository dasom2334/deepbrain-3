import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	userid: {
		type: String,
		required: [true, "ID is required!"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required!"],
		trim: true,
	},
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	address: {
		type: String,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	token: {
		type: String,
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
	mongoose.model("User", UserSchema);