// Códigos únicos para as direções
const DIRECAO_ESQUERDA = 1;
const DIRECAO_DIREITA = 2;
const DIRECAO_ACIMA = 3;
const DIRECAO_ABAIXO = 4;

function Heroi(context, teclado, animacao) {
    this.context = context;
    this.teclado = teclado;
    this.animacao = animacao;
    this.x = 0;
    this.y = 0;

    //direção padrão
    this.direcao = DIRECAO_DIREITA;
}

Heroi.prototype = {
    atualizar: function () {
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.direcao = DIRECAO_ESQUERDA;
            this.x -= 10;
        } else if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 20) {
            this.direcao = DIRECAO_DIREITA;
            this.x += 10;
        } else if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0) {
            this.direcao = DIRECAO_ACIMA; 
            this.y -= 10;
        } else if (this.teclado.pressionada(SETA_ABAIXO) && this.context.canvas.height - 20) {
            this.direcao = DIRECAO_ABAIXO; 
            this.y += 10; 
        }
    },
    desenhar: function () {
        this.context.fillRect(this.x, this.y, 20, 50);
    },
    atirar: function () {
        const tiro = new Bola(this.context);
        tiro.x = this.x + 10;
        tiro.y = this.y + 10;
        tiro.raio = 2;
        tiro.cor = 'red';

        if (this.direcao == DIRECAO_ESQUERDA) {
            tiro.velocidadeX = -20;
        } else if (this.direcao == DIRECAO_DIREITA) {
            tiro.velocidadeX = 20;
        } else if (this.direcao == DIRECAO_ACIMA) {
            tiro.velocidadeY = -20; 
        } else {
            tiro.velocidadeY = 20; 
        }

        this.animacao.novoSprite(tiro);
    }
}