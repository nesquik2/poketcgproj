import React from 'react';
import { Link } from 'react-router-dom';

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
                  {Object.entries(collection.set1_names).map(([card,count]) => (
                  <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                  {card} x{count}
                  </div>
                  ))}
                </div>
            </div>
            <div className="row">
                <h3>water set</h3>
                <div className="sets">
                    {Object.entries(collection.set2_names).map(([card,count]) => (
                    <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                    {card} x{count}
                    </div>
                ))}
                </div>
            </div>
            <div className="row">
                <h3>trainer set</h3>
                <div className="sets">
                    {Object.entries(collection.set3_names).map(([card,count]) => (
                        <div className="cards" key={card}><img src={`/pics/${card}.png`} alt={card}/>
                        {card} x{count}
                    </div>
                ))}
            </div>
        </div>
    </div>
 );
}