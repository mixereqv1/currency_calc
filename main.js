// FETCHING CURRENCY LIST FROM nbp.pl
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    if(xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        let rates = json[0].rates;
        rates.forEach(element => {
            let option = document.createElement('option');
            option.innerText = element.currency;
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
            span.innerText = `${json.rates[0].mid.toFixed(2)}`;
            document.querySelector('#result').innerText = `Kurs: ${json.rates[0].mid.toFixed(2)} zł`;
            // document.querySelector('#result').innerText += ``
            console.log(`${json.rates[0].mid.toFixed(2)} zł`);
        })
        xhrCurrency.open('GET',`http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/`,true);
        xhrCurrency.send();
    })
})

xhr.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json', true);
xhr.send();




// CURRENCY CALC
// const currency = document.querySelector('#money');
// const course = document.querySelector('#currency_course');

// count = () => {
//     document.querySelector('#result').innerText = (currency.value * course.innerText).toFixed(2);
// }

// document.querySelector('#count').addEventListener('click', count);