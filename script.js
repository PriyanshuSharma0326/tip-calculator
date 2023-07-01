const form = document.getElementById('form-section');
const customTip = document.getElementById('custom-tip');

const billInput = document.getElementById('bill');
const peopleCountInput = document.getElementById('people-count');

const billErrorElement = document.getElementById('bill-error');
const tipErrorElement = document.getElementById('tip-error');
const peopleErrorElement = document.getElementById('people-error');

const tipAmountElement = document.getElementById('tip-amount');
const totalAmountElement = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-button');

let billAmount;
let people;
let radio;
let inputs = document.getElementsByTagName('input');

let tipValue;
let totalValue;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].id === 'bill') {
            billAmount = Number(inputs[i].value);
        }
        if (inputs[i].type === 'radio' && inputs[i].checked) {
            radio = Number(inputs[i].value);

            if(customTip.value) {
                tipErrorElement.innerText = '';
                if(customTip.classList.contains('error-outline')) {
                    customTip.classList.remove('error-outline');
                }
                if(customTip.classList.contains('free-outline')) {
                    customTip.classList.remove('free-outline');
                }
                customTip.value = undefined;
            }
        }
        if(inputs[i].id === 'custom-tip' && radio === undefined) {
            radio = Number(inputs[i].value);
        }
        if(inputs[i].id === 'people-count') {
            people = Number(inputs[i].value);
        }
    }

    if(radio < 0 || radio > 100) {
        tipErrorElement.innerText = '0 < Tip < 101';
        if(customTip.classList.contains('free-outline')) {
            customTip.classList.remove('free-outline');
        }
        customTip.classList.add('error-outline');
    }
    if(customTip.value) {
        tipErrorElement.innerText = '';
        if(customTip.classList.contains('error-outline')) {
            customTip.classList.remove('error-outline');
        }
        customTip.classList.add('free-outline');
    }
    else {
        tipErrorElement.innerText = '';
        if(customTip.classList.contains('error-outline')) {
            customTip.classList.remove('error-outline');
        }
        if(customTip.classList.contains('free-outline')) {
            customTip.classList.remove('free-outline');
        }
    }

    if(billAmount < 1) {
        billErrorElement.innerText = 'Can\'t be zero';
        if(billInput.classList.contains('free-outline')) {
            billInput.classList.remove('free-outline');
        }
        billInput.classList.add('error-outline');
    }
    else {
        billErrorElement.innerText = '';
        if(billInput.classList.contains('error-outline')) {
            billInput.classList.remove('error-outline');
        }
        billInput.classList.add('free-outline');
    }
    if(people < 1) {
        peopleErrorElement.innerText = 'Can\'t be zero';
        if(peopleCountInput.classList.contains('free-outline')) {
            peopleCountInput.classList.remove('free-outline');
        }
        peopleCountInput.classList.add('error-outline');
    }
    else {
        peopleErrorElement.innerText = '';
        if(peopleCountInput.classList.contains('error-outline')) {
            peopleCountInput.classList.remove('error-outline');
        }
        peopleCountInput.classList.add('free-outline');
    }

    if((radio >= 0 && radio <= 100) && (billAmount > 0) && (people > 0)) {
        tipValue = (billAmount/people)*(radio/100);
        totalValue = (billAmount/people) + tipValue;

        tipAmountElement.innerText = `$${tipValue.toFixed(2)}`;
        totalAmountElement.innerText = `$${totalValue.toFixed(2)}`;

        resetButton.classList.add('active');
    }
});

const uncheck = () => {
    radio = undefined;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'radio' && inputs[i].checked) {
            inputs[i].checked = false;
        }
    }
}

customTip.addEventListener('click', uncheck);

resetButton.addEventListener('click', () => {
    if(resetButton.classList.contains('active')) {
        tipValue = 0;
        totalValue = 0;

        tipAmountElement.innerText = `$${tipValue.toFixed(2)}`;
        totalAmountElement.innerText = `$${totalValue.toFixed(2)}`;
        resetButton.classList.remove('active');
    }
});
