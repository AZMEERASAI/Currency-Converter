const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdownsel=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg=document.querySelector(".finalmgs")
 for(let select of dropdownsel)
 {
     for(code in countrylist)
     {
     let newoption=document.createElement("option");
     newoption.innerText=code;
     newoption.value=code;
     if(select.name==="from" && code==="USD")
     {
        newoption.selected="selected";
     }
     else if(select.name==="to" && code==="INR")
     {
        newoption.selected="selected";
     }
     select.append(newoption)
      }
      select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
      })
 } ;
 const updateflag=(element)=>{
    let code=element.value;
    let countrycode=countrylist[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
 };
 btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtval=amount.value;
if(amtval===""||amtval<1)
{
    amtval=1;
    amount.value="1";
}
const URL=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
let fromcurrency=fromcurr.value.toLowerCase()
let tocurrency=tocurr.value.toLowerCase()
  let response= await fetch(URL);
  let data=await response.json();
  console.log(data);
  let index=data[fromcurrency];
  let rate=index[tocurrency];
  console.log(rate);
  let finalamount=amtval*rate;
   msg.innerText=`${amtval}${fromcurr.value}=${finalamount}${tocurr.value}`;
 });