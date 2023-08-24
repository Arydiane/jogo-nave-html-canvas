// Códigos únicos para as direções
const DIRECAO_ESQUERDA = 1;
const DIRECAO_DIREITA = 2;
const DIRECAO_ACIMA = 3;
const DIRECAO_ABAIXO = 4;

function Nave(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    //direção padrao
    this.direcao = DIRECAO_ACIMA; 
}

Nave.prototype = {
    atualizar: function () {

        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= this.velocidade;
            this.direcao = DIRECAO_ESQUERDA; 
        }

        //Considera o tamanho do canvas e desconta o tamanho da nave, para que não ultrapassasse a borda
        if (this.teclado.pressionada(SETA_DIREITA) &&
            this.x < this.context.canvas.width - this.imagem.width) {
            this.x += this.velocidade;
            this.direcao = DIRECAO_DIREITA; 
        }

        if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0) {
            this.y -= this.velocidade;
            this.direcao = DIRECAO_ACIMA; 
        }

        //Considera o tamanho do canvas e desconta o tamanho da nave, para que não ultrapassasse a borda
        if (this.teclado.pressionada(SETA_ABAIXO) &&
            this.y < this.context.canvas.height - this.imagem.height) {
            this.y += this.velocidade;
            this.direcao = DIRECAO_ABAIXO; 
        }
    },

    desenhar: function () {
        this.context.drawImage(this.imagem, this.x, this.y,
            this.imagem.width, this.imagem.height);
    }, 

    atirar: function () {
        const t = new Tiro(this.context, this); 
        this.animacao.novoSprite(t); 
    }
}