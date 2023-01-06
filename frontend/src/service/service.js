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

    return response;
}

export const loginCustomer = async(username, oneTimePassword) => {
    const response = await fetch(baseURL + '/clients/' + username + '/login?otp=' + oneTimePassword);

    return response;
}

export const registerEmployee = async(firstName, lastName, email, userName) => {
	const data = new URLSearchParams();
	data.append("first_name", firstName);
	data.append("last_name", lastName);
	data.append("email", email);
    const response = await fetch(baseURL + `/employees/` + userName, {
        method: "POST",
        body: data
    });

    return response;
}


export const loginEmployee = async(username, oneTimePassword) => {
    const response = await fetch(baseURL + '/employees/' + username + '/login?otp=' + oneTimePassword);

    return response;
}

export const listBikes = async(token) => {
    const response = await fetch(baseURL + "/bicicles/list?token=" + token);

    return response;
}

export const lockBike = async(token) => {
    // TODO
}

export const unlockBike = async(token) => {
    // TODO
}

export const ping = async() => {
	console.log(await fetch(baseURL));
}
