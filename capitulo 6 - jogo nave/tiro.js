function Tiro(context, nave) {
    this.context = context;
    this.nave = nave;
    this.cor = 'red';

    // Posicionar o tiro no bico da nave
    this.largura = 4;
    this.altura = 20;
    this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
    this.y = nave.y - this.altura;
    this.velocidade = 10;

}

Tiro.prototype = {
    atualizar: function () {
        // this.y -= this.velocidade;

        if (this.nave.direcao == DIRECAO_ESQUERDA) {
           this.x -= this.velocidade;
        } else if (this.nave.direcao == DIRECAO_DIREITA) {
            this.x += this.velocidade;
        } else if (this.nave.direcao == DIRECAO_ACIMA) {
            this.y -= this.velocidade; 
        } else {
            this.y += this.velocidade; 
        }
    },

    desenhar: function () {
        const ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.restore();
    }
}