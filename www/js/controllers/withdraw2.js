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

    .controller('WithdrawToCtrl', function ($scope, $state, $window, $stateParams, BitcoinWithdrawalAccount) {
        'use strict';
        $scope.items = [{'title': 'Bank account', 'account': 'bank_account'},
            {'title': 'Bitcoin address', 'account': 'bitcoin_account'}];
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.account = $stateParams.account;

        console.log($scope.account);

        if ($scope.account == 'bitcoin_account') {

            $scope.listData = function () {
                BitcoinWithdrawalAccount.list().success(
                    function (res) {
                        var items = [];

                        for (var i = 0; i < res.data.length; i++) {
                            items.push(res.data[i]);
                            console.log(res.data[i])
                        }

                        $scope.items = items;
                        $window.localStorage.setItem('myBitcoinWithdrawalAccounts', JSON.stringify(items));
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                );

            };
            $scope.listData();
        }

        $scope.submit = function (amount, account) {

            var withdraw_dict = {
                amount: amount,
                account: account
            };

            var next = 'app.withdraw_to_bitcoin_account';

            if (account == 'bank_account') {
                next = 'app.withdraw_to_bank_account';
            }
            else if (account == 'bitcoin_account') {
                next = 'app.withdraw_to_bitcoin_account';
            }

            $state.go(next, withdraw_dict);
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