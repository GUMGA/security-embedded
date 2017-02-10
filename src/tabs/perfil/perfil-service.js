export default function PerfilService($http, $window){
    const service = {};

    const getParamsToken = () => {
        return {
          'gumgaToken' :  $window.securityEmbedded ? $window.securityEmbedded.getToken() : 0
        }
    }

    service.getInstance = () => {
      return $http.get($window.securityEmbedded['appURL'] + '/api/security-embedded/get-instance', {headers: getParamsToken()});
    }

    service.saveRole = (role) => {
      return $http.post($window.securityEmbedded['appURL'] + '/api/security-embedded/save-role', role, {headers: getParamsToken()});
    }

    return service;
}

PerfilService.$inject = ['$http', '$window'];
