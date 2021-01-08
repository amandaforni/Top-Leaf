$(document).ready(function () {
    (function ($) {

        $.fn.TopTrumpCard = function (name, threat, cope, toxic, image) {
            this.name = name;
            this.threat = threat;
            this.cope = cope;
            this.toxic = toxic;
            this.image = image;
        }
        //Declares order of data for use in functions below to draw cards
        // (name, threatening aura, ability to cope outside, toxicity, image)

        var cards = [
            new TopTrumpCard("Alocasia", 67, 10, 80, "img/alocasia.jpeg"),
            new TopTrumpCard("Azalea", 4, 80, 60, "img/azalea.jpeg"),
            new TopTrumpCard("Corn", 98, 100, 2, "img/corn.jpeg"),
            new TopTrumpCard("Daffodil", 10, 50, 78, "img/daffodil.jpeg"),
            new TopTrumpCard("Daisy", 1, 75, 32, "img/daisy.jpeg"),
            new TopTrumpCard("Flamingo Flower", 78, 43, 83, "img/flamingoFlower.jpeg"),
            new TopTrumpCard("Holly", 97, 91, 86, "img/holly.jpeg"),
            new TopTrumpCard("Mini Cactus", 89, 2, 4, "img/houseCactus.jpeg"),
            new TopTrumpCard("Succulents", 7, 2, 54, "img/houseSucculents.jpeg"),
            new TopTrumpCard("Hydrangea", 16, 42, 52, "img/hydrangea.jpeg"),
            new TopTrumpCard("Lavender", 3, 80, 7, "img/lavender.jpeg"),
            new TopTrumpCard("Monstera", 60, 42, 17, "img/monstera.jpeg"),
            new TopTrumpCard("Orchid", 87, 10, 73, "img/orchid.jpeg"),
            new TopTrumpCard("Pineapple", 100, 79, 12, "img/pineapple.jpeg"),
            new TopTrumpCard("Ranunculus", 17, 65, 62, "img/ranunculus.jpeg"),
            new TopTrumpCard("Rose", 82, 31, 11, "img/rose.jpeg"),
            new TopTrumpCard("Saguaro Cactus", 94, 95, 11, "img/saguaro.jpeg"),
            new TopTrumpCard("Snowdrops", 5, 50, 51, "img/snowdrops.jpeg"),
            new TopTrumpCard("Sunflower", 93, 48, 34, "img/sunflower.jpeg"),
            new TopTrumpCard("Thistle", 91, 87, 8, "img/thistle.jpeg"),
            new TopTrumpCard("Tiger Lily", 76, 68, 99, "img/tigerLily.jpeg"),
            new TopTrumpCard("Tomato", 69, 16, 2, "img/tomato.jpeg"),
            new TopTrumpCard("Tulips", 14, 46, 12, "img/tulip.jpeg"),
            new TopTrumpCard("Valerian", 3, 17, 9, "img/valerian.jpeg"),
            new TopTrumpCard("Venus Flytrap", 88, 50, 8, "img/venusFlyTrap.jpeg"),
            new TopTrumpCard("Verbena", 12, 96, 23, "img/verbena.jpeg"),
            new TopTrumpCard("Water Lily", 15, 74, 27, "img/waterLily.jpeg"),
            new TopTrumpCard("Wheat", 8, 99, 0, "img/wheat.jpeg"),
            new TopTrumpCard("Wisteria", 23, 17, 56, "img/wisteria.jpeg"),
            new TopTrumpCard("ZZ Plant", 32, 69, 67, "img/zzPlant.jpeg")
        ];

        //new creates new object- Saves making 3 arrays, allows all data to be in one array rather than an array for each section



        var result = "";
        var endGame = false; //Turns boolean to true when game ends
        var noGo = false;
        var noValue = -1; //for if user hasn't selected any options
        var player1, player2, theDeck, player1Card, player2Card, ending, oppStack, yourStack, g, i, j, cardNum;
        //Variables initialized but have no values yet
        //G/I/J are loops to go through the card values

        $.fn.draw = function () {
            if (endGame) {
                ending = " cards";
                yourStack = "Player 1 has " + player1.getSize(); //.getSize() is for player score -- returns # of elements in an array
                oppStack = "The Computer has " + player2.getSize();
            }
            else {
                yourStack = "You have " + (player1.getSize() + 1);
                oppStack = "The Computer has " + (player2.getSize() + 1);
            }
        }

        //Pulls details from the array for the cards
        $.fn.drawP1Card = function () {

            document.getElementById("P1CardImage").src = player1Card.image;
            document.getElementById("yourCard").alt = player1Card.name;
            document.getElementById("P1Name").firstChild.nodeValue = player1Card.name;
            document.getElementById("P1threat").lastChild.nodeValue = player1Card.threat;
            document.getElementById("P1cope").lastChild.nodeValue = player1Card.cope;
            document.getElementById("P1toxic").lastChild.nodeValue = player1Card.toxic;
        }

        $.fn.drawP2Card = function () {

            document.getElementById("P2CardImage").src = player2Card.image;
            document.getElementById("oppCard").alt = player2Card.name;
            document.getElementById("P2Name").firstChild.nodeValue = player2Card.name;
            document.getElementById("P2threat").lastChild.nodeValue = player2Card.threat;
            document.getElementById("P2cope").lastChild.nodeValue = player2Card.cope;
            document.getElementById("P2toxic").lastChild.nodeValue = player2Card.toxic;
        }

        //Clears the opponent card when the next function is run
        $.fn.clearP2Card = function () {

            document.getElementById("P2CardImage").src = "img/default.jpeg";
            document.getElementById("P2Name").firstChild.nodeValue = "Unknown Plant";
            document.getElementById("P2threat").firstChild.nodeValue = "";
            document.getElementById("P2cope").firstChild.nodeValue = "";
            document.getElementById("P2toxic").firstChild.nodeValue = "";
        }

        //R
        $.fn.changeButtonFunction = function (funcName, buttonText) {
            document.getElementById("compareButton").value = buttonText;
            document.getElementById("player1").onsubmit = funcName; //funcname changes button html based on compare/next functions --> Dependent on which one it is on
        }

        //updates the value each player has
        $.fn.changeCardValues = function () {
            document.getElementById("yourCards").firstChild.nodeValue = yourStack;
            document.getElementById("oppCards").firstChild.nodeValue = oppStack;
        }

        //allows user to move to next card - If the game is still going, button changes back to compare again if game is over it changes button to "Play again"
        $.fn.next = function () {
            document.getElementById("player1").p1[noValue].checked = false;
            noValue = -1;
            draw();
            drawP1Card();
            document.getElementById("matchResult").firstChild.nodeValue = "";
            clearP2Card();
            if (!endGame) {
                changeButtonFunction(compare, "Compare Cards");
            }
            else {
                changeButtonFunction(initialise, "Play Again");
            }
            return false;
        }

        //Makes order for how the cards are presented and also organizes array into two decks
        $.fn.TopTrumpQueue = function () {
            var total = 0;
            var myArray = [];
            var returned;
            this.total = total;
            this.total = 0;
            this.myArray = myArray;
            this.returned = returned;
            //myArray is individual arrays (card decks) being created, total is starting number of cards, returned is the total number after each turn

            TopTrumpQueue.prototype.enqueue = function (item) {
                this.myArray[this.total] = item;
                this.total = (this.total + 1);
            };
            //Creates new cards, adds to individual array total

            TopTrumpQueue.prototype.getSize = function () {
                return this.total;
            };
            //gets the size (number) of the array- shows individual deck size

            TopTrumpQueue.prototype.dequeue = function () {
                returned = this.myArray[0];
                for (var i = 0; i <= (this.total); i++) {
                    this.myArray[i] = this.myArray[i + 1];
                }
                this.total = (this.total - 1);
                return returned;
            };
            //Puts existing card to back of queue (dequeue) --> So cards don't repeat in their order
            //returned- Taking 1st item of array created by the enqueue. 
            //total checks how long the array is, this.total-1 adds it to the bottom of the array

            TopTrumpQueue.prototype.shuffle = function () {
                for (var i = 0; i < (this.total * this.total); i++) {
                    var temp2 = parseInt((this.total - 2) * Math.random(), 10);
                    var temp = this.myArray[temp2];
                    this.myArray[temp2] = this.myArray[(temp2 + 1)];
                    this.myArray[(temp2 + 1)] = temp;
                }
            };
        }
            //Shuffles cards- Makes it so there has to be 2 cards
            //Found this and not entirely sure about how it works, but it loops through the arrays and creates temporary values
            //in order to randomize card order I THINK. 
        

        //Brings together all different game functions and creates decks using new array values
        $.fn.setup = function () {
            content = "";
            result = "";
            noGo = false;
            noValue = -1;
            endGame = false;
            theDeck = new TopTrumpQueue();
            player1 = new TopTrumpQueue();
            player2 = new TopTrumpQueue();

            for (i = 0; i < 30; i++) {
                theDeck.enqueue(cards[i]);
            }

            theDeck.shuffle();
            var numCards = theDeck.getSize();
            for (var k = 0; k < (numCards / 2); k++) {
                player1.enqueue(theDeck.dequeue());
                player2.enqueue(theDeck.dequeue());
            }
            player1Card = player1.dequeue();
            player2Card = player2.dequeue();
            draw();
            drawP1Card();
            clearP2Card();
            changeCardValues();
        }

        //Sets up initial game page- Only called when game ends
        $.fn.initialise = function () {
            setup();
            document.getElementById("matchResult").firstChild.nodeValue = "";
            changeCardValues();
            changeButtonFunction(compare, "Compare Cards");
            clearP2Card();

            return false;
        }

        //Compares card values -- i and h used as local variables to loop through array data and compare between the two cards that are currently up
        //Reacts based on various if statements, so if one player wins it displays that, otherwise continues through the enqueueing/dequeueing card creation of the deck
        $.fn.compare = function () {
            var player1form = document.getElementById("player1");

            for (i = 0; i < player1form.p1.length; i++) {
                if (player1form.p1[g].checked) {

                    noValue = i;
                    var p1Val = player1Card[player1form.p1[i].value];
                    var p2Val = player2Card[player1form.p1[i].value];

                    if (p1Val < p2Val) {
                        if (player1.getSize() === 0) {
                            result += "";
                            endGame = true;
                        }
                        if (theDeck.getSize() !== 0) {
                            cardNum = theDeck.getSize();
                            for (h = 0; h < cardNum; h++) {
                                player2.enqueue(theDeck.dequeue());
                            }
                        }
                        player2.enqueue(player1Card);
                        player2.enqueue(player2Card);
                    }
                    else if (p1Val === p2Val) {
                        theDeck.enqueue(player1Card);
                        theDeck.enqueue(player2Card);
                    }
                    else {
                        if (player2.getSize() === 0) {
                            result += "You've won!";
                            endGame = true;
                        }
                        if (theDeck.getSize() !== 0) {
                            cardNum = theDeck.getSize();
                            for (h = 0; h < cardNum; h++) {
                                player1.enqueue(theDeck.dequeue());
                            }
                        }
                        player1.enqueue(player2Card);
                        player1.enqueue(player1Card);
                    }
                    drawP2Card();
                }
            }
            if (noValue === -1) {
                alert("Please select an option");
                noGo = false;
            }
            else {
                noGo = true;
                if (!endGame) {
                    player1Card = player1.dequeue();
                    player2Card = player2.dequeue();
                }
            }
            draw();
            if (noGo) {
                document.getElementById("matchResult").firstChild.nodeValue = result;
                changeButtonFunction(next, "Next card");
                changeCardValues();
            }
            if (endGame) {
                changeButtonFunction(initialise, "Play Again");
            }

            return false;
        }

    })
});
