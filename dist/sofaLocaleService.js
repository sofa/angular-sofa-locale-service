/**
 * angular-sofa-locale-service - v0.1.0 - Tue Jan 06 2015 15:39:42 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
/**
 * @sofadoc overview
 * @name sofa.localeService
 * @package angular-sofa-locale-service
 * @distFile dist/sofaLocaleService.js
 *
 * @description
 * `sofa.localeService` Angular module.
 */
angular.module('sofa.localeService', [])

/**
 * @sofadoc service
 * @name sofa.localeService.localeService
 * @requires $window
 * @requires $exceptionHandler
 *
 * @description
 *
 * The `localeService` comes with a simple solution to provide and implement
 * l10n in an Angular app.
 */
.factory('localeService', ['$window', '$exceptionHandler', function ($window, $exceptionHandler) {

        'use strict';

        var self = {};

        self.translationData = {};

        /**
         * @sofadoc method
         * @name sofa.localeService.localeService#setTranslation
         * @memberof sofa.localeService.localeService
         *
         * @description
         *
         * Call this in your app's run phase to use your global translation object.
         *
         * @param {object} obj translation hash
         */
        self.setTranslationData = function (obj) {
            self.translationData = obj;
        };

        /**
         * @sofadoc method
         * @name sofa.localeService.localeService#getTranslation
         * @memberof sofa.localeService.localeService
         *
         * @description
         *
         * Call this in your app's run phase to use your global translation object.
         *
         * @param {string} path Path to translation
         * @param {bool} failSilent Doesn't throw error of `path` is not found and set to `true.
         */
        self.getTranslation = function (path, failSilent) {

            if (!path) {
                return self.translationData;
            }

            var objects = path.split('.');
            var locale  = '';
            var length  = objects.length;
            var ln      = self.translationData;

            objects.every(function (el, i) {
                try {
                    if (!ln[el]) {
                        if (!failSilent) {
                            throw new Error('No translation found for: "' + el + '"');
                        }
                    } else {
                        if (i + 1 !== length) {
                            ln = ln[el];
                            return true;
                        } else {
                            locale = ln[el];
                            return false;
                        }
                    }
                } catch (e) {
                    $exceptionHandler(e);
                }
            });

            return locale;
        };

        return self;
    }]);
}(angular));
