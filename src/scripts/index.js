

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

    let long = 29.964300;
    let lat = 31.217340;

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
saleImgs.forEach(element=>{
    element.addEventListener("click" , function(e){
        // go to where
    })

    element.addEventListener('mouseover' , function(e){
       e.target.parentElement.children[0].classList.add('apper')

       e.target.parentElement.children[0].addEventListener('mouseover' , function(event){
        event.stopImmediatePropagation();
            console.log(event.target);
            event.target.style.color = 'red'


       })
       e.target.parentElement.children[0].addEventListener('click' , function(){

       })

    })

    element.addEventListener('mouseout' , function(e){

        e.target.parentElement.children[0].classList.remove('apper')

    })
})
