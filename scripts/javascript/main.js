var stateGame;
(function (stateGame) {
    stateGame["start"] = "start";
    stateGame["battle"] = "battle";
    stateGame["death"] = "death";
})(stateGame || (stateGame = {}));
var mobsType;
(function (mobsType) {
    mobsType[mobsType["easy"] = 4] = "easy";
    mobsType[mobsType["middle"] = 6] = "middle";
    mobsType[mobsType["hard"] = 8] = "hard";
})(mobsType || (mobsType = {}));
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
    }
}
class User {
    constructor(health, Block) {
        this.health = health;
        this.Block = Block;
        this.health = health;
        this.mainBlock = document.querySelector(Block);
    }
    getDamage(damage) {
        let currentHealt = document.querySelectorAll('.user-heart');
        let currentHealtValue = currentHealt.length;
        console.log(currentHealt);
        if (currentHealtValue > 0) {
            for (let i = 0; i < damage; i++) {
                currentHealt[i].remove();
            }
        }
        else {
            alert("Вы проиграли!");
            location.reload();
        }
    }
    spawnHealth() {
        console.log(this.Block);
        for (let i = 0; i < 6; i++) {
            let heart = document.createElement('img');
            heart.className = 'user-heart';
            heart.setAttribute('src', './imgs/interface/270.gif');
            this.mainBlock.appendChild(heart);
        }
    }
}
class Timer {
    constructor(time, mainBlock) {
        this.time = time;
        this.mainBlock = mainBlock;
        this.lineTimer = document.querySelector(this.mainBlock);
        this.lenghtTime = 500;
        this.timerId = setInterval(() => {
            this.start();
        }, 100);
    }
    setState() {
        this.state = stateGame.battle;
    }
    start() {
        if (this.lenghtTime >= 400) {
            this.lineTimer.style.background = 'blue';
        }
        if (this.lenghtTime <= 300) {
            this.lineTimer.style.background = 'yellow';
        }
        if (this.lenghtTime <= 200) {
            this.lineTimer.style.background = 'red';
        }
        if (this.lenghtTime > 0) {
            this.lineTimer.style.width = `${this.lenghtTime - 10}px`;
            this.lenghtTime -= 10;
        }
        else {
            this.lenghtTime = 500;
            if (this.state == 'battle') {
            }
            alert("Вы проиграли!");
            location.reload();
        }
    }
    stop() {
        clearInterval(this.timerId);
        this.lenghtTime = 500;
        this.timerId = setInterval(() => {
            this.start();
        }, 100);
    }
}
class Mob {
    constructor(name, type, sprite) {
        this.mobImg = document.querySelector('.mob-sprite');
        this.mobText = document.querySelector('.mob-name');
        this.hearts = document.querySelectorAll('.heart');
        this.name = name;
        this.type = type;
        this.sprite = sprite;
        this.health = type;
    }
    getDamage(damage) {
        for (let i = 0; i < damage; i++) {
            let hearts = document.querySelectorAll('.heart');
            if (hearts.length > 2) {
                hearts[hearts.length - 1].remove();
            }
        }
    }
    spawn() {
        function spawnHealth(type, hearts) {
            let heartBlock = document.querySelector('.mob-health');
            hearts = document.querySelectorAll('.heart');
            if (hearts) {
                hearts.forEach(element => {
                    element.remove();
                });
                hearts = document.querySelectorAll('.heart');
            }
            for (let i = 0; i < type; i++) {
                let health = document.createElement('img');
                health.className = 'heart';
                health.setAttribute('src', './imgs/interface/heart.png');
                heartBlock.appendChild(health);
            }
        }
        if (this.type == mobsType.easy) {
            this.mobText.style.color = 'blue';
        }
        else if (this.type == mobsType.middle) {
            this.mobText.style.color = 'yellow';
        }
        else {
            this.mobText.style.color = 'red';
        }
        this.mobText.innerText = this.name;
        this.mobImg.setAttribute('src', this.sprite);
        spawnHealth(this.type, this.hearts);
    }
    death() { }
    attak() {
    }
}
class Sounds {
    constructor(music) {
        this.music = music;
        this.sound = new Audio(this.music);
    }
    play() {
        this.sound.load();
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
        this.mobArray = [
            new Mob('Brain Slime', mobsType.easy, './imgs/mobs/easy/Brain Slime 2.png'),
            new Mob('Behemoth', mobsType.easy, './imgs/mobs/easy/Behemoth.png'),
            new Mob('Coward', mobsType.easy, './imgs/mobs/easy/Coward.png'),
            new Mob('Earth King', mobsType.easy, './imgs/mobs/easy/Earth King.png'),
            new Mob('Blue Dragon', mobsType.middle, './imgs/mobs/middle/Blue Dragon.png'),
            new Mob('Dragon Hawk', mobsType.middle, './imgs/mobs/middle/Dragon Hawk.png'),
            new Mob('Drakee', mobsType.middle, './imgs/mobs/middle/Drakee.png'),
            new Mob('Emperor Slime', mobsType.middle, './imgs/mobs/middle/Emperor Slime.png'),
            new Mob('Wawe slime', mobsType.middle, './imgs/mobs/middle/Wave Slime.png'),
            new Mob('Chimera', mobsType.hard, './imgs/mobs/hard/Chimera.png'),
            new Mob('Demon', mobsType.hard, './imgs/mobs/hard/demon.png'),
            new Mob('EvilGod', mobsType.hard, './imgs/mobs/hard/EvilGod.png'),
            new Mob('Octopot', mobsType.hard, './imgs/mobs/hard/Octopot.png'),
            new Mob('Plant', mobsType.hard, './imgs/mobs/hard/plant.png'),
        ];
        this.charArray = ['*', '/', '^', '+'];
        this.random = new Random(1, 100);
        this.randomItems = new Random(0, 3);
        this.challengeObj = {};
        this.timer = new Timer(10, '.timer-task');
    }
    getUser(user) {
        this.user = user;
    }
    spawnMonster() {
        let random = new Random(0, 14);
        this.currentMob = this.mobArray[random.generate()];
        this.currentMobHealth = this.currentMob.health;
        this.currentMob.spawn();
    }
    checkCard() {
        this.allCards = document.querySelectorAll('.arena-task-item');
        this.allCards.forEach(card => {
            card.addEventListener('click', (event) => {
                if (card.id == this.challengeObj.correct) {
                    card.className = 'arena-task-item_current';
                    this.currentMobHealth -= 2;
                    console.log(this.currentMobHealth);
                    this.currentMob.getDamage(2);
                    this.print();
                }
                else {
                    card.className = 'arena-task-item_error';
                    console.log(this.currentMob.type);
                    if (this.currentMob.type <= 8) {
                        this.user.getDamage(1);
                    }
                    if (this.currentMob.type <= 4) {
                        this.user.getDamage(2);
                    }
                    else {
                        this.user.getDamage(1);
                    }
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
            case '^':
                return Math.pow(numberFirst, numberSecond);
        }
    }
    generate() {
        this.numberFirst = this.random.generate();
        this.numberSecond = this.random.generate();
        this.currentChar = this.charArray[new Random(0, 4).generate()];
        this.challengeObj = {
            numberFirst: this.numberFirst,
            char: this.currentChar,
            numberSecond: this.numberSecond,
            correct: this.calculations(this.numberFirst, this.numberSecond, this.currentChar),
            fakeFirst: this.calculations(this.numberFirst - this.random.generate(), this.numberSecond, this.currentChar),
            fakeSecond: this.calculations(this.numberFirst - this.random.generate(), this.numberSecond, this.currentChar)
        };
        this.randomItemsCard = this.randomItems.generateArray(3);
    }
    newTask() {
        this.timer.setState();
        if (this.allCards) {
            setTimeout(() => {
                this.allCards.forEach(element => {
                    element.remove();
                });
                this.timer.stop();
                let mobHealth = Number(this.currentMob.health);
                this.generate();
                this.printCards('.arena-task');
                this.checkCard();
                this.mainBlock.textContent = `${this.numberFirst} ${this.currentChar} ${this.numberSecond}`;
                if (this.currentMobHealth <= 0) {
                    this.spawnMonster();
                    this.currentMobHealth = this.currentMob.health;
                }
            }, 500);
        }
        else {
            this.timer.start();
            this.spawnMonster();
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
        this.user = new User(5, '.user-heart-block');
    }
    startFight() {
        this.user.spawnHealth();
        this.task.getUser(this.user);
        this.task.print();
        this.task.spawnMonster();
    }
    onLoad() {
        this.hidden();
    }
}
// класс для игры
class Game {
    constructor() {
        this.music = new Sounds('/music/music.mp3');
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
        this.music.play();
        this.arena.onLoad();
        this.clickStart();
    }
}
// инициализирую проект
window.addEventListener('load', () => {
    const game = new Game();
    game.onLoad();
});
//# sourceMappingURL=main.js.map