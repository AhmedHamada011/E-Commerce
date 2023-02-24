



// check if user is logged using token if yes goto home page else login

ifUserLoggedIn()
//continue adding page later
if(document.title=="men section"){//add products to men page
    getMenProducts()
}else if(document.title=="women section"){//add products to women page
    getwomenProducts()
}else if(document.title=="shop"){//add products of men and women to shop
    getMenProducts()
    getwomenProducts()
}

function getMenProducts(){
    getProducts("mens-shirts","men-collapseOne",true)
    getProducts("tops","men-collapseTwo",false)
    getProducts("mens-shoes","men-collapseThree",false)
}
function getwomenProducts(){
    getProducts("womens-dresses","women-collapseOne",true)
    getProducts("womens-shoes","women-collapseTwo",false)
    getProducts("womens-bags","women-collapseThree",false)
}



// getProducts("womens-dresses")


// check if user is logged using token if yes goto home page else login
function isLoggedIn(){
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

function getProducts(product,collapseId,isOpen){
    
    // let cardHolder=document.querySelector(`#accordionExample #${section} .accordion-body`)mid_section
    addAccordion(product,collapseId,isOpen)

    // console.log("before",cardHolder);

    fetch(`https://dummyjson.com/products/category/${product}`)
    .then(res => 
        res.json() 
    )
    .then(res => {
        res.products.forEach(element => {
            addProductItem(element,collapseId)
        
    })
    sessionStorage.setItem("products",res.products)
    return res;
})

}

//add accordion take product name collapse Id and is collapse open od closed
function addAccordion(product,collapseId,isOpen){
    let accordion=`
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
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
            <div class="card d-flex">
                <img src="${element.thumbnail}" class="thumbnail card-img-top" alt="...">
                <div class="men_section_thumbnails card-body col d-flex flex-column justify-content-end gap-2">
                    <p class="card-text m-0" id="men_section_title h2">${element.title}</p>
                    <p class="card-text m-0" id="men_section_id">id: ${element.id}</p>
                    <p class="card-text m-0" id="men_section_color">color: black</p>
                    <p class="card-text m-0" id="men_section_size">size: ${element.Size||"medium"}</p>
                    <p class="card-text m-0" id="men_section_price">price: ${element.price}$</p>
                    <input class="input-number" type="number" placeholder="Qty" min="1" style="width:80px">
                    <button class=" btn btn-primary"><i class="fa-solid fa-cart-shopping"></i> add to cart</button>
                </div>
            </div>
        </div>`
        cardHolder.innerHTML+=card;
}