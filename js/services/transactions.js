/*global Firebase, console, angular */
angular.module('generic-client.services.transactions', [])

    .service('Balance', function ($http, API) {
        'use strict';
        var self = this;
        self.get = function () {
            return $http.post(API + '/accounts/balance/');
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
            return $http.post(API + '/transactions/send/', {
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
            return $http.post(API + '/transactions/withdraw/', {
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
            return $http.get(API + '/transactions/deposit_details/');
        };
    });