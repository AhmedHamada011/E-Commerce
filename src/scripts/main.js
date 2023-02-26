



// check if user is logged using token if yes goto home page else login

addLogout_inButtons()

//continue adding page later
// if(document.title=="men section"){//add products to men page
//     getMenProducts()
// }else if(document.title=="women section"){//add products to women page
//     getWomenProducts()
// }else if(document.title=="shop"){//add products of men and women to shop
//     getMenProducts()
//     getWomenProducts()
// }


export function getMenProducts(){
    getProducts("mens-shirts","men-collapseOne",true)
    getProducts("mens-shoes","men-collapseThree",false)
}
export function getWomenProducts(){
    getProducts("womens-dresses","women-collapseOne",true)
    getProducts("tops","men-collapseTwo",false)
    getProducts("womens-shoes","women-collapseThree",false)
    getProducts("womens-bags","women-collapseFour",false)
}






// check if user is logged using token if yes goto home page else login
function isLoggedIn(){
    if(localStorage.getItem("token")=="true"){
    getLocal()

        if(location.href.endsWith("signuppage.html") || (location.href.endsWith("loginpage.html"))){
            location.href=location.origin+"/index.html" //important change to index.html after index.html is created
        }
        return true;
    }else{
        document.querySelector("nav .fa-cart-shopping").parentElement.href=""
        document.querySelector("nav .fa-cart-shopping").parentElement.setAttribute("onclick","event.preventDefault()")
        if(location.href.endsWith("cartpage.html")){

            location.href=location.origin+"/src/pages/loginpage.html" //important change to index.html after index.html is created
        }
    return false;

    }
}


// check if user is logged in 

export function addLogout_inButtons(){
    let desk_login_out=document.querySelector(".nav-main.d-none.d-md-flex >div >ul");
    let mob_login_out=document.querySelector(".offcanvas-body > ul .log-out")
    //if user is logged in show logout
    if(isLoggedIn()){
        desk_login_out.innerHTML+=`<button class="d-none d-md-block" id="nav-logOut"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;

        mob_login_out.innerHTML=`<button  id="mobile-nav-logOut"><i class="fa-solid fa-arrow-right-from-bracket mx-0 me-1"></i>logout</button>`;

        document.getElementById("mobile-nav-logOut").addEventListener("click",function(){ // add event to log ou button
            logOut();
        })

        document.getElementById("nav-logOut").addEventListener("click",function(){ // add event to log ou button
            logOut();
        })

    //if user is logged out show login

    }else{
        desk_login_out.innerHTML+=`<button class="d-none d-md-block" id="nav-login">login</button>`;

        mob_login_out.innerHTML=`<button  id="mobile-nav-login"><i class="fa-solid fa-arrow-right-to-bracket mx-0 me-1"></i>login</button>`;

        
        document.getElementById("mobile-nav-login").addEventListener("click",function(){ // add event to log ou button
            location.href=location.origin+"/src/pages/loginpage.html"
        })

        document.getElementById("nav-login").addEventListener("click",function(){ // add event to log ou button
            location.href=location.origin+"/src/pages/loginpage.html"
        })

    }

}
//log out the user when he clicks on log out button
function logOut(){
    localStorage.setItem("token","false")
    location.href=location.origin+"/index.html" //important change to index.html after index.html is created
}
//get proucts from api and adds it to page
function getProducts(product,collapseId,isOpen){
    
    // let cardHolder=document.querySelector(`#accordionExample #${section} .accordion-body`)mid_section
    addAccordion(product,collapseId,isOpen)

    // console.log("before",cardHolder);
    // let link=`https://dummyjson.com/products/category/${product}`
    fetch(`https://dummyjson.com/products/category/${product}`)
    .then(res => 
        res.json() 
    )
    .then(res => {
        // console.log(res);
        res.products.forEach(element => {
            addProductItem(element,collapseId)
            // console.log(element.id)
        sessionStorage.setItem(`${element.id}`,JSON.stringify(element))

    })

    return res;
}).then(res=>{
    res.products.forEach(element=>{
        
        addEventModal(element.id);

    })
}).then(()=>{
    if(localStorage.getItem("token")=="true"){
        document.querySelectorAll(".product-addtocart-btn").forEach(btn=>{
            btn.onclick =function(e){
                let data=getProductId(this);
                addToCart(data.id,data.qty)
            }
        })
    }
})

}

//add accordion take product name collapse Id and is collapse open od closed
function addAccordion(product,collapseId,isOpen){
    let accordion=`
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button text-light bg-dark ${isOpen?"":"collapsed"}" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}" aria-expanded="${isOpen}" aria-controls="${collapseId}">
                    <h3>${product.replace("-"," ")}</h3>
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body row row-cols-1 row-cols-md-2 row-cols-lg-3 row-col-xl-4">
                
                </div>
            </div>
        </div>
        `
    document.querySelector(`#accordionExample`).innerHTML+=accordion;
}

//add products to accordion
function addProductItem(element,collapseId){
    let cardHolder=document.querySelector(`#${collapseId} .accordion-body`);

    let card=
        `<div class="product p-1 d-flex align-items-stretch" id="${element.id}">
            <div class="card d-flex bg-light">
            
            <button class="product-modal-btn btn-${element.id}" type="button"data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src="${element.thumbnail}" class="thumbnail card-img-top" alt="..."></button>
                <div class="men_section_thumbnails card-body col d-flex flex-column justify-content-end gap-2">
                    <p class="card-text m-0 product_title h2">${element.title}</p>
                    <p class="card-text m-0 product_id" data-id="${element.id}">id: ${element.id}</p>
                    <p class="card-text m-0 product_color">color: black</p>
                    <p class="card-text m-0 product_size">size: ${element.Size||"medium"}</p>
                    <p class="card-text m-0 product_price">price: ${element.price} egp</p>
                    <input class="input-number product_qty" type="number" placeholder="Qty" min="1" style="width:80px" value="1">
                    <button class="product-addtocart-btn btn btn-dark"><i class="fa-solid fa-cart-shopping"></i> add to cart</button>
                </div>
            </div>
        </div>`
        // console.log(document.querySelector(`.btn-${element.id}`));
        
        cardHolder.innerHTML+=card;
        // console.log(document.querySelector(`.btn-${element.id}`));
        let item=document.querySelector(`.btn-${element.id}`);
}


function addEventModal(id){
    let product=document.querySelector(`.btn-${id}`);
    // console.log(product);

    product.addEventListener("click",function(e){
        // console.log("asdasdas",product);

        // let id=product.closest(".product").id;

        let productDataObject=JSON.parse(sessionStorage.getItem(id));

        // console.log(productDataObject);
        
        changeModalData(productDataObject)


        let carousel_indicator=document.querySelector(".carousel-indicators")
        let carousel_inner=document.querySelector(".carousel-inner")

        carousel_inner.innerHTML=""
        carousel_indicator.innerHTML=""
        let count=0;
        productDataObject.images.reverse();
        productDataObject.images.forEach(img=>{
            
            carousel_indicator.innerHTML+=`<button class="bg-primary" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${count++}" aria-label="Slide ${count}"></button>`
            carousel_inner.innerHTML+=
            `<div class="carousel-item">
            <img src="${img}" class="d-block w-100" alt="...">
            </div>`
        })

        document.querySelector(".carousel-item").classList.add("active")
        carousel_indicator.firstElementChild.classList.add("active")
        carousel_indicator.firstElementChild.setAttribute("aria-current","true")


    })

}



function changeModalData(productData){
    document.querySelector(".modal-title").innerText=productData.title;
    document.querySelector(".modal-id").innerText=`id: ${productData.id}`;
    document.querySelector(".modal-id").setAttribute("data-id",productData.id);

    document.querySelector(".modal-price").innerText=`price: ${productData.price} egp`;
    document.querySelector(".modal-desc").innerText=`description: ${productData.description}`;
    document.querySelector(".modal-brand").innerText=`brand: ${productData.brand}`;
    document.querySelector(".modal-category").innerText=`category: ${productData.category}`;
    document.querySelector(".modal-stock").innerText=`in stock: ${productData.stock}`;
    document.querySelector(".modal-qty").value=1;
}


function getProductId(product){
    let id=product.closest(".product").querySelector(".product_id").getAttribute("data-id")
    let qty=product.closest(".product").querySelector(".product_qty").value;

    product={
        id:id,
        qty:Number.parseInt(qty),
    }
    return product;
}

function addToCart(id,qty){
    // let counterBadge = document.querySelectorAll('.badge')
    // console.log(id,qty);
    let productData=JSON.parse( sessionStorage.getItem(id));
    let cart;
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart",JSON.stringify({}))
    }
    cart=JSON.parse(localStorage.getItem("cart"))
    
    console.log(cart[id]?cart[id].qty+qty:qty);
    let product = {
        id : productData.id,
        name : productData.title,
        price : productData.price,
        src : productData.thumbnail,
        qty : cart[id]?cart[id].qty+qty:qty
    }

    cart[id]=product;
    setLocal(JSON.stringify(cart));
    getLocal();
    

}

function setLocal(item){
    localStorage.setItem('cart' , item )
}


function getLocal(){

    let counterBadge = document.querySelectorAll('.badge')
    let check = (localStorage.getItem('cart'));

    if(check){
        let itemsCount=0;
        let cart = JSON.parse(check);
        console.log(Object.values(cart));
        for(let item of Object.values(cart)){
            // console.log(item["qty"]);
            itemsCount+=Number.parseInt(item.qty);
        }
        counterBadge.forEach(element=>{
            element.innerText = `${itemsCount}`
        })
    }
}