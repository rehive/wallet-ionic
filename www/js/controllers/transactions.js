angular.module('generic-client.controllers.transactions', [])

    .controller('TransactionsCtrl', function ($scope, $ionicModal, $state, $http, $window, Transaction, Balance, $ionicLoading, $rootScope) {
        'use strict';
        $rootScope.refreshData = function () {
            $ionicLoading.show({template: 'Loading...'});
            var getBalance = Balance.get();
            getBalance.success(
                function (rawData) {
                    console.log('DATA!');
                    console.log(rawData);
                    $ionicLoading.hide();
                    $scope.balance = rawData.results.balance;
                    $scope.currencySymbol = rawData.results.currency.symbol;
                }
            );
            getBalance.catch(function (error) {
                console.log('caught');
                console.log(error);
                $ionicLoading.hide();
            });
            if ($window.localStorage.myTransactions) {
                $ionicLoading.show({template: 'Loading...'});
                $scope.items = JSON.parse($window.localStorage.myTransactions);
            }

            Transaction.query().success(
                function (rawData) {
                    console.log("raw data");
                    console.log(JSON.stringify(rawData));
                    var items = [];
                    console.log(rawData.results.length);
                    for (var i = 0; i < rawData.results.length; i++) {
                        var date = new Date(rawData.results[i].created_timestamp);
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var amount = rawData.results[i].amount
                        var amount_round = Math.round(amount * 100) / 100;
                        items[i] = {
                            'description': rawData.results[i].description,
                            'currency': rawData.results[i].currency.symbol,
                            'amount': amount_round.toFixed(2),
                            'id': i,
                            'date': date.getDate() + '  ' + months[date.getMonth()]
                        };
                        items[i].receive = (items[i].description == 'Loan' || items[i].description == 'Received');
                    }
                    $scope.items = items;
                    $window.localStorage.myTransactions = JSON.stringify(items);
                    $scope.nextUrl = rawData.next;
                    console.log(items);
                    console.log('URL');
                    console.log($scope.nextUrl);
                });
        };

        $scope.loadNext = function () {
            if ($scope.nextUrl && viewedUrls.indexOf($scope.nextUrl) < 0) {
                viewedUrls.push($scope.nextUrl);
                $http.get($scope.nextUrl).success(
                    function (rawData) {
                        for (var i = 0; i < rawData.results.length; i++) {
                            $scope.items.push({
                                'txType': rawData.results[i].tx_type,
                                'description': rawData.results[i].description,
                                'amount': rawData.results[i].amount
                            });
                        }
                        $scope.nextUrl = rawData.next;
                    }
                );
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$ionicView.afterEnter', function () {
            console.log('ENTER');
            $rootScope.refreshData();
        });

        $scope.pay_to = function (amount) {
            console.log(amount);
            $state.go('app.pay', {
                amount: amount
            });
        };

        $scope.request_from = function (amount) {
            console.log(amount);
            $state.go('app.request', {
                amount: amount
            });
        };

    });
