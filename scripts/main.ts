


enum stateGame{
    start = 'start',
    battle = 'battle',
    death = 'death'
}

enum mobsType{
    easy = 4,
    middle = 6,
    hard = 8
}

interface task{
    numberFirst?: number,
    char?: string,
    numberSecond?: number,
    correct?:number,
    fakeFirst?:number,
    fakeSecond?:number
}




//стандартный класс
class classTemplate{
    constructor(
        public parrent?:string,
    ){
    }
    public mainBlock: HTMLElement = document.querySelector(this.parrent)
    public hidden(): void{
        this.mainBlock.style.display = 'none'
    }
    public visible(): void{
        this.mainBlock.style.display = 'block'
    }
    public onLoad?():void{
    }
}

class User{
    public heath:number
    public mainBlock:HTMLElement
    constructor(
        public health:number, 
        public Block:string
    ){
        this.health = health
        this.mainBlock = document.querySelector(Block)
    }
    public getDamage(damage:number):void{
        let currentHealt:any = document.querySelectorAll('.user-heart')
        let currentHealtValue:number = currentHealt.length
        console.log(currentHealt)
        if(currentHealtValue > 0){
            for(let i:number = 0; i < damage; i++){
                currentHealt[i].remove()
            }
        }else{
            alert("Вы проиграли!")
            location.reload();
        }
    }
    public spawnHealth():void{
        console.log(this.Block)
        for(let i: number = 0; i < 6; i++){
            let heart:HTMLElement = document.createElement('img')
            heart.className = 'user-heart'
            heart.setAttribute('src','./imgs/interface/270.gif')
            this.mainBlock.appendChild(heart)
        }
    }
}

class Timer{
    constructor(public time:number,public mainBlock:string){}

    public lineTimer:HTMLElement = document.querySelector(this.mainBlock)
    public lenghtTime: number = 500
    public state:stateGame
    public timerId = setInterval(()=>{
       this.start()
    },100)
    public setState():void {
        this.state = stateGame.battle
    }

    public start():void{
        if(this.lenghtTime >= 400){
            this.lineTimer.style.background = 'blue'
        }
        if(this.lenghtTime <= 300){
             this.lineTimer.style.background = 'yellow'
        }
        if(this.lenghtTime <= 200){
            this.lineTimer.style.background = 'red'
        }
        if(this.lenghtTime > 0){
            this.lineTimer.style.width = `${this.lenghtTime - 10}px`
            this.lenghtTime-=10
        }else{
            this.lenghtTime = 500
            if(this.state == 'battle'){

            }
            alert("Вы проиграли!")
            location.reload();

        }  
    }



    public stop():void {
        clearInterval(this.timerId) 
        this.lenghtTime = 500
        this.timerId = setInterval(()=>{
            this.start()
         },100)
    }


}

class Mob {
    public mobImg:HTMLElement = document.querySelector('.mob-sprite')
    public mobText:HTMLElement = document.querySelector('.mob-name')
    public name: string
    public type: mobsType
    public sprite: string
    public health: number
    public hearts = document.querySelectorAll('.heart')
    constructor(name:string, type:mobsType, sprite:string,){
        this.name = name
        this.type = type
        this.sprite = sprite
        this.health = type
    }
    
    public getDamage(damage:number):void{
        
            for(let i:number = 0; i < damage; i++){
                let hearts = document.querySelectorAll('.heart')
                if(hearts.length > 2){
                    hearts[hearts.length-1].remove()
                }
                
            }
    
       
    }

    public spawn():void{
        function spawnHealth(type:mobsType, hearts):void{
            
            let heartBlock:HTMLElement = document.querySelector('.mob-health')
            hearts = document.querySelectorAll('.heart')
            if(hearts){
                hearts.forEach(element => {
                    element.remove()
                }); 
                hearts = document.querySelectorAll('.heart')
            }
            for(let i:number = 0; i < type; i++){
                let health:HTMLElement = document.createElement('img')
                health.className = 'heart'
                health.setAttribute('src','./imgs/interface/heart.png')
                heartBlock.appendChild(health)
            }
        }

        if(this.type == mobsType.easy){
            this.mobText.style.color = 'blue'
        }
        else if(this.type == mobsType.middle){
            this.mobText.style.color = 'yellow'
        }
        else{
            this.mobText.style.color = 'red'
        }

        this.mobText.innerText = this.name
        this.mobImg.setAttribute('src',this.sprite)
        spawnHealth(this.type,this.hearts)
    }

    public death():void{}

    public attak():void{

    }
}

class Sounds{
    public sound: any = new Audio(this.music)
    constructor(public music:string){

    }
    public play():void{
        this.sound.load()
    }
}

class Random {
    constructor(public min:number, public max:number){}

    public generate():number{
        return Math.floor(Math.random() * (this.max - this.min) + this.min)
    }

    //Массив с рандомными числами
    public generateArray(len:number): number[]{
        let array:number[] = []
        let temp: number = 0

        while(array.length < len){
        temp = this.generate()
            if(array.indexOf(temp) == -1){
                array.push(temp)
            }   
        }     
        return array
    }
}

class Challenge extends classTemplate{

    mobArray:Mob[] = [
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
    
      ]
    public user:User
    public numberFirst: number
    public numberSecond: number
    public charArray: string[] = ['*','/','^','+']
    public currentChar: string
    public random: Random = new Random(1,100)
    public randomItems: Random = new Random(0,3)
    public randomItemsCard: number[] 
    public challengeObj: task = {}
    public allCards
    public currentMob:Mob
    public currentMobHealth:number
    public timer: Timer = new Timer(10,'.timer-task')

    getUser(user:User){
        this.user = user
    }
    spawnMonster():void{
        let random:Random = new Random(0,14)
        this.currentMob = this.mobArray[random.generate()]
        this.currentMobHealth = this.currentMob.health
        this.currentMob.spawn()
       }    

    public checkCard():void{
       
        this.allCards = document.querySelectorAll('.arena-task-item')

        this.allCards.forEach(card => {

            card.addEventListener('click',(event)=>{
                if(card.id == this.challengeObj.correct){
                    card.className = 'arena-task-item_current'
                    this.currentMobHealth -= 2
                    console.log(this.currentMobHealth)
                    this.currentMob.getDamage(2)
                    this.print()
                }else{
                    card.className = 'arena-task-item_error'
                    console.log(this.currentMob.type)
                    if(this.currentMob.type <= 8){
                        this.user.getDamage(1)
                    }
                    if(this.currentMob.type <= 4){
                        this.user.getDamage(2)
                    }else{
                        this.user.getDamage(1)
                    }
               

                   
                }
            })
        });
    }

    public calculations(numberFirst:number, numberSecond:number, char:string):number{
        switch(char){
            case '+':
            return numberFirst + numberSecond
            case '-':
            return numberFirst - numberSecond
            case '*':
            return numberFirst * numberSecond
            case '/':
            return numberFirst / numberSecond
            case '^':
            return Math.pow(numberFirst,numberSecond)
        }
    
    }
    
   public generate():void{
        this.numberFirst = this.random.generate()
        this.numberSecond = this.random.generate()
        this.currentChar = this.charArray[new Random(0,4).generate()]
        this.challengeObj = {
            numberFirst: this.numberFirst,
            char:this.currentChar,
            numberSecond: this.numberSecond,
            correct:this.calculations( this.numberFirst, this.numberSecond, this.currentChar),
            fakeFirst:this.calculations(this.numberFirst-this.random.generate(), this.numberSecond, this.currentChar,) ,
            fakeSecond:this.calculations(this.numberFirst-this.random.generate(), this.numberSecond, this.currentChar) 
        }
        this.randomItemsCard = this.randomItems.generateArray(3)
    }

    public newTask(){
        this.timer.setState()
        if(this.allCards){
            setTimeout(()=>{
            this.allCards.forEach(element => {
                    element.remove()
            }); 
            this.timer.stop()
            let mobHealth:number = Number(this.currentMob.health)
            this.generate()
            this.printCards('.arena-task')
            this.checkCard()
            this.mainBlock.textContent = `${this.numberFirst} ${this.currentChar} ${this.numberSecond}`
            if(this.currentMobHealth <= 0){
                this.spawnMonster()
                this.currentMobHealth = this.currentMob.health
            }
            },500)
        }else{
            this.timer.start()
            this.spawnMonster()
            this.print()
        }
       
       
    }
    
    public printCards( parrentCards:string ):void{

        function checkItem(index:number, challengeObj:task ):any{
            switch(index){
                case 0:
                    return challengeObj.correct
                case 1:
                    return challengeObj.fakeSecond
                case 2:
                    return challengeObj.fakeFirst
            }
        }

        const parrentCardsBlock: HTMLElement = document.querySelector(`${parrentCards}`)
  
        for(let i: number = 0; i < 3; i++){
            let CardBlock: HTMLElement = document.createElement('div')
            CardBlock.className = 'arena-task-item'
            CardBlock.innerText = `${checkItem(this.randomItemsCard[i], this.challengeObj)}`
            CardBlock.id = `${checkItem(this.randomItemsCard[i], this.challengeObj)}`
            parrentCardsBlock.appendChild(CardBlock)
        }
    }

    public print():void{
        
        if(this.allCards == undefined){
            this.generate()
            this.printCards('.arena-task')
            this.checkCard()
             console.log(`${this.numberFirst} ${this.currentChar} ${this.numberSecond}`)
            this.mainBlock.textContent = `${this.numberFirst} ${this.currentChar} ${this.numberSecond}`
            
        }else{
            this.newTask()
        }
       
    }
}

// класс кнопки
class Button extends classTemplate{
   click(func:()=>void):void{
    this.mainBlock.addEventListener('click',()=>{
        func()
    })
   }
}

class Task extends classTemplate{

}

class Arena extends classTemplate{
   task:Challenge = new Challenge('.main-task')
   public user:User = new User(5,'.user-heart-block')
   public startFight():void{
    this.user.spawnHealth()
    this.task.getUser(this.user)
    this.task.print()
    this.task.spawnMonster()
   }
    public onLoad(): void {
       this.hidden()
    }
}

// класс для игры
class Game{
    constructor(){}
    public music: Sounds = new Sounds ('/music/music.mp3')
    public state: stateGame = stateGame.start
    public arena: Arena = new Arena('.arena')
    public startButton: Button = new Button('.start-button')



    public clickStart():void{
        this.startButton.click(():void =>{
            this.startButton.hidden()
            this.state = stateGame.battle
           if(this.state == stateGame.battle){
            this.arena.visible()
            this.arena.startFight()
           }
        })
    }

    public mainReset(): void {
        this.startButton.visible()
        this.arena.hidden()
    }

    public onLoad(): void{
       this.music.play()
       this.arena.onLoad()
       this.clickStart()
    }
}


// инициализирую проект
window.addEventListener('load',(): void =>{
    const game = new Game()
    game.onLoad()

})
