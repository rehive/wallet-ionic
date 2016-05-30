angular.module('generic-client.controllers.transactions', [])

    .controller('TransactionsCtrl', function ($scope, $ionicModal, $state, $http, $window, Transaction, Balance, $ionicLoading, $rootScope) {
        'use strict';
        $rootScope.refreshData = function () {
            $ionicLoading.show({template: 'Loading...'});
            var getBalance = Balance.get();

            getBalance.success(
                function (response) {
                    $ionicLoading.hide();
                    $scope.balance = response.data.results.balance;
                    $scope.currencySymbol = response.data.results.currency.symbol;
                }
            );

            getBalance.catch(function (error) {
                $ionicLoading.hide();
            });

            if ($window.localStorage.myTransactions) {
                $ionicLoading.show({template: 'Loading...'});
                $scope.items = JSON.parse($window.localStorage.myTransactions);
            }

            Transaction.query().success(
                function (response) {

                    var items = [];

                    for (var i = 0; i < response.data.results.length; i++) {
                        var date = new Date(response.data.results[i].meta.created_timestamp);
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                        var amount = response.data.results[i].amount
                        var amount_round = Math.round(amount * 100) / 100;

                        items[i] = {
                            'id': i,
                            'type': response.data.results[i].tx_type,
                            'code': response.data.results[i].tx_code,
                            'note': response.data.results[i].note,
                            'status': response.data.results[i].status,
                            'counterparty': response.data.results[i].counterparty,
                            'amount': amount_round.toFixed(2),
                            'fee': response.data.results[i].fee,
                            'balance': response.data.results[i].balance,
                            'account': response.data.results[i].account,
                            'date': date.getDate() + ' ' + months[date.getMonth()]
                        };

                        //items[i].receive = (items[i].description == 'Loan' || items[i].description == 'Received');
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myTransactions', JSON.stringify(items));
                    $scope.nextUrl = response.data.next;
                });
        };

        $scope.loadNext = function () {
            if ($scope.nextUrl && viewedUrls.indexOf($scope.nextUrl) < 0) {
                viewedUrls.push($scope.nextUrl);
                $http.get($scope.nextUrl).success(
                    function (response) {
                        for (var i = 0; i < response.data.results.length; i++) {
                            $scope.items.push({
                                'txType': response.data.results[i].tx_type,
                                'description': response.data.results[i].description,
                                'amount': response.data.results[i].amount
                            });
                        }

                        $scope.nextUrl = response.data.next;
                    }
                );
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$ionicView.afterEnter', function () {
            $rootScope.refreshData();
        });

        $scope.pay_to = function (amount) {
            $state.go('app.pay', {
                amount: amount
            });
        };

        $scope.request_from = function (amount) {
            $state.go('app.request', {
                amount: amount
            });
        };
    });
