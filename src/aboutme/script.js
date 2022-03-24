/* const $ = require( "jquery" )( window ); */
const apiURL = "https://rickandmortyapi.com/api/character";

async function WaitInput (inputID) 
{
    return new Promise(callback => 
    {
        inputID["onchange"] = (e) => 
        {
            callback(e.target.value);
        };
    });
}

async function WaitCharacterByID (charID) 
{
    return (await fetch(`${apiURL}/${charID}`)).json();
}

async function WaitCharactersByName (charname) 
{
    return (await fetch(`${apiURL}/?name=${charname}`)).json();
}

async function main () {
    const characters = document.getElementById("characters");
    const inputID = document.getElementById("character-id");
    while(true) {
        const characterid = await WaitInput(inputID);
        console.log(characterid);
        const characterByID = await WaitCharacterByID(characterid);
        console.log(characterByID);
        const { name : charname } = characterByID;
        const charactersOfName = await WaitCharactersByName(charname);
        console.log(charactersOfName);
        characters.innerHTML = "";
        charactersOfName.results.forEach(character => 
        {
            characters.innerHTML += `<li><p>${JSON.stringify(character)}</p></li>`;
        });
    }
}

main ();