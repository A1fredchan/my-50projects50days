const jokes = document.getElementById('Jokes')
const jokeBtn = document.getElementById('btn')

jokeBtn.addEventListener('click', generateJoke)

generateJoke()

function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    fetch('https://icanhazdadjoke.com', config)
        .then((res) => res.json())
        .then((data) => {
            jokes.innerHTML = data.joke
        })
}