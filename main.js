// FETCHING CURRENCY LIST FROM nbp.pl
const xhr = new XMLHttpRequest();
const resultDiv = document.querySelector('#result');
xhr.addEventListener('load', () => {
    if(xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        let rates = json[0].rates;
        rates.forEach(element => {
            let option = document.createElement('option');
            option.innerText = element.currency.toUpperCase();
            option.value = element.code;
            document.querySelector('#currency_list').appendChild(option);
        })
    }
    document.querySelector('#currency_list').addEventListener('change', (event) => {
        let currencyCode = event.target.options[event.target.selectedIndex].value;
        const xhrCurrency = new XMLHttpRequest();
        xhrCurrency.addEventListener('load', () => {
            let json = JSON.parse(xhrCurrency.response);
            let span = document.createElement('span');
            let groupDiv = document.createElement('div');
            let groupDivCourse = document.createElement('div');
            let moneyLabel = document.createElement('label');
            let money = document.createElement('input');
            let course = json.rates[0].mid.toFixed(2);
            groupDiv.className = 'group';
            groupDivCourse.className = 'group';
            moneyLabel.for = 'money';
            moneyLabel.innerText = 'Ilość pięniędzy:';
            money.id = 'money';
            money.type = 'number';
            span.innerText = `Kurs: ${course} zł`;
            span.id = 'course';

            count = (event) => {
                if(document.querySelector('#owned_money') == null) {
                    let result = document.createElement('span');
                    result.id = 'owned_money';
                    result.innerText = `Masz: ${(event.target.value * course).toFixed(2)} zł`;
                    resultDiv.appendChild(result);
                } else {
                    document.querySelector('#owned_money').innerText = `Masz: ${(event.target.value * course).toFixed(2)} zł`;
                }
            }
            money.addEventListener('keyup', count);

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
        xhrCurrency.open('GET',`http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/`,true);
        xhrCurrency.send();
    })
})

xhr.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json', true);
xhr.send();