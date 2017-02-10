import Style from './style.js'

import BindHtmlCompile from './bind-html-compile/bind-html-compile'
import securityEmbedded from './security-embedded/security-embedded'

import UserDirective from './tabs/user-and-organization/user-and-organization'
import PerfilDirective from './tabs/perfil/perfil'

import UserService from './tabs/user-and-organization/user-service'
import PerfilService from './tabs/perfil/perfil-service'

import AngularUiTree from 'angular-ui-tree'

const MODULE_NAME = 'gumga.securityEmbedded';

const security = angular.module(MODULE_NAME, ['ngSanitize', 'ui.bootstrap', AngularUiTree]);

security.directive('bindHtmlCompile', BindHtmlCompile)

security.directive('securityEmbedded', securityEmbedded)

security.directive('securityEmbeddedUser', UserDirective)
security.directive('securityEmbeddedPerfil', PerfilDirective)

security.service('SecurityEmbeddedUserService', UserService)
security.service('SecurityEmbeddedPerfilService', PerfilService)

security.run(['$window', ($window) => {
    $window.securityEmbedded = {};
}])


export default security.name;
