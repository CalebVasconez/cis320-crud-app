// This calls our back-end Java program that sets our session info
function login() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var sessionKey = $("#loginId").val();
    var sessionValue = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        $("#loginId").val("");
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    let url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getSessionResult').html(dataFromServer)
        let cleaned = dataFromServer.replace(/\W/ig, '')
        // console.log(cleaned);
        if (cleaned == "Youareloggedinasnull"){
            button = $('#invalidateSession');
            button2 = $('#logout');
            button.hide();
            button2.hide();
        }
        else {
            button = $('#invalidateSession');
            button2 = $('#logout');
            button.show();
            button2.show();
        }
    });


}

// This method calls the servlet that invalidates our session
function logoutButton() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.hide();

button = $('#login');
button.on("click", login);
button.on("click", getLogin);

button = $('#invalidateSession');
button.on("click", logoutButton);
button.on("click", getLogin);

getLogin();