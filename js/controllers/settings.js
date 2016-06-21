angular.module('generic-client.controllers.settings', [])

    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PersonalDetailsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, PersonalDetails) {
        'use strict';

        $scope.refreshData = function () {
            var getPersonalDetails = PersonalDetails.get();

            getPersonalDetails.success(
                function (res) {
                    $scope.data = {
                        "first_name": res.data.first_name,
                        "last_name": res.data.last_name,
                        "email_address": res.data.email,
                        "id_number": res.data.id_number,
                        "nationality": res.data.nationality
                    };
                }
            );

            getPersonalDetails.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Saving Info...'
            });

            if (form.$valid) {

                PersonalDetails.create(form.first_name.$viewValue,
                    form.last_name.$viewValue,
                    form.email_address.$viewValue,
                    form.id_number.$viewValue,
                    form.nationality.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                $state.go('app.personal_details', {});
            }
        };
        $scope.refreshData();
    })

    .controller('MobileNumberCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"mobile_number": "+27842490903"};

        $scope.submit = function (mobile_number) {
            $state.go('app.profile', {
                mobile_number: $scope.data.mobile_number
            });
        };
    })

    .controller('EmailAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"email_address": "helghardt@gmail.com"};

        $scope.submit = function (email_address) {
            $state.go('app.profile', {
                email_address: $scope.data.email_address
            });
        };
    })

    .controller('AddressCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, Address) {
        'use strict';

        $scope.refreshData = function () {
            var getAddress = Address.get();

            getAddress.success(
                function (res) {
                    $scope.data = {
                        "line_1": res.data.line_1,
                        "line_2": res.data.line_2,
                        "city": res.data.city,
                        "state_province": res.data.state_province,
                        "country": res.data.country,
                        "code": res.data.postal_code
                    };
                }
            );

            getAddress.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Saving Address...'
            });

            if (form.$valid) {

                Address.create(form.line_1.$viewValue,
                    form.line_2.$viewValue,
                    form.city.$viewValue,
                    form.state_province.$viewValue,
                    form.country.$viewValue,
                    form.code.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                $scope.refreshData();
            }
        };
        $scope.refreshData();
    })

    .controller('BankAccountCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, BankAccount) {
        'use strict';

        var accId = $stateParams['accId'];

        $scope.listData = function () {
            BankAccount.list().success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.data.length; i++) {
                        items.push(res.data[i]);
                        console.log(res.data[i])
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myBankAccounts', JSON.stringify(items));
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.getData = function (accId) {
            var getBankAccount = BankAccount.get(accId);

            getBankAccount.success(
                function (res) {
                    $scope.data = {
                        "id": res.data.id,
                        "name": res.data.name,
                        "number": res.data.number,
                        "type": res.data.type,
                        "bank_name": res.data.bank_name,
                        "branch_code": res.data.branch_code,
                        "swift": res.data.swift,
                        "iban": res.data.iban,
                        "bic": res.data.bic
                    };
                }
            );

            getBankAccount.catch(function (error) {

            });
        };

        if (accId) {
            $scope.getData(accId);
        }

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Adding Bank Account...'
            });

            if (accId) {
                if (form.$valid) {

                    BankAccount.update(accId,
                        form.name.$viewValue,
                        form.number.$viewValue,
                        form.type.$viewValue,
                        form.bank_name.$viewValue,
                        form.branch_code.$viewValue,
                        form.swift.$viewValue,
                        form.iban.$viewValue,
                        form.bic.$viewValue).then(function (res) {

                            if (res.status === 200) {
                                $ionicLoading.hide();
                            } else {
                                $ionicLoading.hide();
                                $ionicPopup.alert({title: "Error", template: res.message});
                            }
                        }).catch(function (error) {
                            $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                            $ionicLoading.hide();
                        });
                    $state.go('app.list_bank_accounts', {});
                }
            }
            else {
                if (form.$valid) {

                    BankAccount.create(form.name.$viewValue,
                        form.number.$viewValue,
                        form.type.$viewValue,
                        form.bank_name.$viewValue,
                        form.branch_code.$viewValue,
                        form.swift.$viewValue,
                        form.iban.$viewValue,
                        form.bic.$viewValue).then(function (res) {

                            if (res.status === 201) {
                                $ionicLoading.hide();
                            } else {
                                $ionicLoading.hide();
                                $ionicPopup.alert({title: "Error", template: res.message});
                            }
                        }).catch(function (error) {
                            $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                            $ionicLoading.hide();
                        });
                    $state.go('app.list_bank_accounts', {});
                }
            }
        };
        $scope.listData();
    })

    .controller('BitcoinWithdrawalAccountCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, BitcoinWithdrawalAccount) {
        'use strict';

        var accId = $stateParams['accId'];

        $scope.listData = function () {
            BitcoinWithdrawalAccount.list().success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.length; i++) {
                        items.push(res[i]);
                        console.log(res[i])
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myBitcoinWithdrawalAccounts', JSON.stringify(items));
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.getData = function (accId) {
            var getBitcoinWithdrawalAccount = BitcoinWithdrawalAccount.get(accId);

            getBitcoinWithdrawalAccount.success(
                function (res) {
                    $scope.data = {
                        "id": res.data.id,
                        "address": res.data.address
                    };
                }
            );

            getBitcoinWithdrawalAccount.catch(function (error) {

            });
        };

        if (accId) {
            $scope.getData(accId);
        }

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Adding Bitcoin Address...'
            });

            if (accId) {
                if (form.$valid) {

                    BitcoinWithdrawalAccount.update(accId, form.address.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });
                }
            }
            else {
                if (form.$valid) {

                    BitcoinWithdrawalAccount.create(form.address.$viewValue).then(function (res) {

                        if (res.status === 201) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                }
            }
            $state.go('app.list_bitcoin_withdrawal_accounts', {});
        };
        $scope.listData();
    })

    .controller('SecurityCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ResetPasswordCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('TwoFactorCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PinCtrl', function ($scope) {
        'use strict';
        $scope.pinList = [
            {text: "Opening app", checked: true},
            {text: "Sending or requesting money", checked: true},
            {text: "Reset password", checked: true},
            {text: "Deposting or withdrawing", checked: true}
        ];
    });

