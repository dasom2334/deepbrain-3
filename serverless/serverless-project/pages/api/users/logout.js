import User from "@/models/User";
import "@/models/dbConnect";

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "POST":
			try {
				return res.status(201).json({
					success: true,
                    msg: 'LOGOUT',
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};