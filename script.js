const game = document.getElementById('game')

let state = []

let win = false
let winPlayer = document.getElementById('win-player')
let winnerDiv = document.getElementById('vencedor')

const players = [
    {
        nome: 'Player 1',
        part: 'X'
    },
    {
        nome: 'Player 2',
        part: 'O'
    }
]

setup()

function setPlayer(player) {
    document.getElementById('selected-player').innerHTML = `${player.part}`
}

function setWinner(player) {
    winPlayer.innerHTML = player ? `${player.nome}` : 'Empate'
    winnerDiv.style.display = 'block'
}

function setup() {
    setPlayer(players[0])
    winPlayer.innerHTML = '-'
    winnerDiv.style.display = 'none'
    game.innerHTML = ''

    state = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
    ]

    for (let row = 0; row < 3; row++) {
        const tr = document.createElement('tr')
        for (let col = 0; col < 3; col++) {
            const td = document.createElement('td')
            td.classList.add('quadrado')
            td.innerHTML = state[row][col]

            td.setAttribute('row', row)
            td.setAttribute('col', col)

            td.addEventListener('click', function () {
                if (state[row][col] === '-') {
                    play(row, col, this)
                }
            })
            tr.appendChild(td)
        }
        game.appendChild(tr)
    }

    win = false
}

function play(row, col, obj) {
    if (win == true) return

    state[row][col] = players[0].part
    obj.innerHTML = players[0].part
    obj.style.color = 'white'
    obj.style.backgroundColor = 'black'
    vitoria()
    players.reverse()
    setPlayer(players[0])
}

function VerificaVitoria(linha1, linha2, linha3) {
    if (linha1 === linha2 && linha1 === linha3 && linha1 !== '-') {
        win = true
        return true
    } else {
        return false
    }
}

function getElementAndColor(row, col) {
    const element = document.querySelector(`[row="${row}"][col="${col}"]`)
    element.style.backgroundColor = 'green'
} 

function vitoria() {
    //Diagonal Esquerda
    if (VerificaVitoria(state[0][0], state[1][1], state[2][2])) {
        setWinner(players[0])
        getElementAndColor(0, 0)
        getElementAndColor(1, 1)
        getElementAndColor(2, 2)
    }

    //Diagonal Direita
    if (VerificaVitoria(state[0][2], state[1][1], state[2][0])) {
        setWinner(players[0])
        getElementAndColor(0, 2)
        getElementAndColor(1, 1)
        getElementAndColor(2, 0)
    }

    //linha
    for (let i = 0; i < 3; i++) {
        if (VerificaVitoria(state[0][i], state[1][i], state[2][i])) {
            setWinner(players[0])

            getElementAndColor(0, i)
            getElementAndColor(1, i)
            getElementAndColor(2, i)

        }
    }

    //coluna
    for (let i = 0; i < 3; i++) {
        if (VerificaVitoria(state[i][0], state[i][1], state[i][2])) {
            setWinner(players[0])

            getElementAndColor(i, 0)
            getElementAndColor(i, 1)
            getElementAndColor(i, 2)
        }
    }

    Empate()
}

function Empate() {
    let cont = 0
    state.forEach(linha => {
        linha.forEach(coluna => {
            if (coluna !== '-') {
                cont++
            }
        })
    })
    if (cont === 9) {
        setWinner(null)
        const elements = document.querySelectorAll('.quadrado')
        elements.forEach(element => {
            element.style.backgroundColor = 'red'
        })
    }
}