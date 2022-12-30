function login_employee() {
    employee = document.getElementById("employee_user").value
    console.log(employee);
    // TODO -> Send request to server to login?
    window.location.href = "./employee.html?user=" + employee
}

function login_customer() {
    customer = document.getElementById("customer_user").value
    console.log(customer);
    // TODO -> Send request to server to login?
    window.location.href = "./customer.html?user=" + customer
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
