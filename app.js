import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

// ================== 1. Callback Function ==================
function fetchPokemonCallback(nameOrId, callback) {
  P.getPokemonByName(nameOrId, (response, error) => {
    if (!error) {
      callback(null, response);
    } else {
      callback(error, null);
    }
  });
}

// ================== 2. Promise Function ==================
function fetchBerryPromise(nameOrArray) {
  return P.getBerryByName(nameOrArray)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

// ================== 3. Async/Await Function ==================
async function fetchPokemonSpeciesAsync(nameOrId) {
  try {
    const species = await P.getPokemonSpeciesByName(nameOrId);
    const englishName = species.names.find(
      (n) => n.language.name === "en"
    ).name;
    return englishName;
  } catch (err) {
    throw err;
  }
}

// ================== MAIN ==================
(async () => {
  console.log("--- CALLBACK FUNCTION ---");
  fetchPokemonCallback("pikachu", (err, data) => {
    if (err) console.log("Callback Error:", err);
    else console.log("Callback Pokemon Name:", data.name);

    // After callback, run promise
    console.log("\n--- PROMISE FUNCTION ---");
    fetchBerryPromise(["cheri", "chesto", 5])
      .then((data) => {
        console.log(
          "Promise Berries:",
          data.map((b) => b.name)
        );

        // After promise, run async/await
        console.log("\n--- ASYNC/AWAIT FUNCTION ---");
        (async () => {
          try {
            const name = await fetchPokemonSpeciesAsync("bulbasaur");
            console.log("Async/Await Pokemon Species Name:", name);
          } catch (err) {
            console.log("Async/Await Error:", err);
          }
        })();
      })
      .catch((err) => console.log("Promise Error:", err));
  });
})();
