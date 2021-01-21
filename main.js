const commonIncome = document.getElementById("commonIncome");
const commonDiv = document.querySelector(".common");
const description = document.getElementById("description");
const incomeList = document.getElementById("incomeList");
const income = document.getElementById("income");
const date = document.getElementById("date");
const btn = document.getElementById("btn");
const noResult = document.getElementById("noresult");
let fields = document.querySelectorAll(".fields");

btn.onclick = (event) => {
  if (incomeList.childNodes.length <= 10) {
    var newIncome = document.createElement("li");
    newIncome.classList.add("animate__bounceIn");
    incomeList.appendChild(newIncome);
    var incomeValue = Number(income.value).toFixed(1);
    var incomeDate = date.value;
    var incomeDescription = description.value;

    var descSpan = document.createElement("span");
    descSpan.textContent = incomeDescription;
    var incomeSpan = document.createElement("span");
    incomeSpan.textContent = incomeValue + "$";
    var dateSpan = document.createElement("span");
    dateSpan.textContent = incomeDate;
    newIncome.append(descSpan, incomeSpan, dateSpan);
    getCommonIncome(incomeValue);
    removeIncome(newIncome, incomeValue);
    removeData();
    getNumberOfList(event);
    disableBtn();
  }
};

description.onkeypress = (e) => {
  if (description.value.length == 20) {
    e.preventDefault();
  }
};

income.onkeypress = (e) => {
  if (income.value.length == 10) {
    e.preventDefault();
  }
};

function removeIncome(newIncome, incomeValue) {
  newIncome.onclick = () => {
    incomeList.removeChild(newIncome);
    commonIncome.value = Number(commonIncome.value) - Number(incomeValue);
    getNumberOfList();
  };
}

function getCommonIncome(incomeValue) {
  commonIncome.value = Number(commonIncome.value) + Number(incomeValue);
  if (commonIncome.value.length > 5) {
    commonDiv.classList.toggle("increase");
  }
}

function removeData() {
  description.value = "";
  income.value = "";
  date.value = "";
}

function getNumberOfList(event) {
  if (incomeList.childNodes.length <= 3) {
    noResult.style.display = "block";
    console.log(incomeList.childNodes.length);
  } else if (incomeList.childNodes.length >= 4) {
    noResult.style.display = "none";
    console.log(incomeList.childNodes.length);
    if (incomeList.childNodes.length == 10) {
      btn.disabled = true;
      btn.classList.add("disabled");
      console.log("true");
      event.preventDefault();
    } else {
      btn.disabled = false;
      btn.classList.remove("disabled");
      console.log("false");
    }
  }
}

function disableBtn() {
  [...fields].map((field) => {
    field.oninput = (event) => {
      if (!event.target.value == "") {
        btn.disabled = false;
        btn.classList.remove("disabled");
      } else if (event.data == null) {
        btn.disabled = true;
        btn.classList.add("disabled");
      }
    };
  });
}

window.onload = () => {
  commonIncome.value = 0;
  description.value = "";
  income.value = "";
  btn.disabled = true;
  btn.classList.add("disabled");
  disableBtn();
};
