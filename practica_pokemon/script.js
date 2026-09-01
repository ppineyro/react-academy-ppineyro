async function getPokemons() {
    const pokemons = [];

    for (let i = 1; i <= 9; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
            const speciesData = await speciesResponse.json();

            pokemons.push({
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types.map(t => t.type.name).join(", "),
                generation: speciesData.generation.name
            });
        } catch (error) {
            console.error(`Error obteniendo el pokémon ${i}:`, error);
        }
    }

    console.log('Pokemons:', pokemons);
    return pokemons;
}

function pintarPokemones(pokemones) {
    console.log("Pintando pokemones:", pokemones);
    let tarjetasHTML = "";
    
    pokemones.forEach(pokemon => {
        tarjetasHTML += `
        <div class="card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p class="types">${pokemon.types}</p>
            <p class="generation">${pokemon.generation}</p>
        </div>
        `;
    });
    document.getElementById("main-container").innerHTML = tarjetasHTML;
}
getPokemons().then(pintarPokemones);