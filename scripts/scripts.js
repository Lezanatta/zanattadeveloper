$(document).ready(function() {
    const projetos = $('.projeto-item') 
    IniciarProjeto(projetos)
    AdicionarEventosClick(projetos)
})

function IniciarProjeto(projetos){
    const resizeObserver = new ResizeObserver(() => {
        ObservarJanelaAjustarVisualizacaoProjetos()
    });
    resizeObserver.observe(document.body);


    ObservarJanelaAjustarVisualizacaoProjetos();
    AdicionarCirculosVisualizacaoProjetos(projetos);
    AtualizarBotoes(projetos);
}

function AdicionarEventosClick(projetos){
    $(".btn-drop").on("click", function() {
        var dropDown = $(".dropdown-content").first()
        dropDown.toggleClass("show")
    })

    $(window).on("click", function(event) {
        if (!$(event.target).closest(".btn-drop").length) {
            $(".dropdown-content").removeClass("show")
        }
    })

    const btnPrev = $('.prev')
    const btnNext = $('.next')

    btnNext.click(function() {
        MudarProjeto('next', projetos, this)
    });

    btnPrev.click(function() {
        MudarProjeto('prev', projetos, this)
    });
}

function ObservarJanelaAjustarVisualizacaoProjetos() {
    var width = window.innerWidth;
    
    var novoComponente = $('.novo-componente') 
    if (width <= 980) {
        var divButtons = $('.navigation-buttons')
        if(novoComponente.length == 0){
            divButtons.wrapAll('<div class="novo-componente"></div>');
        }
    }else{
        if(novoComponente.length > 0){
            novoComponente.children().unwrap()
        }
    }
}

function AdicionarCirculosVisualizacaoProjetos(projetos) {
    $('.container-circulos').remove()
    const projetoAtivo = $('.projeto-ativo:first');
    let componentesAdicionados = '<div class="container-circulos">'
    
    projetos.each(function() {
        componentesAdicionados += $(this).hasClass('projeto-ativo') 
            ? '<div class="circulo-projetos view-circulo"></div>' 
            : '<div class="circulo-projetos"></div>'
    });

    componentesAdicionados += '</div>';

    projetoAtivo.append(componentesAdicionados)
}

function MudarProjeto(direcao, projetos) {
    const projetoAtivo = projetos.filter('.projeto-ativo')

    const novoProjeto = direcao === 'next' 
        ? projetoAtivo.next('.projeto-item') 
        : projetoAtivo.prev('.projeto-item')

    if (novoProjeto.length > 0) {
        projetoAtivo.removeClass('projeto-ativo')
        novoProjeto.addClass('projeto-ativo')

        AtualizarBotoes(projetos)
        AdicionarCirculosVisualizacaoProjetos(projetos);
    }
}

function AtualizarBotoes(projetos) {
    const projetoAtivo = projetos.filter('.projeto-ativo')
    const proximoProjeto = projetoAtivo.next('.projeto-item')
    const projetoAnterior = projetoAtivo.prev('.projeto-item')

    const btnNext = $('.next')
    const btnPrev = $('.prev')

    btnNext.prop('disabled', proximoProjeto.length === 0)
    btnPrev.prop('disabled', projetoAnterior.length === 0)
}


