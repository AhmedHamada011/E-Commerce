import { getLocal } from "./main.js";

//***********************************restore*************************************************************/
var itemscontainer = document.getElementById("itemscontainer")
console.log(itemscontainer)




function restorefunction() {

    sumprice()

    let restored = localStorage.getItem("cart")
    var restoredarray = JSON.parse(restored)
var checkarray=Object.values(restoredarray)
if(checkarray.length==0)
{        itemscontainer.innerHTML = "<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
}else{


    for (var item of Object.values(restoredarray)) {

     //   console.log(item.name)


        var itemscontainerdocument = document.getElementById("itemscontainer")

        // mainDiv.insertAdjacentHTML('afterbegin', '<p>This is paragraph two.</p>');
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
        // var innerdiv=
        // const node = document.createTextNode(innerdiv);
        // para.appendChild(node);

        //   itemscontainerdocument.innerHTML='<div class="card mb-3 bg-dark-subtle" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4"><img src="..\icon\t2.webp" class="img-fluid rounded-start" alt="itemimag"> </div><div class="col-md-8"> <div class="card-body"><h5 class="card-title">Basic t-shirts</h5> <p class="card-text m-0">color red</p> <p class="card-text m-0">`${(varrestoredarray[0].id}`</p> <p class="card-text m-0">size:medium</p><hr><div class="row col-12"><div class="col-md-10 col-sm-12"><button type="button" class="btn btn-link">Add to favourits  </button></div><div class="col-md-2 col-sm-12"><button type="button" class="btn btn-outline-secondary delete"><i class="fa-solid fa-trash"></i></button></div></div><p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p></div></div></div>/div>'
        //   itemscontainerdocument.append(JSON.parse(innerdiv))
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
    // if (event.target.className === "btn btn-outline-secondary delete") {
        

   console.log(event.target.closest(".productitem").querySelector(".productid"))
  var itemid= event.target.closest(".productitem").querySelector(".productid").innerText
   itemid=Number(itemid)
      
      
        let restored = localStorage.getItem("cart")
       // console.log(restored)
        var restoredarray = JSON.parse(restored)
        console.log(restoredarray[itemid])
    delete restoredarray[itemid]
    console.log(restoredarray)
    localStorage.setItem("cart",JSON.stringify(restoredarray))



    sumprice()
    getLocal()
    
    applypromocode()
       
      

        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    
    var itemscontainerdocument = document.getElementById("itemscontainer")
    // console.log(itemscontainerdocument.innerText)
    if (itemscontainerdocument.innerText == '') {

        itemscontainerdocument.innerHTML = "<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
    }
});
})


// let restored = localStorage.getItem("cart")
// var restoredarray = JSON.parse(restored)

