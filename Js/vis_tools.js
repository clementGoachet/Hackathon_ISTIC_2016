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
    // id en mode numérique pour les nodes
    var idFilmNum = Number(idFilm.replace( /^\D+/g, ''));
    var nodes_data = [];
    var edges_data = [];

    var jsonStringFilm = sessionStorage.getItem(idFilm);
    var film = JSON.parse(jsonString);
    console.log(film)

    nodes_data.push({
        id: idFilmNum,
        group: 'films',
        label: film.Title,
        shape: 'circularImage',
        image: film.Poster
    });

    console.log(nodes_data)
    // noeuds des acteurs
    $.each(film.Actors, function(key, idActeur) {
        var idActeurNum = Number(idActeur.replace( /^\D+/g, ''));
        var jsonStringActeur = sessionStorage.getItem(idActeur);
        var acteur = JSON.parse(jsonStringActeur);

        nodes_data.push({
            id: idActeurNum,
            group: "acteurs",
            label: acteur.Title,
            shape: 'circularImage',
            image: acteur.Image
        });
        edges_data.push({
            from: idFilmNum,
            to: idActeurNum
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