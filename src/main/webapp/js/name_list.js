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
        '<th>Birthdate</th>' +
        '<th>Actions</th></tr>');
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
                                        '</td><td>' +
                                        '<button type=\'button\' name=\'edit\' class=\'editButton btn btn-primary\' value=' +
                                        json_result[i].id + '>' +
                                        'Edit\n' +
                                        '</button>\n' +
                                        '<button type=\'button\' name=\'delete\' class=\'deleteButton btn btn-danger\' value=' +
                                        json_result[i].id + '>' +
                                        'Delete\n' +
                                        '</button>\n' +
                                        '</td></tr>');
            // console.log(json_result[i].first, json_result[i].last);
        }
        // Buttons for edit and delete
        let buttons = $(".deleteButton");
        buttons.on("click", deleteItem);
        let buttons1 = $(".editButton");
        buttons1.on("click", editItem);
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

$('#myModal').on('show.bs.modal', function () {
    $('#firstName').focus();
});

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    console.log("Save Changes")
    // Call values of fields
    let isValid = true;
    let identification = $('#id').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let phone = $('#phoneNumber').val();
    let birthdate = $('#birthday').val();

    // Validation regular expression for all fields
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
        $('#firstName').focus();
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
        $('#myModal').modal('hide');
    }

    let my_data = {};
    if (identification == 0){
        my_data = { first : firstName, last : lastName, email : email, phone: formatPhoneNumber(phone), birthday : birthdate};
    }
    else my_data = { id : identification, first : firstName, last : lastName, email : email, phone: formatPhoneNumber(phone), birthday : birthdate};
    let url = "api/name_list_edit";

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

$(document).keydown(function(e) {
    // console.log(e.keyCode);
    if(e.keyCode == 65 && !$('#myModal').is(':visible')){
        showDialogAdd();
    }
})

function editItem(e) {
    console.log("Edit: " + e.target.value);

    // Grab the id from the event
    let id = e.target.value;

    // This next line is fun.
    // "e" is the event of the mouse click
    // "e.target" is what the user clicked on. The button in this case.
    // "e.target.parentNode" is the node that holds the button. In this case, the table cell.
    // "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
    // "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
    // "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
    // "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
    // How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.
    let first = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    let last = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    let email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    let phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    let birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    // Parse date to current time in milliseconds
    let timestamp = Date.parse(birthday);
    // Made date object out of that time
    let dateObject = new Date(timestamp);
    // Convert to a full ISO formatted string
    let fullDateString = dateObject.toISOString();
    // Trim off the time part
    let shortDateString = fullDateString.split('T')[0];


    let regexp2 = /(\d{3})(\d{3})(\d{4})/;
    let match2 = phone.match(regexp2);

    let phoneString = match2[1] + - + match2[2] + - + match2[3]

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(first);
    $('#lastName').val(last);
    $('#email').val(email);
    $('#phoneNumber').val(phoneString);
    $('#birthday').val(shortDateString);

// Show the window
    $('#myModal').modal('show');
}

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
    let my_data2 = { id : e.target.value};
    let url2 = "api/name_list_delete";
    $.ajax({
        type: 'POST',
        url: url2,
        data: JSON.stringify(my_data2),
        success: function(my_data2) {
            console.log(my_data2);
            // call update table
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}