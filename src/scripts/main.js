



// check if user is logged using token if yes goto home page else login

ifUserLoggedIn()

// check if user is logged using token if yes goto home page else login
function isLoggedIn(){
    if(localStorage.getItem("token")=="true"){
        if(location.href.endsWith("signuppage.html") || (location.href.endsWith("loginpage.html"))){
            location.href=location.origin+"/src/index.html" //important change to index.html after index.html is created
        }
        return true;
    }else{
        if(location.href.endsWith("cartpage.html")){
            location.href=location.origin+"/src/pages/loginpage.html" //important change to index.html after index.html is created
        }
    return false;

    }
}


function ifUserLoggedIn(){
    let logOutBtn=`<button class="d-none d-md-block" id="nav-logOut"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
    if(isLoggedIn()){
        document.querySelector(".nav-main.d-none.d-md-flex >div >ul").innerHTML+=logOutBtn
        logOutBtn=document.getElementById("nav-logOut").addEventListener("click",function(){
            logOut();
        })


    }

}

function logOut(){
    localStorage.setItem("token","false")
    location.href=location.origin+"/index.html" //important change to index.html after index.html is created
}