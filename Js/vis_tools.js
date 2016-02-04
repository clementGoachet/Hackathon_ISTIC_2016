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

function createGraphFromFilm(idFilm, nodes, edges) {
    //matchIdAndNameActor();

    // id en mode numérique pour les nodes
    var idFilmNum = idFilm.substring(2);

    var jsonStringFilm = sessionStorage.getItem(idFilm);
    var film = JSON.parse(jsonStringFilm);
    console.log("film", film)

    if(!nodes.get(idFilmNum)) {
        if(film.Poster !== undefined) {
            nodes.add({
                id: idFilmNum,
                id_imdb: film.Id,
                group: 'films',
                label: film.Title,
                shape: 'circularImage',
                image: film.Poster
            });
        }
        else {
            nodes.add({
                id: idFilmNum,
                id_imdb: film.Id,
                group: 'films',
                label: film.Title,
            });
        }
    }

    // noeuds des acteurs
    //var actors = film.Actors.split(", ");
    $.each(film.Actors, function(key, idActeur) {
        var idActeurNum = idActeur.substring(2);

        if(!(/^\d+$/.test(idActeurNum))) {
            return;
        }
        var jsonStringActeur = sessionStorage.getItem(idActeur);
        var acteur = JSON.parse(jsonStringActeur);

        // création du node acteur
        if(!nodes.get(idActeurNum)) {
            if(acteur.Image !== undefined) {
                nodes.add({
                    id: idActeurNum,
                    group: "acteurs",
                    label: acteur.Title,
                    shape: 'circularImage',
                    image: acteur.Image
                });
            }
            else {
                nodes.add({
                    id: idActeurNum,
                    group: "acteurs",
                    label: acteur.Title
                });
            }
        }

        // lier le film à l'acteur
        edges.add({
            from: idFilmNum,
            to: idActeurNum
        });

        // création des films pour chaque acteur
        var filmsActeur = acteur.Films.split(",");
        $.each(filmsActeur, function(key, idFilmActeur) {
            var idFilmActeurNum = idFilmActeur.substring(2);

            console.log(nodes.get(idFilmActeurNum), idFilmActeurNum)
            if(nodes.get(idFilmActeurNum)) {
                return;
            }
            var jsonStringFilm = sessionStorage.getItem(idFilmActeur);
            var film_acteur = JSON.parse(jsonStringFilm);

            if(film_acteur.Poster !== undefined) {
                nodes.add({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                    shape: 'circularImage',
                    image: film_acteur.Poster
                });
            }
            else {
                nodes.add({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                });
            }

            edges.add({
                from: idFilmActeurNum,
                to: idActeurNum
            });
        });
    });

    //var nodes = new vis.DataSet(nodes_data);
    //var edges = new vis.DataSet(edges_data);

    return {
        nodes: nodes,
        edges: edges
    }
}

function createGraphFromActeur(idActeur, nodes, edges) {

    // id en mode numérique pour les nodes
    var idActeurNum = idActeur.substring(2);

    var jsonStringActeur = sessionStorage.getItem(idActeur);
    var acteur = JSON.parse(jsonStringActeur);

    // création du node acteur
    if(!nodes.get(idActeurNum)) {
        if(acteur.Image !== undefined) {
            nodes.add({
                id: idActeurNum,
                group: "acteurs",
                label: acteur.Title,
                shape: 'circularImage',
                image: acteur.Image
            });
        }
        else {
            nodes.add({
                id: idActeurNum,
                group: "acteurs",
                label: acteur.Title
            });
        }
    }

    // création des films pour chaque acteur
    var filmsActeur = acteur.Films.split(",");
    console.log("filmsActeur", filmsActeur)
    $.each(filmsActeur, function(key, idFilmActeur) {

        var idFilmActeurNum = idFilmActeur.substring(2);

        if(nodes.get(idFilmActeurNum)) {
            return;
        }

        var jsonStringFilm = sessionStorage.getItem(idFilmActeur);
        var film_acteur = JSON.parse(jsonStringFilm);

        if(!nodes.get(idFilmActeurNum)) {
            if(film_acteur.Poster !== undefined) {
                nodes.add({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                    shape: 'circularImage',
                    image: film_acteur.Poster
                });
            }
            else {
                nodes.add({
                    id: idFilmActeurNum,
                    id_imdb: film_acteur.Id,
                    group: 'films',
                    label: film_acteur.Title,
                });
            }
        }

        edges.add({
            from: idFilmActeurNum,
            to: idActeurNum
        });
    });

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