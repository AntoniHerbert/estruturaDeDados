import { criarArvore } from './arvore.js';

function verificarVitoria(board, jogador) {
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

    return linhas.some(linha => linha.every(casa => casa === jogador));
}

function bestBranch(profundidade, boardInicial) {
    const arvore = criarArvore(boardInicial, profundidade, '+');

function encontrarMelhorCaminho(no) {
    // Verifica se o nó atual é uma folha e se o "X" venceu
    if (no.filhos.length === 0) {
        if (verificarVitoria(no.board, 'X')) {
            return [no.board];
        } else {
            return null;
        }
    }

    let melhorCaminho = null;

    // Percorre os filhos em busca da melhor folha que representa uma vitória do "X"
    for (const filho of no.filhos) {
        const caminhoFilho = encontrarMelhorCaminho(filho);
        if (caminhoFilho !== null) {
            // Se encontrar um caminho vencedor, verifica se é o melhor (menor profundidade)
            if (melhorCaminho === null || caminhoFilho.length < melhorCaminho.length) {
                melhorCaminho = [no.board, ...caminhoFilho];
            }
        }
    }

    return melhorCaminho;
}

return encontrarMelhorCaminho(arvore);

}

export { bestBranch };
