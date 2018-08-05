const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String,
        saved_beers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Beer'
            }
        ],
        saved_breweries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Brewery'
            }
        ]
    }
);

UserSchema.methods.saveBeer = function(beer) {
    if(this.saved_beers.indexOf(beer) === -1)
    {
        this.saved_beers.push(beer);
    }

    return this.save();
};

UserSchema.methods.saveBrewery = function(brew) {
    if(this.saved_breweries.indexOf(brew) === -1) 
    {
        this.saved_breweries.push(brew);
    }
    
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);