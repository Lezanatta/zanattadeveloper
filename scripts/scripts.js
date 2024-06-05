$(document).ready(function() {
    const projetos = $('.projeto-item');
    const btnPrev = $('.prev');
    const btnNext = $('.next');

    function atualizarBotoes() {
        const projetoAtivo = projetos.filter('.projeto-ativo');
        const proximoProjeto = projetoAtivo.next('.projeto-item');
        const projetoAnterior = projetoAtivo.prev('.projeto-item');

        btnNext.prop('disabled', proximoProjeto.length === 0);
        btnPrev.prop('disabled', projetoAnterior.length === 0);
    }

    function AdicionarCirculosVisualizacaoProjetos() {
        $('.container-circulos').remove();
        const projetoAtivo = $('.projeto-ativo:first');
        let componentesAdicionados = '<div class="container-circulos">';
        
        projetos.each(function() {
            componentesAdicionados += $(this).hasClass('projeto-ativo') 
                ? '<div class="circulo-projetos view-circulo"></div>' 
                : '<div class="circulo-projetos"></div>';
        });

        componentesAdicionados += '</div>';
        projetoAtivo.append(componentesAdicionados);
    }

    function mudarProjeto(direcao) {
        const projetoAtivo = projetos.filter('.projeto-ativo');
        const novoProjeto = direcao === 'next' 
            ? projetoAtivo.next('.projeto-item') 
            : projetoAtivo.prev('.projeto-item');
        if (novoProjeto.length > 0) {
            projetoAtivo.removeClass('projeto-ativo');
            novoProjeto.addClass('projeto-ativo');
            atualizarBotoes();
            AdicionarCirculosVisualizacaoProjetos();
        }
    }

    btnNext.click(function() {
        mudarProjeto('next');
    });

    btnPrev.click(function() {
        mudarProjeto('prev');
    });

    AdicionarCirculosVisualizacaoProjetos();
    atualizarBotoes();

    function checkWindowSize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        
        var elementoNew = $('.new-parentButton') 
        if (width <= 980) {
            var divButtons = $('.navigation-buttons')
            if(elementoNew.length == 0){
                divButtons.wrapAll('<div class="new-parentButton"></div>');
            }
        }else{
            if(elementoNew.length > 0){
                elementoNew.children().unwrap();
            }
        }
    }

    const resizeObserver = new ResizeObserver(() => {
        checkWindowSize();
    });

    resizeObserver.observe(document.body);

    checkWindowSize();
});
