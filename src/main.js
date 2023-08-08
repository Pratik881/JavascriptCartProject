const shop= document.getElementById('shop')
const cartItems=document.getElementById('cartAmount')
let basket=JSON.parse(localStorage.getItem('data')) || []
const response =()=>{
        return (shop.innerHTML = shopItemsData.map((x)=>
        {  
            let {id,img,price,desc,name}=x
            let search = basket.find((x)=> x.id===id) || []
              return   ` <div id=product-id-${id} class="item">
                  <img width="220" src="${img}" alt="">
                  <div class="details">
                      <h3>${name}</h3>  
                      <p>${desc}</p>
                      <div class="price-quantity">
                        
                          <h2 id='price'>${price}</h2>
                    
                          <div class="buttons">
                              <i onclick="decrease(${id})" class="bi bi-dash-lg"></i>
                              <div id=${id} class='quantity'>${search.item === undefined ? 0: search.item }</div> 
                              <i  onclick ="increase(${id})" class="bi bi-plus-lg"></i>
                              
                          </div>
                      </div>
                  </div>
              </div>           
              `
        }).join('')           
        )
    }
response()
//console.log(basket)
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
  console.log(basket)
  basket=basket.filter((x)=> x.item >0)  
  console.log(basket)
  //if(basket === undefined)return ;
  // else{
  localStorage.setItem("data",JSON.stringify(basket))
  //}
  

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
  localStorage.setItem("data",basketString)
  update(selectedItem)
}
let update=(selectedItem)=>{
  let search=basket.find((x)=> x.id=== selectedItem.id)
  //console.log(search)
  selectedItem.innerHTML=search.item
  calculation()
}
//first we  use map method to get the array of items and then we use rduce function to add those items and render it to the respective DOM
let calculation=()=>{
  cartItems.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=> x+y,0))
}
calculation()
