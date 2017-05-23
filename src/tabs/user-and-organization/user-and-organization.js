let TEMPLATE = `
  <div class="row security-embedded">

    <div class="col-xs-12" ng-show="view == 'list-orgs'">
      <div class="gmd panel panel-default">
        <div class="gmd panel-body">
        <ol class="gmd breadcrumb breadcrumb-security-embedded">
          <li><a ng-click="alterView('list-orgs')">Listagem de organizações</a></li>
        </ol>
        <div class="row">
          <div class="col-xs-12">
            <div class="row">
                <div class="col-md-12">
                    <div ng-show="organizationMessage" align="center">
                      <label ng-show="organizationMessage.status == 'error'" class="text text-danger">{{organizationMessage.message}}</label>
                      <br/>
                      <button ng-show="organizationMessage.status == 'error'" ng-click="getOrganization()" class="gmd btn btn-primary">Tentar novamente</button>
                      <label ng-show="organizationMessage.status == 'loading'" class="text text-muted">{{organizationMessage.message}}</label>
                    </div>                    
                    <div ui-tree="vm.treeOptions" data-max-depth="1" id="tree-root" class="angular-ui-tree">
                    
                        <ol ui-tree-nodes ng-model="organizations"
                            class="angular-ui-tree-nodes">
                            <li ui-tree-node class="angular-ui-tree-node" data-nodrag ng-repeat="org in organizations"
                                ng-include="'nodes_render.html'">
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <script type="text/ng-template" id="nodes_render.html">
            <div ui-tree-handle class="tree-node tree-node-content" style="padding: 3px;position:relative;">
                <a class="btn" data-nodrag ng-click="myToggle(this)"
                   style="background: transparent;border: none;padding: 12px;"
                   ng-init="initCollapsed(this, obj.subs == null)">
                    <span class="ui-tree-button-arrow">

                        <svg version="1.1"
                          ng-show="collapsed"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px" y="0px"
                          width="10px" height="10px"
                          viewBox="0 0 306 306"
                          style="enable-background:new 0 0 306 306;margin-top: 5px;" xml:space="preserve">
                          <g>
                            <g id="chevron-right">
                              <polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153" style="fill: #54545a;"/>
                            </g>
                          </g>
                        </svg>

                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                           ng-show="!collapsed"
                           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        	 width="10px" height="10px" viewBox="0 0 306 306"
                           style="enable-background:new 0 0 306 306;margin-top: 5px;" xml:space="preserve">
                        <g>
                        	<g id="expand-more">
                        		<polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35"  style="fill: #54545a;"/>
                        	</g>
                        </g>
                        </svg>

                    </span>
                </a>
                <span class="text-muted" ng-click="editOrg(org)" style="height: 100%;padding-top: 13px;position: absolute;">{{org.name}}</span>

                <button type="button" class="pull-right "
                        style="padding: 2px 6px;background: transparent;border: none;margin-top: 3px;outline: none;height: 42px;width: 40px;"
                        ng-disabled="!removable(obj) && obj.id" data-nodrag
                        ng-click="newOrg(this.$modelValue, this);">
                        <span class="qs" style="position:absolute;">
                            <span class="popover above">Adicionar organização</span>
                        </span>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      	  viewBox="0 0 512 512"
                         style="enable-background:new 0 0 80.13 80.13;" xml:space="preserve">
                          <g>
                          <path d="M0,512h256V0H0V512z M160,64h64v64h-64V64z M160,192h64v64h-64V192z M160,320h64v64h-64V320z M32,64h64v64H32V64z M32,192
  h64v64H32V192z M32,320h64v64H32V320z M288,160h224v32H288V160z M288,512h64V384h96v128h64V224H288V512z" style="fill: #54545a;"/>
                          </g>
                        </svg>
                </button>

                <button type="button" class="pull-right "
                        style="padding: 2px 6px;background: transparent;border: none;margin-top: 3px;outline: none;height: 42px;width: 40px;"
                        ng-disabled="!removable(obj) && obj.id" data-nodrag
                        ng-click="listUsers(this.$modelValue);">
                        <span class="qs" style="position:absolute;">
                            <span class="popover above">Usuários</span>
                        </span>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      	  viewBox="0 0 80.13 80.13"
                         style="enable-background:new 0 0 80.13 80.13;" xml:space="preserve">
                          <g>
                          	<path d="M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112
                          		c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984
                          		c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984
                          		z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263
                          		c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833
                          		C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088
                          		c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699
                          		C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276
                          		c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752
                          		C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032
                          		c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265
                          		c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z"  style="fill: #54545a;"/>
                          </g>
                        </svg>
                </button>

                <div class="clearfix"></div>
            </div>

            <ol ui-tree-nodes ng-class="{hidden: collapsed}" ng-model="org.subOrganizations"
                class="angular-ui-tree-nodes">
                <li ui-tree-node class="angular-ui-tree-node" ng-repeat="org in org.subOrganizations"
                    ng-include="'nodes_render.html'" collapsed="true">
                </li>
            </ol>

        </script>

      </div>
      </div>
    </div>

    <div class="col-xs-12" ng-show="view == 'list-users'">
        <div class="gmd panel panel-default">
          <div class="panel-body">
            <ol class="breadcrumb breadcrumb-security-embedded">
              <li><a ng-click="alterView('list-orgs')">Listagem de organizações</a></li>
              <li><a ng-click="alterView('list-users')">Listagem de usuários : {{variables.organizationSelected.name}}</a></li>
            </ol>

            <div ng-show="usersMessage" align="center">
              <label ng-show="usersMessage.status == 'error'" class="text text-danger">{{usersMessage.message}}</label>
              <br/>
              <button ng-show="usersMessage.status == 'error'" ng-click="getUsersByOrganization(variables.organizationSelected.id)"
              class="gmd btn btn-primary">Tentar novamente</button>
              <label ng-show="usersMessage.status == 'loading'" class="text text-muted">{{usersMessage.message}}</label>
            </div>

            <div class="table-responsive">
              <div class="col-xs-12 col-sm-6 pull-left" style="padding: 0;">
                  <button class="gmd btn btn-primary" ng-click="addNewUser()">Novo usuário</button>
              </div>
              <div class="col-xs-12 col-sm-6 pull-right">
                  <input class="gmd form-control" placeholder="Pesquisar usuários" ng-model="filterUser"/>
              </div>
              <br/><br/>
              <table class="gmd table table-stripped table-hover" ng-show="!usersMessage">
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Status</th>
                    <th>Acões</th>
                  </tr>
                  <tr ng-repeat="user in users | filter:{name:filterUser}">
                    <td>{{user.name}}</td>
                    <td>{{user.login}}</td>
                    <td>{{user.status.value ? 'Ativo': 'Inativo'}}</td>
                    <td>
                      <button class="gmd btn btn-primary" ng-click="editUser(user)">
                        Editar
                      </button>
                      <button class="gmd btn btn-danger" ng-click="removeUserInOrganization(user)">
                        Remover
                      </button>
                    </td>
                  </tr>
              </table>
            </div>
          </div>
        </div>
    </div>

    <div class="col-xs-12" ng-show="view == 'edit-user' || view == 'new-user'">
        <div class="gmd panel panel-default">
          <div class="panel-body">

          <ol class="breadcrumb breadcrumb-security-embedded">
            <li><a ng-click="alterView('list-orgs')">Listagem de organizações</a></li>
            <li><a ng-click="alterView('list-users')">Listagem de usuários : {{variables.organizationSelected.name}}</a></li>
            <li><a >{{view == 'edit-user' ? 'Editando : ' : 'Novo usuário'}}  {{variables.userSelected.name}}</a></li>
          </ol>

          <div ng-show="userMessage" align="center">
            <label ng-show="userMessage.status == 'error'" class="text text-danger">{{userMessage.message}}</label>
            <br/>
            <button ng-show="userMessage.status == 'error'" ng-click="getUserByEmail(variables.userSelected.login)"
            class="gmd btn btn-primary">Tentar novamente</button>
            <label ng-show="userMessage.status == 'loading'" class="text text-muted">{{userMessage.message}}</label>
          </div>

          <div ng-show="user">
            <form>

              <div class="row">
                <div class="col-xs-12 col-md-4">
                    <label class="text-muted">E-mail</label>
                    <input class="gmd form-control" ng-model="user.login" ng-change="validateUser()" ng-model-options="{ debounce: 1000 }"/>
                </div>
                <div class="col-xs-12 col-md-4">
                    <label class="text-muted">Nome</label>
                    <input class="gmd form-control" ng-model="user.name"/>
                </div>
                <div class="col-xs-12 col-md-4">
                    <label class="text-muted">Código interno</label>
                    <input class="gmd form-control" ng-model="user.internalCode"/>
                </div>                
              </div>

              <div class="row" ng-show="view == 'new-user'">
                <br/>
                <div class="col-xs-12 col-md-6">
                    <label class="text-muted">Senha</label>
                    <input type="password" class="gmd form-control" ng-model="user.password"/>
                </div>
                <div class="col-xs-12 col-md-6">
                    <label class="text-muted">Confirme a senha</label>
                    <input type="password" class="gmd form-control" ng-model="user.confirmPassword"/>
                </div>
              </div>

              <div class="row" ng-show="perfis.length > 0">
                <div class="col-xs-12 col-md-6">
                  <br>
                  <label class="text-muted">Perfis</label>
                  <table class="gmd table table-bordered" style=" text-align: center;">
                     <tr>
                      <th>Descrição</th>
                      <th></th>
                     <tr>
                     <tr ng-repeat="perfil in perfis">
                      <td>{{perfil.description}}</td>
                      <td>
                        <button class="gmd btn btn-primary" ng-show="!perfil.exists" ng-disabled="perfil.disabled" ng-click="addUserInRole(perfil)">Adicionar</button>
                        <button class="gmd btn btn-danger"  ng-show="perfil.exists" ng-disabled="perfil.disabled" ng-click="removeUserInRole(perfil)">Remover</button>
                      </td>
                     <tr>
                  </table>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <hr>
                  <label ng-show="userExists && userExists.id" class="text text-danger">
                    O E-mail informado está sendo usado por outro usuário.
                    <button class="gmd btn btn-primary" ng-click="editUser(userExists)">Ver usuário</button>
                  </label>
                  <label class="text text-muted" ng-show="!userIsInTheOrganization()">
                    Esse usuário não está na organização {{variables.organizationSelected.name}}.
                    <button class="gmd btn btn-primary" ng-disabled="addingUser" ng-click="addUserInOrganization(variables.userSelected)">Adicionar</button>
                  </label>
                  <button
                    class="gmd btn btn-primary pull-right"
                    ng-disabled="disabledSaveUser
                    || (view == 'new-user' && (!user.password) || user.password != user.confirmPassword)"
                    ng-click="saveUser(user)">Salvar</button>
                </div>
              </div>

            </form>
          </div>

          </div>
        </div>
    </div>

    <div class="col-xs-12" ng-show="view == 'edit-org' || view == 'new-org'">
      <div class="gmd panel panel-default">
        <div class="panel-body">

          <ol class="breadcrumb breadcrumb-security-embedded">
            <li><a ng-click="alterView('list-orgs')">Listagem de organizações</a></li>
            <li><a ng-click="alterView('edit-org')">{{view == 'edit-org' ? 'Editando : ' : 'Nova organização'}}  {{organization.name}}</a></li>
          </ol>

          <div class="row">
            <div class="col-xs-12 col-sm-6">
                <label class="text-muted">Nome</label>
                <input class="gmd form-control" ng-model="organization.name"/>
            </div>
            <div class="col-xs-12 col-sm-6">
                <label class="text-muted">Código interno</label>
                <input class="gmd form-control" ng-model="organization.internalCode"/>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <hr>
              <button
                class="gmd btn btn-primary pull-right"
                ng-disabled="disabledSaveOrganization"
                ng-click="saveOrganization(organization)">Salvar</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
`;


const User = (SecurityEmbeddedUserService, $window) => {
    return {
        restrict : 'E',
        template: TEMPLATE,
        scope: {
        },
        link: (scope, elm, attrs) => {
            const ctrl = scope;
            ctrl.filterUser = '';
            ctrl.view = 'list-orgs';


            ctrl.alterView = view => {
                ctrl.view = view;
            }

            ctrl.variables = {
                organizationSelected: undefined,
                userSelected: undefined
            }

            ctrl.initCollapsed = function (obj, bool) {
                if (!bool) {
                    obj.$nodeScope.toggle();
                }
            };

            ctrl.myToggle = function (obj) {
                var value = obj.$nodeScope.$modelValue;
                obj.$nodeScope.toggle();
            };

            ctrl.getUsersByOrganization = (organizationId) => {
                ctrl.usersMessage = {
                    status: 'loading',
                    message: 'Buscando os usuários, aguarde um momento...'
                };
                SecurityEmbeddedUserService.getUsersByOrganization(organizationId)
                    .then(resp=>{
                        ctrl.users = resp.data;
                        delete ctrl.usersMessage;
                    }, error => {
                        ctrl.usersMessage = {
                            status: 'error',
                            message: 'Não conseguimos buscar os usuários, verifique suas permissões e tente novamente.'
                        };
                    })
            }

            ctrl.getOrganization = () => {
                ctrl.organizationMessage = {
                    status: 'loading',
                    message: 'Buscando sua organização, aguarde um momento...'
                };
                SecurityEmbeddedUserService.getOrganization($window.securityEmbedded.getOrganizationHierarchyCode())
                    .then(resp=>{
                        ctrl.organizations = [resp.data.data];
                        delete ctrl.organizationMessage;
                    }, error=>{
                        ctrl.organizationMessage = {
                            status: 'error',
                            message: 'Não conseguimos buscar as organizações, verifique suas permissões e tente novamente.'
                        };
                    });
            }

            ctrl.getUserByEmail = (email) => {
                ctrl.userMessage = {
                    status: 'loading',
                    message: 'Buscando o usuário, aguarde um momento...'
                };
                SecurityEmbeddedUserService.getUserByEmail(email)
                    .then(resp=>{
                        if(resp.data){
                            ctrl.user = resp.data;
                            ctrl.user.confirmPassword = angular.copy(ctrl.user.password);
                            delete ctrl.userMessage;
                        }else{
                            ctrl.userMessage = {
                                status: 'error',
                                message: 'Não conseguimos buscar o usuário, verifique suas permissões e tente novamente.'
                            };
                        }
                    }, error => {
                        ctrl.userMessage = {
                            status: 'error',
                            message: 'Não conseguimos buscar o usuário, verifique suas permissões e tente novamente.'
                        };
                    });
            }

            ctrl.getRolesByInstance = () => {
                SecurityEmbeddedUserService.getRolesByInstance()
                    .then(resp=>{
                        ctrl.perfis = [];
                        resp
                            .data
                            .forEach(function (data) {
                                var exists = data
                                        .users
                                        .filter(function (data) {
                                            return data.id === ctrl.variables.userSelected.id
                                        }).length > 0;

                                var role = {id: data.id, idUser: ctrl.variables.userSelected.id, description: data.name, exists: exists}
                                ctrl.perfis.push(role)
                            })
                    })
            }

            ctrl.removeUserInOrganization = user => {
                SecurityEmbeddedUserService.removeUserInOrganization(user.id, ctrl.variables.organizationSelected.hierarchyCode)
                    .then(resp=>{
                        ctrl.listUsers(ctrl.variables.organizationSelected);
                    })
            }

            ctrl.addUserInOrganization = user => {
                ctrl.addingUser = true;
                user.organizations.push(ctrl.variables.organizationSelected);
                SecurityEmbeddedUserService.saveUser(user)
                    .then(resp=>{
                        ctrl.editUser(user);
                        ctrl.addingUser = false;
                    }, (error) => {
                        ctrl.addingUser = false;
                    })
            }

            ctrl.addUserInRole = (perfil) => {
                perfil.disabled = true;
                SecurityEmbeddedUserService.addUserInRole(perfil.idUser, perfil.id)
                    .then(resp=>{
                        swal({
                            title: '',
                            type: 'success',
                            text: 'Usuário adicionado ao perfil com sucesso'
                        });
                        perfil.exists = true;
                        ctrl.getRolesByInstance();
                    }, error=>{
                        swal({
                            title: '',
                            type: 'error',
                            text: error.data.details
                        });
                        perfil.disabled = false;
                    })
            }

            ctrl.removeUserInRole = (perfil) => {
                perfil.disabled = true;
                SecurityEmbeddedUserService.removeUserInRole(perfil.idUser, perfil.id)
                    .then(resp=>{
                        swal({
                            title: '',
                            type: 'success',
                            text: 'Usuário removido do perfil com sucesso'
                        });
                        perfil.exists = true;
                        ctrl.getRolesByInstance();
                    }, error=>{
                        swal({
                            title: '',
                            type: 'error',
                            text: error.data.details
                        });
                        perfil.disabled = false;
                    })
            }

            ctrl.listUsers = organization => {
                ctrl.filterUser = '';
                delete ctrl.users;
                ctrl.alterView('list-users');
                ctrl.variables.organizationSelected = angular.copy(organization);
                ctrl.getUsersByOrganization(ctrl.variables.organizationSelected.id);
            }

            ctrl.editUser = user => {
                ctrl.perfis = [];
                delete ctrl.userExists;
                ctrl.disabledSaveUser = false;
                delete ctrl.user;
                ctrl.alterView('edit-user');
                ctrl.variables.userSelected = angular.copy(user);
                ctrl.getUserByEmail(ctrl.variables.userSelected.login);
                ctrl.getRolesByInstance();
            }

            ctrl.addNewUser = () => {
                ctrl.perfis = [];
                ctrl.disabledSaveUser = false;
                ctrl.user = {};
                ctrl.alterView('new-user');
                ctrl.variables.userSelected = angular.copy({});
            }

            ctrl.saveUser = user => {
                if(!user.id){
                    user.organizations = [ctrl.variables.organizationSelected];
                }
                SecurityEmbeddedUserService.saveUser(user)
                    .then(resp=>{
                        swal({
                            title: '',
                            type: 'success',
                            text: 'Usuario salvo com sucesso'
                        });

                        ctrl.filterUser = '';
                        delete ctrl.users;
                        ctrl.alterView('list-users');
                        ctrl.getUsersByOrganization(ctrl.variables.organizationSelected.id);
                    })
            }

            ctrl.validateUser = () => {
                ctrl.disabledSaveUser = true;
                delete ctrl.userExists;
                SecurityEmbeddedUserService.getUserByEmail(ctrl.user.login)
                    .then(resp=>{
                        if(resp.data && resp.data.id){
                            ctrl.userExists = resp.data;
                            return;
                        }
                        ctrl.disabledSaveUser = false;
                    }, error => {
                        ctrl.disabledSaveUser = false;
                    })
            }

            ctrl.userIsInTheOrganization = () => {
                var toReturn = true;

                if(ctrl.variables.userSelected && ctrl.variables.userSelected.id
                    && ctrl.variables.organizationSelected && ctrl.variables.userSelected.organizations){
                    toReturn = ctrl.variables.userSelected.organizations.filter(org=>{
                            return org.id == ctrl.variables.organizationSelected.id;
                        }).length > 0;
                }

                return toReturn;
            }

            ctrl.editOrg = organization => {
                ctrl.variables.organizationSelected = undefined;
                ctrl.organization = angular.copy(organization);
                ctrl.alterView('edit-org');
            }

            ctrl.newOrg = (organization, all) => {
                ctrl.variables.organizationSelected =  all.$parent.$modelValue;
                ctrl.organization = angular.copy({});
                ctrl.alterView('new-org');
                delete ctrl.disabledSaveOrganization;
            }

            ctrl.saveOrganization = organization => {

                organization.subOrganizations = organization.subOrganizations || [];
                ctrl.disabledSaveOrganization = true;
                //
                var promisse;
                if(ctrl.variables.organizationSelected){
                    organization.mainOrganization = {value: false};
                    ctrl.variables.organizationSelected.subOrganizations.push(organization);
                    promisse = SecurityEmbeddedUserService.saveOrganization(ctrl.organizations[0])
                } else {
                    promisse = SecurityEmbeddedUserService.saveOrganization(organization)
                }

                promisse
                  .then(resp=>{
                    ctrl.alterView('list-orgs');
                      swal({
                          title: '',
                          type: 'success',
                          text: 'Organização salva com sucesso'
                      });
                    ctrl.disabledSaveOrganization = false;
                    ctrl.getOrganization();
                  }, error=>{
                      ctrl.disabledSaveOrganization = false;
                      swal({
                          title: '',
                          type: 'error',
                          text: error.data.details
                      });
                  })
            }

            ctrl.getOrganization();

        }
    }
};

User.$inject = ['SecurityEmbeddedUserService', '$window'];

export default User;
