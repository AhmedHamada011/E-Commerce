'use strict'

        const form = document.querySelector('.needs-validation')
        const pass = document.getElementById('floatingPassword')
        const repeatPass = document.getElementById('floatingRepeatPassword')
        const UserName = document.getElementById('floatingUsername')
        const email=document.getElementById("floatingInputEmail")
        
        //check email validation using regex
        email.addEventListener("input",function(){
            checkInputValidation(/[[a-zA-Z]{1}\w*\.*\w+]*@{1}[a-zA-Z]+\.{1}[a-zA-Z]*$/,this)
        })

        //check pass and repeatPass validation using regex
        pass.addEventListener("input",function(){
            checkInputValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,this)
            checkInputValidation(`(${pass.value})`,repeatPass)
            if(repeatPass.value==''){
                repeatPass.setCustomValidity("notValid")
            }
        })

        //check repeatPass validation using regex
        repeatPass.addEventListener("input",function(){
            checkInputValidation(`(${pass.value})`,this)
            if(repeatPass.value==''){
                repeatPass.setCustomValidity("notValid")
            }
        })
        
        //check form validation if success put data in localstorage and go to login page

        form.addEventListener('submit',function( event ) {
            checkAllInputValidation()
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            localStorage.setItem("username",UserName.value)
            localStorage.setItem("email",email.value.toLowerCase())
            localStorage.setItem("password",pass.value)
            form.classList.add('was-validated')
        }, false)

        function checkAllInputValidation(){
            checkInputValidation(/[[a-zA-Z]{1}\w*\.*\w+]*@{1}[a-zA-Z]+\.{1}[a-zA-Z]*$/,email)
            checkInputValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,pass)
            checkInputValidation(`(${pass.value})`,repeatPass)
            if(repeatPass.value==''){
                repeatPass.setCustomValidity("notValid")
            }
        }

        //check inputs validation using regex
        function checkInputValidation(regex,element){
            const reg=new RegExp(regex)
            
            if(!reg.test(element.value)){
                element.setCustomValidity("notValid")
            }else{
                element.setCustomValidity("")
            }
        }

