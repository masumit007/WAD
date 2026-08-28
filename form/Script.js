function validateName() {

    var nameErr = document.getElementById("nameError");

    var sname = document.getElementById("name");

    if (sname.value.length == 0) {

        nameErr.innerHTML = "Student name is mandatory";

        sname.style.border = "2px solid red";

        return false;
    }

    if (!/^[A-Za-z ]+$/.test(sname.value)) {

        nameErr.innerHTML = "Name should contain only alphabets";

        sname.style.border = "2px solid red";

        return false;
    }

    nameErr.innerHTML = "";

    sname.style.border = "2px solid green";

    sname.style.outline = "none";

    return true;
}



function validateEmail() {

    var emailErr = document.getElementById("emailError");

    var email = document.getElementById("email");

    if (email.value.length == 0) {

        emailErr.innerHTML = "Email is mandatory";

        email.style.border = "2px solid red";

        return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(email.value)) {

        emailErr.innerHTML = "Enter a valid email";

        email.style.border = "2px solid red";

        return false;
    }

    emailErr.innerHTML = "";

    email.style.border = "2px solid green";

    email.style.outline = "none";

    return true;
}



function validateSchool() {

    var schoolErr = document.getElementById("schoolError");

    var school = document.getElementById("school");

    if (school.value.length == 0) {

        schoolErr.innerHTML = "School name is mandatory";

        school.style.border = "2px solid red";

        return false;
    }

    schoolErr.innerHTML = "";

    school.style.border = "2px solid green";

    school.style.outline = "none";

    return true;
}



function validatePhone() {

    var phoneErr = document.getElementById("phoneError");

    var phone = document.getElementById("phone");

    if (phone.value.length == 0) {

        phoneErr.innerHTML = "Phone number is mandatory";

        phone.style.border = "2px solid red";

        return false;
    }

    if (!/^[0-9]{10}$/.test(phone.value)) {

        phoneErr.innerHTML = "Enter a valid 10 digit phone number";

        phone.style.border = "2px solid red";

        return false;
    }

    phoneErr.innerHTML = "";

    phone.style.border = "2px solid green";

    phone.style.outline = "none";

    return true;
}



function validateGender() {

    var genderErr = document.getElementById("genderError");

    var gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (gender == null) {

        genderErr.innerHTML = "Please select your gender";

        return false;
    }

    genderErr.innerHTML = "";

    return true;
}



function validateCourse() {

    var courseErr = document.getElementById("courseError");

    var courses = document.querySelectorAll(
        '.course input[type="checkbox"]:checked'
    );

    if (courses.length == 0) {

        courseErr.innerHTML = "Please select at least one course";

        return false;
    }

    courseErr.innerHTML = "";

    return true;
}



function validateLocation() {

    var locationErr = document.getElementById("locationError");

    var location = document.getElementById("location");

    if (location.value == "") {

        locationErr.innerHTML = "Please select institute location";

        return false;
    }

    locationErr.innerHTML = "";

    return true;
}



function validateForm() {

    var name = validateName();

    var email = validateEmail();

    var school = validateSchool();

    var phone = validatePhone();

    var gender = validateGender();

    var course = validateCourse();

    var location = validateLocation();


    if (
        name &&
        email &&
        school &&
        phone &&
        gender &&
        course &&
        location
    ) {

        alert("Form submitted successfully!");

        return true;
    }

    return false;
}