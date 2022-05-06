

const checkLogined = function() {
	const loginedUser = JSON.parse(localStorage.getItem("loginedUser"));
	console.log(loginedUser.token);
	if (!loginedUser.token) {
		throw Error;
	}
	
}
export default checkLogined