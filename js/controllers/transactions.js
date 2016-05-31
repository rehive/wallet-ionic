angular.module('generic-client.controllers.transactions', [])

    .controller('TransactionsCtrl', function ($scope, $ionicModal, $state, $http, $window, Transaction, Balance, $ionicLoading, $rootScope) {
        'use strict';
        $scope.refreshData = function () {
            var getBalance = Balance.get();

            getBalance.success(
                function (res) {
                    //$scope.balance = res.data.results.balance;
                    //$scope.currencySymbol = res.data.results.currency.symbol;
                }
            );

            getBalance.catch(function (error) {
            
            });

            Transaction.query().success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.data.results.length; i++) {
                        res.data.results[i].id = i;
                        res.data.results[i].amount = parseFloat(res.data.results[i].amount).toFixed(2);
                        items.push(res.data.results[i]);
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myTransactions', JSON.stringify(items));
                    $scope.nextUrl = res.data.next;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.loadNext = function () {
            if ($scope.nextUrl && viewedUrls.indexOf($scope.nextUrl) < 0) {
                viewedUrls.push($scope.nextUrl);
                $http.get($scope.nextUrl).success(
                    function (res) {
                        for (var i = 0; i < res.data.results.length; i++) {
                            res.data.results[i].id = i;
                            res.data.results[i].amount = parseFloat(res.data.results[i].amount).toFixed(2);
                            items.push(res.data.results[i]);
                        }

                        $scope.nextUrl = res.data.next;
                    }
                );
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$ionicView.afterEnter', function () {
            if ($window.localStorage.myTransactions) {
                $scope.items = JSON.parse($window.localStorage.myTransactions);
            }    

            $scope.refreshData();
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
