// fonctions utiles pour l'utilisation de vis.js

function getFilmInfos(json) {
    var result = {};

    result.title = json.Title;
    result.plot = json.Plot;
    result.released = json.Released;
    result.genre = json.Genre;
    result.rating = json.imdbRating;
    result.country = json.Country;
    result.director = json.Director;

    return result;
}

function createGraphFromFilm(idFilm) {
    //matchIdAndNameActor();

    // id en mode numérique pour les nodes
    var idFilmNum = idFilm.substring(3);
    var nodes_data = [];
    var edges_data = [];

    var jsonStringFilm = sessionStorage.getItem(idFilm);
    var film = JSON.parse(jsonStringFilm);

    if(film.Poster !== undefined) {
        nodes_data.push({
            id: idFilmNum,
            id_imdb: film.Id,
            group: 'films',
            label: film.Title,
            shape: 'circularImage',
            image: film.Poster
        });
    }
    else {
        nodes_data.push({
            id: idFilmNum,
            id_imdb: film.Id,
            group: 'films',
            label: film.Title,
        });
    }

    // noeuds des acteurs
    var actors = film.Actors.split(", ");
    $.each(actors, function(key, idActeur) {
        var idActeurNum = idActeur.substring(2);

        if(!(/^\d+$/.test(idActeurNum))) {
            return;
        }
        var jsonStringActeur = sessionStorage.getItem(idActeur);
        var acteur = JSON.parse(jsonStringActeur);

        // création du node acteur
        if(acteur.Image !== undefined) {
            nodes_data.push({
                id: idActeurNum,
                group: "acteurs",
                label: acteur.Title,
                shape: 'circularImage',
                image: acteur.Image
            });
        }
        else {
            nodes_data.push({
                id: idActeurNum,
                group: "acteurs",
                label: acteur.Title
            });
        }

        // lier le film à l'acteur
        edges_data.push({
            from: idFilmNum,
            to: idActeurNum
        });

        // création des films pour chaque acteur
        var filmsActeur = acteur.Films.split(",");
        $.each(filmsActeur, function(key, idFilmActeur) {
            console.log(idFilmActeur == idFilm, idFilmActeur)
            if(idFilmActeur == idFilm) {
                return;
            }
            var idFilmActeurNum = idFilmActeur.substring(3);

            var jsonStringFilm = sessionStorage.getItem(idFilmActeur);
            var film_acteur = JSON.parse(jsonStringFilm);

            if(film_acteur.Poster !== undefined) {
                nodes_data.push({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                    shape: 'circularImage',
                    image: film_acteur.Poster
                });
            }
            else {
                nodes_data.push({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                });
            }

            edges_data.push({
                from: idFilmActeurNum,
                to: idActeurNum
            });
        });
    });

    var nodes = new vis.DataSet(nodes_data);
    var edges = new vis.DataSet(edges_data);

    return {
        nodes: nodes,
        edges: edges
    }
}

function createFilmInfosHtml(json) {
    var infos = getFilmInfos(json);
    $('<h3/>', {
        'class':'info_film_title',
        'text': infos.title,
    }).appendTo('#infos');
}