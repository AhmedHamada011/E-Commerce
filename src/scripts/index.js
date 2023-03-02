//back to top button 

console.log(location.origin)
let totopBtn = document.getElementById('totop');
totopBtn.style.display = 'none' ;

totopBtn.addEventListener('click' , function(){
    window.scrollTo( 0 , 0 )
})

window.addEventListener('scroll' , function(){

    this.scrollY >= 500 ? totopBtn.style.display = 'block'  : totopBtn.style.display = 'none';
})


// contact form and links 

let links = document.querySelectorAll('.home-pointer');

links.forEach(element=>{

    element.addEventListener('click',function(e){

        if(e.target.id === "sendEmail"){

            location.assign('https://mail.google.com/mail')

        }else if(e.target === "callUs" ){

        }else{

            getLocation();   
        }  
    })
})


// function to get the store location from google maps

function getLocation(){

    if(navigator.geolocation){

        navigator.geolocation.watchPosition(showPosition);
    }else{
        let ourLocation = document.getElementById('ourLocation')
        ourLocation.innerText = 'geolocation not supported in your browser';
    }
}

function showPosition(){

    let long = 29.923770;
    let lat = 31.216270;

    location.assign("http://maps.google.com/maps?q" + lat + ",+" + long);
}


// form validation for messages that user could send it from contact section

let contactEmailInput = document.querySelector('#email-input');
let contactForm = document.querySelector('#home-contact form')


function emailValidation (value){

    let contactPattern = /(^\w+)([\.\-_]\w*)*?[@]([a-z]{1,})\.([a-z]{1,})/;
    return contactPattern.test(value)

}

contactForm.addEventListener('submit',function(e){

    let checkmes = document.getElementById('check-mes');

    if(emailValidation(contactEmailInput.value)){

        checkmes.style.display = 'none';
        e.preventDefault();

    }else{

        if(checkmes.style.display !== 'block'){
            checkmes.style.display === 'block';
            checkmes.innerText = "Please enter valid email"
        }
        
        e.preventDefault();
        
    }   
})


// in sale section make hearts on imgs to add it to favorites

let saleImgs = document.querySelectorAll('#home-sale div img');

saleImgs.forEach(element=>{

    element.addEventListener('mouseover' , function(e){

       e.target.parentElement.children[0].classList.add('apper')

       e.target.parentElement.children[0].addEventListener('mouseover' , function(event){
        
            event.target.classList.add('heart-color')

       })

       e.target.parentElement.children[0].addEventListener('mouseout' , function(event){

        event.target.classList.remove('heart-color')

       })
       
       e.target.parentElement.children[0].addEventListener('click' ,function(event){

                event.target.style.color = 'red';
        
       })

    })

   // insert info of product inside the modal

    element.addEventListener('click' , function(e){

        let productDetails = e.target.parentElement.children[2].children;

        let productImgModal = document.querySelector('.modal-body img')
        productImgModal.setAttribute('src' ,e.target.getAttribute('src') )

        let productNameModal = document.querySelector('.modal-body div h4')
        productNameModal.innerText = productDetails[0].innerText;

        let productIdModal = document.querySelector('.modal-body div h6 span')
        productIdModal.innerText = productDetails[1].firstElementChild.innerText
        
        let productPriceModal = document.querySelector('.modal-body div h5');
        productPriceModal.innerText = Number.parseInt(productDetails[2].firstElementChild.innerText);
        
    })
})


// link of ads section to thier hrefs

let secondSectionLinks = document.querySelectorAll('.btn-origin')

secondSectionLinks.forEach(element=>{
    element.addEventListener('click' , function(){

        if(location.href.includes('/index.html')){

            let href = location.pathname.replace('/index.html',"")

            location.assign(href + '/src/pages/mensectionpage.html')
        }else{
            let href = location.pathname;
            location.assign(href + 'src/pages/mensectionpage.html')
        }
        

    })
})


// fetch data from server and put it in sale section

// fetch('https://taobao-api.p.rapidapi.com/api')
// .then((response)=>{

//     if(response.ok === false){
//         throw new Error(response.status)
//     }else{
//         return response.json()
//     }
// })
// .then((data)=>{
//     console.log(data.data[0])
// })
// .catch(err=>{
//     console.log(err)
// })




// add to cart mechanism

let cart = {};
let cartBtn = document.querySelector('.cart-btn button')
let token = localStorage.getItem('token')
let modalBody = document.querySelector('#exampleModal .modal-body')
let modalFooter = document.querySelector('#exampleModal .modal-footer')

// check if user logged in or not

cartBtn.setAttribute('data-bs-toggle' , 'modal');
cartBtn.setAttribute('data-bs-target' , "#exampleModal" )

if(token === 'true'){

    getLocal('cart');

cartBtn.addEventListener('click' , function(){

    let productNameModal = document.querySelector('.modal-body div h4').innerText;
    let productPriceModal = document.querySelector('.modal-body div h5').innerText;
    let productImgModal = document.querySelector('.modal-body img').getAttribute('src');

    productImgModal = productImgModal.replace(/^(src)/, '..');

    let productIdModal = document.querySelector('.modal-body div h6 span').innerText;

    addToCart(productNameModal , productPriceModal , productImgModal , productIdModal);

    let cartStr = JSON.stringify(cart);
    setLocal(cartStr)

    modalFooter.classList.add('disapear')
    modalBody.innerHTML = 'added to cart <i class="fa-solid fa-circle-check text-success ms-2"></i>';
    

})
}else{

    modalFooter.classList.remove('disapear')
    modalBody.innerText = 'login first before adding items to cart'
    cartBtn.addEventListener('click' , function(){
        let loginBtn = document.querySelector('#loginBtnHome')
        loginBtn.addEventListener('click' , function(){
            location.assign('./src/pages/loginpage.html')
        })
 
    })

}

// function add product details to object to be added in local storage to reuse it in cart page
function addToCart(productName , productPrice , productImg , productId ){

    let counterBadge = document.querySelectorAll('.badge')
    let product = {

        id : `${productId}`,
        name : `${productName}`,
        price : `${productPrice}`,
        src : `${productImg}`,
        qty : 1
    }

    if(cart.hasOwnProperty(productId)){
        cart[productId].qty += 1;
    }else{
        cart[productId] = product;
    }
    
    let len = 0 ;
    Object.keys(cart).forEach(x=>{
        len += cart[x].qty;
    })
    
    counterBadge.forEach(element=>{
        element.innerText =  `${len}`
    })

}

// function set info to local storage
function setLocal(value){

    localStorage.setItem('cart' , value )
}


// function to get info from local and set number of items added to cart
function getLocal(value){

    let counterBadge = document.querySelectorAll('.badge')
    let check = (localStorage.getItem(value));

    if(check){

        cart = JSON.parse(check);
        
        let len = 0 ;

        Object.keys(cart).forEach(x=>{
            len += cart[x].qty;
        })
        
        counterBadge.forEach(element=>{
            element.innerText =  `${len}`
        })
    }
}



