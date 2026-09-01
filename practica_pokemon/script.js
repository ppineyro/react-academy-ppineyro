async function getPokemons() {
    const pokemons = [];

    for (let i = 1; i <= 9; i++) {
        const response = await fetch(`https://pokeapi.co{i}`);
        const data = await response.json();

        const speciesResponse = await fetch(`https://pokeapi.co{i}`);
        const speciesData = await speciesResponse.json();

        pokemons.push({
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            types: data.types.map(t => t.type.name).join(", "),
            generation: speciesData.generation.name
        });
    }

    console.log('Pokemons:', pokemons);
    return pokemons;
}

function renderPokemons(pokemons) {
    console.log("Rendering pokemons:", pokemons);
    let cardHTML = "";
    console.log("Card HTML:", cardHTML);
    pokemons.forEach(pokemon => {
        cardHTML += `
        <div class="card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p class="types">${pokemon.types}</p>
            <p class="generation">${pokemon.generation}</p>
        </div>
        `;
    });
    document.getElementById("main-container").innerHTML = cardHTML;
}

getPokemons().then(renderPokemons);