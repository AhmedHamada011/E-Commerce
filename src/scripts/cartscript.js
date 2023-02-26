var itemscontainer=document.getElementById("itemscontainer")
console.log(itemscontainer)




  function restorefunction(){

    let restored = localStorage.getItem("cart")
    var restoredarray=JSON.parse(restored)

   
//   console.log(restoredarray)
//   console.log(restoredarray[0])
//   console.log(restoredarray[0].id)
//   console.log(restoredarray[1].src)
//   console.log(restoredarray[0].price)
//   console.log(restoredarray[0].name)
  
    for (var item of Object.values(restoredarray)){
        console.log(item.name)



  var itemscontainerdocument=document.getElementById("itemscontainer")

 // mainDiv.insertAdjacentHTML('afterbegin', '<p>This is paragraph two.</p>');
 itemscontainerdocument.insertAdjacentHTML('afterbegin',`<div class="card mb-3 bg-dark-subtle" style="max-width: 540px;">
 <div class="row g-0">
   <div class="col-md-4">
     <img src=${item.src} class="img-fluid rounded-start" alt="itemimag">
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${item.name}</h5>
       <p class="card-text m-0">color red</p>
       <p class="card-text m-0">${item.id}</p>
       <p class="card-text m-0">size:medium</p>
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















window.onload=restorefunction()
 




document.getElementById("itemscontainer").addEventListener("click", event => {
    if (event.target.className === "btn btn-outline-secondary delete") {
    //  console.log("Click!");
     //console.log(event.target.parentElement.parentElement.parentElement)
     
     event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    }
    var itemscontainerdocument=document.getElementById("itemscontainer")
   // console.log(itemscontainerdocument.innerText)
    if (itemscontainerdocument.innerText=='')

    {
       
       itemscontainerdocument.innerHTML="<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
    } });
