let TEMPLATE = `
  <div class="row security-embedded">

    <div class="col-xs-12" ng-if="view == 'list-role'">
      <div class="gmd panel panel-default">
        <div class="gmd panel-body">

          <ol class="gmd breadcrumb breadcrumb-security-embedded">
            <li><a ng-click="alterView('list-role')">Listagem de perfis</a></li>
          </ol>

          <div ng-if="listRoleMessage" align="center">
            <label ng-if="listRoleMessage.status == 'error'" class="text text-danger">{{listRoleMessage.message}}</label>
            <br/>
            <button ng-if="listRoleMessage.status == 'error'" ng-click="getRolesByInstance()" class="gmd btn btn-primary">Tentar novamente</button>
            <label ng-if="listRoleMessage.status == 'loading'" class="text text-muted">{{listRoleMessage.message}}</label>
          </div>

          <div class="row" ng-show="!listRoleMessage">
            <div class="col-xs-12 col-sm-6 pull-left">
                <button class="gmd btn btn-primary" ng-click="addRole()">Novo perfil</button>
            </div>
            <div class="col-xs-12 col-sm-6 pull-right">
                <input class="gmd form-control" placeholder="Pesquisar perfis" ng-model="filterRole"/>
            </div>
          </div>

          <div class="row" ng-if="perfis.length > 0" ng-show="!listRoleMessage">
              <div class="col-xs-12">
              <br>
              <table class="gmd table table-bordered table-hover">
                 <tr>
                  <th>Descrição</th>
                  <th></th>
                 <tr>
                 <tr ng-repeat="perfil in perfis | filter:{name:filterRole}">
                  <td>{{perfil.name}}</td>
                  <td>
                    <button class="gmd btn btn-primary" ng-click="editRole(perfil)">Editar</button>
                    <button class="gmd btn btn-danger"  ng-if="perfil.exists" ng-disabled="perfil.disabled" ng-click="removeUserInRole(perfil)">Remover</button>
                  </td>
                 <tr>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="col-xs-12" ng-if="view == 'new-role' || view == 'edit-role'">
      <div class="gmd panel panel-default">
        <div class="gmd panel-body">

          <ol class="gmd breadcrumb breadcrumb-security-embedded">
            <li><a ng-click="alterView('list-role')">Listagem de perfis</a></li>
            <li><a >{{view == 'edit-role' ? 'Editando : ' : 'Novo perfil'}} {{view == 'edit-role' ? role.name : ''}} </a></li>
          </ol>

          <div class="row">
            <div class="col-xs-12">
                <label class="text-muted">Nome</label>
                <input class="gmd form-control" placeholder="Qual nome desse perfil?" ng-model="role.name"/>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6">
                <br/>
                <label class="text-muted">Usuários</label>
                <div class="gmd panel panel-default">
                  <div class="panel-heading">
                    <input type="text" ng-model="userTypeHead"
                      typeahead-min-length="0"
                      typeahead-on-select="addUserInRole($item); userTypeHead = ''"
                      placeholder="Pesquise para adicionar"
                      typeahead-editable="false"
                      uib-typeahead="user as user.name for user in users | filter:$viewValue | limitTo:10 | orderBy: 'name'"
                      class="gmd form-control">
                  </div>
                  <div class="panel-body" style="max-height: 400px;overflow: auto;" id="security-embedded-user-especfications">
                  <table class="gmd table table-hover" ng-if="role.users.length > 0">
                    <tr>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                    <tr ng-repeat="user in role.users">
                      <td>{{user.name}}</td>
                      <td>
                        <button class="gmd btn btn-primary" ng-click="removeUserRole(user)">Remover</button>
                      </td>
                    </tr>
                  </table>
                  </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <script type="text/ng-template" id="customTemplate.html">
                  <a style="cursor:pointer;">
                      <span ng-bind-html="match.label | uibTypeaheadHighlight:query"></span><br/>
                      {{match.model.software.name}}
                  </a>
                </script>
                <br/>
                <label class="text-muted">Operações</label>
                <div class="gmd panel panel-default">
                  <div class="panel-heading">
                    <input type="text" ng-model="operationTypeHead"
                      typeahead-min-length="0"
                      typeahead-template-url="customTemplate.html"
                      typeahead-on-select="addOperationInRole($item); operationTypeHead = ''"
                      placeholder="Pesquise para adicionar"
                      typeahead-editable="false"
                      uib-typeahead="operation as operation.operation.name for operation in getOperations($viewValue) | limitTo:10 | orderBy: 'name'"
                      class="gmd form-control">
                  </div>
                  <div class="panel-body" style="max-height: 400px;overflow: auto;" id="security-embedded-role-especfications">
                  <table class="gmd table table-hover" ng-if="role.especifications.length > 0">
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                    <tr ng-repeat="especification in role.especifications">
                      <td>{{especification.operation.name}}</td>
                      <td>
                        <select ng-model="especification.type" class="gmd form-control">
                          <option value="ADD">Permitir</option>
                          <option value="REMOVE">Negar</option>
                        </select>
                      </td>
                      <td>
                        <button class="gmd btn btn-primary" ng-click="removeEspecificationRole(especification)">Remover</button>
                      </td>
                    </tr>
                  </table>
                  </div>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <hr>
              <button
                class="gmd btn btn-primary pull-right"
                ng-disabled="disabledSaveRole"
                ng-click="saveRole(role)">Salvar</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
`;


const Perfil = (SecurityEmbeddedPerfilService, SecurityEmbeddedUserService, $window, $timeout) => {
    return {
      restrict : 'E',
      template: TEMPLATE,
      scope: {
      },
      link: (scope, elm, attrs) => {
          const ctrl = scope;
          ctrl.view = 'list-role';
          ctrl.users = [];
          ctrl.operationsSpecification = [];

          ctrl.alterView = view => {
            ctrl.view = view;
          }

          // SecurityEmbeddedPerfilService.getInstance()
          //   .then(resp=>{
          //     console.log(resp)
          //   })

          ctrl.addOperationInRole = (operation) => {
            ctrl.role.especifications.push(
              {
                discriminator : 'op',
                type: 'ADD',
                operation: operation.operation
              }
            )
            var elem = document.getElementById('security-embedded-role-especfications');
            $timeout(()=>{
              var height = elem.scrollHeight;
              elem.scrollTop = height;
            }, 500);
          }

          ctrl.getRolesByInstance = () => {
              ctrl.listRoleMessage = {
                status: 'loading',
                message: 'Buscando os perfis, aguarde um momento...'
              };
              SecurityEmbeddedUserService.getRolesByInstance()
                .then(resp=>{
                  ctrl.perfis = resp.data;
                  delete ctrl.listRoleMessage;
                }, error => {
                  ctrl.listRoleMessage = {
                    status: 'error',
                    message: 'Não conseguimos buscar os perfis, verifique suas permissões e tente novamente.'
                  };
                })
          }

          ctrl.userByOrganization = (organizationId) => {
            SecurityEmbeddedUserService.getUsersByOrganization(organizationId)
              .then(resp=>{
                  ctrl.users = resp.data;
                  if(ctrl.view == 'edit-role'){
                    ctrl.role.users.forEach(u=>{
                      ctrl.users = ctrl.users.filter(user=>{
                        return user.id != u.id;
                      })
                    })
                  }
              })
          }

          ctrl.getInstance = () => {
            SecurityEmbeddedPerfilService.getInstance()
              .then(resp=>{
                $window.securityEmbedded['instance'] = resp.data;
              })
          }

          ctrl.addRole = () => {
            ctrl.getInstance();
            ctrl.disabledSaveRole = false;
            ctrl.alterView('new-role');
            ctrl.role = {
              instance: $window.securityEmbedded['instance'],
              users: [],
              especifications: []
            };
            ctrl.userByOrganization($window.securityEmbedded['instance'].organization.id)
            ctrl.getOperations();
          }

          ctrl.editRole = role => {
            ctrl.disabledSaveRole = false;
            ctrl.alterView('edit-role');
            ctrl.role = angular.copy(role);
            ctrl.userByOrganization($window.securityEmbedded['instance'].organization.id)
            ctrl.getOperations();
          }

          ctrl.addUserInRole = user => {
            ctrl.role.users.push(angular.copy(user));
            ctrl.users = ctrl.users.filter(us=>{
              return us.id != user.id;
            })
            var elem = document.getElementById('security-embedded-user-especfications');
            $timeout(()=>{
              var height = elem.scrollHeight;
              elem.scrollTop = height;
            }, 500);
          }

          ctrl.removeUserRole = user => {
            ctrl.users.push(angular.copy(user));
            ctrl.role.users = ctrl.role.users.filter(us=>{
              return us.id != user.id;
            })
          }

          ctrl.removeEspecificationRole = especification => {
            ctrl.role.especifications = ctrl.role.especifications.filter(esp=>{
              return esp.operation.id != especification.operation.id;
            })
          }

          const constainsInRole = (operation)=>{
              let exists = ctrl.role.especifications.filter(op=>{
                return op.operation.id == operation.id;
              }).length > 0;
              return exists;
          }

          ctrl.getOperations = ($viewValue) => {
              var operations = [];

              ctrl.role.instance.softwares
              .filter(software=>{
                return software.operations.length > 0;
              })
              .forEach(software=>{
                  software.operations.forEach(operation=>{
                    if((!$viewValue || operation.name.toLowerCase().indexOf($viewValue.toLowerCase()) != -1) && !constainsInRole(operation)){
                      operations.push({operation: operation, software: software})
                    }
                  })
              })

              return operations;
          }

          ctrl.saveRole = role => {
            var operationsEspecifications = [], ipEspecifications = [], timeEspecifications = [];

            role.especifications.forEach(especification=>{
                switch (especification.discriminator) {
                  case 'op':
                    operationsEspecifications.push(especification);
                    break;
                  case 'ip':
                    ipEspecifications.push(especification);
                    break;
                  case 'time':
                    timeEspecifications.push(especification);
                    break;
                  default:
                    operationsEspecifications.push(especification);
                }
            })
            ctrl.disabledSaveRole = true;
            SecurityEmbeddedPerfilService.saveRole(
              {
                role: role,
                operationsEspecifications: operationsEspecifications,
                ipEspecifications: ipEspecifications,
                timeEspecifications: timeEspecifications
              })
              .then(resp=>{
                delete ctrl.role;
                ctrl.alterView('list-role');
                ctrl.disabledSaveRole = true;
                ctrl.getRolesByInstance();
              }, error => {
                ctrl.disabledSaveRole = false;
              });
          }

          ctrl.getRolesByInstance();

      }
    }
};

Perfil.$inject = ['SecurityEmbeddedPerfilService', 'SecurityEmbeddedUserService', '$window', '$timeout'];

export default Perfil;
