module.exports = require('./src').Archetype;

module.exports.Any = require('./src/symbols').Any;
module.exports.CastError = require('./src').CastError;
module.exports.Type = require('./src/type');
module.exports.matchType = require('./src/helpers/matchType');
module.exports.to = require('./src/to');
