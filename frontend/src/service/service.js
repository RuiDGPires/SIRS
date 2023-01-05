const baseURL = "https://192.168.1.1";

const registerCustomer = async(username) => {
    // Returns SecretKey
}

const registerEmployee = async(username) => {
    // Returns SecretKey
}

const fetchLoginCustomer = async(username, oneTimePassword) => {
    const response = await fetch(baseURL); //Testing
    console.log(response);
}

const loginEmployee = async(username, oneTimePassword) => {

}

module.exports = { fetchLoginCustomer };