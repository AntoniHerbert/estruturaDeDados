import { criarArvore } from './arvore.js';

function treeVisualization(profundidade, boardInicial) {
        try {
        const canvas = document.createElement('canvas');
        canvas.id = 'treeCanvas';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let offsetX = 0, offsetY = 0; // Offset para rolagem
        let isDragging = false;
        let startX, startY;

        // Função para desenhar um nó (tabuleiro de jogo da velha)
        function drawNode(node, x, y) {
            const size = 50; // Tamanho de cada tabuleiro
            const padding = 40;

            //desenha o turno acima do tabuleiro
            ctx.font = '14px Arial';
            ctx.textAling = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${node.turno}`, x, y - 20);

            // Desenhar o tabuleiro
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.strokeRect(x + j * size / 3, y + i * size / 3, size / 3, size / 3);
                    let value = node.board[i][j];
                    if (value) {
                        ctx.font = '16px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(value, x + j * size / 3 + size / 6, y + i * size / 3 + size / 6);
                    }
                }
            }

            //Desenhar a qualidade abaixo do tabuleiro
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${node.qualidade}`, x + size, y + size + 20);

            // Desenhar as linhas conectando os nós, se houver filhos
            if (node.children) {
                node.children.forEach((child, index) => {
                    let childX = x + (index * 2 - 1) * (padding + size); // Ajuste horizontal para os filhos
                    let childY = y + padding + size; // Ajuste vertical para os filhos
                    ctx.beginPath();
                    ctx.moveTo(x + size / 2, y + size);
                    ctx.lineTo(childX + size / 2, childY);
                    ctx.stroke();
                    drawNode(child, childX, childY);
                });
            }
        }

        // Função para calcular o tamanho da árvore e ajustar o canvas
        function calculateTreeSize(node) {
            if (!node) return { width: 0, height: 0 };
            
            const size = 50;
            const padding = 40;
            
            if (node.children.length === 0) {
                return { width: size, height: size };
            }
            
            const childSizes = node.children.map(calculateTreeSize);
            
            const width = childSizes.reduce((acc, cur) => acc + cur.width, 0) + (node.children.length - 1) * padding;
            const height = size + padding + Math.max(...childSizes.map(s => s.height));
            
            return { width, height };
        }

        // Evento para arrastar a tela
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - offsetX;
            startY = e.pageY - offsetY;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                offsetX = e.pageX - startX;
                offsetY = e.pageY - startY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawNode(treeRoot, canvas.width / 2 + offsetX, offsetY);
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // Inicializar a árvore e ajustar o canvas ao tamanho necessário
        const treeRoot = criarArvore(boardInicial, profundidade, '+');
        const treeSize = calculateTreeSize(treeRoot);

        // Ajustar o tamanho do canvas para a árvore
        canvas.width = treeSize.width + 200;  // Adiciona uma margem extra
        canvas.height = treeSize.height + 200;

        // Desenhar a árvore na posição inicial
        drawNode(treeRoot, (canvas.width - treeSize.width) / 2, 20);

    } catch (error) {
        console.error('Erro ao executar o script:', error);
        // Exibir uma mensagem de erro no console
        alert('Ocorreu um erro ao carregar o conteúdo. Verifique o console para mais detalhes.');
    }
}
export { treeVisualization };
