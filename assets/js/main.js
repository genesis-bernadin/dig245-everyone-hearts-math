const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startStacked() {
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

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startStacked()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Great, you are a 28 year old single parent of one. In order to live comfortably, you work 40 hours a week as a waitress at Joe’s Dinner. In addition, to commuting to work you must take your child to and from school. You cannot afford childcare so you must be prompt.',
    options: [
      {
        text: 'Start Challenge',
        setState: { transportation: false },
        nextText: 2
      },

    ]
  },
  {
    id: 2,
    text: 'Choose Your Housing',
    options: [
      {
        text: '1 Bedroom Apt | Medium Risk Area | 30-Minute Commute',

        nextText: 3
      },
      {
        text: '2 Bedroom Apt | High Risk Area | 5-Minute Commute',
        nextText: 3
      },

    ]
  },
  {
    id: 3,
    text: 'Choose your Transportation',
    options: [
      {
        text: 'Car | Gas: $35 per week // $140 per month',
        setState: { transportation: true },
        setState:{transportation: true, car: true },
        nextText: 4
      },
      {
        text: 'Public Transportation | Ticket: $22.5 per week // $85 per month',
        setState: { transportation: false },
        setState:{transportation: true, public: true },
        nextText: 5
      },

    ]
  },
  {
    id: 4,
    text: 'Nice, you invested in your own vehicle and now you can commute comfortably. You have more agency to  meet all of your destination needs.',
    requiredState: (currentState)=> currentState.car,
    options: [
      {
        text: 'Continue',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'Congratulations, you saved money on gas! However, in Charlotte, the public transportation system is unreliable when you need to travel outside the Downtown area. Please manage your time wisely!',
    options: [
      {
        text: 'Continue',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'Alert: Your water bill is due today',
    options: [
      {
        text: 'Pay the $50 to cut it back on',
        nextText: 8
      }
    ]
  },
  {
    id: 7,
    text: 'Alert: Time for your weekly groceries!',
    options: [
      {
        text: 'Pay $100 on food and essentials',
        nextText: 10
      }
    ]
  },
  {
    id: 7,
    text: 'Oh no, your car caught a flat tire on your way to your destination.',
    requiredState: (currentState)=> currentState.car,
    options: [
      {
        text: 'Replace tire for $60',
        nextText: 8
      },
      {
        text: 'Take public transportation',
        setState: (currentState)=> currentState.public,
        nextText: 8
      },

    ]
  },
  {
    id: 8,
    text: 'You must pay $15 to pick up your child with a ridesharing app after your flat tire.',
    options: [
      {
        text: 'Continue',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'Your employers offer you the opportunity to get overtime (OT) for a time and a half. This could increase your earnings by $22. However, you will spend less time with your child.',
    options: [
      {
        text: 'Accept Offer',
        nextText: 11
      },
      {
        text: 'Decline Offer',
        nextText: 12,
      }

    ]
  },
  {
    id: 10,
    text: 'Oh no, your bus was delayed and you were 3 hours late to work! You lost $30 in expected tips.',
    options: [
      {
        text: 'Deduct $30',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'While at work, a generous customer left you a $50 tip! Small blessings :)',
    options: [
      {
        text: 'Continue',
        nextText: 12
      }
    ]
  },

  {
    id: 12,
    text: 'Oh no, your house was burglared!',
    options: [
      {
        text: 'Pay $75 in replacements of essential items',
        nextText: 13
      }
    ]
  },
  {
    id: 13,
    text: 'Oh no, you ran out of money!',
    options: [
      {
        text: 'Restart Challenge',
        nextText: -1
      }
    ]
  },

]

startStacked()
