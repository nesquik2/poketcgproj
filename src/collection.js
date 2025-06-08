import React from 'react';
import { Link } from 'react-router-dom';
import { packs } from './openpack.js';

const rarityOrder = {
    "common": 0,
    "uncommon": 1,
    "rare": 2,
    "ultra": 3,
    "legendary": 4
}

function getRarity(set, cardName){
    const card = packs[set].find(c => c.name === cardName);
    return card ? card.rarity : null;
}

function sortByRarity(set, entries){
    return entries.sort((a, b) => {
        const rarityA = getRarity(set, a[0]);
        const rarityB = getRarity(set, b[0]);
        if (rarityOrder[rarityA] !== rarityOrder[rarityB]){
            return rarityOrder[rarityA] - rarityOrder[rarityB];
        }
        return a[0].localeCompare(b[0]);
    })
}

export default function Collection () {
    const collection = JSON.parse(sessionStorage.getItem("collection")) || {
        set1_names: {},
        set2_names: {},
        set3_names: {}
    };
    
    return (
        <div className="page">
            <Link to="/">Back</Link>
            <h2>My collection</h2>
            <div className="row">
                <h3>electric set</h3>
                <div className="sets">
                  {sortByRarity(1, Object.entries(collection.set1_names)).map(([card,count]) => (
                  <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                  {card} x{count} 
                  </div>
                  ))}
                </div>
            </div>
            <div className="row">
                <h3>water set</h3>
                <div className="sets">
                    {sortByRarity(2, Object.entries(collection.set2_names)).map(([card,count]) => (
                    <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                    {card} x{count}
                    </div>
                ))}
                </div>
            </div>
            <div className="row">
                <h3>trainer set</h3>
                <div className="sets">
                    {sortByRarity(3, Object.entries(collection.set3_names)).map(([card,count]) => (
                        <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                        {card} x{count} 
                    </div>
                ))}
            </div>
        </div>
    </div>
 );
}