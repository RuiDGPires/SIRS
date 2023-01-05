const baseURL = "https://192.168.1.1";

const registerCustomer = async(username) => {
    // Returns SecretKey
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
