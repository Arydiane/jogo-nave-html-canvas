//funcao construtora
function Animacao(context) {
    this.context = context; 
    this.sprites = []; 
    this.ligado = false; 
}

Animacao.prototype = {

    novoSprite: function(sprite) {
        this.sprites.push(sprite);
    },

    ligar: function() {
        this.ligado = true; 
        this.proximoFrame(); 
    },

    desligar: function() {
        this.ligado = false;
    }, 

    proximoFrame: function() {
        // Posso continuar?
        if (!this.ligado) return;

        // A cada ciclo, limpamos a tela ou desenhamos um fundo
        this.limparTela();

        // Atualizamos o estado dos sprites
        for(let i in this.sprites) {
            this.sprites[i].atualizar(); 
        }

        // Desenhamos os sprites
        for(let i in this.sprites) {
            this.sprites[i].desenhar(); 
        }

        // Chamamos o próximo ciclo
        let animacao = this; 
        requestAnimationFrame(function() {
            animacao.proximoFrame();
        });
    }, 

    limparTela: function() {
        var ctx = this.context; 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}