// Construtor bola
function Bola(context) {
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.cor = 'black';
    this.raio = 10;
}

Bola.prototype = {
    //Interface de animação
    atualizar: function () {
        var ctx = this.context;

        // A posição da bola é calculada pelo seu centro, portanto os limites para quicá-la têm que descontar o raio.
        if (this.x < this.raio || this.x > ctx.canvas.width - this.raio) {
            this.velocidadeX *= -1;
        }

        if (this.y < this.raio || this.y > ctx.canvas.height - this.raio) {
            this.velocidadeY *= -1;
        }

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    },

    desenhar: function () {
        var ctx = this.context;
        // Guardar configurações atuais do contexto
        ctx.save();
        // Configurar o contexto de acordo com a bola
        ctx.fillStyle = this.cor;
        // Desenhar
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
        ctx.fill();
        // Voltar às configurações anteriores
        ctx.restore();
    },
    //Interface de colisão
    retangulosColisao: function () {
        return [
            {
                x: this.x - this.raio, // this.x é o centro da bola, quero x inicial
                y: this.y - this.raio, // this.y é o centro da bola
                largura: this.raio * 2,
                altura: this.raio * 2
            }
        ]
    },
    colidiuCom: function (sprite) {
        if (this.x < sprite.x) // Estou na esquerda
            this.velocidadeX = -Math.abs(this.velocidadeX); // -
        else
            this.velocidadeX = Math.abs(this.velocidadeX); // +
        if (this.y < sprite.y) // Estou acima
            this.velocidadeY = -Math.abs(this.velocidadeY); // -
        else
            this.velocidadeY = Math.abs(this.velocidadeY); // +

    }
}