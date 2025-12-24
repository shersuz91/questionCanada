import * as questionst from "./question.js";
import userLoginT from "./userLogin.js";
const questionss = questionst.questionData;
console.log(questionss.rights);
var userLogin = document.getElementById("userLogin");
userLogin.innerHTML = "";
var endpoint =
  "https://api.sheety.co/5d77c36eab7adb25c6edff75a4d2573b/usersFile/users";
// fetch(endpoint)
// .then(resp=>resp.json())
// .then(data=>{
//   console.log(data);
// });
var userData = "";
function check_username() {
  var name_user =
    localStorage.getItem("name_user") !== null
      ? localStorage.getItem("name_user")
      : "";
  if (name_user === "") {
    userLogin.innerHTML = userLoginT;
    document.getElementById("startBtn").addEventListener("click", function (e) {
      var inputName = document.getElementById("userName");
      var alertName = document.getElementById("alertName");
      alertName.style.display = "none";
      if (inputName.value.trim() !== "") {
        localStorage.setItem("name_user", inputName.value.trim());
        document.body.style.overflow = "auto";
        userLogin.style.display = "none";
        console.log(inputName.value.trim());
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: inputName.value.trim(),
              count: 1,
            },
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          });
        location.reload();
      } else {
        inputName.value = "";
        alertName.style.display = "block";
        inputName.placeholder = "Please enter your name";
      }
    });
  } else {
    console.log("here1");
    document.body.style.overflow = "auto";
    userLogin.style.display = "none";
    
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        var currentUser = data.users;
    console.log(userData);
    var found=false;
    for (var i = 0; i < currentUser.length; i++) {
      if (currentUser[i].username === name_user) {
        console.log("User found:", currentUser[i]);
        userData = currentUser[i];
        fetch(endpoint + "/" + currentUser[i].id, {
          method: "PUT",
          headers: {  
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              count: currentUser[i].count + 1,
            },
          }),
        })
        found=true;
        // You can use currentUser[i] as needed
        break; // Exit the loop once the user is found  
      }
    if (i === currentUser.length - 1) {
      console.log("User not found");
    
    }
    }
    if(!found){
      console.log("user not found")
fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: name_user,
              count: 1,
            },
          }),
          
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          });
    }
      });
    
    var ulBox = document.getElementsByClassName("ulBox");
var navbarLogo = document.getElementById("navbar-logo");
var link_sections = document.getElementsByClassName("link_section");
var sections = document.getElementsByClassName("section");
var sectionTitle = document.getElementById("secTite");
var activeSection = document.getElementsByClassName("activeSection");
var multiBox = document.getElementById("multiBox");
var trueBox = document.getElementById("trueBox");
var opentest = document.getElementsByClassName("opentest");
var questionPart = document.getElementById("questionPart");
var section=document.getElementById("section");
var id_section="rights";
var question_container = document.getElementById("question-container");
// var tite = document.getElementById("tite");
var close = document.getElementById("close");
var mode_btns = document.getElementsByClassName("mode-btn");
var radio_inputs = document.getElementsByClassName("radio_input");
var questions = document.getElementsByClassName("question");
var qtit=document.getElementById("qtit");

// document.body.style.paddingTop="0px";
//
// Navbar toggle
document.addEventListener("click", function (e) {
  var parent_element = e.target.matches("[toggleBtn]");
  var nodeElement = e.target.closest("[closeit]");
  if (parent_element) {
    ulBox[0].classList.toggle("active");
    navbarLogo.children[0].classList.toggle("hide");
    navbarLogo.children[1].classList.toggle("hide");
  } else if (e.target.closest("[list]") == null || nodeElement) {
    ulBox[0].classList.remove("active");
    navbarLogo.children[0].classList.remove("hide");
    navbarLogo.children[1].classList.add("hide");
  }
});
// Section navigation
// sectionTitle.innerText = activeSection[0].innerText;
document.addEventListener("DOMContentLoaded", function () {
link_sections[0].onclick()
});

for (let i = 0; i < link_sections.length; i++) {
  link_sections[i].onclick = function () {
    trueBox.style.display="block";
    close.click();
    // link_sections[i].classList.add("activeSection");
    qtit.innerText=link_sections[i].innerText;
    // $(link_sections[i]).siblings().removeClass("activeSection");
    sectionTitle.innerText = link_sections[i].innerText;
     id_section=link_sections[i].id;
    // console.log(questionss["rights"]);
    Array.from($(multiBox).children(".opentest")).forEach((btn) => {
      multiBox.removeChild(btn);
    })
     Array.from($(trueBox).children(".opentest")).forEach((btn) => {
      trueBox.removeChild(btn);
    })
    
    function createButtons(box, index, type) {
      var btn= document.createElement("button");
      btn.innerText="Test " + (index + 1);
      btn.classList.add("btn_test");
      btn.classList.add("opentest");
      btn.setAttribute("test_type", type);
      
      btn.setAttribute("test_index",index);
      btn.addEventListener("click", function(){
        openTest(this);
      });
      box.appendChild(btn);
    }
    for (var d=0; d< questionss[id_section].multi.length; d++){
createButtons(multiBox, d, "multi") 
    }
     for ( var d=0; d< questionss[id_section].truefalse.length; d++){
createButtons(trueBox, d, "truefalse") 
    }
    if(questionss[id_section].truefalse.length===0){
      trueBox.style.display="none";
    }
    // Array.from(questionss[id_section].multi).forEach((type, index) => {
      
    // });
    //  Array.from(questionss[id_section].truefalse).forEach((type, index) => {
    //   createButtons(trueBox, index) 
    // });
    // ulBox[0].classList.remove("active");
    
}
}

function openTest(e){
  question_container.innerHTML="";
  questionPart.classList.remove("hide");
  $(close).removeClass("hide");
  section.classList.add("hide");
  var test_type=e.getAttribute("test_type");
  var test_index=e.getAttribute("test_index");
  console.log(questionss[id_section][test_type][test_index]);
  function createQuestion(firstQ){
    var questionDiv=document.createElement("div");
    questionDiv.classList.add("question");
    // questionDiv.setAttribute("translate","no");

    var transBtn=document.createElement("button");
    transBtn.classList.add("translate_this");
    transBtn.addEventListener("click", function(){
      translate_this(this);
    });
    transBtn.setAttribute("translate","no");
    var transspan=`<span class="material-icons" style="font-size: 32px; color: #2196f3">translate</span>`;
    transBtn.innerHTML=transspan;
    questionDiv.appendChild(transBtn);
    var pQ=document.createElement("p");
    pQ.classList.add("theQ");
    pQ.innerText=questionss[id_section][test_type][test_index][firstQ][0];
    questionDiv.appendChild(pQ);
    var answerList=[];
    var sortingIndex=["A.","B.","C.","D."];
    for (var g=0; g< questionss[id_section][test_type][test_index][firstQ].length-1; g++){
      var answersLabel=document.createElement("label");
    answersLabel.classList.add("options");
    var answerInput=document.createElement("input");
    answerInput.setAttribute("type","radio");
    answerInput.setAttribute("name",`g${firstQ}`);
    answerInput.classList.add("radio_input");
    if (g===0){
    answerInput.classList.add("hideCorrect");
    answerInput.classList.add("correct");
  }
    answersLabel.appendChild(answerInput);
    
    
    var answerText=document.createTextNode((questionss[id_section][test_type][test_index][firstQ][g+1]));
    answersLabel.appendChild(answerText);
    answerList.push(answersLabel);
    }
for (var m=answerList.length-1; m>0; m--){
      var newIndex=Math.floor(Math.random()*(m+1));
      [answerList[m], answerList[newIndex]]=[answerList[newIndex], answerList[m]];
    }

    answerList.forEach((ans)=>{
     if(test_type!=="truefalse"){
      var optionAnswer=sortingIndex[answerList.indexOf(ans)] + " " +ans.textContent.trim()
      ans.removeChild(ans.childNodes[1]);
      ans.appendChild(document.createTextNode( optionAnswer));
     }
      
      questionDiv.appendChild(ans);
    })
    // questionDiv.appendChild(answersLabel);

    
question_container.appendChild(questionDiv);
  }

  for (var q=0; q< questionss[id_section][test_type][test_index].length; q++){
    createQuestion(q);
  }

    check_mode();
    check_answer();
}

var old_labels = [];

close.onclick = function () {

  questionPart.classList.add("hide");
  section.classList.remove("hide");

  $(close).addClass("hide");
};

function check_mode() {
 
  Array.from(mode_btns).forEach((btn) => {
    if (btn.classList.contains("activ_session")) {
      if (btn.id === "tests") {
        Array.from(radio_inputs).forEach((input) => {
         input.removeAttribute("disabled");
input.disable=false;
          input.style.display = "inline-block";
        });
      } else if (btn.id === "study") {
        console.log("check mode2");
        Array.from(radio_inputs).forEach((input) => {
          
          input.style.display = "none";
          input.setAttribute("disabled", "true");
          input.classList.remove("hideCorrect");
        });
      }
    }
  });
}
check_mode();


Array.from(mode_btns).forEach((button) => {

  button.addEventListener("click", () => {
      
    Array.from(mode_btns).forEach((btn) =>
      btn.classList.remove("activ_session")
    );
    button.classList.add("activ_session");
    if (button.id === "study") {
      Array.from(radio_inputs).forEach((btn) => {
         btn.classList.remove("wrongAnswer");
        btn.setAttribute("disabled", "true");
        btn.checked=false;
        btn.style.display = "none";
        btn.classList.remove("hideCorrect");
      });
    } else if (button.id === "tests") {
      Array.from(radio_inputs).forEach((btn) => {
        btn.disable=false;
        btn.removeAttribute("disabled");
        btn.style.display = "inline-block";
        if (btn.classList.contains("correct")) {
          btn.classList.add("hideCorrect");
        }
      });
    }


  });
});

function takeValue(e) {
  console.log("adf");
  document.querySelectorAll(".goog-te-combo")[0].value = e;
  document.querySelectorAll(".goog-te-combo")[0].dispatchEvent(new Event("change"));
  if (e === "ar") {
    document.body.setAttribute("translate", "yes");
  } else if (e === "en") {
    document.body.setAttribute("translate", "no");
    Array.from(questions).forEach((q) => {
      q.removeAttribute("translate");
    });
  }

   ulBox[0].classList.remove("active");
    navbarLogo.children[0].classList.remove("hide");
    navbarLogo.children[1].classList.add("hide");
}
window.takeValue = takeValue;
setTimeout(() => {
  takeValue("en");
  if (document.querySelectorAll(".goog-te-combo").length > 1) {
    document.getElementsByClassName("seconnT")[0].style.display = "inline-block";
  }
}, 1000);

function translate_this(e) {
  if ($(e).parent().get(0).getAttribute("translate") === "yes") {
    $(e).parent().get(0).removeAttribute("translate");
  } else {
    $(e).parent().get(0).setAttribute("translate", "yes");
  }
  document.querySelectorAll(".goog-te-combo")[0].value = "ar";
  document
    .querySelectorAll(".goog-te-combo")[0]
    .dispatchEvent(new Event("change"));
}
function check_answer() {
Array.from(radio_inputs).forEach((input) => {
  input.addEventListener("change", () => {
    if (!document.getElementById("study").classList.contains("activ_session")) {
      if (!input.classList.contains("hideCorrect")) {
        input.classList.add("wrongAnswer");
      } else {
        input.classList.remove("hideCorrect");
      }
      $(input).parent().siblings().children().removeClass("hideCorrect");
    }
  });
})
}
      

   
    
  }
}

check_username();






