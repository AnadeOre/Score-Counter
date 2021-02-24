
const inputName = document.querySelector('.inputName');
const initialScore = document.querySelector('.initialScore');
const enterButton = document.querySelector('.enter');
const currentPlayers = document.querySelector('.currentPlayers');
const leaderBoardHTML = document.querySelector('.leaderBoard');
let newScore, addNew, currentScore;

function addPlayer() {
    if (!initialScore.value) initialScore.value = 0;
    let newPlayer = `<li class="item"><span class="player">${inputName.value}</span> <span class="currentScore">${initialScore.value}</span>
    <input type="number" class="addScore">
    <button class="addButton">Add</button>
    </li>`;
    currentPlayers.innerHTML += newPlayer;
    console.log(currentPlayers)
    addNew = document.querySelectorAll('.addButton')

    inputName.value = '';
    initialScore.value = 0;
}

function updateScore(e) {
    currentScore = e.parentElement.querySelector('.currentScore');
    newScore = currentScore.nextElementSibling.valueAsNumber;
    let updatedScore = parseFloat(currentScore.textContent) + newScore;
    currentScore.textContent = updatedScore;

    if (parseFloat(currentScore.textContent) >= 500) gameEnds(e);

}

function gameEnds() {
    let playerList = [...currentPlayers.children]
    let pointsArray = new Array();
    let playerArray = new Array();
    playerList.forEach(player => pointsArray.push(parseFloat(player.childNodes[2].textContent)));
    playerList.forEach(player => playerArray.push(player.childNodes[0].textContent));

    let index = 0;
    let value = pointsArray[0];
    for (var i = 0; i < pointsArray.length; i++) {
        if (pointsArray[i] < value) {
            value = pointsArray[i];
            index = i;
        }
    }

    window.alert(`Player ${playerArray[index]} won!`)
}

function updateLeaderboard() {
    let playerList = [...currentPlayers.children]
    let pointsArray = new Array();
    let playerArray = new Array();
    playerList.forEach(player => pointsArray.push(parseFloat(player.childNodes[2].textContent)));
    playerList.forEach(player => playerArray.push(player.childNodes[0].textContent));

    //Ordeno la array de puntajes modificando la de nombres
    let list = [];
    for (var j = 0; j < playerArray.length; j++)
        list.push({ 'player': playerArray[j], 'points': pointsArray[j] });

    list.sort(function (a, b) {
        return ((a.points < b.points) ? -1 : ((a.points == b.points) ? 0 : 1));
    });
    for (var k = 0; k < list.length; k++) {
        playerArray[k] = list[k].player;
        pointsArray[k] = list[k].points;
    }

    //Ahora lo agrego al leaderboard
    leaderBoardHTML.innerHTML = '';
    let h = 0;
    playerArray.forEach(player => {
        let board = `<li><span>${player}</span><span>${pointsArray[h]}</span></li>`;
        leaderBoardHTML.innerHTML += board;
        h++;
    })


}


//Listeners
enterButton.addEventListener('click', addPlayer);
document.addEventListener('click', e => {
    if (e.explicitOriginalTarget.className === "addButton") {
        updateScore();
        updateLeaderboard();
    }
});


