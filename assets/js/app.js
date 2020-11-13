let searchBtn = document.querySelector("#searchButton");
let movieInput = document.querySelector("#movieSearch");
let view = document.querySelector("section");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  view.innerHTML = "";

  let queryTitle = movieInput.value;

  let response = await fetch(
    `http://www.omdbapi.com/?s=${queryTitle}&apikey=166d25ad`
  );
  let data = await response.json();

  if (data.Response === "True") {
    data.Search.forEach(async (movie) => {
      let response2 = await fetch(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=166d25ad`
      );
      let data2 = await response2.json();

      console.log(data2);
      //append to view
      let div = document.createElement("div");

      let h1 = document.createElement("h1");
      let h2 = document.createElement("h2");
      let h3 = document.createElement("h3");
      let plotBtn = document.createElement("button");
      let plotParagraph = document.createElement("p");

      let titleNode = document.createTextNode(data2.Title);
      let yearNode = document.createTextNode(data2.Year);
      let actorsNode = document.createTextNode(data2.Actors);
      let plotNode = document.createTextNode(data2.Plot);
      let plotButtonText = document.createTextNode("Plot");

      h1.appendChild(titleNode);
      h2.appendChild(yearNode);
      h3.appendChild(actorsNode);
      plotBtn.appendChild(plotButtonText);
      plotParagraph.appendChild(plotNode);

      plotParagraph.classList.add("hide");

      plotBtn.addEventListener("click", (e) => {
        plotParagraph.classList.toggle("hide");
      });

      div.appendChild(h1);
      div.appendChild(h2);
      div.appendChild(h3);
      div.appendChild(plotParagraph);
      div.appendChild(plotBtn);

      view.appendChild(div);
    });
  } else {
    view.innerHTML = "No Movies Found";
  }
});
