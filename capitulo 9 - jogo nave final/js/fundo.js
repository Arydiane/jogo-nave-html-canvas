function Fundo(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.posicaoEmenda = 0; 
}

Fundo.prototype = {
    atualizar: function () {

        // Atualizar a posição de emenda
        //velocidade é em pixel por segundo e tempo decorrido em millisegundos (divide-se por 1000 para transformar o tempo em segundos)
        this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000;

        // Emenda passou da posição
        if (this.posicaoEmenda > this.imagem.height){
            this.posicaoEmenda = 0;
        }
            
    },

    desenhar: function () {
        const img = this.imagem; 

        //Primeira cópia
        let posicaoY = this.posicaoEmenda - img.height; 
        this.context.drawImage(img, 0, posicaoY, img.width, img.height); 

        //Segunda cópia
        posicaoY = this.posicaoEmenda; 
        this.context.drawImage(img, 0, posicaoY, img.width, img.height);
    }
}