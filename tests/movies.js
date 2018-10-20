const { test } = QUnit;

test("generateCardHtml(object) deve retornar html sem nenhum undefined", assert => {
    var movie = { poster_path: 'a', overview: 'a', title: 'title', original_title: 'original-title',
        release_date: 'release-date', popularity: '10' };
    var html = generateCardHtml(movie);
    assert.equal(html.indexOf('undefined'), -1, "Não retornou nenhum undefined.")
});

test("generateCardHtml(object) deve retornar conteúdo com undefined quando o objeto não estiver completo", assert => {
    var movie = { poster_path: 'a', overview: 'a', title: 'title', original_title: 'original-title',
        release_date: 'release-date' };
    var html = generateCardHtml(movie);
    assert.notEqual(html.indexOf('undefined'), -1, "Retornou undefined.")
});

test("generateCardHtml(object) deve retornar false quando não houver parâmetros", assert => {
    var html = generateCardHtml();
    assert.notOk(html, "Retornou false.")
});


test("searchValidations(search) deve retornar mensagem de erro quando tiver vazio", assert => {
    var errorMessage = searchValidations('');
    assert.equal(errorMessage, "Deve ter pelo menos duas letras.", "Retornou mensagem de erro.");
});

test("searchValidations(search) deve retornar mensagem de erro quando tiver 1 letra", assert => {
    var errorMessage = searchValidations('a');
    assert.equal(errorMessage, "Deve ter pelo menos duas letras.", "Retornou mensagem de erro.");
});

test("searchValidations(search) deve retornar true quando tiver 2 letras", assert => {
    var errorMessage = searchValidations('');
    assert.ok(errorMessage, "Ok");
});

test("searchValidations(search) deve retornar true quando tiver 29 letras", assert => {
    var errorMessage = searchValidations('1234567890abcdefghij123456789');
    assert.ok(errorMessage, "Ok");
});

test("searchValidations(search) deve retornar true quando tiver 30 letras", assert => {
    var errorMessage = searchValidations('1234567890abcdefghij1234567890');
    assert.ok(errorMessage, "Ok");
});

test("searchValidations(search) deve retornar mensagem de erro quando tiver 31 letras", assert => {
    var errorMessage = searchValidations('1234567890abcdefghij12345678901');
    assert.equal(errorMessage, "Deve ter no máximo 30 letras.", "Retornou mensagem de erro.");
});

test("fetchMovies(string, callback) deve retornar objeto json com resultados", assert => {
    var done = assert.async();
    fetchMovies('ra', function(data) {
        assert.ok(data.results.length > 0, "Resultados obtidos.");
        done();
    }, function() {
        assert.notOk(true, "Houve erro de comunicação com a API.");
        done();
    });
});

test("fetchMovies(string, callback) deve retornar objeto json de resultados vazio quando não encontrar o filme", assert => {
    var done = assert.async();
    fetchMovies('120381209381287481274sdasdasd1', function(data) {
        assert.equal(0, data.results.length, "Nenhum filme encontrado.");
        done();
    }, function() {
        assert.notOk(true, "Houve erro de comunicação com a API.");
        done();
    });
});
