import Style from './style.js'

import BindHtmlCompile from './bind-html-compile/bind-html-compile'
import securityEmbedded from './security-embedded/security-embedded'

import UserDirective from './tabs/user/user-directive'
import UserService from './tabs/user/user-service'
import AngularUiTree from 'angular-ui-tree'

const MODULE_NAME = 'gumga.securityEmbedded';

const security = angular.module(MODULE_NAME, ['ngSanitize', AngularUiTree]);

security.directive('bindHtmlCompile', BindHtmlCompile)
security.directive('securityEmbeddedUser', UserDirective)
security.directive('securityEmbedded', securityEmbedded)

security.service('SecurityEmbeddedUserService', UserService)

security.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push(function($q, $injector, $timeout) {
        return {
          'request': function(config) {
            config.headers['gumgaToken'] = window.securityEmbedded ? window.securityEmbedded.getToken() : 0;
            return config;
          },
          'responseError': function(rejection) {
            return $q.reject(rejection);
          }
        };
      })
}])

security.run(['$window', ($window) => {
    $window.securityEmbedded = {};
}])


export default security.name;
