



// check if user is logged using token if yes goto home page else login

ifUserLoggedIn()

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
    getProducts("tops","men-collapseTwo",false)
    getProducts("mens-shoes","men-collapseThree",false)
}
export function getWomenProducts(){
    getProducts("womens-dresses","women-collapseOne",true)
    getProducts("womens-shoes","women-collapseTwo",false)
    getProducts("womens-bags","women-collapseThree",false)
}






// check if user is logged using token if yes goto home page else login
export function isLoggedIn(){
    if(localStorage.getItem("token")=="true"){
        if(location.href.endsWith("signuppage.html") || (location.href.endsWith("loginpage.html"))){
            location.href=location.origin+"/index.html" //important change to index.html after index.html is created
        }
        return true;
    }else{
        if(location.href.endsWith("cartpage.html")){
            location.href=location.origin+"/src/pages/loginpage.html" //important change to index.html after index.html is created
        }
    return false;

    }
}

// check if user is logged in 

function ifUserLoggedIn(){
    let logOutBtn=`<button class="d-none d-md-block" id="nav-logOut"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>`;
    if(isLoggedIn()){
        document.querySelector(".nav-main.d-none.d-md-flex >div >ul").innerHTML+=logOutBtn
        document.querySelector(".offcanvas-body > ul .log-out").innerHTML=`<button  id="mobile-nav-logOut"><i class="fa-solid fa-arrow-right-from-bracket mx-0 me-1"></i>logout</button>`;

        document.getElementById("mobile-nav-logOut").addEventListener("click",function(){ // add event to log ou button
            logOut();
        })

        logOutBtn=document.getElementById("nav-logOut").addEventListener("click",function(){ // add event to log ou button
            logOut();
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
                    <p class="card-text m-0" id="men_section_title h2">${element.title}</p>
                    <p class="card-text m-0" id="men_section_id">id: ${element.id}</p>
                    <p class="card-text m-0" id="men_section_color">color: black</p>
                    <p class="card-text m-0" id="men_section_size">size: ${element.Size||"medium"}</p>
                    <p class="card-text m-0" id="men_section_price">price: ${element.price}$</p>
                    <input class="input-number" type="number" placeholder="Qty" min="1" style="width:80px">
                    <button class=" btn btn-dark"><i class="fa-solid fa-cart-shopping"></i> add to cart</button>
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
    document.querySelector(".modal-price").innerText=`price: ${productData.price}$`;
    document.querySelector(".modal-desc").innerText=`description: ${productData.description}`;
    document.querySelector(".modal-brand").innerText=`brand: ${productData.brand}`;
    document.querySelector(".modal-category").innerText=`category: ${productData.category}`;
    document.querySelector(".modal-stock").innerText=`in stock: ${productData.stock}`;
}