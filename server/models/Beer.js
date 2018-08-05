const mongoose = require('mongoose');

let BeerSchema = mongoose.Schema(
    {
        name: String,
        style: String,
        alc_percent: String,
        city: String,
        brewery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brewery'
        },
        flavors: [
            {
                flavor: String
            }
        ],
        rating: int,
        description: String,
        image: String,
        on_tap: boolean
    }
);

BeerSchema.methods.addBrewery = function(brewery_id) {
    this.brewery = brewery_id;
    return this.save();
}

BeerSchema.methods.onTap = function(beer) {
    if(this.on_tap == false)
        this.on_tap == true;
    else
        this.on_tap == false;
    return this.save();
}

module.exports = mongoose.model('Beer', BeerSchema);
