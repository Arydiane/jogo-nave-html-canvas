function Colisor() {
    this.sprites = [];
    this.aoColidir = null;
    this.spritesExcluir = [];
}

Colisor.prototype = {
    novoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    stringUnica: function (sprite) {
        let str = '';
        const retangulos = sprite.retangulosColisao();

        for (let i in retangulos) {
            str += 'x:' + retangulos[i].x + ',' +
                'y:' + retangulos[i].y + ',' +
                'l:' + retangulos[i].largura + ',' +
                'a:' + retangulos[i].altura + '\n';
        }
        return str;
    },
    processar: function () {
        // Inicio com um objeto vazio
        let jaTestados = new Object();
        // Verifica a colisão “todos contra todos” no array de sprites
        for (let i in this.sprites) {
            for (let j in this.sprites) {
                // Não colidir um sprite com ele mesmo
                if (i == j) continue;

                // Gerar strings únicas para os objetos
                const id1 = this.stringUnica(this.sprites[i]);
                const id2 = this.stringUnica(this.sprites[j]);

                // Criar os arrays se não existirem
                if (!jaTestados[id1]) jaTestados[id1] = [];
                if (!jaTestados[id2]) jaTestados[id2] = [];

                if (!(jaTestados[id1].indexOf(id2) >= 0 ||
                    jaTestados[id2].indexOf(id1) >= 0)) {

                    // Testar a colisão
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    // Registrando o teste
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }
            }

        }
        this.processarExclusoes();

    },
    testarColisao: function (sprite1, sprite2) {
        // Obtem os retângulos de colisão de cada sprite
        const rets1 = sprite1.retangulosColisao();
        const rets2 = sprite2.retangulosColisao();

        // Testar as colisões entre eles
        colisoes:
        for (var i in rets1) {
            for (var j in rets2) {
                //verifica se retangulos colidem
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    // Eles colidem, vamos notificá-los
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);
                    // Tratador geral
                    if (this.aoColidir) this.aoColidir(sprite1, sprite2);
                    // Não precisa terminar de ver todos os retângulos
                    break colisoes;
                }
            }
        }

    },
    retangulosColidem: function (ret1, ret2) {
        // Fórmula de interseção de retângulos
        return (ret1.x + ret1.largura) > ret2.x &&
            ret1.x < (ret2.x + ret2.largura) &&
            (ret1.y + ret1.altura) > ret2.y &&
            ret1.y < (ret2.y + ret2.altura);
    },
    excluirSprite: function (sprite) {
        this.spritesExcluir.push(sprite);
    },
    processarExclusoes: function () {
        // Criar um novo array
        let novoArray = [];
        // Adicionar somente os elementos não excluídos
        for (let i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1){
                novoArray.push(this.sprites[i]);
            }
        }
        // Limpar o array de exclusões
        this.spritesExcluir = [];
        // Substituir o array velho pelo novo
        this.sprites = novoArray;
    }
}