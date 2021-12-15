console.log('Client side js file!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#error')
const messageTwo = document.querySelector('#response')

messageOne.textContent = 'Loading...'
messageTwo.textContent=''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    // on local machine
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather
               

            }
        })
    })

})