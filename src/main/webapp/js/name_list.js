// Main Javascript File

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + match[2] + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");

    // Define a URL
    let url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done

    $('#datatable td').remove();
    $('#datatable tbody tr').remove();
    $('#datatable th').remove();
    $('#datatable tbody').append('<tr><th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>ID</th>' +
        '<th>Email</th>' +
        '<th>Phone</th>' +
        '<th>Birthdate</th></tr>');
    $.getJSON(url, null, function(json_result) {
        for (let i = 0; i < json_result.length; i++){
            $('#datatable tbody').append('<tr><td>' +
                                        htmlSafe(json_result[i].first) +
                                        '</td><td>' +
                                        htmlSafe(json_result[i].last) +
                                        '</td><td>' +
                                        json_result[i].id +
                                        '</td><td>' +
                                        htmlSafe(json_result[i].email) +
                                        '</td><td>' +
                                        htmlSafe(json_result[i].phone) +
                                        '</td><td>' +
                                        htmlSafe(json_result[i].birthday) +
                                        '</td></tr>');
            console.log(json_result[i].first, json_result[i].last);
        }
        console.log("Done");
    });
}

// Call your code.
updateTable();

function showDialogAdd() {
    console.log("ADD ITEM");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phoneNumber').val("");
    $('#birthday').val("");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    console.log("Save Changes")
    let isValid = true;
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let phone = $('#phoneNumber').val();
    let birthdate = $('#birthday').val();

    console.log("birthday " + birthdate);

    let reg = /^[A-Za-z]{1,20}$/;
    let regEmail = /^[a-z.]+@+[a-z.]+.+[A-Za-z]{1,3}$/;
    let regPhone = /^[0-9]{1,10}$/;
    let regPhone2 = /^[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+[0-9]+[0-9]+$/;
    let regBirthdate =  /^[0-9]+[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+-+[0-9]+[0-9]+$/;
    let regBirthdate2 = /^[0-1]+[0-9]+[/]+[0-3]+[0-9]+[/]+[0-9]+[0-9]+[0-9]+[0-9]+$/;

    if (reg.test(firstName)){
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
        isValid = false;
    }

    if (reg.test(lastName)){
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        isValid = false;
    }
    if (regEmail.test(email)){
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        isValid = false;
    }
    if (regPhone.test(phone)){
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').addClass("is-valid");
    }else if (regPhone2.test(phone)){
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#phoneNumber').removeClass("is-valid");
        $('#phoneNumber').addClass("is-invalid");
        isValid = false;
    }
    if (regBirthdate2.test(birthdate)){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else if (regBirthdate.test(birthdate)){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    }
    else {
        // This is an INVALID field
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        isValid = false;
    }
    if(isValid){
        console.log("Valid form");
    }

    let my_data = { first : firstName, last : lastName, email : email, phone: formatPhoneNumber(phone), birthday : birthdate};
    let url = "api/name_list_edit";
    console.log(my_data);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(my_data),
        success: function(my_data) {
            console.log(my_data);
            // call update table
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });



}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);
