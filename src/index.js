import Style from './style.js'

import BindHtmlCompile from './bind-html-compile/bind-html-compile'
import securityEmbedded from './security-embedded/security-embedded'

import UserDirective from './tabs/user-and-organization/user-and-organization'
import UserService from './tabs/user-and-organization/user-service'
import AngularUiTree from 'angular-ui-tree'

const MODULE_NAME = 'gumga.securityEmbedded';

const security = angular.module(MODULE_NAME, ['ngSanitize', 'ui.bootstrap', AngularUiTree]);

security.directive('bindHtmlCompile', BindHtmlCompile)
security.directive('securityEmbeddedUser', UserDirective)
security.directive('securityEmbedded', securityEmbedded)

security.service('SecurityEmbeddedUserService', UserService)

security.run(['$window', ($window) => {
    $window.securityEmbedded = {};
}])


export default security.name;
