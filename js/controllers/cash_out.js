angular.module('generic-client.controllers.cash_out', [])

   .controller('CashOutCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (amount) {
            $state.go('app.cash_out_to', {
                amount: $scope.data.amount
            });
        };
    })

    .controller('CashOutToCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.data.to = "FNB 543645"
        $scope.amount = $stateParams.amount;

        $scope.submit = function (amount, to) {
            $state.go('app.cash_out_confirm', {
                amount: amount,
                to: $scope.data.to
            });
        };
    })

    .controller('CashOutConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;

        $scope.submit = function (amount, to) {
            $state.go('app.cash_out_success', {
                amount: amount,
                to: to
            });
        };
    })

    .controller('CashOutSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;
    });