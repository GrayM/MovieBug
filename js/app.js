$(document).ready(function() {
    $('#movieNameInput').focus(function() {
        var full = $("#results").has("img").length ? true : false;
        if (full == false) {
            $('#results').empty();
        }
    });
    var getPoster = function() {
        var film = $('#movieNameInput').val();
        if (film == '') {
            $('#results').html("<h3 class='loading'>Now how am I supposed to search for that!?</h3>");
        } else {
            $('#results').html("<h3 class='loading'>Searching database for " + film + "..." + "</h3>");
        }
    }
        // callback for getConfiguration call error
    // function configErrorCallback(data) {
    //         'use strict';
    //         $('#results').text('Error getting TMDb configuration! ' + JSON.parse(data).status_message);
    //     }
    function successCallback(data) {
            'use strict';

            $('#results').text('');
            data = JSON.parse(data);
            if (data.results && data.results.length > 0) {
                var imageURL = theMovieDb.common.images_uri + 'w300' + data.results[0].poster_path;
                $('#results').append('<h4>Here you go, insect!</h4></br />')
                $('#results').append('Title: <b>' + data.results[0].title + '</b><br />');
                $('#results').append('Movie Id: ' + data.results[0].id + '<br />');
                $('#results').append('<img src="' + imageURL + '" />');
            } else {
                $('#results').append('<h4>I couldn\'t find nuthin... quit buggin me!</h4>');
                console.log('Th\'arr be no movies in this here database, matey!');
            }
        }
        // callback for movie search error
    function errorCallback(data) {
            'use strict';
            if (film !== '') {

                console.log('error: \n' + data);
                $('#results').text('Error searching. ' + JSON.parse(data).status_message);
            }
        }
        // search button click event handler
    $('#searchBtn').click(function() {
        'use strict';
        getPoster();
        var searchTerm = $('#movieNameInput').val(),
            searchYear = $('#movieYearInput').val(),
            options = {
                "query": searchTerm
            };
        options.query = searchTerm;
        if (!isNaN(searchYear)) {
            options.year = searchYear;
        }
        theMovieDb.search.getMovie(options, successCallback, errorCallback);
    });
    // input enter/return keyup event handler
    $('#movieNameInput').keyup(function(event) {
        if (event.keyCode === 13) {
            'use strict';
            getPoster();
            var searchTerm = $('#movieNameInput').val(),
                searchYear = $('#movieYearInput').val(),
                options = {
                    "query": searchTerm
                };
            //options.query = searchTerm;
            if (!isNaN(searchYear)) {
                options.year = searchYear;
            }
            theMovieDb.search.getMovie(options, successCallback, errorCallback);
        }
    });

});