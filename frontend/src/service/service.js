const baseURL = "https://192.168.1.1";

const registerCustomer = async(username) => {
    // Returns SecretKey
}

const registerEmployee = async(username) => {
    // Returns SecretKey
}

const fetchLoginCustomer = async(username, oneTimePassword) => {
    //Testing
    const response = await fetch(baseURL);
	console.log(response);
	return response;
}

const loginEmployee = async(username, oneTimePassword) => {

}

	module.exports = { fetchLoginCustomer };
