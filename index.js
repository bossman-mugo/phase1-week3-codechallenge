const filmsList = document.getElementsByID("films");

//fetch data from the server
fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then(data => {
        //get the films array from the loaded data
        const films = data.films;

        films.forEach(film => {
            const filmDiv = document.createElement("div");
            filmDiv.classList.add('film');

            //add the film title
            const titleHeading = document.createElement('h2');
            titleHeading.innerHTML = film.title;
            filmDiv.appendChild(titleHeading);

            //add the film poster image
            const posterImg = document.createElement("img");
            posterImg.src = film.poster;
            filmDiv.appendChild(posterImg);

            //adding the film details
            const detailsParagraph = document.createElement('p');
            detailsParagraph.innerHTML =
            `<strong>Runtime:</strong> ${film.runtime}`

        })

    })