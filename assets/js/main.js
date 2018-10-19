// Methods
function generateCardHtml(movie) {
    if (movie === undefined) {
        return false;
    }

    var posterPath = 'assets/images/poster-placeholder.png';
    var overview = "Sem sinopse.";


    if (movie.poster_path != null) {
        posterPath = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    }
    if (movie.overview != "") {
        overview = movie.overview;
    }

    return `
        <div class="ui card">
            <div class="image">
                <img src="${posterPath}">
            </div>

            <div class="content">
                <div class="header">${movie.title}</div>
                <div class="meta">
                    <a>Original: ${movie.original_title}</a>
                </div>
                <div class="description">
                    ${overview}
                </div>
            </div>
            
            <div class="extra content">
                <span class="right floated">
                    ${movie.release_date}
                </span>
            <span>
            <i class="thumbs up outline icon"></i>
                ${movie.popularity}
            </span>
            </div>
        </div>
    `;
}

function fetchMovies(searchValue, successCallback, failCallback) {
    $.ajax({
        url: `https://ibd186-qunitjs.herokuapp.com/movies?search=${searchValue}`,
    }).done(successCallback).fail(failCallback);
}

function searchValidations(searchValue) {
    if (searchValue.length <= 1) return "Deve ter pelo menos duas letras.";
    if (searchValue.length > 30) return "Deve ter no máximo 30 letras.";
    return true;
}

// Actions
$(document).ready(function() {
    $("#search-button").on("click", function() {
        var searchButton = $("#search-button");
        var searchValue = $("#search-input").val();

        searchButton.prop("disabled", true);

        var validationMessage = searchValidations(searchValue);
        if (validationMessage !== true) {
            $("#error").html(validationMessage);
            $("#error").removeClass("hidden");

            searchButton.prop("disabled", false);
            return false;
        } else {
            $("#error").addClass("hidden");
        }

        fetchMovies(searchValue, function(data) {
            if (data.results.length == 0) {
                $("#error").html("Nenhum filme foi encontrado.");
                $("#error").removeClass("hidden");
            }
            var cardsHtml = "";

            for (var i in data.results) {
                cardsHtml += generateCardHtml(data.results[i]);
            }

            $(".movies").html(cardsHtml);
            
            searchButton.prop("disabled", false);
        }, function(error) {
            alert("Houve um erro de comunicação com o servidor. Tenta novamente mais tarde.");
        });
    });

    $("#clear-button").on("click", function() {
        $(".movies").html("");
        $("#search-input").val("");
    });

    $("#error").on("click", function() {
        $(this).addClass("hidden");
    });

});
