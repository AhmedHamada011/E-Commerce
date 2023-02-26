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
let flag1 = false;
let flag2 = false;
let flag3 = false;


//Functions

function changeFlag1 () {
    if ( homeDelivery.checked === true ) {
        flag1 = true;
    }
    checkSaveInfoButton();
}

function savePersonalData () {
    personalInfo.setAttribute("aria-expanded",false);
    personalInfo.classList.add("collapsed");
    personalInfoBody.classList.add("collapsing");
    personalInfoBody.classList.remove("show");

    freeShipingMessage.classList.remove("d-none");

    showAllPersonalInfo.classList.remove("d-none");
    personalInfo.classList.add("d-none");
    flag2 = true;

    checkSaveInfoButton();
}

function reset () {
    personalInfo.classList.remove("d-none");
    showAllPersonalInfo.classList.add("d-none");
    freeShipingMessage.classList.add("d-none");
    flag2 = false;

    checkSaveInfoButton();
}

function showCredit () {
    if (creditRadio.checked === true) {
     credit.classList.remove("d-none");
    }
    flag3 = true ;
    checkSaveInfoButton();
}

function hideCredite () {
    credit.classList.add("d-none");
}

function checkSaveInfoButton () {
    if ( flag1 && flag2 && flag3 ) {
        COMPLETE_PURCHASE.removeAttribute("disabled");
    }
    else {
        COMPLETE_PURCHASE.setAttribute("disabled","");
    }
}

function done () {
    alert("Done");
}

//Events

homeDelivery.addEventListener('click' , changeFlag1 );
personalInfoSave.addEventListener('click', savePersonalData);
changePersonalData.addEventListener('click', reset);
creditRadio.addEventListener('click', showCredit);
cash.addEventListener('click' , hideCredite);
COMPLETE_PURCHASE.addEventListener('click' , done);