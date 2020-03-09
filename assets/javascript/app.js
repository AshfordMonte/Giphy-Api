// Array that contains initial button topics
var topics = ["Halo", "Counter Strike", "MineSweeper", "Minecraft", "Fortnite", "GTA V", "Modern Warfare", "Skyrim",
  "The Witcher", "Overwatch", "PUBG", "Tetris", "World of Warcraft"];

// When submit button is clicked, value is stored so that new buttons can be output
$("#submit").on("click", function (event) {
  event.preventDefault();

  var newGame = $(".form-control").val().trim();

  topics.push(newGame);
  buttonOutput();

});

// Function that will display gifs when a game button is clicked
function displayGameGifs() {
  $("#gif-output").empty();
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
        gameImage.attr("data-still", results[i].images.fixed_width_still.url);
        gameImage.attr("data-animate", results[i].images.fixed_width.url);
        gameImage.attr("state", "still");
        gameImage.addClass("image");

        gameDiv.append(p);
        gameDiv.append(gameImage);
        $("#gif-output").prepend(gameDiv);
      }
    });
};

// Function that will output buttons on page load
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

// Event listener that will change image state when an image is clicked
$(document.body).on("click", ".image", function() {
  console.log("State function called");
  var state = $(this).attr("state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("state", "still");
  }
});

$(document).on("click", ".game", displayGameGifs);

buttonOutput();