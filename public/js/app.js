// console.log('Client side JS')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


messageTwo.textContent = ''
messageThree.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    // Comment out localhost when pushing to heroku
    // fetch('http://localhost:3000/weather?address='+location).then((response) => {

    fetch('/weather?address='+location).then((response) => {
        messageOne.textContent = 'Loading...'
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.description
                messageThree.textContent = data.forecast.temperature + ' degrees of Celcius'
                console.log(data.forecast)
            }
        })
    })
    console.log(location)
})