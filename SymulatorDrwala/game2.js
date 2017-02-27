//---surowce---//
var wood = 0;
var goldenLeaves = 0;
//------//


//---wywolywanie petli gry---//
var myVar = setInterval(function () {game()}, 1000);


//---mechanika gry---//
var multiplierOfPrices = 1.05;
var multiplierOfExp = 1.2;
var pointPerLevel = 5;

//---statystyki---//
var exp = 0;
var expForNextLevel = 50;
var level = 1;
var expPerSec = 1;
var pointsToSpend = 0;
var bonusWoodLevelPoints = 0;
var bonusExpLevelPoints = 0;
var bonusItemsLevelPoints = 0;
var bonusGoldenLeavesLevelPoints = 0;

//---zbieranie surowcow---//
var basicWoodPerSec = 1;
var woodPerSec = basicWoodPerSec + Math.round(((basicWoodPerSec * bonusWoodLevelPoints)/100));
var chanceOfGettingGoldenLeaf = 0.01 + bonusGoldenLeavesLevelPoints/2000;
var woodPerClick = 1;
//------//


//---opisy---//
var bonusWood = document.getElementById('bonusWood');
bonusWood.onmouseover = function() {
  document.getElementById('popup').style.display = 'block';
}
bonusWood.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}

var bonusExp = document.getElementById('bonusExp');
bonusExp.onmouseover = function() {
  document.getElementById('popup2').style.display = 'block';
}
bonusExp.onmouseout = function() {
  document.getElementById('popup2').style.display = 'none';
}

var bonusItems = document.getElementById('bonusItems');
bonusItems.onmouseover = function() {
  document.getElementById('popup3').style.display = 'block';
}
bonusItems.onmouseout = function() {
  document.getElementById('popup3').style.display = 'none';
}

var bonusGoldenLeaves = document.getElementById('bonusGoldenLeaves');
bonusGoldenLeaves.onmouseover = function() {
  document.getElementById('popup4').style.display = 'block';
}
bonusGoldenLeaves.onmouseout = function() {
  document.getElementById('popup4').style.display = 'none';
}

//---ulepszenia dajace drewno---//
var peasants = {
	name:"Peasants",
	amount:0,
	price:100,
	amountPerSec:5,
	buy:function(){
		if(takeWood(this.price)){
			buyWoodPerSec(this.amountPerSec);
			this.amount++;
			this.price = this.price + Math.round(this.amount * multiplierOfPrices);
			updateVisualStatistics();
		}
	}

};

var lumbermen = {
	name:"Lumbermen",
	amount:0,
	price:1000,
	amountPerSec:50,
	buy:function(){
		if(takeWood(this.price)){
			buyWoodPerSec(this.amountPerSec);
			this.price = this.price + Math.round(this.amount * multiplierOfPrices * 10);
			this.amount++;
			updateVisualStatistics();
		}
	}

};


//------//

//---petla gry---//
function game(){
	possesionIncrease();
	statisticsIncrease();
	updateVisualStatistics();
}

//---funkcje---//
updateVisualStatistics();


//---funkcje kupowania---//

function buyWoodPerSec(amount){
	basicWoodPerSec = basicWoodPerSec + amount;
	updateVisualStatistics();
}

function buyWoodPerClick(amount){
	woodPerClick = woodPerClick + amount;
}

function buyChanceOfGettingGoldenLeaves(amount){
	chanceOfGettingGoldenLeaf = chanceOfGettingGoldenLeaf + amount;
}

//------//




//---funkcje odejmowania surowcow---//

function takeWood(cost){
	if(wood - cost < 0){
		writeInConsole("Not enough wood!");
		return false;
	}else{
		wood = wood - cost;
		updateVisualStatistics();
		return true;
	}
}

function takeGoldenLeaves(cost){
	if(goldenLeaves - cost < 0){
		writeInConsole("Not enough Golden Leaves!");
		return false;
	}else{
		goldenLeaves = goldenLeaves - cost;
		updateVisualStatistics();
		return true;
	}
}

//------//


//---funkcje zwiekszajace ilosc surowcow---//
function possesionIncrease(){
	increaseWood();
	gettingGoldenLeaves();
	gettingItems();
}

function increaseWood(){
	increaseWoodUpdate();
	wood = wood + woodPerSec;
}

function increaseWoodUpdate(){
	woodPerSec = basicWoodPerSec + Math.round(((basicWoodPerSec * bonusWoodLevelPoints)/100));
	updateVisualStatistics();
}

function gettingGoldenLeaves(){
	var x = Math.random();
	if(x <= chanceOfGettingGoldenLeaf){
		goldenLeaves++;
		changeVisualGoldenLeaves();
		writeInConsole("You got a Golden Leaf!");
	}
}

function gettingItems(){
	var x = Math.random();
} 

function gatherWood(){
	wood = wood + woodPerClick;
	updateVisualStatistics();
}

//---funkcje zwiekszajace statystyki---//
function statisticsIncrease(){
	expIncrease();
	levelIncrease();
}

function expIncrease(){
	exp = exp + expPerSec;
}

function expForNextLevelIncrease(){
	expForNextLevel = Math.round(expForNextLevel * multiplierOfExp);
}

function levelIncrease(){
	if(exp >= expForNextLevel){
		exp = 0;
		level = level + 1;
		pointsIncrease();
		expForNextLevelIncrease();
	}
}

function pointsIncrease(){
	pointsToSpend = pointsToSpend + pointPerLevel;
}

function addBonusWood(){
	if(pointsToSpend > 0){
		bonusWoodLevelPoints++;
		pointsToSpend--;
		updateVisualStatistics();
	} else {
		writeInConsole("Nie masz punktów do rozdania!");
	}
}

function addBonusExp(){
	if(pointsToSpend > 0){
		bonusExpLevelPoints++;
		pointsToSpend--;
		updateVisualStatistics();
	} else {
		writeInConsole("Nie masz punktów do rozdania!");
	}
}

function addBonusItems(){
	if(pointsToSpend > 0){
		bonusItemsLevelPoints++;
		pointsToSpend--;
		updateVisualStatistics();
	} else {
		writeInConsole("Nie masz punktów do rozdania!");
	}
}

function addBonusGoldenLeaves(){
	if(pointsToSpend > 0){
		bonusGoldenLeavesLevelPoints++;
		pointsToSpend--;
		updateVisualStatistics();
	} else {
		writeInConsole("Nie masz punktów do rozdania!");
	}
}

//---Funkcje wyświetlające---//

function writeInConsole(content){
	var contentOfConsole = document.getElementById("console").innerHTML;
	document.getElementById("console").innerHTML = "=> " + content + "<br>" + contentOfConsole;
}

function clearConsole(){
	document.getElementById("console").innerHTML = "";	
}

function updateVisualStatistics(){
	changeVisualGoldenLeaves();
	changeVisualWood();
	changeVisualWoodPerSec();
	changeEnhancements();
	changeButtons();
	changeVisualExp();
	changeLevel();
	changeVisualPoints();
	changeVisualStatisticsPointLevel();
	changeDescriptionsOfStatistics();
}

function changeVisualWood(){
	document.getElementById("amountOfWood").innerHTML = "Wood: "+ wood;
}

function changeVisualGoldenLeaves(){
	document.getElementById("amountOfGoldenLeaves").innerHTML = "Golden Leaves: "+ goldenLeaves + " x <img src='leaf.png'>";
}

function changeVisualWoodPerSec(){
	document.getElementById("amountOfWoodPerSec").innerHTML = "Wood/sec: "+ woodPerSec;
}

function changeVisualExp(){
	document.getElementById("exp").style.width = (exp/expForNextLevel * 100)%100 + "%";
}

function changeLevel(){
	document.getElementById("level").innerHTML = "Level: " + level;
}

function changeVisualPoints(){
	document.getElementById("remainingPoints").innerHTML = "Remaining points to spend: " + pointsToSpend;
}

function changeVisualStatisticsPointLevel(){
	document.getElementById("bonusWoodLevel").innerHTML = bonusWoodLevelPoints;
	document.getElementById("bonusExpLevel").innerHTML = bonusExpLevelPoints;
	document.getElementById("bonusItemsLevel").innerHTML = bonusItemsLevelPoints;
	document.getElementById("bonusGoldenLeavesLevel").innerHTML = bonusGoldenLeavesLevelPoints;
}

function changeDescriptionsOfStatistics(){
	document.getElementById("popup").innerHTML = 	"Every point gives you 1% more gained wood.<br>" + 
													"Current bonus: " + bonusWoodLevelPoints + "%";
	document.getElementById("popup2").innerHTML = 	"Every point gives you 1% more gained exp.<br>" + 
													"Current bonus: " + bonusExpLevelPoints + "%";
	document.getElementById("popup3").innerHTML = 	"Every point gives you 0.5% bonus chance of dropping item.<br>" + 
													"Current bonus: " + (bonusItemsLevelPoints * 0.5) + "%";
	document.getElementById("popup4").innerHTML = 	"Every point gives you 0.5% bonus chance of dropping Golden leaf.<br>" + 
													"Current bonus: " + (bonusGoldenLeavesLevelPoints * 0.5) + "%";
}


function changeEnhancements(){
	document.getElementById("peasants").innerHTML = 
	"<b>" 					+ peasants.name		+ "</b>"+ "<br>" + 
	"Amount: " 				+ peasants.amount 			+ "<br>" +
	"Price: " 				+ peasants.price 			+ "<br>" +
	"Wood per peasant: " 	+ peasants.amountPerSec 	+ "<br>" +
	"<button id='peasant' onclick='peasants.buy()'>KUP</button>";

	document.getElementById("lumbermen").innerHTML = 
	"<b>" 					+ lumbermen.name		+ "</b>"+ "<br>" + 
	"Amount: " 				+ lumbermen.amount 			+ "<br>" +
	"Price: " 				+ lumbermen.price 			+ "<br>" +
	"Wood per lumberman: " 	+ lumbermen.amountPerSec 	+ "<br>" +
	"<button id='lumberman' onclick='lumbermen.buy()'>KUP</button>";

}

function changeButtons(){
	if(peasants.price > wood)
		document.getElementById("peasant").disabled = true;
	else
		document.getElementById("peasant").disabled = false;

	if(lumbermen.price > wood)
		document.getElementById("lumberman").disabled = true;
	else
		document.getElementById("lumberman").disabled = false;
}

//------//