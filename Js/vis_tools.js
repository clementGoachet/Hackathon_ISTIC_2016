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

    $.ajax({
        type: "get",
        url: "../json/films_test.json",
        datatype: "json",
        success: function (data) {
            console.log(data.data);
        },
       //add this error handler you'll get alert
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $.getJSON("../json/films_test.json", function (data) {
        console.log("in")
    });

/*                    nodes_data.push({
                        id: idFilmNum,
                        group: 'films',
                        label: film.Title,
                        shape: 'circularImage',
                        image: film.Poster
                    });

                    console.log(nodes_data)

                    // noeuds des acteurs
                    $.each(film.Actors, function(key, acteur) {
                        var idActeurNum = Number(acteur.replace( /^\D+/g, ''));

                        nodes_data.push({
                            id: idActeurNum,
                        });

                        edges_data.push({
                            from: idFilmNum,
                            to: idActeurNum
                        });
                    });*/

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