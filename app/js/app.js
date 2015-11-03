(function () {

    'use strict';

    // Initialize module
    angular.module('recursive', [])
      .controller('RecursiveCtrl', recursiveCtrl)
      .directive('recurisveTable', recurisveTable);

    // Controller
    function recursiveCtrl($scope) {
        
        // Table Columns
        $scope.columns = [
            { title: 'Name', field: 'name' },
            { title: 'Address', field: 'address' },
            { title: 'Email Address', field: 'email' },
            { 
                title: 'Drawer', 
                drawer : { title: 'Open', action: rowDrawer }
            }
        ];
        
        // Table Content
        $scope.content = [
            { name: 'User One', address: '1 Street', email: 'one@email.com' },
            { name: 'User Two', address: '2 Street', email: 'two@email.com' },
            { name: 'User Three', address: '3 Street', email: 'three@email.com' }
        ];
        
        // Return New Column & Content for Drawer
        function rowDrawer(){
            return {
                // Drawer Columns
                columns: [
                    { title: 'Name', field: 'name' },
                    { title: 'Address', field: 'address' },
                    { title: 'Email Address', field: 'email' },
                    { 
                        title: 'Drawer', 
                        drawer : { title: 'Open', action: rowDrawer }
                    }
                ],
                // Drawer Content
                content: [
                    { name: 'Drawer One', address: '1 Street', email: 'one@email.com' },
                    { name: 'Drawer Two', address: '2 Street', email: 'two@email.com' },
                    { name: 'Drawer Three', address: '3 Street', email: 'three@email.com' }
                ]
            };
        }
        
    }

    // Recursive Table Directive
    function recurisveTable($compile, $timeout) {
        return {
            restrict: 'E',
            scope: {
                columns:'=',
                content:'='
            },
            templateUrl: 'table.template.html',
            link: function($scope, element, $attrs) {
                
                // Manage the drawer for this table
                $scope.drawer = {};
                
                // On toggle drawer
                $scope.toggle = function(column, row, ndx, $event) {
                    if(column.drawer){
                        
                        // Column callback (from ctrl columns)
                        var newTable = column.drawer.action();
                        
                        // Set the drawer
                        $scope.drawer.index = ndx;
                        $scope.drawer.columns = newTable.columns;
                        $scope.drawer.content = newTable.content;
                        
                        // Find the drawer and add the recursive table
                        var elem = angular.element($event.srcElement).parent().parent().next().find('td');
                        var tbl = '<recurisve-table columns="drawer.columns" content="drawer.content"></recursive-table>';
                        
                        // Recompile the element build directive
                        // $timeout not necessary, just to make clearer
                        $timeout(function(){
                            elem.html(tbl);
                            $compile(elem.contents())($scope.$new());                    
                        }, 500);

                    }
                };

            }
        };
    }
}());