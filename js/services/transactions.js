/*global Firebase, console, angular */
angular.module('generic-client.services.transactions', [])

    .service('Balance', function ($http, API) {
        'use strict';
        var self = this;
        self.get = function () {
            return $http.get(API + '/balance/');
        }
    })

    .service('Transaction', function ($http, API) {
        'use strict';
        var self = this;

        self.query = function () {
            return $http.get(API + '/transactions/');
        };

        self.get = function (txId) {
            return $http.get(API + '/transactions/' + txId + '/');
        };

        self.create = function (type, amount, currency) {
            return $http.post(API + '/transactions/', {
                'tx_type': type,
                'amount': amount,
                'currency': currency
            });
        }
    });