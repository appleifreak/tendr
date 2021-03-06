// Generated by CoffeeScript 1.3.3
(function() {
  var SimpleCache, caterpillar, color, crypto, logger, nconf, opts, _,
    __slice = [].slice;

  _ = require('underscore');

  /* opts()
  */


  opts = module.exports.opts = function(options, defaults) {
    if (!_.isObject(options)) {
      options = {};
    }
    if (!_.isObject(defaults)) {
      defaults = {};
    }
    return _.extend({}, defaults, options);
  };

  /* log()
  */


  nconf = require('nconf');

  caterpillar = require('caterpillar');

  color = caterpillar.cliColor;

  logger = new caterpillar.Logger();

  logger.setLevel(6);

  module.exports.log = function(lvl, msg) {
    var d, date, min, months, sec, _ref;
    if (typeof msg === 'undefined') {
      _ref = ["info", lvl], lvl = _ref[0], msg = _ref[1];
    }
    msg = _.chain(msg.split("\\`")).map(function(part) {
      return part.replace(/`(.*?)`/gi, function() {
        var $, o, s, _i;
        $ = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), o = arguments[_i++], s = arguments[_i++];
        return color.bgYellowBright($[1]);
      });
    }).value().join('`');
    d = new Date();
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    sec = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
    date = "" + (d.getDate()) + " " + months[d.getMonth()] + " " + (d.getHours()) + ":" + min + ":" + sec;
    if (nconf.get("debug")) {
      return logger.log(lvl, "" + (color.magenta(date)) + " " + (color.blue('[tendr]')) + " " + msg);
    }
  };

  /* md5()
  */


  crypto = require('crypto');

  module.exports.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  };

  /* SimpleCache Class
  */


  SimpleCache = (function() {

    function SimpleCache(options) {
      this.options = opts(options, {
        unique: false
      });
      this.cache = {};
    }

    SimpleCache.prototype.set = function(key, value) {
      if (this.options.unique || !_.has(this.cache, key)) {
        this.cache[key] = [];
      }
      return this.cache[key].push(value);
    };

    SimpleCache.prototype.get = function(key, index) {
      if (index == null) {
        index = 0;
      }
      if (_.isArray(this.cache[key])) {
        return this.cache[key][index];
      }
    };

    SimpleCache.prototype.all = function(key) {
      if (_.isArray(this.cache[key])) {
        return this.cache[key];
      }
    };

    SimpleCache.prototype.has = function(key) {
      return _.has(this.cache, key);
    };

    SimpleCache.prototype.remove = function(key, index) {
      if (_.isArray(this.cache[key])) {
        if (index != null) {
          return delete this.cache[key][index];
        } else {
          return delete this.cache[key];
        }
      }
    };

    SimpleCache.prototype.find = function(value) {
      var k;
      k = null;
      _.find(this.cache, function(vals, key) {
        if (_.find(vals, function(val) {
          if (val === value) {
            return true;
          }
        })) {
          k = key;
          return true;
        }
      });
      return k;
    };

    return SimpleCache;

  })();

  module.exports.SimpleCache = SimpleCache;

}).call(this);
