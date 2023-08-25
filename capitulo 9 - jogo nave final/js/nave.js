const imgNaveLargura = 36; 
const imgNaveAltura = 48; 
function Nave(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    this.spritesheet = new Spritesheet(context, imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
}

Nave.prototype = {
    atualizar: function () {

        let incremento = this.velocidade * this.animacao.decorrido / 1000;

        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= incremento;
        }

        //Considera o tamanho do canvas e desconta o tamanho da nave, para que não ultrapassasse a borda
        if (this.teclado.pressionada(SETA_DIREITA) &&
            this.x < this.context.canvas.width - imgNaveLargura) {
            this.x += incremento;
        }

        if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0) {
            this.y -= incremento;
        }

        //Considera o tamanho do canvas e desconta o tamanho da nave, para que não ultrapassasse a borda
        if (this.teclado.pressionada(SETA_ABAIXO) &&
            this.y < this.context.canvas.height - imgNaveAltura) {
            this.y += incremento;
        }
    },

    desenhar: function () {
        if (this.teclado.pressionada(SETA_ESQUERDA)) {
            this.spritesheet.linha = 1;
        } else if (this.teclado.pressionada(SETA_DIREITA)) {
            this.spritesheet.linha = 2;
        } else {
            this.spritesheet.linha = 0;
        }

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },

    atirar: function () {
        const t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao: function () {
        const rets = [
            { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
            { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
            { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
        ]

        // // Desenhando os retângulos para visualização
        // const ctx = this.context;
        // for (let i in rets) {
        //     ctx.save();
        //     ctx.strokeStyle = 'yellow';
        //     ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura,
        //         rets[i].altura);
        //     ctx.restore();
        // }

        return rets;
    },
    colidiuCom: function (outro) {
        // Se colidiu com um Ovni...
        if (outro instanceof Ovni) {
            // Fim de jogo!
            this.animacao.desligar();
            alert('GAME OVER');
        }
    }
}