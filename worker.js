function initialImport(db, done) {
    console.log("Initialize languages for hoodie-plugin-tarjomeh-languages")

    var languages = ['persian', 'german', 'french', 'spanish', 'english'];

    languages.forEach(function (language) {
        db.add('language', {name: language}, function (error) {
            if (error) return console.warn("Failed to add language", language, error)
        });
    });

    done();
}

module.exports = function (hoodie, done) {
    exports.dbname = 'hoodie-plugin-tarjomeh-languages';

    hoodie.database.findAll(function (error, databases) {
        if (error) return done(error);

        if (databases.indexOf(dbName) == -1) {

            hoodie.database.add(dbName, function (error, db) {
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
