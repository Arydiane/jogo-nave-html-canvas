const SONIC_DIREITA = 1;
const SONIC_ESQUERDA = 2;

function Sonic(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.x = 0;
    this.y = 0;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 3, 8);
    this.sheet.intervalo = 60;

    // Estado inicial
    this.andando = false;
    this.direcao = SONIC_DIREITA;
    this.velocidade = 10;
}

Sonic.prototype = {
    atualizar: function () {
        if (this.teclado.pressionada(SETA_DIREITA)) {
            //andando para direita
            // Se já não estava neste estado...
            if (!this.andando || this.direcao != SONIC_DIREITA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 1;
                this.sheet.coluna = 0;
            }

            // Configuro o estado atual
            this.andando = true;
            this.direcao = SONIC_DIREITA;

            // Neste estado, a animação da spritesheet deve rodar
            this.sheet.proximoQuadro();
            // Desloco o Sonic
            this.x += this.velocidade;

        } else if (this.teclado.pressionada(SETA_ESQUERDA)) {
            //andando para esquerda
            if (!this.andando || this.direcao != SONIC_ESQUERDA) {
                this.sheet.linha = 2; // linha andando para esquerda
                this.sheet.coluna = 0;
            }

            this.andando = true;
            this.direcao = SONIC_ESQUERDA;
            this.sheet.proximoQuadro();
            this.x -= this.velocidade;
            
        } else {
            //sonic esta parado
            if (this.direcao == SONIC_DIREITA) {
                this.sheet.coluna = 0;
            } else if (this.direcao == SONIC_ESQUERDA) {
                this.sheet.coluna = 1;
            }

            this.sheet.linha = 0;
            this.andando = false;
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);
    }
}