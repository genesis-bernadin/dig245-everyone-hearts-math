
/* javascript */
// $(h="h1").hide();

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


var startStacked
var isStudent
var isParent
var acctBalance
var studentBalance
var parentBalance

let acctBalance = document.getElementById("acctBalance")
let result = document.getElementById("result")
let acctBalance = 240

})

// //show current Balance
// document.getElementById('aactBalance').value = "Balance:$"
// //play the Stacked game

//Account Balance, Deposit, Withdraw Fun




function startStacked(){
  state = {}
  showTextNode(1)
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }


textNode.options.forEach(option => {
   if (showOption(option)) {
     const button = document.createElement('button')
     button.innerText = option.text
     button.classList.add('btn')
     button.addEventListener('click', () => selectOption(option))
     optionButtonsElement.appendChild(button)
   }
 })
}


function selectOption(option){
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }

state = Object.assign(state, option.setState)
 showTextNode(nextTextNodeId)
}



const textNodes = [
  {
    id: 1,
    text: 'Choose your housing',
    options: [
      {
        text: '1 Bedroom Apt | Medium Risk Area | 30-MINUTE COMMUTE',
        setState: { housing: true },
        nextText: 2
      },
      {
        text: '2 Bedroom Apt | High Risk Area | 5-Minute Commute',
        nextText: 2
      }
    ]
  },
  {
      id: 2,
      text: 'Choose your Transportation.',
      options: [
        {
          text: 'Car | Gas: $35 per week // $140 per month',
          requiredState: (currentState) => currentState.transportation,
          setState: { car: true, public: false },
          nextText: 4
        },
        {
          text: 'Public Transportation | Ticket: $22.5 per week // $85 per month',
          requiredState: (currentState) => currentState.transportation,
          setState: { car: false, public: true },
          nextText: 3
        },
        ]
        {
          id: 3,
          text: 'Congratulations, you saved money on gas! However, in Charlotte, the public transportation system is unreliable when you need to travel outside the Downtown area. Please manage your time wisely!',
          nextText: 4
        }
      ]

        {
          id: 4,
          text: 'Alert: Your water bill is due today',
          options: [
            {
              text: 'Pay the $50 to cut it back on',
              nextText: 4
            },
          ]
          {
            id:4,
            text: "Oh no, "
          }


          {
            id: 10,
            text: 'Oh no, you ran out of money!',
                options: [
                  {
                    text: 'Restart Stacked'
                    nextTest: -1;
                  }
              ]
      }
    ]



startStacked()











function chooseCharacter(){
  if isStudent(){
    acctBalance += studentBalance;
  } else(){
    acctBalance += parentBalance;
  }

}



function adjustBalance(){

}


// $(".clickme").click(function(eventObject){console.log("hello", eventObject)});
//
//
//
//
//
//
//
//
// let username = "";
// let requiredUsername = "secret";
//
// $("form").submit(function(e){
//   e.preventDefault();
//   username = $(".username").val();
//   console.log(username);
//
//   let str = "";
//   if (username == requiredUsername){
//     str =
//     <div class = "alert alert-success" role = "alert"> Welcome, friend. </div>
//     ;
//   }
//
//   else{
//     str
//     <div class ="alert alert-danger" role="alert> Not allowed </div>;
//   }
//
//   $(".output").html(str);
// });
