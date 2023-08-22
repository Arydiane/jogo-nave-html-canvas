const SETA_ESQUERDA = 'ArrowLeft'; 
const SETA_DIREITA = 'ArrowRight'; 
const SETA_ACIMA = 'ArrowUp'; 
const SETA_ABAIXO = 'ArrowDown'; 

const ESPACO = ' '; 

//KeyCode
// const SETA_ESQUERDA = 37; 
// const SETA_DIREITA = 39; 
//const SETA_CIMA = 38; 
//const SETA_BAIXO = 40; 
// const ESPACO = 32; 


function Teclado(elemento) {
    this.elemento = elemento; 
    // Array de teclas pressionadas
    this.pressionadas = [];

    // Array de teclas disparadas
    this.disparadas = [];

    // Funções de disparo
    this.funcoesDisparo = [];

    // Registrando o estado das teclas no array
    const teclado = this;

    elemento.addEventListener('keydown', function(evento) {
        const tecla = evento.key;
        teclado.pressionadas[tecla] = true; 

        // Disparar somente se for o primeiro keydown da tecla
        if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true; 
            teclado.funcoesDisparo[tecla](); 
        }

    }); 


    elemento.addEventListener('keyup', function(evento) {
        //setamos o estado “disparada” para false, de modo a tornar possíveis novos disparos
        const tecla = evento.key;
        teclado.pressionadas[tecla] = false; 
        teclado.disparadas[tecla] = false;
    }); 
}

Teclado.prototype = {

    pressionada: function(tecla) {
        return this.pressionadas[tecla];
    }, 
    
    disparou: function(tecla, callback) {
        this.funcoesDisparo[tecla] = callback; 
    }

}