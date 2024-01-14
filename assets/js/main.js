const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 500
const limit = 10
let offset = 0;




//por padrão o fetch utiliza o request-method GET
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => 
                `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="imagens-pokemons" src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
            </li>
            `
            ).join('')
            pokemonList.innerHTML += newHtml
        
        })
}

loadPokemonItens(offset, limit)

LoadMoreButton.addEventListener("click", ()=>{
    offset += limit
    const qtdRecordNextPage = offset + limit
        if (qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)

            LoadMoreButton.parentElement.removeChild(LoadMoreButton)
        }else{
            loadPokemonItens(offset, limit)
        }     
    
})
    