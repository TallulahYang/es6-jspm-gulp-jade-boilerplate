class Config {

    getData() {
        var promise = $.getJSON('./views/index.jade.json');
        return promise;
    }
}

export default Config;