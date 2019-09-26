


// Starting array of NBA players

var athletesArray = ["Michael Jordan", "Kobe Bryant", "Lebron James", "Kyrie Irving", "Kawhi Leonard", "Larry Bird", "Stephen Curry", "Klay Thompson", "Joel Embid"];


// Create a function to make the buttons from the array. 

function makeButtons() {

    $("#AthleteButtons").empty();

    for (var i = 0; i < athletesArray.length; i++) {

        var button = $("<button>").text(athletesArray[i]);
        button.addClass("athletebutton");
        $("#AthleteButtons").append(button);
    }

};

makeButtons();


// When you click a button, run the function to grab the gifs from the API

$("#AthleteButtons").on("click", ".athletebutton", function () {

    var athlete = $(this).text();
    console.log(athlete);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=VZ20722gxSvG8nvUemk6QX5etkksOZf1&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;

            $("#gifs").empty();

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                gifDiv.addClass("totalimg");

                var athleteImage = $("<img>");


                athleteImage.attr("src", results[i].images.fixed_height.url);
                athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-animate", results[i].images.fixed_height.url);
                athleteImage.attr("data-state", "still");
                athleteImage.addClass("gif");


                gifDiv.append(athleteImage);
                gifDiv.prepend(p);

                $("#gifs").prepend(gifDiv);
            }
        });


    $("#gifs").on("click", ".gif", function (event) {

        event.preventDefault();

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


    });

});


// Make an on-click function for the gifs to make them still or animate

$("#submit").on("click", function (event) {

    event.preventDefault();

    var newAthlete = $("#athlete-input").val().trim();

    athletesArray.push(newAthlete);

    $("#athlete-input").val("");

    makeButtons();

    console.log(athletesArray);

});

    // Add a new button from the input 







