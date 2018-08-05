const mongoose = require('mongoose');

let BrewerySchema = new mongoose.Schema(
    {
        name: String,
        city: String,
        tap_list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Beer'
            }
        ],
        all_beers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Beer'
            }
        ]
    }
);

BrewerySchema.methods.addBeer = function(beer) {
    this.all_beers.push(beer);
    return this.save();
}

BrewerySchema.methods.addToTap = function(beer) {
    if(this.tap_list.indexOf(beer) === -1) 
    {
        this.tap_list.push(beer);
    }

    return this.save();
}

BrewerySchema.methods.removeFromTap = function(beer) {
    const toRemove = this.tap_list.indexOf(beer);
    if(toRemove > -1)
    {
        this.tap_list.splice(toRemove, 1);
    }

    return this.save();
}

module.exports = mongoose.model('Brewery', BrewerySchema);