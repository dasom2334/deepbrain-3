import User from "@/models/User";
import "@/models/dbConnect";

export default async (req, res) => {
	const { method } = req;
	console.log(req.body);
	console.log(req.query);
	switch (method) {
		case "GET":
			try {
				const users = await User.find({}).sort({
					createdAt: "desc",
				});

				return res.status(200).json({
					success: true,
					data: users,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "POST":
			try {
				const users = await User.create(req.body);
				return res.status(201).json({
					success: true,
					data: users,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			// res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};