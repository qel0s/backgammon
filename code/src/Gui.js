var whiteDiceNrs = [
  "white-one", "white-two", "white-three", "white-four", "white-five", "white-six"
];
var brownDiceNrs = [
  "brown-one", "brown-two", "brown-three", "brown-four", "brown-five", "brown-six"
];

var PLAYER1 = new Player("Player1");
var PLAYER2 = new Player("Player2");
var GAME = new Game();

$(function() {
  showStartUpWindow();

  $("#player1Input").click(function() {
    $("#player1Input").val("");
  });

  $("#player2Input").click(function() {
    $("#player2Input").val("");
  });

  $('#menu').click(function() {
    $('#menuDialog').dialog({
      autoOpen : false,
      show : "blind",
      hide : "explode",
      buttons : {
        "Start new game" : function() {
          $(this).dialog("close");
          startUpWindow();
        },
        Resume : function() {
          $(this).dialog("close");
        }
      }
    });

    $('#menuDialog').dialog("open");
    return false;
  });

  $('#undo').click(function() {
    removeStartingDice();

    //todo call undo move from the back-end
  });

  $('#submit').click(function() {
    alert('Submit.');
    startGameRolling(5, 4);
    //todo call the function from the back-end, give the turn right over
  });

  $('#send').click(function() {
    if ($('#chat_input').val() != "") {
      consoleAddMessage($('#chat_input').val());
      $('#chat_input').val('');
    }
  });
});

function showStartUpWindow() {
  $("#dialog-modal").dialog({
    height : 250,
    modal : true,
    hide : "explode",
    buttons : {
      "Start new game" : function() {
        startNewGame();
        $(this).dialog("close");
      }
    }
  });
}

function startNewGame() {
  if ($("#player1Input").val() != "") {
    PLAYER1.name = $("#player1Input").val();
  }

  if ($("#player2Input").val() != "") {
    PLAYER2.name = $("#player2Input").val();
  }

  $("#player1Name").text(PLAYER1.name);
  $("#player2Name").text(PLAYER2.name);

  GAME.start();

  showWhiteDice(GAME.diceRoller.firstValue);
  showBrownDice(GAME.diceRoller.secondValue);
}

// value - 1 to 6
function showWhiteDice(value) {
  var dice = $("#whiteDiceNr1");
  dice.parent().show();
  animateDice(dice, whiteDiceNrs, value);
}

// value - 1 to 6
function showBrownDice(value) {
  var dice = $("#brownDiceNr1");
  dice.parent().show();
  animateDice(dice, brownDiceNrs, value);
}

// dice - dice jquery object
// numbers - array of number classes
// value - final value 1 to 6
function animateDice(dice, numbers, value) {
  dice.removeClass().addClass("dice");

  var lastClass = null;
  var count = 0;
  var nrGenerator = new DiceNumberGenerator();

  var showRandomNr = function() {
    var randomNr = nrGenerator.generate() - 1;
    dice.switchClass(lastClass, numbers[randomNr], 80, function() {
      if (count <= 8) {
        lastClass = numbers[randomNr];
        showRandomNr();
      } else {
        dice.switchClass(lastClass, numbers[value - 1]);
      }
    });
    count++;
  }

  showRandomNr();
}

function consoleAddMessage(message) {
  $('#log').append(message + "<br />");
  $('#log').animate({
    scrollTop : $("#log")[0].scrollHeight - $("#log").height()
  }, 1000, function() {
  });
}

function removeStartingDice() {
  $("#whiteDiceNr1Container").remove();
  $("#brownDiceNr1Container").remove();
}

function removeWhiteDice() {
  $("#whiteDiceNr1Container").remove();
  $("#whiteDiceNr2Container").remove();
}

function removeBrownDice() {
  $("#brownDiceNr1Container").remove();
  $("#brownDiceNr2Container").remove();
}