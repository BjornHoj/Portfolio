window.addEventListener("load", start);

//erklærer variabler
let mine_point;
let mine_liv;
let rndNum;

const carljohan_container = document.querySelector("#carljohan_container");
const carljohan_sprite = document.querySelector("#carljohan_sprite");
const carljohan_container1 = document.querySelector("#carljohan_container1");
const carljohan_sprite1 = document.querySelector("#carljohan_sprite1");
const carljohan_container2 = document.querySelector("#carljohan_container2");
const carljohan_sprite2 = document.querySelector("#carljohan_sprite2");

const fluesvamp_container = document.querySelector("#fluesvamp_container");
const fluesvamp_sprite = document.querySelector("#fluesvamp_sprite");
const timeglas = document.querySelector("#timeglas");

function start() {
  hideAllScreens();
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#play").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");
  // Gem alle skærme
  hideAllScreens();

  //nulstil point og liv
  mine_point = 0;
  mine_liv = 3;

  //opdater point i spillet
  document.querySelector("#point").textContent = mine_point;
  //opdaterer liv i spillet (hvis du viser liv som et tal)
  document.querySelector("#liv").textContent = mine_liv;

  //nulstiller liv i spillet (hvis du viser liv som 3 symboler)
  document.querySelector("#heart1").classList.remove("hide");
  document.querySelector("#heart2").classList.remove("hide");
  document.querySelector("#heart3").classList.remove("hide");

  //starter timer
  timeglas.classList.add("timer");
  timeglas.addEventListener("animationend", endGame);

  // **************  lav random pos til carljohansvamp ***************
  rndNum = generateRandomNumber(5);
  let rndFaldPos = "faldpos" + rndNum;
  carljohan_container.classList.add(rndFaldPos);

  rndNum = generateRandomNumber(5);
  rndFaldPos = "faldpos" + rndNum;
  carljohan_container1.classList.add(rndFaldPos);

  rndNum = generateRandomNumber(5);
  rndFaldPos = "faldpos" + rndNum;
  carljohan_container2.classList.add(rndFaldPos);

  // ****************** lav random delay til carljohan ***************
  rndNum = generateRandomNumber(3);
  let rndDelay = "delay" + rndNum;
  carljohan_container.classList.add(rndDelay);

  rndNum = generateRandomNumber(3);
  rndDelay = "delay" + rndNum;
  carljohan_container1.classList.add(rndDelay);

  rndNum = generateRandomNumber(3);
  rndDelay = "delay" + rndNum;
  carljohan_container2.classList.add(rndDelay);

  // lav random speed til carljohan
  rndNum = generateRandomNumber(2);
  let rndSpeed = "speed" + rndNum;
  carljohan_container.classList.add(rndSpeed);

  rndNum = generateRandomNumber(2);
  rndSpeed = "speed" + rndNum;
  carljohan_container1.classList.add(rndSpeed);

  rndNum = generateRandomNumber(2);
  rndSpeed = "speed" + rndNum;
  carljohan_container2.classList.add(rndSpeed);

  //start faldeanimation på CarlJohan
  carljohan_container.classList.add("fald");
  carljohan_container1.classList.add("fald");
  carljohan_container2.classList.add("fald");

  // lav random pos til fluesvamp
  // rndNum = generateRandomNumber();
  // let rndPos = "pos" + rndNum;
  // console.log("flue" + rndPos);
  // giv CarlJohan en random startposition
  // fluesvamp_container.classList.add(rndPos);

  //start hoppeanimation på Fluesvamp
  fluesvamp_container.classList.add("fald");

  // EVENTLISTNERE

  //lyt efter om der bliver klikket på carljohan - gå til functionen clickCarlJohan når der bliver klikket
  carljohan_container.addEventListener("mousedown", clickCarlJohan);
  carljohan_container1.addEventListener("mousedown", clickCarlJohan);
  carljohan_container2.addEventListener("mousedown", clickCarlJohan);
  //lyt efter om der bliver klikket på fluesvampen - gå til functionen clickFluesvamp når der bliver klikket
  fluesvamp_container.addEventListener("mousedown", clickFluesvamp);

  //lyt efter om der animationen på carljohan har kørt en gang (iteration) - gå til resetCarlJohan() når det sker
  carljohan_container.addEventListener("animationiteration", resetCarlJohan);
  carljohan_container1.addEventListener("animationiteration", resetCarlJohan);
  carljohan_container2.addEventListener("animationiteration", resetCarlJohan);
  //lyt efter om der animationen på fluesvamp har kørt en gang (iteration) - gå til resetFluesvamp() når det sker
  fluesvamp_container.addEventListener("animationiteration", resetFlueSvamp);
}

function clickCarlJohan() {
  console.log("clickCarlJohan");

  //fjern eventlistneren så man ikke længere kan klikke
  this.removeEventListener("mousedown", clickCarlJohan);

  //tæller op på point
  mine_point = mine_point + 1;
  //opdaterer point i spillet
  document.querySelector("#point").textContent = mine_point;

  //put klassen frys på CarlJohan container
  this.classList.add("frys");
  //put klassen forsvind på CarlJohan sprite
  this.firstElementChild.classList.add("forsvind");

  //lytter efter animationen på carljohan, når den er færdig så kaldes funktionen resetCarlJohan
  this.addEventListener("animationend", resetCarlJohan);
}

function clickFluesvamp() {
  console.log("clickFluesvamp");

  //fjern eventlistneren så man ikke længere kan klikke
  fluesvamp_container.removeEventListener("mousedown", clickFluesvamp);

  //put klassen frys på Fluesvamp container
  fluesvamp_container.classList.add("frys");
  //put klassen forsvind på Fluesvamp sprite
  fluesvamp_sprite.classList.add("forsvind");

  // hvis du har 3 hjerter:
  // fjern det hjerte som svarer til værdien af antal liv:
  let my_heart = "#heart" + mine_liv;
  document.querySelector(my_heart).classList.add("hide");

  //tæller ned på liv
  mine_liv = mine_liv - 1;

  // hvis du viser liv som et tal:
  // opdaterer liv i spillet
  document.querySelector("#liv").textContent = mine_liv;

  // console.log(mine_liv);

  if (mine_liv === 0) {
    endGame();
  } else {
    // hvis der er liv tilbage, så lytter vi efter animationen på fluesvampen,
    // når animationen er færdig, så kaldes funktionen resetFlueSvamp
    fluesvamp_container.addEventListener("animationend", resetFlueSvamp);
  }
}

function resetCarlJohan() {
  console.log("carlJohanReset");

  // fjern alle klasserne (fald, frys og pos) fra carljohans container
  this.classList = "";
  // fjern alle klasserne fra carljohans sprite
  this.firstElementChild.classList = "";

  // ny random position
  rndNum = generateRandomNumber(5);
  let rndFaldPos = "faldpos" + rndNum;
  console.log("carl" + rndFaldPos);
  // giv positionen til carljohan
  this.classList.add(rndFaldPos);

  // ny random speed
  rndNum = generateRandomNumber(2);
  let rndSpeed = "speed" + rndNum;
  this.classList.add(rndSpeed);

  // force reflow på carljohan og sæt faldeanimation på igen
  this.offsetHeight;
  this.classList.add("fald");

  // lyt igen efter klik på carljohan, gå til funktionen clickCarlJohan hvis der klikkes
  this.addEventListener("mousedown", clickCarlJohan);
}

function resetFlueSvamp() {
  console.log("flueSvampReset");

  // rydder fluesvamp_container's classList (hop, frys og pos)
  fluesvamp_container.classList = "";
  // rydder fluesvamp_sprite's classList
  fluesvamp_sprite.classList = "";

  // ny random position
  rndNum = generateRandomNumber(5);
  let rndPos = "pos" + rndNum;
  console.log("flue" + rndPos);
  // giv positionen til fluesvamp
  fluesvamp_container.classList.add(rndPos);

  // force reflow på fluesvamp og sæt hoppeanimation på igen
  fluesvamp_container.offsetHeight;
  fluesvamp_container.classList.add("fald");

  // lyt efter klik på fluesvamp, gå til funktionen clickFluesvamp når der klikkes
  fluesvamp_container.addEventListener("mousedown", clickFluesvamp);
}

function endGame() {
  console.log("endGame");
  // fjern alle animationer
  carljohan_container.classList = "";
  fluesvamp_container.classList = "";

  // Nulstil timer
  timeglas.classList = "";
  timeglas.removeEventListener("animationend", endGame);

  // Tjek om spillet er vundet
  if (mine_point < 4 || mine_liv === 0) {
    gameOver();
  } else {
    levelComplete();
  }
}

function gameOver() {
  console.log("gameOver");
  // vis game over skærm
  hideAllScreens();
  document.querySelector("#game_over").classList.remove("hide");
  // lyt efter om der bliver klikket på spil-igen-knappen
  document.querySelector("#spiligen_1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("levelComplete");
  // vis level complete skærm
  hideAllScreens();
  document.querySelector("#level_complete").classList.remove("hide");
  // lyt efter om der bliver klikket på spil-igen-knappen
  document.querySelector("#spiligen_2").addEventListener("click", startGame);
}

// Hjælpefunktioner

function generateRandomNumber(antal) {
  //genererer et tilfældigt tal mellem 1 og x
  let number = Math.floor(Math.random() * antal) + 1;
  //returnerer tallet
  return number;
}

function hideAllScreens() {
  //skjuler alle skærme ved at tilføje klassen hide
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
}
