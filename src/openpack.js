import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OpenPack() {
    const navigate = useNavigate();
    const packs = {
            1: ["pikachu", "pichu", "pachirisu", "plusle", "minun", "shinx", "dedenne", "togedemaru"],
            2: ["squirtle", "maril", "buizel", "piplup", "oshawott", "vaporeon", "spheal", "wishiwashi"],
            3: ["elesa", "lillie", "erika", "n", "bianca", "marnie", "irida", "iono"]
    };

    const images = {
        1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkEl7rrrLrXcWdLB8oIqnQyzJIFHfIF5VO-e7672fr-4JcQW0VltWf68_maOieG3s8Jw&usqp=CAU",
        2: "https://i.pinimg.com/474x/ec/11/bc/ec11bc23bd980c7ca440a8bf06f1ff44.jpg",
        3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRunqsLfgHdc5jnA4mwKRknH_TwdPE_Ng2h0A&s"
    };

    const [step, setStep] = useState("chooseSet");
    const [set, setSet] = useState(null);
    const [packCards, setPackCards] = useState([]);
    const [revealCard, setRevealCard] = useState(0);

    function handleSetClick(setNumber) {
        setStep("choosePack");
        setSet(setNumber);
    }
    
    function handlePackClick() {
        setStep("revealCards");
        const shuffled = packs[set].slice().sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setPackCards(selected);    
    
        let collection = JSON.parse(sessionStorage.getItem('collection')) ||{
            set1_names: {},
            set2_names: {},
            set3_names: {}
        };

        //add new cards
        const setKey = `set${set}_names`;
        selected.forEach(card => {
            collection[setKey][card] = (collection[setKey][card] || 0) + 1;
        })
        //put colleciton back to localStorage
        sessionStorage.setItem('collection', JSON.stringify(collection));
    }

    function handleReveal() {
        if (revealCard < 4){ //reveal until all shown
            setRevealCard(revealCard + 1);
        } else {
            setStep("finished");
        }
    }
    
    return (
    <div class="page">
        {step === "chooseSet" && (
				<div>
					<h2>Choose a set</h2>
					<div className="packs" id="choosecards">
							<div id="set1" className="set" onClick={() => handleSetClick(1)}>
									electric set
									<img src={images[1]} alt="electric set"/>
							</div>
							<div id="set2" className="set" onClick={() => handleSetClick(2)}>
									water set
									<img src={images[2]} alt="water set"/>
							</div>
							<div id="set3" className="set" onClick={() => handleSetClick(3)}>
									trainer set
									<img src={images[3]} alt="trainer set"/>
							</div>
					</div>
				</div>
        )}

    {step === "choosePack" && (
			<div>
				<h2>[set {set}] pick a pack</h2>
				<div className='packs'>
					{[1,2,3,4,5].map(i => (
						<div className="set" key={i} onClick={() => handlePackClick()}>pack {i}
						<img src={images[set]} alt={`pack ${i}`}/>
					</div>
					))}
				</div>
			</div>
      )}
	
    {step === "revealCards" && (
        <div className="cards" onClick={() => handleReveal()}>
            <img src={`/pics/${packCards[revealCard]}.png`} alt={`card ${packCards[revealCard]}`} />
            {packCards[revealCard]} Rarity: 1/8       
        </div>
    )}

    {step === "finished" && (
        <div>
       <div className="lineup">
            {packCards.map(card => (
                <div className="cards">
                    <img src={`/pics/${card}.png`} alt={`${card} card`}/>
                    {card} Rarity
                </div>
            ))}
        </div>
         <button onClick={() => navigate('/')}>Next</button>
         </div>
    )}
    
    </div>
    )
}