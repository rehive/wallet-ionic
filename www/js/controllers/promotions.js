angular.module('generic-client.controllers.promotions', [])

    .controller('PromotionCodeCtrl', function ($scope, $state) {
        'use strict';
    })

    .controller('PromotionRedeemCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (promotion_code) {
            $state.go('app.promotion_success', {
                promotion_code: $scope.data.promotion_code
            });
        };
    })

    .controller('PromotionSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.promotion_code;
    });