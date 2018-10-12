
function ValidateUserDetails(Name,username,password,confirmpassword) {
    //Signup - storing user details in local storage
    //Created by : Hiresh
    //Created Date : 09-17-2018

    //Validation Starts
    var missingValues = "";
    if (Name == null || Name == "") {
        missingValues = missingValues + "Name,";
    }
    if (username == null || username == "") {
        missingValues = missingValues + "Username,";
    }
    if (password == null || password == "") {
        missingValues = missingValues + "Password,";
    }
    if (confirmpassword == null || confirmpassword == "") {
        missingValues = missingValues + "Confirm Password,";
    }
    if (missingValues != null && missingValues != "") {
        return "Please Enter :" + missingValues.substr(0,missingValues.length-1);
    }
    else
    {
        return "";
    }
}
function getUserDetails() {
    var users = JSON.parse(localStorage.getItem('UserDetails'));
    return users?users:[];
}
function CheckUser(scope)
{
    var username="";var password="";
    username=scope.txtUsername;
    password=scope.txtPassword;
    var errormessage="";
    if(username==null || username==""){
        errormessage=errormessage+"Username,";
    }
    if(password==null || password==""){
        errormessage=errormessage+"password,";
    }
    if(errormessage!=null && errormessage!=""){
        return("Enter "+errormessage.substr(0,errormessage.length-1));
    }
    var array=[];
    array=getUserDetails();
    if(array.filter(user=>user.username==username).length>0)
    {
        if(array.filter(user=>user.username==username && user.password==password).length>0){
            sessionStorage.FBName=array.filter(user=>user.username==username && user.password==password)[0].name;
            return "valid";
        }
        else{
            return "Invalid"
        }
    }
    else
    {
        return "nouser";
    }
}
