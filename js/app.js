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
            $('#results').html("<h3 class='loading'>Bzzzt... are you sure you typed something? Bzzt!</h3>");
        } else {
            $('#results').html("<h3 class='loading'>Searching database for " + film + "..." + "</h3>");
        }
    }
    function successCallback(data) {
            'use strict';
            $('#results').text('');
            data = JSON.parse(data);
            if (data.results && data.results.length > 0) {
                var baseURL = theMovieDb.common.base_uri;
                var posterURL = theMovieDb.common.images_uri + 'w300' + data.results[0].poster_path;
                $.get(baseURL + 'movie/top_rated', function(data) {
                    $('#results').html(data);
                    alert('load');
                });
                $('#results').append('<h4>Here you go, insect!</h4></br />')
                $('#results').append('Title: <b>' + data.results[0].title + '</b><br />');
                $('#results').append('Release date: <b>' + data.results[0].release_date + '</b><br />');
                $('#results').append('Movie Id: <b>' + data.results[0].id + '</b><br />');
                $('#results').append('<img src="' + posterURL + '" />');
            } else {
                $('#results').append('<h4>I couldn\'t find nuthin... quit buggin\' me!</h4>');
                console.log('No results');
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
            // options.query = searchTerm;
            if (!isNaN(searchYear)) {
                options.year = searchYear;
            }
            theMovieDb.search.getMovie(options, successCallback, errorCallback);
        }
    });

});