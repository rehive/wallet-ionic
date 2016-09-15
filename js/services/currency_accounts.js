/*global Firebase, console, angular */
angular.module('generic-client.services.currency_accounts', [])

    .service('CurrencyAccounts', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/accounts/tokens/');
        };

        self.set = function (reference, currency) {
            return $http.post(API + '/accounts/tokens/set/', {
                reference: reference,
                currency: currency
            });
        };
    })