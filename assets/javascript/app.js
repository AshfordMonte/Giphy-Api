var topics = ["Halo", "Counter Strike", "MineSweeper", "Minecraft", "Fortnite", "GTA V", "Modern Warfare", "Skyrim",
  "The Witcher", "Overwatch", "PUBG", "Tetris", "World of Warcraft"];

$("#submit").on("click", function (event) {
  event.preventDefault();

  var newGame = $(".form-control").val().trim();

  topics.push(newGame);
  buttonOutput();

});

function displayGameGifs() {
  var game = $(this).attr("game-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=WZkaNwGjNk2sqHs84pLUJKmTTSa72aAc";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function(response) {
      console.log(response);
      var results = response.data;

      for (let i = 0; i < 10; i++) {
        
        var gameDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);

        var gameImage = $("<img>");
        gameImage.attr("src", results[i].images.fixed_width_still.url);
        gameImage.attr("data-animate", results[i].images.fixed_width.url);

        gameDiv.append(p);
        gameDiv.append(gameImage);
        $("#gif-output").prepend(gameDiv);
      }
    });
};

function buttonOutput() {
  $("#buttons").empty();

  for (let i = 0; i < topics.length; i++) {
    var newButton = $("<button type='button'>");

    newButton.addClass("btn btn-secondary game");
    newButton.text(topics[i]);
    newButton.attr("game-name", topics[i]);

    $("#buttons").append(newButton);

  }
};

$(document).on("click", ".game", displayGameGifs);

buttonOutput();