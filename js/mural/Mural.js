const Mural = (function(_render, Filtro){
    "use strict"

    let cartoes = pegaCartoesUsuario()

    login.on("login", ()=>{
        cartoes = pegaCartoesUsuario()
        render()
    })

    login.on("logout", ()=>{
        cartoes = []
        render()
    })

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function pegaCartoesUsuario(){
        let cartoesLocal = JSON.parse( localStorage.getItem( usuario ) )
        if ( cartoesLocal ) {
            return cartoesLocal.map( cartaoLocal => new Cartao( cartaoLocal.conteudo, cartaoLocal.tipo ) ) || []
        }else{
            return []
        }
    }

    function salvaCartoes(){
        localStorage.setItem( usuario, JSON.stringify( 
            cartoes.map( cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}) )
        ) )
    }

    function adiciona(cartao){

        if ( logado ){
            cartoes.push(cartao)
            salvaCartoes()
            cartao.on("mudanca.**", render)
            cartao.on("remocao", ()=>{
                cartoes = cartoes.slice(0)
                cartoes.splice(cartoes.indexOf(cartao),1)
                salvaCartoes()
                render()
            })
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
