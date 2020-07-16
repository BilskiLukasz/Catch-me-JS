const listOfSizeButtons = document.querySelectorAll(`.btn-size`);
const warrning = document.querySelector(`.warrning`);
const gameBoard = document.querySelector(`.container-game-board`);
const statistics = document.querySelector(`.container-statistics`);
let listOfGameButtons, sizeOfGameBoard;
let pointsCounter = statistics.querySelector(`#points-counter`);
let livesCounter = statistics.querySelector(`#lives-counter`);
let activeButton = null;
let targetTimer = null;

//Add listener to each distinct button to get value with dimension board size choosed.
listOfSizeButtons.forEach(btn => {
    btn.addEventListener(`click`, function(){
    
    //Set bigger opacity on active button and default opacity on inactive buttons.
    for(const el of listOfSizeButtons){
        if(Object.is(el, this)){
            warrning.style.visibility = `hidden`;
            el.style.opacity = '0.2'
        } else {
            el.style.opacity = '1'
        }
    }
        sizeOfGameBoard = Number(this.value);
    })
})

//Create game-board after main menu
document.querySelector(`.btn-submit`).addEventListener('click', function(){
    if(sizeOfGameBoard){
        const numberOfElements = Math.pow(sizeOfGameBoard,2);

        gameBoard.style.display = `grid`;
        statistics.style.display = `grid`;
        gameBoard.style.gridTemplateColumns = `repeat(${sizeOfGameBoard}, 80px)`;
        gameBoard.style.gridTemplateRows = `repeat(${sizeOfGameBoard}, 80px)`;

        for (let i = 0; i < numberOfElements; i++){
            gameBoard.append(TileButton(i).getNewButton);
        }

        const hideMenu = function(){
            document.querySelectorAll(`.container-menu`).forEach(function(element) {
                element.style.display = `none`;
            })
        }();

        listOfGameButtons = document.querySelectorAll(`.btn-game-board`);

        setRandomButton(2000);
        
    } else {
        warrning.style.visibility = `visible`;
    }
})

//return new tile button object
function TileButton(id){
    let _newButton = document.createElement(`button`)
    
    setParameters = function(){
        _newButton.setAttribute(`id`, id);
        _newButton.classList.add(`btn-game-board`);
        _newButton.setAttribute(`value`, false);
        _newButton.addEventListener(`click`, function(){
                isCorrectClick(this);
        })
    }();

    return {
        get getNewButton(){
            return _newButton;
        }
    }
}

//Scores and lives counter
let isCorrectClick = function(button){
    const isCorrect = button.getAttribute(`value`) === `true`;
    stopTargetTimer();
    
        if(isCorrect){
            increasePointsCounter();
        }  else {
            substractLivesCounter();
    }

    setDefaultAttributes();
    setRandomButton();
}

//This method choose random button and turns it into a target
function setRandomButton(inputTime) {

    if(livesCounter.textContent > 0){
        const buttonIndex = Math.floor(Math.random() * listOfGameButtons.length);
        activeButton = listOfGameButtons[buttonIndex];

    setTimeout(function(){
        activeButton.style.backgroundImage = `url(./img/target.png)`;
        activeButton.setAttribute(`value`, true);
        startTargetTimer();
    }, inputTime);
    }
}

//This method changes active attributes to default
function setDefaultAttributes(){
    activeButton.setAttribute(`value`, false);
    activeButton.style.backgroundImage = ``;
}

//Add one point to currently score
function increasePointsCounter(){
    let counter = Number(pointsCounter.textContent);
    pointsCounter.textContent = ++counter;
}

//Substract one point from lives counter
function substractLivesCounter(){
    let counter = Number(livesCounter.textContent);
    counter--;
    livesCounter.textContent = counter;

    if(!counter){
        gameBoard.classList.add(`disabled-div`);
    }
}

//Set target button became availability to click per given time. If no, new button will be created and scores are substract.
function startTargetTimer(){
    targetTimer = setTimeout(function(){
        substractLivesCounter()
        setDefaultAttributes();
        setRandomButton();
    }, timerForTarget())
}

//Deactivate timer for target button
function stopTargetTimer(){
    clearTimeout(targetTimer);
    targetTimer = null;
}

//Return time depending on the points gained
function timerForTarget(){
    const scores = pointsCounter.textContent;

    switch(true) {
        case scores < 10:
            return 1500;
        case scores < 20:
            return 1300;
        case scores < 25:
            return 1100;
        default:
            return 900;
    }
}
















