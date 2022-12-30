function login_employee() {
    console.log(document.getElementById("employee_user").value);
    // TODO -> Send request to server to login?
    window.location.href = "./employee.html"
}

function login_customer() {
    console.log(document.getElementById("customer_user").value);
    // TODO -> Send request to server to login?
    window.location.href = "./customer.html"
}