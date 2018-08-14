// typed the four pokemon already included as test
var topics = ["Pikachu", "Rayquaza", "Umbreon", "Mewtwo"]
var used = [];
var pokeCount = 4;

// info displayed here 
function displayInfo() 
{
    // this is used to use the input typed 
    var title = $(this).attr("data-name");
    // link to gpihy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=4RorcUfXSl3tGRAM0Qf8PW68lgJbeqvE&limt=10";
    // api function to get the information
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
            {
                // response used to get the data as a communicator 
                var results  = response.data;
                console.log(response);
                // for every time a new pokemon is typed, a new button will be added 
                for(var i = 0; i < 10; i++)
                {
                    console.log(results[i])

                    var gifDiv = $("<div class='item'>");
                    // will also have a data state, still, and animate info to change once the gif is clicked 
                    var pImg = $("<img>");
                    pImg.attr("src", results[i].images.fixed_width_still.url);
                    pImg.addClass("gif");
                    pImg.attr("data-state","still");
                    pImg.attr("data-still",results[i].images.fixed_width_still.url);
                    pImg.attr("data-animate", results[i].images.fixed_width.url);
                    
                    console.log(pImg);
                    var pName = $(pImg).attr("name");
                    // rating is also used from the API and list to every image
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    // at the end all info is append and then stored #sort to display
                    gifDiv.append(pImg);
                    gifDiv.append(p);

                    $("#sort").prepend(gifDiv);
                }   
                // function that stops a gif once it is clicked 
                $(".gif").on("click", function()
                    {
                        console.log(this);
                        var state = $(this).attr("data-state");
                        if(state === "still")
                        {
                            // if clicked then animate
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state","animate");
                        }
                        else 
                        {
                            // if clicked again then it is paused
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    })
            });
    }
// function that puts buttons on the screen
function placeButtons()
{
    // first empty the buttons area to include the new added input
    $("#buttons-view").empty();
    // gives each item in array a button with several attr's 
    for( var i = 0; i < topics.length; i++)
    {
        var newAdd = $("<button>");

        newAdd.addClass("topic-btn");

        newAdd.attr("data-name", topics[i]);

        newAdd.text(topics[i]);

        $("#buttons-view").append(newAdd);
    }
}
// this function takes the value from input and pushes them to arrays and place buttons
// it was suppose to include a duplicate preventation but could not get it to work
$("#add-charc").on("click", function(event) {
    event.preventDefault();

    var select = $("#user-input").val().trim();
    $("#user-input").val("");

    pokeCount++;
    
    if(select === "")
    {
        $("#error").append("Please type a name");

    }
    // else if(select.indexOf(used))
    // {
    //     $("#error").append("Please type another pokemon name");
    // }
    else 
    {
        console.log(select);
        used.push(select);
        console.log(used);
    
        topics.push(select);
        placeButtons();
    }
})
// delpoy functions and display info on click
$(document).on("click", ".topic-btn", displayInfo);

placeButtons();
