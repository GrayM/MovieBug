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


    function configSuccessCallback(data) {
            'use strict';
            // Set the base image url to the returned base_url value plus w185, shows posters with a width of 185 pixels.
            // Store it in localStorage so we don't make the configuration call every time.
            localStorage.setItem('tmdbImageUrlBase', JSON.parse(data).images.base_url + 'w200');
            $('#results').text('tmdbImageUrlBase downloaded from themoviedb.org: ' + localStorage.getItem('tmdbImageUrlBase'));
        }
        // callback for getConfiguration call error
    function configErrorCallback(data) {
            'use strict';
            $('#results').text('Error getting TMDb configuration! ' + JSON.parse(data).status_message);
        }
        // check localStorage for imageBaseUrl, download from TMDb if not found
        // if (localStorage.getItem('tmdbImageUrlBase')) {
        //     $('#results').text('tmdbImageUrlBase retrieved from localstorage: ' + localStorage.getItem('tmdbImageUrlBase'));
        // } else {
        //     theMovieDb.configurations.getConfiguration(configSuccessCallback, configErrorCallback);
        // }

    // callback for successful movie search
    function successCallback(data) {
            'use strict';
            $('#results').text('');
            data = JSON.parse(data);
            //console.log(data);
            // we just take the first result and display it
            if (data.results && data.results.length > 0) {
                var imageUrl = localStorage.getItem('tmdbImageUrlBase') + data.results[0].poster_path;
                $('#results').append('Title: <b>' + data.results[0].title + '</b><br />');
                $('#results').append('Movie Id: ' + data.results[0].id + '<br />');
                $('#results').append('<img src="' + imageUrl + '" />');
            } else {
                $('#results').text('Nothing found');
                console.log('Nothing found');
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
        console.log('click');
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
        console.log('click')
    });
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
server.listen(process.env.PORT);
console.log("Express server started on"+server.listen(process.env.PORT));