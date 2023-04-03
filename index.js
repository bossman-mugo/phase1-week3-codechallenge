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
            `<strong>Runtime:</strong> ${film.runtime} minutes<br>`+
            `<strong>Showtime:</strong> ${film.showtime}<br>`+
            `<strong class = "buy">Tickets sold:</strong> ${film.tickets_sold}/${film.capacity}<br>`;

            //adding a button
            const voteButton = document.createElement('button');
            voteButton.innerHTML = "BUY TICKET";
            detailsParagraph.getElementsByClassName("buy").appendChild(voteButton);

            filmDiv.appendChild(detailsParagraph);
            filmsList.appendChild(filmDiv);

        });

    })

    .catch(error => {
        console.error("Error loading films:" ,error);
    });

    function voting(){
        voteButton.addEventListener('click', () => {
            fetch(" http://localhost:3000/films/capacity")
                .then(response => response.json())
                .then(data => {
                    const availableTickets = data.capacity - data.tickets_sold;
                    if (availableTickets > 0){
                        fetch("http://localhost:3000/films/capacity", {
                            method: 'POST',
                            headers: "Content-type: application/json",
                            body:JSON.stringify(availableTickets - 1)
                        })
                        .then(response => response.json())
                        .then(data => {
                            const remainTickets = document.getElementsByClassName('buy');
                            remainTickets.innerHTML = data.availableTickets;

                            //display a successful message to the user

                            alert('You have purchased a ticket successfully');
                        })
                        .catch(error => {
                            console.error('Error updating your ticket: ', error)
                        });


                    }

                    else {
                        //display an error message to the user
                        alert("Sorry, no more tickets are available!");
                    }
                })
                .catch(error => {
                    console.error("Error fetching your ticket", error);
                });

        })
    }