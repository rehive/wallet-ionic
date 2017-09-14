/*global Firebase, console, angular */
angular.module('generic-client.services.transactions', [])

    .service('Balance', function ($http, API) {
        'use strict';
        var self = this;
        self.get = function () {
            return $http.get(API + '/accounts/?active=true');
        }
    })

    .service('Transaction', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/transactions/');
        };

        self.get = function (txId) {
            return $http.get(API + '/transactions/' + txId + '/');
        };

        self.create = function (amount, note, to) {
            return $http.post(API + '/transactions/transfer/', {
                amount: amount,
                note: note,
                recipient: to
            });
        };
    })


    .service('Withdrawal', function ($http, API) {
        'use strict';
        var self = this;

        self.create = function (amount, reference) {
            return $http.post(API + '/transactions/debit/', {
                amount: amount,
                currency: '',
                account: '',
                note: '',
                reference: reference
            });
        };
    })


    .service('DepositDetails', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/company/bank-account/');
        };
    })


    .service('Conversions', function ($window) {
        'use strict';
        
        var self = this;

        self.from_cents = function (amount) {
            var currency = JSON.parse($window.localStorage.myCurrency);
            return parseFloat(amount/Math.pow(10, currency.divisibility)).toFixed(currency.divisibility);
        };

        self.to_cents = function (amount) {
            var currency = JSON.parse($window.localStorage.myCurrency);
            return parseFloat(amount*Math.pow(10, currency.divisibility)).toFixed(currency.divisibility);
        };
    });