



//back to top button 
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


// form validation for messages

let contactEmailInput = document.querySelector('#email-input');
let contactForm = document.querySelector('#home-contact form')



function emailValidation (value){

    let contactPattern = /(^\w+)([\.\-_]\w*)*?[@]([a-z]{1,})\.([a-z]{1,})/;
    console.log(contactPattern.test(value))

    return contactPattern.test(value)


}

contactForm.addEventListener('submit',function(e){

    let checkmes = document.getElementById('check-mes');

    if(emailValidation(contactEmailInput.value)){

        checkmes.style.display = 'none';
        e.preventDefault();

    }else{

        console.log(checkmes.style.display )

        if(checkmes.style.display !== 'block'){
            checkmes.style.display === 'block';
            checkmes.innerText = "Please enter valid email"
        }
        
        e.preventDefault();
        
    }   
    
})


let saleImgs = document.querySelectorAll('#home-sale div img');

console.log(saleImgs)

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

        let productDetails = e.target.parentElement.children[2];

        let productImgModal = document.querySelector('.modal-body img')
        productImgModal.setAttribute('src' ,e.target.getAttribute('src') )

        let productNameModal = document.querySelector('.modal-body div h4')
        productNameModal.innerText = productDetails.firstElementChild.innerText;

        let productPriceModal = document.querySelector('.modal-body div h6');
        productPriceModal.innerText = productDetails.lastElementChild.firstElementChild.innerText ;

    })
})


let secondSectionLinks = document.querySelectorAll('.btn-origin')

secondSectionLinks.forEach(element=>{
    element.addEventListener('click' , function(){
        location.assign('http://127.0.0.1:5500/src/pages/mensectionpage.html')
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


let cart = [];
let cartBtn = document.querySelector('.cart-btn button')

getLocal();

cartBtn.addEventListener('click' , function(){

    let productNameModal = document.querySelector('.modal-body div h4').innerText;
    let productPriceModal = document.querySelector('.modal-body div h6').innerText;
    let productImgModal = document.querySelector('.modal-body img').getAttribute('src')

    addToCart(productNameModal , productPriceModal , productImgModal );
    setLocal()

})



function addToCart(productName , productPrice , productImg ){

    let counterBadge = document.querySelectorAll('.badge')
    let product = {

        id : Date.now(),
        name : `${productName}`,
        price : `${productPrice}`,
        src : `${productImg}`,
        qty : 1
    }

    cart.push(product)

    counterBadge.forEach(element=>{
        element.innerText =  `${cart.length}`
    })

    // counterBadge[].innerText = `${cart.length}`

}

function setLocal(){

    localStorage.setItem('cart' , JSON.stringify(cart) )
}

function getLocal(){

    let counterBadge = document.querySelectorAll('.badge')
    let check = (localStorage.getItem('cart'));

    if(check){
        cart = JSON.parse(check);

        counterBadge.forEach(element=>{
            element.innerText =  `${cart.length}`
        })
    }
}

function deleteLocal(){


}
