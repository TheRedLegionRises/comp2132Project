const maxDiceValue = 6;
let rounds = 0;
const maxRounds = 3;

class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.totalScore = 0;
    }

    calculateScore(die1, die2) {
        if (isThereOne(die1, die2)) {
            this.totalScore += 1;
            return 1
        }
        else if (die1 == die2) {
            this.totalScore += (die1 + die2) * 2
            return (die1 + die2) * 2
        }
        else {
            this.totalScore += die1 + die2
            return die1 + die2
        }
    }

    resetScore() {
        this.totalScore = 0;
    }

    displayTotalScore() {
        console.log(`${this.playerName} has ${this.totalScore} points`);
        return this.totalScore;
    }
}

let player = new Player("player1");
let cpu = new Player("cpu");

function rollDie() {

        let playerDice1 = Math.floor(Math.random() * maxDiceValue) + 1;
        let playerDice2 = Math.floor(Math.random() * maxDiceValue) + 1;
        let cpuDice1 = Math.floor(Math.random() * maxDiceValue) + 1;
        let cpuDice2 = Math.floor(Math.random() * maxDiceValue) + 1;

        console.log(playerDice1);
        console.log(playerDice2);

        animateDie();

        setTimeout(function () {
            cancelAnimationFrame(dieAnimationHandler);
            $(`#playerDice1`).attr("src", `./images/dice${playerDice1}.png`)
            $(`#playerDice2`).attr("src", `./images/dice${playerDice2}.png`)

            $(`#cpuDice1`).attr("src", `./images/dice${cpuDice1}.png`)
            $(`#cpuDice2`).attr("src", `./images/dice${cpuDice2}.png`)

            $("#playerCurrentScore").html(player.calculateScore(playerDice1, playerDice2))
            $("#cpuCurrentScore").html(cpu.calculateScore(cpuDice1, cpuDice2))

            $("#playerTotalScore").html(player.displayTotalScore())
            $("#cpuTotalScore").html(cpu.displayTotalScore())

            checkGameEnd();


        }, delay)

        // player.calculateScore(playerDice1, playerDice2);
        // cpu.calculateScore(cpuDice1, cpuDice2);
    }

const $popup = $("#popup");

function closePopup(){
    $popup.fadeOut();
}

function checkWinner(){
    let playerScore = player.totalScore;
    let cpuScore = cpu.totalScore;

    if(playerScore == cpuScore){
        $("#winner").html("Nobody");
        $("#description").html("It's a draw!")
    }else if(cpuScore > playerScore){
        $("#winner").html("CPU Wins!");
        $("#description").html("You got beat by the CPU in a game of luck")
    }else{
        $("#winner").html("You Win!");
        $("#description").html("Fortune favors the bold")
    }
}

function checkGameEnd(){
    if (rounds == maxRounds) {
        checkWinner();
        setTimeout(function (){
            $popup.fadeIn();

        }, 1000)
        console.log("Max Rounds Reached");
        $("#newGame").show();
        $("#rollDie").attr("disabled", true)


    }
}

function startGame(){
    rounds += 1;
    
    rollDie();
    
}

function resetGame(){
    rounds = 0;

    player.resetScore();
    cpu.resetScore();
    $("#rollDie").attr("disabled", false);
    $("#newGame").hide();

    $(`#playerDice1`).attr("src", `./images/dice1.png`)
    $(`#playerDice2`).attr("src", `./images/dice1.png`)

    $(`#cpuDice1`).attr("src", `./images/dice1.png`)
    $(`#cpuDice2`).attr("src", `./images/dice1.png`)

    $("#playerCurrentScore").empty()
    $("#cpuCurrentScore").empty()

    $("#playerTotalScore").empty()
    $("#cpuTotalScore").empty() 

}

let dieAnimationHandler;
let counter = 1;
const delay = 1000;


function animateDie() {
    $("#playerDice1").attr("src", `./images/dice${counter}.png`)
    $("#playerDice2").attr("src", `./images/dice${counter}.png`)
    $("#cpuDice1").attr("src", `./images/dice${counter}.png`)
    $("#cpuDice2").attr("src", `./images/dice${counter}.png`)
    counter++;

    if (counter > maxDiceValue) {
        counter = 1;
    }

    dieAnimationHandler = requestAnimationFrame(animateDie)
}

function isThereOne(die1, die2) {
    if (die1 == 1 || die2 == 1) {
        return true;
    }
    return false;
}

// Testing Functions
// rollDie("left")

let player1 = new Player("player2");

player1.displayTotalScore();


// Setup for Jquery
function setup() {
    console.log("Setup Complete")
    $("#rollDie").on("click", startGame)
    $("#newGame").on("click", resetGame)

    $("#closePopup").on("click", closePopup)

}

$(document).ready(setup)