  let Marvel = [
    "Captain America", "Dr.Strange", 
    "Iron Man", "Black Panther", 
    "Hulk", "Wolverine", 
    "Phoenix", "Jubilee", 
    "Spider Man", "Green Lantern", 
    "Silver Surfer", "Modern Family", 
    "Deadpool", "Chris Hemsworth", "Ant Man"
  ];

const url = "https://api.giphy.com/v1/";
const apiKey = "jjTXT5JPSNvj6EpFihaGkQ5ZfeCK1kgm";
const search = "";



// Button creator
function createButton(){
  for (let i = 0; i < topics.length; i ++) {
  let buttonHTML = "<button class='button'>" + topics[i] + "</button>"
  $("#buttonHolder").append(buttonHTML);
  }
};

// image creator
// function makeImage(){
//   $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//     .done(function(response) {
//         let results = response.data;
//         // console.log(results);
        
//         for (let i = 0; i < results.length; i++) {
//             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
//               let rating = results[i].rating;
//               let p = $("<p>").text("Rating: " + rating);
//               let image = $("<img class='resultGif'>");

//               image.attr("src", results[i].images.fixed_height.url);
//               $("#imageHolder").append(image);
//             }
//         }
//      });
// };

$("#buttonHolder").empty();
createButton();


$("#addSearch").on("click", (event) => {
  event.preventDefault();
  search = $("#searchInput").val();
  console.log(search);
  topics.push(search);
  createButton();

  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=jjTXT5JPSNvj6EpFihaGkQ5ZfeCK1kgm&limit=10";
  makeImage();
});


// Create Images
$(".button").on("click", function(){
  $("#imageHolder").empty();

  search=$(this).html();

  // makeImage();
  let queryURL="https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=jjTXT5JPSNvj6EpFihaGkQ5ZfeCK1kgm&limit=10";
    $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done((response) => {
        var results = response.data;
        // console.log(results);
        
        for (let i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              let rating = results[i].rating;
              let p = $("<p>").text("Rating: " + rating);
              let image = $("<img class='resultGif'>");

              image.attr("src", results[i].images.fixed_height.url);
              $("#imageHolder").append(image);
            }
        }
     });

});
