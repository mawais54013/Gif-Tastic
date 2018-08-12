var topics = ["Pikachu", "Rayquaza", "Umbreon", "Mewtwo"]

function displayInfo() 
{
    var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=4RorcUfXSl3tGRAM0Qf8PW68lgJbeqvE&limt=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
            {
                var results  = response.data;
                console.log(response);
                
                for(var i = 0; i < 10; i++)
                {
                    console.log(results[i])

                    var gifDiv = $("<div class='item'>");
                    // var addRow = $("<div class= 'row'>");
                    // var addCol = $("<div class= 'col'>");
                    
                    var pImg = $("<img>");
                    pImg.attr("src", results[i].images.fixed_width_still.url);
                    pImg.addClass("gif");
                    pImg.attr("data-state","still");
                    pImg.attr("data-still",results[i].images.fixed_width_still.url);
                    pImg.attr("data-animate", results[i].images.fixed_width.url);

                    console.log(pImg);

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    gifDiv.append(pImg);
                    gifDiv.append(p);


                    // $("#addPoke").prepend(gifDiv);
                    $("#sort").prepend(gifDiv);
                }
                
                $(".gif").on("click", function()
                    {
                        console.log(this);
                        var state = $(this).attr("data-state");
                        if(state === "still")
                        {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state","animate");
                        }
                        else 
                        {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    })
            });
    }

function placeButtons()
{
    $("#buttons-view").empty();

    for( var i = 0; i < topics.length; i++)
    {
        var newAdd = $("<button>");

        newAdd.addClass("topic-btn");

        newAdd.attr("data-name", topics[i]);

        newAdd.text(topics[i]);

        $("#buttons-view").append(newAdd);
    }
}

$("#add-charc").on("click", function(event) {
    event.preventDefault();

    var select = $("#user-input").val().trim();

    topics.push(select);

    placeButtons();
})

$(document).on("click", ".topic-btn", displayInfo);

placeButtons();
