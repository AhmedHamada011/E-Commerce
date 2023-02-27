const homeDelivery = document.getElementById("home-delivery");
const personalInfo = document.getElementById("personal-info");
const personalInfoBody = document.getElementById("flush-collapseOne");
const personalInfoSave =  document.getElementById("save");
const freeShipingMessage = document.getElementById("done-personal-data");
const showAllPersonalInfo = document.getElementById("showAllPersonalInfo");
const changePersonalData = document.getElementById("change");
const credit = document.getElementById("card-display");
const creditRadio = document.getElementById("credit");
const cash = document.getElementById("cash");
const COMPLETE_PURCHASE = document.getElementById("COMPLETE-PURCHASE");
const getFullName = document.getElementById("getFullName");
const getEmail = document.getElementById("getEmail");
const getPhone = document.getElementById("getPhone");
const getCity = document.getElementById("getCity");
const getRegion = document.getElementById("getRegion");
const openMap = document.getElementById("open-map");
const getLandMark = document.getElementById("getLandMark");
const zips = document.getElementById("zips");

let flag = false;
let saveFlag = false;

//Functions

function changeFlag1 () {
    //anything
}

function savePersonalData () {
    personalInfo.setAttribute("aria-expanded",false);
    personalInfo.classList.add("collapsed");
    personalInfoBody.classList.add("collapsing");
    personalInfoBody.classList.remove("show");

    freeShipingMessage.classList.remove("d-none");

    showAllPersonalInfo.classList.remove("d-none");
    personalInfo.classList.add("d-none");
    flag = true;

    document.getElementById("putFullName").innerText = getFullName.value ; 
    document.getElementById("Email-phone-city-region").innerText = `${getEmail.value}, ${getPhone.value}, ${getCity.value}, ${getRegion.value}` ; 

    checkSaveInfoButton();
}

function reset () {
    personalInfo.classList.remove("d-none");
    showAllPersonalInfo.classList.add("d-none");
    freeShipingMessage.classList.add("d-none");
    flag = false;

    checkSaveInfoButton();
}

function showCredit () {
    if (creditRadio.checked === true) {
     credit.classList.remove("d-none");
    }
}

function hideCredite () {
    credit.classList.add("d-none");
}

function checkSaveInfoButton () {
    if ( (homeDelivery.checked || openMap.checked) && flag && (creditRadio.checked || cash.checked) ) {
        COMPLETE_PURCHASE.removeAttribute("disabled");
    }
    else {
        COMPLETE_PURCHASE.setAttribute("disabled","");
    }
}


function openThisMap () {
    //Open map
}

function validationFullName () {
    let regex = /[0-9]/g
    let string = this.value;

    let stringHasNumbers = regex.test(string);
    if (stringHasNumbers) {
        // red
        this.parentNode.querySelector('span').classList.remove('d-none');
        
    }
    else {
        // green
        this.parentNode.querySelector('span').classList.add('d-none');
        
    }
}  

function validationEmail() {
    let regex = /(\@)|(\.com)/g
    let string = this.value;

    let stringHasNumbers = regex.test(string);
    if (!stringHasNumbers) {
        // red
        this.parentNode.querySelector('span').classList.remove('d-none');
        
    }
    else {
        // green
        this.parentNode.querySelector('span').classList.add('d-none');
        
    }
}

function validationPhoneNumber() {
    let regex = /[a-zA-Z]/g
    let string = this.value;

    let stringHasNumbers = regex.test(string);
    if (stringHasNumbers) {
        // red
        this.parentNode.querySelector('span').classList.remove('d-none');
    }
    else {
        // green
        this.parentNode.querySelector('span').classList.add('d-none');
    }

}


function locationValidation () {
    if (!this.value) {
        this.parentNode.querySelector('span').classList.remove('d-none');
    }
}

function checkOutTotalPrice() {
    document.getElementById("CheckOut-Total-Cost").innerText = `EGP ${localStorage.getItem("sumprice")}`;
}
//Events

homeDelivery.addEventListener('click' , changeFlag1 );
openMap.addEventListener('click', openThisMap);
personalInfoSave.addEventListener('click', savePersonalData);
changePersonalData.addEventListener('click', reset);
creditRadio.addEventListener('click', showCredit);
creditRadio.addEventListener('click',checkSaveInfoButton);
cash.addEventListener('click' , hideCredite);
getFullName.addEventListener('input', validationFullName);
getEmail.addEventListener('input' , validationEmail);
getPhone.addEventListener('input', validationPhoneNumber);
getCity.addEventListener('input', locationValidation);
getRegion.addEventListener('input', locationValidation);
zips.addEventListener('input', locationValidation);
