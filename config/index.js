'use strict';

var config = {

    dev: {
        mode: 'dev',
        port: 3000,
        secretjwt: 'structo',
        devuser:'johndoe',
        devpassword:'$2a$10$V3f.IUwLSgKdx/QCYsel6OdRdGUAw/tCynmPDgORyMbiu9Cb.tF9W',
        accesssTokenExpireJWTDuration: '2h',
        refreshTokenExpireJWTDuration: '1d',
        },
}

const getConfig = function(mode) {
    return config[mode || process.argv[2] || 'dev'] || config.dev;
};

module.exports.config = getConfig; 
