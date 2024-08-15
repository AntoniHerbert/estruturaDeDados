function calcularQualidade(board) {
    const linhas = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]],
    ];

    let qualidadeX = 0;
    let qualidadeO = 0;

    for (const linha of linhas) {
        let contadorX = 0;
        let contadorO = 0;

        for (const casa of linha) {
            if (casa === 'X') contadorX++;
            if (casa === 'O') contadorO++;
        }

        if (contadorO === 0) {
            qualidadeX += (3 - contadorX);
        }
        if (contadorX === 0) {
            qualidadeO += (3 - contadorO);
        }
    }

    return qualidadeX - qualidadeO;
}

function criarFilhos(board, turno) {
    const filhos = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                const novoBoard = board.map(linha => linha.slice());
                novoBoard[i][j] = turno === '+' ? 'X' : 'O';
                filhos.push(novoBoard);
            }
        }
    }
    return filhos;
}

function criarArvore(board, profundidade, turno) {
    if (profundidade === 0) {
        return {
            board: board,
            turno: turno,
            qualidade: calcularQualidade(board),
            filhos: []
        };
    }

    const filhosBoards = criarFilhos(board, turno);
    const proximoTurno = turno === '+' ? '-' : '+';

    const filhos = filhosBoards.map(filhoBoard => 
        criarArvore(filhoBoard, profundidade - 1, proximoTurno)
    );

    return {
        board: board,
        turno: turno,
        qualidade: calcularQualidade(board),
        filhos: filhos
    };
}

// Exemplo de uso:
const boardInicial = [
    ['X', '', 'O'],
    ['', 'X', ''],
    ['O', '', 'X']
];

const profundidade = 2;
const arvore = criarArvore(boardInicial, profundidade, '+');
console.log(JSON.stringify(arvore, null, 2));
