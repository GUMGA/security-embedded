export default function UserService($http, $window) {
  const base = $window.securityEmbedded['appURL'];

  const service = {};

  const getParamsToken = () => {
    return {
      'gumgaToken': $window.securityEmbedded ? $window.securityEmbedded.getToken() : 0
    }
  }

  service.getUsersByOrganization = organizationId => {
    return $http.get(base + '/api/security-embedded/organization/' + organizationId + '/users', { headers: getParamsToken() });
  }

  service.getOrganization = organizationId => {
    return $http.get(base + '/api/security-embedded/organization/' + organizationId, { headers: getParamsToken() });
  }

  service.getUserByEmail = email => {
    return $http.get(base + '/api/security/user-by-email', {
      headers: getParamsToken(),
      params: {
        email: email
      }
    })
  }

  service.getRolesByInstance = () => {
    return $http.get(base + '/api/security/role-by-instance', { headers: getParamsToken() });
  }

  service.addUserInOrganization = function (idUser) {
    return $http.get(base + '/api/security/add-user-organization/' + idUser, { headers: getParamsToken() })
  }

  service.removeUserInOrganization = function (idUser, oi) {
    return $http.get(base + '/api/security/remove-user-organization/' + idUser + '/' + oi, { headers: getParamsToken() })
  }

  service.addUserInOrganization = function (idUser) {
    return $http.get(base + '/api/security/add-user-organization/' + idUser, { headers: getParamsToken() })
  }

  service.addUserInRole = (userId, roleId) => {
    return $http.get(base + '/api/security/add-user-role/' + userId + '/' + roleId, { headers: getParamsToken() });
  }

  service.removeUserInRole = (userId, roleId) => {
    return $http.get(base + '/api/security/remove-user-role/' + userId + '/' + roleId, { headers: getParamsToken() });
  }

  service.saveUser = user => {
    return $http.post(base + '/api/security-embedded/save-user', user, { headers: getParamsToken() });
  }

  service.saveOrganization = organization => {
    return $http.post(base + '/api/security-embedded/save-organization', organization, { headers: getParamsToken() });
  }

  return service;
}

UserService.$inject = ['$http', '$window'];
