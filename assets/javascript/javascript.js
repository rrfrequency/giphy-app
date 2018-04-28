const marvel = ["Captain America", "Dr.Strange", 
    "Iron Man", "Black Panther", 
    "Hulk", "Wolverine", 
    "Jean Grey", "Jubilee", 
    "Spider Man", "Green Lantern", 
    "Silver Surfer", "Groot", 
    "Deadpool", "Chris Hemsworth", "Ant Man"
];

let url = "https://api.giphy.com/v1/";
let apiKey = "jjTXT5JPSNvj6EpFihaGkQ5ZfeCK1kgm&limit=10";
let search = "";
let queryURL = "";

// Button creator
function createButton(){
  $("#buttonHolder").empty();
  for (let i = 0; i < marvel.length; i++){
  let buttonHTML = "<button class='button'>" + marvel[i] + "</button>"
  $("#buttonHolder").append(buttonHTML);
  }
};

// image creator
function makeImage(){
  $(".imageArea").empty();
   $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response) {
        const results = response.data;
        console.log(results);
 
        
        for (let i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              let rating = results[i].rating;
              let p = $("<p>").text("Rating: " + rating);
              var image = $("<img class='resultGif'>");
              var image = $("<img class='resultGif' src='' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "'data-state='still'>");
       
              let position = i + 3;
              if (position % 3 === 0){
                image.attr("src", results[i].images.fixed_height_still.url);
              $("#imageHolderOne").append(image);
              $("#imageHolderOne").append(p);
              }
              if (position % 3 === 1){
                image.attr("src", results[i].images.fixed_height_still.url);
              $("#imageHolderTwo").append(image);
              $("#imageHolderTwo").append(p);
              }
              if (position % 3 === 2){
                image.attr("src", results[i].images.fixed_height_still.url);
              $("#imageHolderThree").append(image);
              $("#imageHolderThree").append(p);
              }
            }
        }
        animation();
     });
    button();
};

$("#buttonHolder").empty();
createButton();
button();

$("#addSearch").on("click", (event) => {
  event.preventDefault();
  search = $("#searchInput").val();
  console.log(search);
  marvel.push(search);
  createButton();
  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey;
  makeImage();
  $("#searchInput").val("");
});


// Create Images
function button(){
  $(".button").on("click", function(){
    // $("#imageHolder").empty();
    search = $(this).html();
    // makeImage();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey;
      makeImage();
  });
}

// Animation function
function animation(){
  $(".resultGif").on("click", function() {
  console.log(this);
      let state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
}