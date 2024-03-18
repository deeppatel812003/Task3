var values = {
  fullname: '',
  email: '',
  dob: '',
  gender: '',
  pwd: '',
  cpwd: '',
  bio: '',
  accept: '',
  city:'',
}

var errors = {
  fullnameError: '',
  emailError: '',
  dobError: '',
  genderError: '',
  pwdError: '',
  cpwdError: '',
  bioError: '',
  acceptError: '',
  cityEror:''
}
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;

function setValue(e) {
  let field = e.target.id;
  let val = e.target.value.trim();

  if (field.includes('gender')) {
    field = 'gender';
    let genderVal = document.querySelector('input[name="gender"]:checked')?.value;
    val = genderVal == undefined ? "" : genderVal;
  } else if (field == 'accept') {
    val = document.getElementById(field).checked ? true : "";
  }
  values[field] = val;
  checkError(field, val);
}

function checkError(field, val) {

  if (values[field] == "") {
    errors[field + "Error"] = field + " is required *";
  }else if (field == "fullname" && !isNaN(val)) {
    errors[field + "Error"] = "Invalid " + field;
  }else if (field == 'email' && !emailRegex.test(val)) {
    errors[field + "Error"] = "Enter valid " + field;
  }else if (field == "dob") {
    let todate = new Date();
    let dobDate = new Date(val)
    if (todate.getTime() < dobDate.getTime()) {
      errors[field+"Error"] = "Enter valid " + field; 
    } else {
      errors[field+"Error"] = "";
    }
  }else if (field == 'pwd' && !paswd.test(val)) {
    errors[field + "Error"] = "Enter strong " + field;
  }else if (field == 'cpwd' && values["pwd"] != values["cpwd"]) {
    errors[field + "Error"] = "Invalid " + field;
  }else if (field == 'bio' && values["bio"].length < 15) {
    errors[field + "Error"] = "Enter 15 characters of " + field;
  }else {
    errors[field + "Error"] = "";
  }
  document.getElementById(field + "Error").innerHTML = errors[field + "Error"];
}

function submitData() {
  let isFail=false;
  let allField = Object.keys(values)
  allField.forEach((field) => {
    checkError(field, values[field])
    if(errors[field+"Error"].length>0){
      isFail=true;
      return;
    }
  });
  if(!isFail){
    alert("Thank you\nData Submitted Successfully")
  }
}

