function initialImport(db, done) {
    console.log("Initialize languages for hoodie-plugin-tarjomeh-languages")

    var languages = ['persian', 'german', 'french', 'spanish', 'english'];

    languages.forEach(function (language) {
        db.add('language', {id: language, name: language}, function (error) {
            if (error) return console.warn("Failed to add language", language, error)
        });
    });

    done();
}

exports.dbName = 'hoodie-plugin-tarjomeh-languages';

module.exports = function (hoodie, done) {

    hoodie.database.findAll(function (error, databases) {
        if (error) return done(error);

        if (databases.indexOf(exports.dbName) == -1) {

            hoodie.database.add(exports.dbName, function (error, db) {
                if (error) return done(error);

                initialImport(db, function (error) {
                    if (error) return done(error);

                    db.grantPublicReadAccess(function (error) {
                        if (error) return done(error);
                    })
                });
            })
        }
    });

    done();
};
