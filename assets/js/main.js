const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};
let currentBalance = 290;

function startStacked() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  // get data
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  let html = "";
  let description = "";

  if (textNode.title) {
    html + "<h2>" + textNode.title + "</h2>";
  }

  // if image
  if (textNode.image && textNode.image !== '') {
    html += textNode.title + "<div><img class='mainImage' src = 'assets/img/" + textNode.image + "'></div>";
  }

  // text
  if (textNode.text == '') {
    html +=  textNode.balance() +'<br>'+  textNode.description;
  } else {
    html += textNode.text;
  }


  document.getElementById("text").innerHTML = html;


  // butttons
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  let nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    currentBalance = 290;
    return startStacked();
  }

  if (currentBalance <= 0) {
    nextTextNodeId = 19;
  }
  if (option.acctChange) {
    currentBalance += option.acctChange;
    console.log(currentBalance);
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);

  // if(option.callback){
  //   option.callback()
  // }



}

const textNodes = [{
    id: 1,
    title: '',
    image: "finalStacked.png",
    text: 'A child born into poverty in Charlotte, NC will most likely die in poverty...',
    options: [{
      text: 'Continue',
      nextText: 2,
    }, ]
  },
  {
    id: 2,
    title: '',
    image: "finalStacked.png",
    text: 'In Charlotte, NC, an estimated 11.9% of the population live below the poverty line...',
    options: [{
      text: 'Continue',
      nextText: 3,
    }, ]
  },
  {
    id: 3,
    title: '',
    image: "finalStacked.png",
    text: 'Among the most affected demographics in poverty are Blacks (44%), Whites (31%), and Hispanics (26%), with female populations especially vulnerable.',
    options: [{
      text: 'Continue',
      nextText: 4,
    }, ]
  },
  {
    id: 4,
    title: '',
    image: "finalStacked.png",
    text: 'As such, many residents of Charlotte work off of minimum wage and  are forced to live paycheck to paycheck. This reality is not so easy to endure.' + "\n" + 'How well will you survive when the odds are stacked against you...?',
    options: [{
      text: 'Start Challenge',
      nextText: 5,
    }, ]
  },

  {
    id: 5,
    text: '',
    title: "CHARACTER: SINGLE PARENT OF ONE",
    image: "myProfile.png",
    description: 'Great, you are a 28 year old single parent of one.  In order to live comfortably, you work 40 hours a week as a waitress at Joe’s Diner. In addition, to commuting to work you must take your child to and from school. You cannot afford childcare so you must be prompt. ' + "\n" + 'You have one week left until your next paycheck. Are you ready to start the challenge?',
    options: [{
        text: 'Challenge Accepted',
        setState: {
          transportation: false
        },
        nextText: 6,
        // callback: function(){
        // alert(123)
        // }

      },
    ],
    balance: function() {
      return 'Balance: $' + currentBalance + '\n';
    },
  },
  {
    id: 6,
    text: "",
    title: "CHOOSE YOUR HOUSING",
    description:'',
    image: "myHousing.png",
    balance: function() {
      return 'Balance: $' + currentBalance + '\n';

    },
    options: [{
        text: '1 Bedroom Apt | Medium Risk Area | 30-Minute Commute',

        nextText: 7,
      },
      {
        text: '2 Bedroom Apt | High Risk Area | 5-Minute Commute',
        nextText: 7,
      },

    ]
  },
  {
    id: 7,
    text: "",
    title: "CHOOSE YOUR TRANSPORTATION",
    description:'',
    image: "transportChoices.png",
    balance: function() {
      return 'Balance: $' + currentBalance + "\n";
    },
    options: [{
        text: 'Personal Vehicle | Gas: $35 per week // $140 per month',
        setState: {
          transportation: true
        },
        setState: {
          transportation: true,
          car: true
        },
        nextText: 8,
        acctChange: -35
      },
      {
        text: 'Public Transportation | Ticket: $22.5 per week // $85 per month',
        setState: {
          transportation: false
        },
        setState: {
          transportation: true,
          public: true
        },
        nextText: 9,
        acctChange: -22.5
      },

    ]
  },
  {
    id: 8,
    requiredState: (currentState) => currentState.car,
    text: '',
    title: 'CAR',
    description:'Nice, you invested in your own vehicle and now you can commute comfortably. You have more agency to  meet all of your destination needs.',
    image: "myCar.png",
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Continue',
      nextText: 10
    }]
  },
  {
    id: 9,
    text: "",
    description:'Congratulations, you saved money on gas! However, in Charlotte, the public transportation system is unreliable when you need to travel outside the Downtown area. Please manage your time wisely!',
    title: "Public Transportation",
    image:'myPublic.png',
    balance: function() {
      return 'Balance: $'+ currentBalance ;
    },
    options: [{
      text: 'Continue',
      nextText: 11
    }]
  },
  {
    id: 10,
    title: "ALERT",
    text: "",
    description:'Your water bill is due today',
    image: "myWater.png",
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Pay the $50 to cut it back on',
      nextText: 12,
      acctChange: -50
    }]
  },
  {
    id: 11,
    text: "",
    title: "ALERT",
    description:'Time for your weekly groceries!',
    image: "myGroceries.png",
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Pay $100 on food and essentials',
      nextText: 18,
      acctChange: -100,
    }]
  },
  {
    id: 12,
    requiredState: (currentState) => currentState.car,
    text: "",
    title: "ALERT",
    image: "myAlert.png",
    description:'Oh no, your car caught a flat tire on your way to your destination.',
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
        text: 'Replace tire for $60',
        nextText: 13,
        acctChange: -60
      },
      {
        text: 'Take public transportation',
        changeState: (currentState) => currentState.public,
        nextText: 9
      },

    ]
  },
  {
    id: 13,
    text: "",
    requiredState: (currentState) => currentState.car,
    title: "ALERT",
    image:"myFamily.png",
    description:'You must pay $20 to pick up your child with a ridesharing app after your flat tire.',
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Continue',
      nextText: 14,
      acctChange: -20
    }]
  },
  {
    id: 14,
    text: "",
    title: 'ALERT',
    image: "myJob.png",
    description:'Your employers offer you the opportunity to get overtime (OT) for a time and a half. This could increase your earnings by $22. However, you will spend less time with your child.',
    balance: function() {
      return 'Balance: $' + currentBalance ;
    },
    options: [{
        text: 'Accept Offer',
        nextText: 16
      },
      {
        text: 'Decline Offer',
        nextText: 17,
      }

    ]
  },
  {
    id: 15,
    requiredState: (currentState) => currentState.public,
    text: "",
    title:'ALERT',
    image:'myAlert.png',
    description:'Oh no, your bus was delayed and you were 3 hours late to work! You lost $30 in expected tips.',
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Deduct $30',
      nextText: 11,
      acctChange: -30
    }]
  },
  {
    id: 16,
    text: "",
    title:'ALERT',
    image: 'myMoney.png',
    description:'While at work, a generous customer left you a $50 tip! Small blessings!',
    balance: function() {
      return 'Balance: ' + currentBalance;
    },
    options: [{
      text: 'Continue',
      nextText: 17,
      acctChange: 50
    }]
  },

  {
    id: 17,
    text: "",
    title:"ALERT",
    image: 'myAlert.png',
    description:'Oh no, your house was burglared!',
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Pay $250 in replacements of essential items',
      nextText: 19,
      acctChange: -250,
    }]
  },
  {
    id: 18,
    requiredState: (currentState) => currentState.public,
    text: "",
    title:"ALERT",
    description:'Nice, you found $20 on your way home from work.',
    image: "myMoney.png",
    balance: function() {
      return 'Balance: ' + currentBalance;
    },
    options: [{
        text: 'Take the $20 and receive it as a blessing.',
        nextText: 14,
        acctChange: 20
      },
      {
        text: 'Leave it for the next person.',
        nextText: 14,
        acctChange: -0
      },

    ]
  },

  {
    id: 19,
    text: "",
    title:'CHALLENGE UNSUCCESSFUL',
    description:'Oh no, you ran out of money!',
    image:'myChallenge.png',
    balance: function() {
      return 'Balance: $' + currentBalance;
    },
    options: [{
      text: 'Restart Challenge',
      nextText: -1,
    }]
  },

];

startStacked();
