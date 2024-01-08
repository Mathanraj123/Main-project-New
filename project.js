const btncart=document.querySelector('.carticon')
const cart=document.querySelector('.cart')
const btnclose=document.querySelector('#cart-close')

btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})

btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

document.addEventListener("DOMContentLoaded",loadwatch)

function loadwatch(){
    loadcontent()
}

function loadcontent(){
    //remove item event from cartbox
    let btnremove=document.querySelectorAll('.cart-remove')
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    })

    //cart Item quantity change in cartbox
    let qtyElement=document.querySelectorAll('.cart-qty')
    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty)
    })

    // add product to cart
    let cartbtn=document.querySelectorAll('.add-cart')
    cartbtn.forEach((btn)=>{
        btn.addEventListener('click',addItem)
    })

    updatetotal()
}

// Remove item
function removeItem(){
    if(confirm("Sure to remove the product")){
        let watchtitle=this.parentElement.querySelector(".cart-watch-title").innerHTML
        // console.log(watchtitle)
        itemlist=itemlist.filter(el=>el.title!=watchtitle)
        this.parentElement.remove()
        loadcontent()
    }
    
}

//Change qty
function changeQty(){
    if(this.value<1){
        this.value=1
    }
loadcontent()
}

let itemlist=[]

//add cart
function addItem(){
    let watch=this.parentElement
    let title=watch.querySelector('.watch-name').innerHTML
    let price=watch.querySelector('.price').innerHTML
    let imgsrc=watch.querySelector('.img').src
    let num=watch.querySelector('.num').innerHTML

    // console.log(title,price,imgsrc)

    newproduct={title,price,imgsrc,num}

    //check product already exist in the cart

    if(itemlist.find((el)=>el.num==newproduct.num)){
        alert("Product is already added in the cart")
        return 
    }else
    {
        itemlist.push(newproduct)
    }


    let newproductelement=createcartproduct(title,price,imgsrc,num)
    let element=document.createElement('div')
    element.innerHTML=newproductelement
    let cartbasket=document.querySelector('.cart-content')

    cartbasket.append(element)
    loadcontent()
}  


function createcartproduct(title,price,imgsrc){
    return`
    <div class="cart-box">
        <img src=${imgsrc} class="cart-img" alt="">
        <div class="detail-box">
            <div class="cart-watch-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <div>
                <input type="number" value="1" class="cart-qty">
            </div>
        </div>
        <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
    </div>
    `
    
}

function updatetotal(){
    const cartitem=document.querySelectorAll('.cart-box')
    const totalvalue=document.querySelector('.total-price')

    let total=0
    
    cartitem.forEach(product=>{
        let priceelement=product.querySelector('.cart-price')
        let price=parseFloat(priceelement.innerText.replace("Rs.",""))
        let qty=product.querySelector('.cart-qty').value
        total+=(price*qty)
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty)
    })
    totalvalue.innerHTML="Rs."+total

    //Add product length in the cart-icon
    const cartcount=document.querySelector('.cart_count')
    let count=itemlist.length
    cartcount.innerHTML=count

    if(count==0){
        cartcount.style.display='none'
    }else{
        cartcount.style.display='block'
    }
    
}

function order(){
    const cartcount=document.querySelector('.cart_count')
    let count=itemlist.length
    cartcount.innerHTML=count
    if (count==0){
        alert("Cart is Empty Please select the Item to Buy")
        return false
    }
}

function validate(){
    let fname=document.getElementById("fname")
    let mobno=document.getElementById("mobno")
    let email=document.getElementById("email")
    let addrs=document.getElementById("addrs1")
    let dist=document.getElementById("dist")
    let state=document.getElementById("state")
    let country=document.getElementById("country")

    if (fname.value.trim()==""){
        // alert("please fill your name")
        fname.style.border="solid 2px red"
        document.getElementById("fname_").style.display="block"
        return false
    }else if (mobno.value.trim()==""){
        // alert("please fill your Mobile no")
        mobno.style.border="solid 2px red"
        document.getElementById("mobno_").style.display="block"
        return false
    }else if (email.value.trim()==""){
        // alert("please fill your email id")
        email.style.border="solid 2px red"
        document.getElementById("email_").style.display="block"
        return false
    }else if (addrs.value.trim()==""){
        // alert("please fill your address")
        addrs.style.border="solid 2px red"
        document.getElementById("addrs_").style.display="block"
        return false
    }else if (dist.value.trim()==""){
        // alert("please fill your district")
        dist.style.border="solid 2px red"
        document.getElementById("dist_").style.display="block"
        return false
    }else if (state.value.trim()==""){
        // alert("please fill your State")
        state.style.border="solid 2px red"
        document.getElementById("state_").style.display="block"
        return false
    }else if (country.value.trim()==""){
        // alert("please fill your State")
        country.style.border="solid 2px red"
        document.getElementById("country_").style.display="block"
        return false
    }
}


let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.type');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let productContainer = document.querySelector('.container')
let search = document.querySelector('.search-box')
let watchContainer = productContainer.querySelectorAll('.watch-box')

search.addEventListener('keyup',(e)=>{
    let enterdValue = e.target.value.toUpperCase()

    for(let i=0;i<watchContainer.length;i++){
        let productName = watchContainer[i].querySelector('.watch-name').textContent

        if(productName.toUpperCase().indexOf(enterdValue)<0){
            watchContainer[i].style.display="none"
        }else{
            watchContainer[i].style.display="inline-block"
        }
    }
})
