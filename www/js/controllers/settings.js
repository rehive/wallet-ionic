angular.module('generic-client.controllers.settings', [])

    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ProfileImageUploadCtrl', function ($state, $stateParams, $window, $rootScope, $scope, $translate, Upload, Auth, API, $ionicLoading, $ionicPopup) {
        'use strict';

        $scope.image = {
           fileData: $stateParams.fileData,
           croppedFileData: ''
        };

        $scope.loadDone = function () {
            $ionicLoading.hide();
        };

        $scope.loadError = function () {
            $ionicLoading.hide();
            $ionicPopup.alert({title: $translate.instant("ERROR"), template: $translate.instant("RENDER_ERROR")});
        };

        $scope.upload = function () {
            if ($scope.image.fileData) {
                // Convert data URL to blob file
                Promise.resolve(Upload.dataUrltoBlob(($scope.image.croppedFileData || $scope.image.fileData), "file")).then(function(file) {
                    Upload.upload({
                        url: API + "/users/profile/",
                        data: {
                            profile: file
                        },
                        headers: {'Authorization': 'JWT ' + Auth.getToken()},
                        method: "PUT"
                    }).then(function (res) {
                        // Set user root scope
                        $rootScope.user.profile = res.data.data.profile;
                        $window.localStorage.setItem('user', JSON.stringify($rootScope.user));
                        $ionicLoading.hide();
                        $state.go('app.profile_image');
                    }, function (res) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: $translate.instant("UPLOAD_ERROR")});
                        $state.go('app.profile_image');
                    }, function (evt) {
                        $ionicLoading.show({
                            template: $translate.instant("LOADER_UPLOADING")
                        });
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                });
            }
        };
    })

    .controller('ProfileImageCtrl', function ($state, $scope, $ionicLoading, $ionicPopup, $cordovaFileTransfer, $cordovaCamera, $translate, $timeout) {
        'use strict';

        $scope.getFromFiles = function (file) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_PROCESSING")
            });

            // Convert to Data URL
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                $timeout(function() {
                    $state.go('app.profile_image_upload', {
                        fileData: evt.target.result
                    });
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.getFile = function () {
            'use strict';
            if (ionic.Platform.isWebView()) {
                ionic.Platform.ready(function(){
                    var cameraOptions = {
                        quality: 75,
                        allowEdit: false,
                        destinationType: Camera.DestinationType.DATA_URL,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
                        var file = "data:image/jpeg;base64," + imageData.replace(/(\r\n|\n|\r)/gm, '');

                        $state.go('app.profile_image_upload', {
                            fileData: file
                        });
                    });
                });
            } else {
                document.getElementById('upload').click();
            }
        };
    })

    .controller('PersonalDetailsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, PersonalDetails, Countries, Languages) {
        'use strict';

        $scope.countries = Countries.list();
        $scope.languages = Languages.list();

        $scope.refreshData = function () {
            var getPersonalDetails = PersonalDetails.get();

            getPersonalDetails.success(
                function (res) {
                    $scope.data = {
                        "first_name": res.data.first_name,
                        "last_name": res.data.last_name,
                        "id_number": res.data.id_number,
                        "nationality": res.data.nationality,
                        "language": res.data.language
                    };
                }
            );

            getPersonalDetails.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SAVING")
            });

            if (form.$valid) {
                PersonalDetails.create(form.first_name.$viewValue,
                    form.last_name.$viewValue,
                    form.id_number.$viewValue,
                    form.nationality.$viewValue,
                    form.language.$viewValue).then(function (res) {
                        if (res.status === 200) {
                            $ionicLoading.hide();
                            $translate.use(res.data.data.language);
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                        $ionicLoading.hide();
                    });

                $state.go('app.personal_details', {});
            }
        };
        $scope.refreshData();
    })

    .controller('AddressCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, Address) {
        'use strict';

        $scope.refreshData = function () {
            var getAddress = Address.get();

            getAddress.success(
                function (res) {
                    $scope.data = res.data;
                }
            );

            getAddress.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SAVING")
            });

            if (form.$valid) {
                Address.create(form.line_1.$viewValue,
                    form.line_2.$viewValue,
                    form.city.$viewValue,
                    form.state_province.$viewValue,
                    form.country.$viewValue,
                    form.postal_code.$viewValue).then(function (res) {

                    if (res.status === 200) {
                        $ionicLoading.hide();
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }
        };

        $scope.refreshData();
    })

    .controller('BankAccountCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, $translate, BankAccount) {
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
                template: $translate.instant("LOADER_ADDING")
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
                                $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                            }
                        }).catch(function (error) {
                            $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
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
                                $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                            }
                        }).catch(function (error) {
                            $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                            $ionicLoading.hide();
                        });
                    $state.go('app.list_bank_accounts', {});
                }
            }
        };
        $scope.listData();
    })

    .controller('BitcoinWithdrawalAccountCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, $translate, BitcoinWithdrawalAccount) {
        'use strict';

        var accId = $stateParams['accId'];

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
                template: $translate.instant("LOADER_ADDING"),
            });

            if (accId) {
                if (form.$valid) {

                    BitcoinWithdrawalAccount.update(accId, form.address.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
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
                            $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                        $ionicLoading.hide();
                    });

                }
            }
            $state.go('app.list_bitcoin_withdrawal_accounts', {});
        };
        $scope.listData();
    })

    .controller('EmailCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, Email, CompanyDetails) {
        'use strict';

        $scope.list = function () {
            Email.list().success(
                function (res) {
                    $scope.emails = res.data;
                }
            );
        };

        $scope.create = function (form) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_ADDING")
            });

            if (form.$valid) {
                Email.create(form.email_address.$viewValue, false).then(function (res) {
                    if (res.status === 201) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("SUCCESS"), template: $translate.instant("VERIFICATION_SENT")});
                        $scope.list();
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }
        };

        $scope.update = function (email_id, primary) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_UPDATING")
            });

            Email.update(email_id, primary).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.delete = function (email_id) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_UPDATING")
            });

            Email.delete(email_id).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.resendVerification = function (email_address) {
            $ionicLoading.show({
                template: 'Sending...'
            });

            CompanyDetails.get().then(function (res) {
                Email.resendVerification(email_address, res.data.data.identifier).then(function (res) {
                    if (res.status === 200) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("SUCCESS"), template: $translate.instant("VERIFICATION_SENT")});
                        $scope.list();
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.list();
    })

    .controller('MobileCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, Mobile, CompanyDetails) {
        'use strict';

        $scope.list = function () {
            Mobile.list().success(
                function (res) {
                    $scope.mobiles = res.data;
                }
            );
        };

        $scope.create = function (form) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_ADDING")
            });

            if (form.$valid) {
                Mobile.create(form.mobile_number.$viewValue, false).then(function (res) {
                    if (res.status === 201) {
                        $ionicLoading.hide();
                        $state.go('app.verify_mobile', {});
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }
        };

        $scope.update = function (mobile_id, primary) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_UPDATING")
            });

            Mobile.update(mobile_id, primary).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.delete = function (mobile_id) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_UPDATING")
            });

            Mobile.delete(mobile_id).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.resendVerification = function (mobile_number) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SENDING")
            });

            CompanyDetails.get().then(function (res) {
                 Mobile.resendVerification(mobile_number, res.data.data.identifier).then(function (res) {
                    if (res.status === 200) {
                        $ionicLoading.hide();
                        $state.go('app.verify_mobile', {});
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });


        };

        $scope.list();
    })

    .controller('VerifyMobileCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, User) {
        'use strict';

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_VERIFYING")
            });

            if (form.$valid) {
                User.verify(form.otp.$viewValue).then(function (res) {
                    if (res.status === 200) {
                        $ionicLoading.hide();
                        $state.go('app.mobiles', {});
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }
        };
    })

    .controller('SecurityCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ChangePasswordCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, Password) {
        'use strict';

        $scope.submit = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: $translate.instant("LOADER_SAVING")
                });
                Password.update(form.old_password.$viewValue,
                    form.new_password.$viewValue,
                    form.confirm_password.$viewValue).then(function (res) {

                    if (res.status === 200) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("SUCCESS"), template: $translate.instant("PASSWORD_CHANGED")});
                        $state.go('app.security', {});
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                    $ionicLoading.hide();
                });
            }
        };
    })

    .controller('TwoFactorCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PinCtrl', function ($scope) {
        'use strict';
        $scope.pinList = [
            {text: $translate.instant("COMING_SOON"), checked: true},
        ];
    });

