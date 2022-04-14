const game = document.getElementById('game')

let state = []
let players = []
let win = false

const winPlayer = document.getElementById('win-player')
const selectedPlayer = document.getElementById('selected-player')

setup()

function setPlayer(player) {
    selectedPlayer.innerHTML = `Jogador: ${player.piece}`
}

function setWinner(player) {
    winPlayer.style.display = 'block'
    selectedPlayer.style.display = 'none'
    winPlayer.innerHTML = player ? `Vencedor: ${player.piece}` : 'Empate'
}

function setup() {
    win = false
    players = [
        {
            piece: 'X'
        },
        {
            piece: 'O'
        }
    ]

    setPlayer(players[0])
    winPlayer.style.display = 'none'
    selectedPlayer.style.display = 'block'
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
}

function play(row, col, obj) {
    if (win == true) return

    state[row][col] = players[0].piece
    obj.innerHTML = players[0].piece
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

function getElementAndColor(row1, col1, row2, col2, row3, col3) {
    const winColor = 'green'

    const element = document.querySelector(`[row="${row1}"][col="${col1}"]`)
    element.style.backgroundColor = winColor

    const element2 = document.querySelector(`[row="${row2}"][col="${col2}"]`)
    element2.style.backgroundColor = winColor

    const element3 = document.querySelector(`[row="${row3}"][col="${col3}"]`)
    element3.style.backgroundColor = winColor
}

function vitoria() {
    //Diagonal Esquerda
    if (VerificaVitoria(state[0][0], state[1][1], state[2][2])) {
        setWinner(players[0])
        getElementAndColor(0, 0, 1, 1, 2, 2)
    }

    //Diagonal Direita
    if (VerificaVitoria(state[0][2], state[1][1], state[2][0])) {
        setWinner(players[0])
        getElementAndColor(0, 2, 1, 1, 2, 0)
    }

    //linha
    for (let i = 0; i < 3; i++) {
        if (VerificaVitoria(state[0][i], state[1][i], state[2][i])) {
            setWinner(players[0])
            getElementAndColor(0, i, 1, i, 2, i)
        }
    }

    //coluna
    for (let i = 0; i < 3; i++) {
        if (VerificaVitoria(state[i][0], state[i][1], state[i][2])) {
            setWinner(players[0])
            getElementAndColor(i, 0, i, 1, i, 2)
        }
    }

    Draw()
}

function Draw() {
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
