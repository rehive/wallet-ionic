// Ionic Starter App
angular.module('generic-client', ['ionic',
    'intlpnIonic',
    'generic-client.controllers',
    'generic-client.controllers.account',
    'generic-client.controllers.transactions',
    'generic-client.services',
    'generic-client.services.account',
    'generic-client.services.transactions',
    'generic-client.filters'])

    .constant('API', 'https://app.zapgo.co/api/1')
    .constant('REFRESH_INTERVAL', 3000)

    .config(function ($httpProvider, $ionicConfigProvider, $compileProvider) {
        'use strict';
        //Switch off caching:
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('bottom');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|bitcoin):/);
        //Insert JWT token into all api requests:
        $httpProvider.interceptors.push('authInterceptor');
    })

    .run(function ($ionicPlatform, $rootScope, Auth, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(true);
                StatusBar.show();
            }
        });

        $rootScope.logout = function () {
            Auth.logout();
            $state.go('login');
        };
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //$httpProvider.interceptors.push('authInterceptor');
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                params: {
                    amount: null
                }
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            .state('app.transactions', {
                url: '/transactions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/transactions.html',
                        controller: 'TransactionsCtrl'
                    }
                }
            })

            .state('app.keypad', {
                url: '/keypad',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/keypad_pay_request.html',
                        controller: 'KeypadCtrl'
                    }
                }
            })


            .state('app.pay', {
                url: '/pay',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pay/pay.html',
                        controller: 'PayCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null
                }
            })


            .state('app.pay_to', {
                url: '/pay_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pay/pay_to.html',
                        controller: 'PayToCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })


            .state('app.pay_confirm', {
                url: '/pay_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pay/pay_confirm.html',
                        controller: 'PayConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })


            .state('app.pay_success', {
                url: '/pay_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pay/pay_success.html',
                        controller: 'PaySuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    to: null
                }
            })


            .state('app.request', {
                url: '/request',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/request.html',
                        controller: 'RequestCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null
                }
            })


            .state('app.request_from', {
                url: '/request_from',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/request_from.html',
                        controller: 'RequestFromCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })


            .state('app.request_confirm', {
                url: '/request_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/request_confirm.html',
                        controller: 'RequestConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })


            .state('app.request_success', {
                url: '/request_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/request/request_success.html',
                        controller: 'RequestSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    note: null,
                    from: null
                }
            })


            .state('app.cash_in', {
                url: '/cash_in',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cash_in.html',
                        controller: 'FundCtrl'
                    }
                }
            })


            .state('app.cash_out', {
                url: '/cash_out',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cash_out/cash_out.html',
                        controller: 'CashOutCtrl'
                    }
                },
                params: {
                    amount: null
                }
            })


            .state('app.cash_out_to', {
                url: '/cash_out_to',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cash_out/cash_out_to.html',
                        controller: 'CashOutToCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })


            .state('app.cash_out_confirm', {
                url: '/cash_out_confirm',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cash_out/cash_out_confirm.html',
                        controller: 'CashOutConfirmCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })


            .state('app.cash_out_success', {
                url: '/cash_out_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cash_out/cash_out_success.html',
                        controller: 'CashOutSuccessCtrl'
                    }
                },
                params: {
                    amount: null,
                    to: null
                }
            })


            .state('app.receive', {
                url: '/receive',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/receive.html',
                        controller: 'ReceiveCtrl'
                    }
                }
            })


            .state('app.help', {
                url: '/coming_soon',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/help.html',
                        controller: 'HelpCtrl'
                    }
                }
            })


            .state('app.fica', {
                url: '/fica',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/fica_requirements.html',
                        controller: 'FicaRequirementsCtrl'
                    }
                },
                params: {
                    type: null
                }
            })


            .state('app.fica_id', {
                url: '/fica_id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/fica_instructions_id.html',
                        controller: 'FicaIdCtrl'
                    }
                },
                params: {
                    type: null
                }
            })


            .state('app.fica_id_selfie', {
                url: '/fica_id_selfie',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/fica_instructions_id_selfie.html',
                        controller: 'FicaIdSelfieCtrl'
                    }
                },
                params: {
                    type: null
                }
            })


            .state('app.fica_proof_of_address', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/fica_instructions_proof_of_address.html',
                        controller: 'FicaProofOfAddressCtrl'
                    }
                },
                params: {
                    type: null
                }
            })


            .state('app.fica_camera_upload', {
                url: '/fica_proof_of_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fica/fica_camera_upload.html',
                        controller: 'FicaCameraUploadCtrl'
                    }
                },
                params: {
                    type: null,
                    file: null
                }
            })


            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/notifications.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })


            .state('app.promotion_code', {
                url: '/promotion_code',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotion/promotion_code.html',
                        controller: 'PromotionCodeCtrl'
                    }
                }
            })


            .state('app.promotion_redeem', {
                url: '/promotion_redeem',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotion/promotion_redeem.html',
                        controller: 'PromotionRedeemCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })


            .state('app.promotion_success', {
                url: '/promotion_success',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotion/promotion_success.html',
                        controller: 'PromotionSuccessCtrl'
                    }
                },
                params: {
                    promotion_code: null
                }
            })


            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })


            .state('app.personal_details', {
                url: '/personal_details',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/personal_details.html',
                        controller: 'PersonalDetailsCtrl'
                    }
                },
                params: {
                    profile_picture: null,
                    username: null,
                    name: null,
                    surname: null,
                    nationality: null,
                    passport_id: null
                }
            })


            .state('app.email_address', {
                url: '/email_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/email_address.html',
                        controller: 'EmailAddressCtrl'
                    }
                },
                params: {
                    email_address: null
                }
            })


            .state('app.mobile_number', {
                url: '/mobile_number',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/mobile_number.html',
                        controller: 'MobileNumberCtrl'
                    }
                },
                params: {
                    mobile_number: null
                }
            })


            .state('app.list_addresses', {
                url: '/list_addresses',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/list_addresses.html',
                        controller: 'ListAddressesCtrl'
                    }
                }
            })


            .state('app.add_address', {
                url: '/add_address',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_address.html',
                        controller: 'AddAddressCtrl'
                    }
                }
            })


            .state('app.list_bank_accounts', {
                url: '/list_bank_accounts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/list_bank_accounts.html',
                        controller: 'ListBankAccountsCtrl'
                    }
                }
            })


            .state('app.add_bank_account', {
                url: '/add_bank_account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/add_bank_account.html',
                        controller: 'AddBankAccountCtrl'
                    }
                }
            })


            .state('app.security', {
                url: '/security',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/security.html',
                        controller: 'SecurityCtrl'
                    }
                }
            })


            .state('app.reset_password', {
                url: '/reset_password',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/reset_password.html',
                        controller: 'ResetPasswordCtrl'
                    }
                }
            })


            .state('app.two_factor', {
                url: '/two_factor',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/two_factor_instructions.html',
                        controller: 'TwoFactorCtrl'
                    }
                }
            })


            .state('app.pin', {
                url: '/pin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings/pin.html',
                        controller: 'PinCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });