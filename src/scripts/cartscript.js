// var itemscontainer=document.getElementById("itemscontainer")
// console.log(itemscontainer)


document.getElementById("itemscontainer").addEventListener("click", event => {
    if (event.target.className === "btn btn-outline-secondary delete") {
      console.log("Click!");
     console.log(event.target.parentElement.parentElement.parentElement)
     
     event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    }
    var itemscontainerdocument=document.getElementById("itemscontainer")
    console.log(itemscontainerdocument.innerText)
    if (itemscontainerdocument.innerText=='')

    {
       
       itemscontainerdocument.innerHTML="<h3 class='text-center bg-dark-subtle'>Your cart is empty</h3>"
    } });


  