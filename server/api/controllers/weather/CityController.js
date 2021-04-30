/**
 * CityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fetch = require('node-fetch');

module.exports = {
    fn: async (req, res) => {
        const name = req.param('name').toString();
        let cityName = await sails.helpers.formatName(name);
        const response = await fetch(sails.config.weatherApi.baseUrl +
            '?units=%2522metric%2522&q=' +
            cityName, {
            'method': 'GET',
            'headers': sails.config.weatherApi.headers
        });
        if (response.ok) {
            const data = await response.json();
            const result = await sails.helpers.wrapData(data);
            return res.send(result);
        } else {
            return res.status(404).send();
        }
    }
};

