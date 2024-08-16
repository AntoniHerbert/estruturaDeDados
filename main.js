import { bestBranch } from './bestBranch.js';
    import { treeVisualization } from './treeVisualization.js';

    let currentPlayer = 'X';
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const resetButton = document.getElementById('resetButton');
    const bestBranchButton = document.getElementById('bestBranchButton');
    const boardSequenceDiv = document.getElementById('boardSequence');

    function updateButtonState() {
        const xCount = board.flat().filter(cell => cell === 'X').length;
        const oCount = board.flat().filter(cell => cell === 'O').length;
        resetButton.disabled = Math.abs(xCount - oCount) > 1;
    }

    document.getElementById('board').addEventListener('click', function(event) {
        if (event.target.classList.contains('cell')) {
            const row = event.target.getAttribute('data-row');
            const col = event.target.getAttribute('data-col');
            board[row][col] = currentPlayer;
            event.target.textContent = currentPlayer;
            // Troca o turno
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            // Atualiza o estado do botão
            updateButtonState();
        }
    });

    resetButton.addEventListener('click', function() {
        // Limpa todo o conteúdo do body
        document.body.innerHTML = '';
        // Chama a função treeVisualization passando o tabuleiro atual
        treeVisualization(6, board);
    });

    bestBranchButton.addEventListener('click', function() {
        melhorGalho(6);
    });

    function melhorGalho(profundidade) {
        const boardSequence = bestBranch(profundidade,board);

        boardSequenceDiv.innerHTML = ''; // Limpa a sequência anterior

        boardSequence.forEach((boardState, index) => {
            const boardDisplay = document.createElement('div');
            boardDisplay.classList.add('board-display');

            boardState.forEach((row, rowIndex) => {
                row.forEach((cellValue, colIndex) => {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.textContent = cellValue;
                    boardDisplay.appendChild(cell);
                });
            });

            boardSequenceDiv.appendChild(boardDisplay);

            if (index < boardSequence.length - 1) {
                const arrow = document.createElement('div');
                arrow.classList.add('arrow');
                arrow.textContent = '↓';
                boardSequenceDiv.appendChild(arrow);
            }
        });
    }