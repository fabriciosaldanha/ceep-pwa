const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = JSON.parse( localStorage.getItem("cartoes") ).map( cartaoLocal => new Cartao( cartaoLocal.conteudo, cartaoLocal.tipo ) ) || []
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    cartoes.forEach( cartao =>{
        preparaCartao( cartao )
    })
    render()

    Filtro.on("filtrado", render)

    function preparaCartao( cartao ){
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes(){
        localStorage.setItem("cartoes", JSON.stringify( 
            cartoes.map( cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}) )
        ) )
    }

    function adiciona(cartao){

        if ( logado ){
            cartoes.push(cartao)
            salvaCartoes()
            preparaCartao( cartao )
            render()
            return true
        }else{
            alert("Você não esta logado")
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
