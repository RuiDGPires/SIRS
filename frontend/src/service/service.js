const baseURL = "https://192.168.1.1";

const registerCustomer = async(userName, firstName, lastName, email) => {
    const response = await fetch(baseURL + `/clients/` + userName, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": email
        }),
    });

    console.log(response);

    return response;
}

const registerEmployee = async(username) => {
    // Returns SecretKey
}

export const fetchLoginCustomer = async(username, oneTimePassword) => {

}

export const loginEmployee = async(username, oneTimePassword) => {

}

export const ping = async() => {
	console.log(await fetch(baseURL));
}
