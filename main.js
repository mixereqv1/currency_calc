// FETCHING CURRENCY LIST FROM nbp.pl
const xhr = new XMLHttpRequest();
const mainElement = document.querySelector('.main');
const resultDiv = document.querySelector('#result');
const currencyList = document.querySelector('#currency_list');
xhr.addEventListener('load', () => {
    if(xhr.status === 200) {
        const json = JSON.parse(xhr.response);
        const rates = json[0].rates;
        rates.forEach(element => {
            let option = document.createElement('option');
            let code = document.createElement('span');
            option.innerText = element.currency.toUpperCase();
            option.value = element.mid;
            code.className = 'currency_code';
            code.innerText = element.code;
            currencyList.appendChild(option);
            currencyList.appendChild(code);
        })
    }
    currencyList.addEventListener('change', (event) => {
        const course = Number(event.target.selectedOptions[0].value).toFixed(2);
        const currencyCode = event.target.selectedOptions[0].nextElementSibling.innerText;
        const span = document.createElement('span');
        const groupDiv = document.createElement('div');
        const groupDivCourse = document.createElement('div');
        const moneyLabel = document.createElement('label');
        const money = document.createElement('input');
        groupDiv.className = 'group';
        groupDivCourse.className = 'group';
        moneyLabel.for = 'money';
        moneyLabel.innerText = 'Ilość pięniędzy (w zł):';
        money.id = 'money';
        money.type = 'number';
        span.innerText = `Kurs: ${course} zł`;
        span.id = 'course';

        count = (event) => {
            if(document.querySelector('#owned_money') == null) {
                const result = document.createElement('span');
                result.id = 'owned_money';
                result.innerText = `Masz: ${(event.target.value / course).toFixed(2)} ${currencyCode}`;
                resultDiv.appendChild(result);
            } else {
                document.querySelector('#owned_money').innerText = `Masz: ${(event.target.value / course).toFixed(2)} ${currencyCode}`;
            }
        }
        mainElement.addEventListener('keyup', count);

        if(resultDiv.childElementCount == 0) {
            groupDiv.appendChild(moneyLabel);
            groupDiv.appendChild(money);
            resultDiv.appendChild(groupDiv);
            groupDivCourse.appendChild(span);
            resultDiv.appendChild(groupDivCourse);
        } else {
            document.querySelector('#course').innerText = `Kurs: ${course} zł`;
        }
    })
    currencyList.addEventListener('change', (event) => {
        const ownedMoney = document.querySelector('#owned_money');
        const currencyCode = event.target.selectedOptions[0].nextElementSibling.innerText;
        if(ownedMoney != null) {
            const input = document.querySelector('#money');
            const course = Number(event.target.value).toFixed(2);
            ownedMoney.innerText = `Masz: ${(course / input.value).toFixed(2)} ${currencyCode}`;
        }
    })
})
xhr.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json', true);
xhr.send();