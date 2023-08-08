let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        //console.log(id)
        let search = shopItemsData.find((y) => y.id === id) || [];
        let {name,price,img}=search
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
              <i onclick="decrease(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increase(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>$ ${item * price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
    `;
  }
};
generateCartItems();
const decrease=(id)=>{ 
  let selectedItem=id
  let itemID=selectedItem.id
  let searchItem=basket.find((x)=>{
     return x.id=== itemID
  })
  //if(searchItem === undefined){
  //  basket.push({
    //  id:itemID,
    //  item:1
  //})
  //}
    if(searchItem=== undefined) return ;
    if(searchItem.item ==0) return ;
    //increase function le badhayeko xa vaney matra -- garni natra basketma varkhar add vako xa ani increase vako xaina vaney return gardini
    else{searchItem.item--}
  update(selectedItem)  
  //console.log(basket)
  basket=basket.filter((x)=> x.item >0)  
  //console.log(basket)
  //(basket === undefined)return ;
  generateCartItems();
  localStorage.setItem("data",JSON.stringify(basket))  
}
const increase=(id)=>{
  let selectedItem=id
  let itemID=selectedItem.id
  let searchItem=basket.find((x)=>
    x.id=== itemID
  )
  if(searchItem === undefined){
      basket.push({
      id:itemID,
      item:1,
  })
  }
  else{
    searchItem.item++
    } 
  basketString=JSON.stringify(basket)
  generateCartItems();
  localStorage.setItem("data",basketString)
  update(selectedItem)
}
let update=(selectedItem)=>{
  let search=basket.find((x)=> x.id=== selectedItem.id)
  //console.log(search)
  selectedItem.innerHTML=search.item
  calculation()
  totalAmount()
}
let removeItem=(id)=>{
let selection=id.id
const itemToRemove=basket.find((x)=>x.id===selection)
itemToRemove.item=0;
calculation()
basket=basket.filter((x)=> x.item >0)  
generateCartItems()
localStorage.setItem("data",JSON.stringify(basket))  
totalAmount()
} 

let totalAmount=()=>{
  if(basket.length!=0){
  let amount=  basket.map((x)=> {
    let {item,id}=x;
    let search = shopItemsData.find((y) => y.id === id) || [];
    return item * search.price
  }).reduce((x,y)=>x+y,0)
 label.innerHTML =`
 <h2> Total Bill : Rs ${amount} </h2>
 <button class="checkout" >Checkout </button>
 <button onClick="clearCart()" class="removeAll"> Clear Cart </button>
 `
  }  
  else return
}
totalAmount()
let clearCart=()=>{
  basket=[]
  generateCartItems();
  calculation();
  localStorage.setItem("data",JSON.stringify(basket));
 
  
  
  
}
