import { getLocal } from "./main.js";

//***********************************restore*************************************************************/
var itemscontainer = document.getElementById("itemscontainer")
console.log(itemscontainer)

function restorefunction() {

    sumprice()

    let restored = localStorage.getItem("cart")
    var restoredarray = JSON.parse(restored)
    var checkarray=Object.values(restoredarray)
    if(checkarray.length==0){        
      itemscontainer.innerHTML = "<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
    }else{

      for (var item of Object.values(restoredarray)) {

          var itemscontainerdocument = document.getElementById("itemscontainer")

          itemscontainerdocument.insertAdjacentHTML('afterbegin', `<div class="card mb-3 bg-dark-subtle" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src=${item.src} class="img-fluid rounded-start" alt="itemimag" >
              </div>
              <div class="col-md-8">
                <div class="card-body productitem">
                  <h5 class="card-title"> ${item.name}</h5>
                  
                  <p class="card-text m-0 productid" id="item-${item.id}">${item.id}</p>
                  
                  <p class="card-text m-0">price:${item.price}</p>
                  <p class="card-text m-0"> quantity:${item.qty}</p>
                  <hr>
                  <div class="row col-12">
                    <div class="col-md-10 col-sm-12">
                      <button type="button" class="btn btn-link">
                        Add to favourits
                      </button>
                    </div>
                    <div class="col-md-2 col-sm-12">
                      <button type="button" class="btn btn-outline-secondary delete">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
            </div>`)
    }
}
}




/****************************sumprice**************************************************/


var sum ;

function sumprice() {
    sum=0;
    var sumprice = document.getElementById("price")
    console.log(sumprice)
    let restored = localStorage.getItem("cart")
    var restoredarray = JSON.parse(restored)

    var item = Object.values(restoredarray)
  console.log(item);
    for (var i = 0; i < item.length; i++) {
        sum = sum + Number.parseInt(item[i].price)*Number.parseInt(item[i].qty)
       
    
    }
    sumprice.innerHTML = ` ${sum}`
    document.getElementById("totalprice").innerText = ` ${sum}`
    document.getElementById("discount").innerText= `0%`

    localStorage.setItem("sumprice",sum)


}

/****************************apply promocode**************************************************/

window.onload = restorefunction()
function applypromocode() {
    
  var addpromobtn=document.getElementById("button-addon2")

    var promocode = document.getElementById("promocode").value

    if (promocode != "") {
        if (promocode == "halfprice") {
            sum = sum / 2
            document.getElementById("totalprice").innerHTML = ` ${sum}`
            document.getElementById("discount").innerHTML= `50%`
            localStorage.setItem("sumprice",sum)
addpromobtn.disabled=true;

        } 
    } 
}

document.getElementById("button-addon2").addEventListener("click", applypromocode)


/****************************delete**************************************************/

document.querySelectorAll(".btn.btn-outline-secondary.delete").forEach((btn)=>{

    btn.addEventListener("click", event => {
 
        var itemid= event.target.closest(".productitem").querySelector(".productid").innerText
        itemid=Number(itemid)
    
        let restored = localStorage.getItem("cart")
      
        var restoredarray = JSON.parse(restored)
        console.log(restoredarray[itemid])
        delete restoredarray[itemid]
        console.log(restoredarray)
        localStorage.setItem("cart",JSON.stringify(restoredarray))

        sumprice()
        getLocal()
        
        applypromocode()
      
        event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        var itemscontainerdocument = document.getElementById("itemscontainer")
        if (itemscontainerdocument.innerText == '') {

            itemscontainerdocument.innerHTML = "<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
        }
});
})


