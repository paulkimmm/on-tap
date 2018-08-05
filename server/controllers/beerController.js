const Beer = require('./../models/Beer');
const User = require('./../models/User');
const Brewery = require('./../models/Brewery');

module.exports = {
    addBeer: (req, res, next) => {
        let { name, style, alc_percent, city, brewery, flavors, rating, description, on_tap } = req.body;

        saveBeer({ name, style, alc_percent, city, brewery, flavors, rating, description, on_tap });

        function saveBeer(obj) {
            new Beer(obj).save((err, beer) => {
                if(err)
                    res.send(err)
                else if(!beer)
                    res.send(400)
                else
                {
                    // Doesn't work REDO
                    return beer.addBrewery(req.body.brewery_id).then((_beer) => {
                        return res.send(_beer);
                    });
                }
            });
        }
    },

    getAll: (req, res, next) => {

        // REDO
        Beer.find(req.params.id)
        .populate('brewery').exec((err, beer) => {
            if(err)
                res.send(err)
            else if(!beer)
                res.send(404)
            else
                res.send(article)
            next();
        });
    },

    getBeer: (req, res, next) => {
        Beer.findById(req.params.id)
        .populate('brewery').exec((err, article) => {
            if(err)
                res.send(err)
            else if(!beer)
                res.send(404)
            else
                res.send(beer)
            next();
        });
    }
}