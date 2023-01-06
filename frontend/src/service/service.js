const baseURL = "https://192.168.1.1";

export const registerCustomer = async(firstName, lastName, email, userName) => {
	const data = new URLSearchParams();
	data.append("first_name", firstName);
	data.append("last_name", lastName);
	data.append("email", email);
    const response = await fetch(baseURL + `/clients/` + userName, {
        method: "POST",
        body: data
    });

    console.log(response);

    return response;
}

export const loginCustomer = async(username, oneTimePassword) => {
    const response = await fetch(baseURL + '/clients/' + username + '/login?otp=' + oneTimePassword);

    console.log(response);

    return response;
}

const registerEmployee = async(username) => {
    // Returns SecretKey
}



export const loginEmployee = async(username, oneTimePassword) => {

}

export const ping = async() => {
	console.log(await fetch(baseURL));
}
