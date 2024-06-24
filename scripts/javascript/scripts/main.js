(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stateGame;
    (function (stateGame) {
        stateGame["start"] = "start";
        stateGame["battle"] = "battle";
        stateGame["death"] = "death";
    })(stateGame || (stateGame = {}));
    //стандартный класс
    class classTemplate {
        constructor(parrent) {
            this.parrent = parrent;
            this.mainBlock = document.querySelector(this.parrent);
        }
        hidden() {
            this.mainBlock.style.display = 'none';
        }
        visible() {
            this.mainBlock.style.display = 'block';
        }
        onLoad() {
            console.log(this.stateS);
        }
    }
    class Random {
        constructor(min, max) {
            this.min = min;
            this.max = max;
        }
        generate() {
            return Math.floor(Math.random() * (this.max - this.min) + this.min);
        }
        //Массив с рандомными числами
        generateArray(len) {
            let array = [];
            let temp = 0;
            while (array.length < len) {
                temp = this.generate();
                if (array.indexOf(temp) == -1) {
                    array.push(temp);
                }
            }
            return array;
        }
    }
    class Challenge extends classTemplate {
        constructor() {
            super(...arguments);
            this.charArray = ['+', '-', '*', '/'];
            this.random = new Random(-100, 1000);
            this.randomItems = new Random(0, 3);
            this.challengeObj = {};
        }
        checkCard() {
            this.allCards = document.querySelectorAll('.arena-task-item');
            console.log(this.allCards);
            this.allCards.forEach(card => {
                card.addEventListener('click', (event) => {
                    if (card.id == this.challengeObj.correct) {
                        card.className = 'arena-task-item_current';
                        this.print();
                    }
                    else {
                        card.className = 'arena-task-item_error';
                    }
                });
            });
        }
        calculations(numberFirst, numberSecond, char) {
            switch (char) {
                case '+':
                    return numberFirst + numberSecond;
                case '-':
                    return numberFirst - numberSecond;
                case '*':
                    return numberFirst * numberSecond;
                case '/':
                    return numberFirst / numberSecond;
            }
        }
        generate() {
            this.numberFirst = this.random.generate();
            this.numberSecond = this.random.generate();
            this.currentChar = this.charArray[new Random(0, 3).generate()];
            this.challengeObj = {
                numberFirst: this.numberFirst,
                char: this.currentChar,
                numberSecond: this.numberSecond,
                correct: this.calculations(this.numberFirst, this.numberSecond, this.currentChar),
                fakeFirst: this.calculations(this.random.generate(), this.random.generate(), this.currentChar),
                fakeSecond: this.calculations(this.random.generate(), this.random.generate(), this.currentChar)
            };
            this.randomItemsCard = this.randomItems.generateArray(3);
        }
        newTask() {
            if (this.allCards) {
                setTimeout(() => {
                    this.allCards.forEach(element => {
                        element.remove();
                    });
                    this.generate();
                    this.printCards('.arena-task');
                    this.checkCard();
                    console.log(`${this.numberFirst} ${this.currentChar} ${this.numberSecond}`);
                    this.mainBlock.textContent = `${this.numberFirst} ${this.currentChar} ${this.numberSecond}`;
                }, 500);
            }
            else {
                this.print();
            }
        }
        printCards(parrentCards) {
            function checkItem(index, challengeObj) {
                switch (index) {
                    case 0:
                        return challengeObj.correct;
                    case 1:
                        return challengeObj.fakeSecond;
                    case 2:
                        return challengeObj.fakeFirst;
                }
            }
            const parrentCardsBlock = document.querySelector(`${parrentCards}`);
            for (let i = 0; i < 3; i++) {
                let CardBlock = document.createElement('div');
                CardBlock.className = 'arena-task-item';
                CardBlock.innerText = `${checkItem(this.randomItemsCard[i], this.challengeObj)}`;
                CardBlock.id = `${checkItem(this.randomItemsCard[i], this.challengeObj)}`;
                parrentCardsBlock.appendChild(CardBlock);
            }
        }
        print() {
            if (this.allCards == undefined) {
                this.generate();
                this.printCards('.arena-task');
                this.checkCard();
                console.log(`${this.numberFirst} ${this.currentChar} ${this.numberSecond}`);
                this.mainBlock.textContent = `${this.numberFirst} ${this.currentChar} ${this.numberSecond}`;
            }
            else {
                this.newTask();
            }
        }
    }
    // класс кнопки
    class Button extends classTemplate {
        click(func) {
            this.mainBlock.addEventListener('click', () => {
                func();
            });
        }
    }
    class Task extends classTemplate {
    }
    class Arena extends classTemplate {
        constructor() {
            super(...arguments);
            this.task = new Challenge('.main-task');
        }
        startFight() {
            this.task.print();
        }
        onLoad() {
            this.hidden();
        }
    }
    // класс для игры
    class Game {
        constructor() {
            this.state = stateGame.start;
            this.arena = new Arena('.arena');
            this.startButton = new Button('.start-button');
        }
        clickStart() {
            this.startButton.click(() => {
                this.startButton.hidden();
                this.state = stateGame.battle;
                if (this.state == stateGame.battle) {
                    this.arena.visible();
                    this.arena.startFight();
                }
            });
        }
        mainReset() {
            this.startButton.visible();
            this.arena.hidden();
        }
        onLoad() {
            this.arena.onLoad();
            this.clickStart();
        }
    }
    // инициализирую проект
    window.addEventListener('load', () => {
        const game = new Game();
        game.onLoad();
    });
});
//# sourceMappingURL=main.js.map