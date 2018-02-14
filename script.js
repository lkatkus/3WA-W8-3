function init(){

    var cars = [];
    var race = true;
    var time = 100; /* speed change interval */

    // SELECTORS
    var raceTrack = document.getElementById('raceTrack');
    var startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click',function(){
        console.log('start');
        startRace();
    })

    // CAR OBJECT
    function Car(pav){
        this.marke = pav;
        this.greitis = 0;
        this.atstumas = 0;
    };

    Car.prototype.buildCar = function(){
        let carDiv = document.createElement('div');
        carDiv.innerHTML = this.marke;
        carDiv.classList.add('carDiv');
        carDiv.id = this.marke;
        raceTrack.appendChild(carDiv);
    };

    Car.prototype.speedup = function(s){
        this.greitis += s;
    };

    Car.prototype.speeddown = function(s){
        if(this.greitis - s < 0){
            this.greitis = 0;
        }else{
            this.greitis -= s;
        }
    };

    Car.prototype.move = function(){
        // UPDATE POSITION
        this.atstumas += Math.floor(this.greitis / 1000 * time);

        // UPDATE POSITION ON SCREEN
        let pathDone = this.atstumas * 100 / distance;
        let thisCarDiv = document.getElementById(this.marke);
        let carDivOffset = ((raceTrack.offsetWidth / 100 * pathDone) - thisCarDiv.offsetWidth);
        thisCarDiv.style.left = carDivOffset + 'px';
    };

    var numberOfCars = prompt('Number of cars');
    if(numberOfCars <= 0){
        while(numberOfCars <= 0 ){
            numberOfCars = prompt('Number of cars must be > 0');
        }
    }

    var distance = prompt('Race distance');
    if(distance <= 0){
        while(distance <= 0){
            distance = prompt('Race distance must be > 0');
        }
    }

    for(let i = 0; i < numberOfCars; i++){
        let carName = 'Car'+i;
        carName = new Car(carName);
        cars.push(carName);
    }

    for(let i = 0; i < cars.length; i++){
        cars[i].buildCar();
    }

    function startRace(){

        // UPDATE SPEED LOOP
        var int1 = setInterval(
            function(){
                for(let i = 0; i < cars.length; i++){
                    if(Math.random() > 0.5){
                        let speedChange = Math.floor(Math.random() * 10 + 1);
                        cars[i].speedup(speedChange);
                    }else{
                        let speedChange = Math.floor(Math.random() * 10 + 1);
                        cars[i].speeddown(speedChange);
                    }
                }
        }, 100);

        // DRIVE LOOP
        var int2 = setInterval(
            function(){
                for(let i = 0; i < cars.length; i++){
                    if(race && cars[i].atstumas < distance){
                        cars[i].move();
                    }if(cars[i].atstumas >= distance){
                        race = false;
                        clearInterval(int1);
                        clearInterval(int2);

                        console.log('=========');
                        console.log('FINISH');
                        console.log('=========');

                        for(let i = 0;i < cars.length; i++){
                            console.log(cars[i].marke + ' nuvaziavo ' + cars[i].atstumas)
                        };
                    }
                }
        }, time);
    }
}
