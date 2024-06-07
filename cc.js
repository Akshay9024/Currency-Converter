let Base_URL =
  "https://v6.exchangerate-api.com/v6/38b4b1d7419c407c4594fbf2/pair"; //https://v6.exchangerate-api.com/v6/38b4b1d7419c407c4594fbf2/pair/USD/INR/100

let dropDownS = document.querySelectorAll(".dropDown select");
let btn = document.querySelector(" form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropDownS) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

let updateFlag = (ele) => {
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let newcFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newcFlag;
  //   console.log(countryCode);
  //   console.log(currCode);
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  //   console.log(amtVal);
  //   console.log(fromCurr.value, toCurr.value);
  let URL = `${Base_URL}/${fromCurr.value}/${toCurr.value}/${amtVal}`;
  let response = await fetch(URL);
  let result = await response.json();
  console.log(result);
  msg.innerText = `1 ${fromCurr.value} = ${result.conversion_rate} ${toCurr.value} \n \n So   \t   ${amtVal} ${fromCurr.value} = ${result.conversion_result} ${toCurr.value} `;
});
