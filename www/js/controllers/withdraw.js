angular.module('generic-client.controllers.withdraw', [])

   .controller('WithdrawCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.withdraw_to', {
                    amount: form.amount.$viewValue
                });
            }
        };
    })

    .controller('WithdrawToCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.data.to = "FNB 543645"
        $scope.amount = $stateParams.amount;

        $scope.submit = function (amount, to) {
            $state.go('app.withdraw_confirm', {
                amount: amount,
                to: $scope.data.to
            });
        };
    })

    .controller('WithdrawConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;

        $scope.submit = function (amount, to) {
            $state.go('app.withdraw_success', {
                amount: amount,
                to: to
            });
        };
    })

    .controller('WithdrawSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;
    });