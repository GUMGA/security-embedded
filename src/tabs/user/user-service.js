export default function UserService($http, $window){
    const base = $window.securityEmbedded['appURL'];

    const service = {
      _url: base + '/api/user'
    };

    service.getUsersByOrganization = organizationId => {
      return $http.get(base+'/public/token/organization/'+organizationId+'/users');
    }

    service.getOrganization = organizationId => {
      return $http.get(base+'/public/token/organization/'+organizationId);
    }

    service.getUserByEmail = email => {
      return $http.get(base+'/api/security/user-by-email/'+email+'/')
    }

    return service;
}

UserService.$inject = ['$http', '$window'];
