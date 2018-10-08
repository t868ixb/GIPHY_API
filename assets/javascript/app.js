$(document).ready(function () {
    //create a topic array to hold the search item entered by user
    var topicArray = [];
    console.log(topicArray);
    $(".imputResults").hide();

    //function to add the search items to the array
    function addToArray() {
        //user clicks on search button
        $("#searchBtn").on("click", function () {
            //stop what?  see what happens without this
           // event.preventDefault();
            //if the search field is empty, let the user know
            if ($("#userInput").val() === '') {
                // || $("#userInput").val() === undefined
                alert("search field is empty");
            } else {       //if not empty
                //assign the users input to a variable
                var userSearch = $("#userInput").val().trim();
                //push the users input to the array
                topicArray.push(userSearch + " LaCroix");
                //call function to show buttons
               // clearIt();
                $(".imputResults").show();
                showButtons();
                
                //clear the search field after user hits submit
                $("#userInput").val('');
            } //end of else statement
        });
    }
    //function to clear the search field
    function clearIt() {
        $("#clearBtn").on("click", function () {
            console.log("you clicked")
            $("#userInput").val('');
        });
    };

    //function for creating the buttons
    function showButtons() {
        $("#displayButtons").empty();
        for (var i = 0; i < topicArray.length; i++) {
           // var gifButton = $("<button>");
           var gifButton = $("<button type='button' class='btn btn-success btn-lg'>" + " ");
            gifButton.addClass("topic");
            gifButton.addClass("newButton")
            gifButton.attr("data-topic", topicArray[i]);
            gifButton.text(topicArray[i]);
            $("#displayButtons").append(gifButton);
        }
    }
    console.log("after the 'showButton' function " + topicArray);
    //function to communicate with the Giphy api
    function showGifs() {
        //I had issues with the .param function so used this instead
        var topic = $(this).attr("data-topic");
        //reach out to giphy api
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=5L5Oju5jIR0ylECo5Pd7NcQrg7wqeQhh&limit=10&offset=0&rating=&lang=en";;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //process the response from the api
            .done(function (response) {
                console.log(response);
                $("#gifs-appear-here").empty();
                var results = response.data;
                //loop through the responses
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var lineBreak = $("<hr>").text('');
                    gifDiv.append(lineBreak);
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifTitle = $("<p>").text("Title: " + results[i].title);
                    gifDiv.append(gifTitle);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    }
    console.log("after the 'ajax call' function " + topicArray);
    addToArray();
    clearIt();
    showButtons();



    $(document).on("click", ".topic", showGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

});