import { useState } from 'react';
import {
    DnDCharacterStatsSheet,
    DnDCharacterProfileSheet,
    DnDCharacterSpellSheet,
    DnDCharacter
} from 'dnd-character-sheets'

import 'dnd-character-sheets/dist/index.css';
import './App.css';

function App() {
    const [character, setCharacter] = useState(new DnDCharacter());
    const onSaveCharacter = () => {
        const characterStorage = window.localStorage;
        const characterId = Math.floor(100000 + Math.random() * 900000);
        const json = JSON.stringify( character );
        characterStorage.setItem(characterId, json);
        document.getElementById('characterId').value = characterId;
        window.alert("Character sheet saved into browser memory with ID: " + characterId + "\n\nUse this ID to load this character sheet.");
    };

    const onLoadCharacter = () => {
        const id = document.getElementById('characterId').value;
        const characterStorage = window.localStorage;
        const json = characterStorage.getItem(id);
        const newCharacter = JSON.parse(json);
        setCharacter(newCharacter);
    };

    const onClearCharacter = () => {
        if (window.confirm('Are you sure?') == true) {
            setCharacter({});
        }
    };

    return (
      <>
          <div className="options">
              <button className="btn" onClick={onSaveCharacter}>Save character</button>
              &nbsp;&nbsp;&nbsp;
              <input id="characterId" />
              &nbsp;&nbsp;&nbsp;
              <button className="btn" onClick={onLoadCharacter}>Load character</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn" onClick={() => window.print()}>Print</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn" onClick={onClearCharacter}>Clear</button>

          </div>
          <DnDCharacterStatsSheet character={character} onCharacterChanged={setCharacter} />
          <DnDCharacterSpellSheet character={character} onCharacterChanged={setCharacter}/>
          <DnDCharacterProfileSheet character={character} onCharacterChanged={setCharacter}/>
      </>
    );
}

export default App;
