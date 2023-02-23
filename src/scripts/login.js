
let loginForm = document.getElementById('form')
let warningWord = document.getElementById('wrongPass')
warningWord.style.display = 'none';


// check if data in localstorage is the same as user write or not

loginForm.addEventListener('submit' , function(event){

    let validEmail = localStorage.getItem('email')
    let validPassword = localStorage.getItem('password')
    let loginEmail = document.getElementById('floatingInput')
    let loginPassword = document.getElementById('floatingPassword')

    if(loginEmail.value === validEmail && loginPassword.value === validPassword){

        loginForm.setAttribute('action', '../index.html' )
        loginForm.setAttribute('method', 'GET' )
        localStorage.setItem("token","true")
        warningWord.style.display = 'none';

    }else{
        warningWord.style.display = 'block'
        event.preventDefault()
    }

})

