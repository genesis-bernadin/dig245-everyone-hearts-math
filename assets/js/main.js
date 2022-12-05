const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};
let currentBalance = 290;

function startStacked() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

  if (textNode.text == '') {
    textElement.innerText = textNode.balance();

  } else {
    textElement.innerText = textNode.text;
  }
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

  if (currentBalance <=0) {
    nextTextNodeId = 18;
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
    text: 'A child born into poverty in Charlotte, NC will most likely die in poverty...',
    options: [{
      text: 'Continue',
      nextText: 2,
    }, ]
  },
  {
    id: 2,
    text: 'In Charlotte, NC, an estimated 11.9% of the population live below the poverty line...',
    options: [{
      text: 'Continue',
      nextText: 3,
    }, ]
  },
  {
    id: 3,
    text: 'Among the most affected demographics in poverty are Blacks (44%), Whites (31%), and Hispanics (26%), with female populations especially vulnerable.',
    options: [{
      text: 'Continue',
      nextText: 4,
    }, ]
  },
  {
    id: 4,
    text:'As such, many residents of Charlotte work off of minimum wage and  are forced to live paycheck to paycheck. This reality is not so easy to endure.' + "\n"  + 'How well will you survive when the odds are stacked against you...?',
    options: [{
      text: 'Start Challenge',
      nextText: 5, 
    }, ]
  },

  {
    id: 5,
    text: "",
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Great, you are a 28 year old single parent of one.  In order to live comfortably, you work 40 hours a week as a waitress at Joe’s Dinner. In addition, to commuting to work you must take your child to and from school. You cannot afford childcare so you must be prompt. ' + "\n" + 'You have one week left until your next paycheck. Are you ready to start the challenge?';
    },
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

    ]
  },
  {
    id: 6,
    text: "",
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Choose Your Housing';

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
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Choose your Transportation';
    },
    options: [{
        text: 'Car | Gas: $35 per week // $140 per month',
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
        text: 'Balance: ' + currentBalance + "\n" + 'Public Transportation | Ticket: $22.5 per week // $85 per month',
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
    text: "",
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Nice, you invested in your own vehicle and now you can commute comfortably. You have more agency to  meet all of your destination needs.';
    },
    options: [{
      text: 'Continue',
      nextText: 10
    }]
  },
  {
    id: 9,
    text: "",
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Congratulations, you saved money on gas! However, in Charlotte, the public transportation system is unreliable when you need to travel outside the Downtown area. Please manage your time wisely!';
    },
    options: [{
      text: 'Continue',
      nextText: 11
    }]
  },
  {
    id: 10,
    text: "",
    balance: function() {
      return 'Balance: ' + currentBalance + "\n" + 'Alert: Your water bill is due today';
    },
    options: [{
      text: 'Pay the $50 to cut it back on',
      nextText: 12,
      acctChange: -50
    }]
  },
  {
    id: 11,
    text:"",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'Alert: Time for your weekly groceries!';
    },
    options: [{
      text: 'Pay $100 on food and essentials',
      nextText: 10,
      acctChange: -100,
    }]
  },
  {
    id: 12,
    requiredState: (currentState) => currentState.car,
    text: "",
    balance: function(){
      return'Balance: ' + currentBalance + "\n" + 'Oh no, your car caught a flat tire on your way to your destination.';
    },
    options: [{
        text: 'Replace tire for $60',
        nextText: 13,
        acctChange: -60
      },
      {
        text: 'Take public transportation',
        setState: (currentState) => currentState.public,
        nextText: 9
      },

    ]
  },
  {
    id: 13,
    text: "",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'You must pay $20 to pick up your child with a ridesharing app after your flat tire.';
    },
    options: [{
      text: 'Continue',
      nextText: 14,
      acctChange: -20
    }]
  },
  {
    id: 14,
    text:"",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'Your employers offer you the opportunity to get overtime (OT) for a time and a half. This could increase your earnings by $22. However, you will spend less time with your child.';
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
    text:"",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'Oh no, your bus was delayed and you were 3 hours late to work! You lost $30 in expected tips.';
    },
    options: [{
      text: 'Deduct $30',
      nextText: 11,
      acctChange: -30
    }]
  },
  {
    id: 16,
    text:"",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'While at work, a generous customer left you a $50 tip! Small blessings :)';
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
    balance: function(){
      return'Balance: ' + currentBalance + "\n" + 'Oh no, your house was burglared!';
    },
    options: [{
      text: 'Pay $250 in replacements of essential items',
      nextText: 18,
      acctChange: -250,
    }]
  },




  {
    id: 18,
    text: "",
    balance: function(){
      return 'Balance: ' + currentBalance + "\n" + 'Oh no, you ran out of money!';
    },
    options: [{
      text: 'Restart Challenge',
      nextText: -1,
    }]
  },

];

startStacked();
