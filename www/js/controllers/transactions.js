angular.module('generic-client.controllers.transactions', [])

    .controller('TransactionsCtrl', function ($scope, $state, $http, $window, $ionicModal, $ionicLoading, Transaction, Balance, Conversions) {
        'use strict';

        $scope.refreshData = function () {
            var getBalance = Balance.get();

            getBalance.success(
                function (res) {
                    $window.localStorage.setItem('myCurrency', JSON.stringify(res.data.currency));
                    console.log($window.localStorage.getItem("myCurrency"));
                    $scope.balance = Conversions.from_cents(res.data.balance);
                    $scope.currency = res.data.currency;

                    var getTransactions = Transaction.list();

                    getTransactions.success(
                        function (res) {
                            var items = [];

                            for (var i = 0; i < res.data.results.length; i++) {
                                res.data.results[i].id = i;
                                res.data.results[i].amount = Conversions.from_cents(res.data.results[i].amount);
                                items.push(res.data.results[i]);
                            }

                            $scope.items = items;
                            $window.localStorage.setItem('myTransactions', JSON.stringify(items));
                            $scope.nextUrl = res.data.next;
                            $scope.$broadcast('scroll.refreshComplete');
                        }
                    );

                }
            );

            getBalance.catch(function (error) {

            });
        };

        $scope.loadMore = function () {
            if ($scope.nextUrl) {
                $http.get($scope.nextUrl).success(
                    function (res) {

                        for (var i = 0; i < res.data.results.length; i++) {
                            res.data.results[i].id = i;
                            res.data.results[i].amount = Conversions.from_cents(res.data.results[i].amount);
                            $scope.items.push(res.data.results[i]);
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
    });
