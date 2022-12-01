'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
var dragonPV = 0;
var playerPV = 0;
var maxPvPlayer = 0;
var maxPvDragon = 0;
var difficulte = {facile:"1",normal:"2",difficile:"3"};
var userChoice;
var tours = 1;
var victoire = false;



/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
function choiceMaker(){ // détermination et configuration de la difficulté du jeu

    let choice = prompt("Choissisez votre difficulté : (1 = Facile, 2 = Normal, 3 = Difficile)");
    userChoice = choice;

    //configuration Facile
    if (choice == difficulte.facile){
        dragonPV = 100 + throwDices(5,10);
        playerPV = 100 + throwDices(10,10);

    //configuration Normale
    } else if (choice == difficulte.normal){
        dragonPV = 100 + throwDices(10,10);
        playerPV = 100 + throwDices(10,10);

    //configuration Difficile
    } else if (choice == difficulte.difficile){
        dragonPV = 100 + throwDices(10,10);
        playerPV = 100 + throwDices(7,10);
    }

    //Attribution des P.Vs Max durant cette partie
    maxPvPlayer = playerPV;
    maxPvDragon = dragonPV;
}

function init(ntour){ //initialisation d'un tour

    let degats = 0;
    
    //calcul de l'initiative
    let playerInitiative = throwDices(10,6);
    let dragonInitiative = throwDices(10,6);

    if (playerInitiative > dragonInitiative){ //détermination de l'initiative la plus forte

        //application des dégats
        degats = calculDegats("player");
        affichageInitiative(ntour,"player",degats);
        dragonPV -= degats;
    } else {

        //application des dégats
        degats = calculDegats("dragon");
        affichageInitiative(ntour,"dragon",degats);
        playerPV -= degats;
    }
}

function calculDegats(initiateur){ //calcul des dommages

    let totalDamage; // => dommages totaux
    let baseDamage = throwDices(3,6); // => dommages de base


    if (initiateur == "player"){ //dégats infligés par le joueur

        //calcul des dommages en difficulté Facile
        if (userChoice == difficulte.facile){ 
            totalDamage = baseDamage + (baseDamage * (throwDices(2,6)/100));

        //calcul des dommages en difficulté Difficile
        } else if (userChoice == difficulte.difficile){ 
            totalDamage = baseDamage - (baseDamage * (throwDices(1,6)/100));

        //calcul des dommages en difficulté Normale
        } else if (userChoice == difficulte.normal){
            totalDamage = baseDamage;
        }
    } else if (initiateur == "dragon"){ //dégats infligés par le dragon

        //calcul des dommages en difficulté Facile
        if (userChoice == difficulte.facile){
            totalDamage = baseDamage - (baseDamage * (throwDices(2,6)/100));

        //calcul des dommages en difficulté Difficile
        } else if (userChoice == difficulte.difficile){
            totalDamage = baseDamage + (baseDamage * (throwDices(1,6)/100));

        //calcul des dommages en difficulté Normale
        } else if (userChoice == difficulte.normal){
            totalDamage = baseDamage;
        }
    }


    return totalDamage.toFixed(0);// toFixed(0) 13.999 (flottant) => 13 (entier)
}


function affichageInitiative(ntour,initiateur,degats){ // afficher l'initiative
    if (initiateur == "player"){ //le joueur prend l'initiative

        document.write(`
            <h3>Tour n°`+ ntour+`</h3>
            <figure class="game-round">
                <img src="img/knight-winner.png" alt="Chevalier vainqueur">
                <figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez `+degats+` points de dommage !</figcaption>
            </figure>
        `);

    } else if (initiateur == "dragon"){//le dragon prend l'initiative

        document.write(`
        <h3>Tour n°`+ ntour+`</h3>
        <figure class="game-round">
            <img src="img/dragon-winner.png" alt="Dragon vainqueur">
            <figcaption>Le dragon prend l'initiative, vous attaque et vous inflige `+degats+` points de dommage !</figcaption>
        </figure>
        `);

    }
}

function affichageEtat(){// afficher l'état des points de vies

    document.write(`
    <div class="game-state">
        <figure class="game-state_player">
            <img src="img/knight.png" alt="Chevalier">
            <figcaption><progress max="`+maxPvPlayer+`" value="`+playerPV+`"></progress>`+playerPV+` PV</figcaption>
        </figure>
        <figure class="game-state_player">
            <img src="img/dragon.png" alt="Dragon">
            <figcaption><progress max="`+maxPvDragon+`" value="`+dragonPV+`"></progress>`+dragonPV+` PV</figcaption>
        </figure>
    </div>
    `);

}

function affichageFin(gagnant){ //affichage du gagnant de la partie
    if (gagnant == "player"){ //Le joueur est gagnant
        document.write(`
        <footer>
            <h3>Fin de la partie</h3>
            <figure class="game-end">
                <figcaption>Vous avez gagné le combat, le dragon est éradiqué !</figcaption>
                <img src="img/knight-winner.png" alt="Chevalier vainqueur">
            </figure>
        </footer>
        `)
    } else if (gagnant == "dragon") { //Le dragon est gagnant
        document.write(`
        <footer>
            <h3>Fin de la partie</h3>
            <figure class="game-end">
                <figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption>
                <img src="img/dragon-winner.png" alt="Dragon vainqueur">
            </figure>
        </footer>
        `);
    }
}



/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/


choiceMaker();


while (playerPV > 0 && dragonPV > 0){

    affichageEtat();
    init(tours);
    tours++;
    
}


if (playerPV <= 0) {
    playerPV =0;
    affichageEtat();
    affichageFin("dragon");
} else if (dragonPV <= 0){
    dragonPV = 0;
    affichageEtat();
    affichageFin("player");
}
