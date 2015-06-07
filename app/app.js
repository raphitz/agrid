
var module = angular.module("example", ["angularGrid"]);

module.controller("exampleCtrl", function($scope, $filter) {
    $scope.pendingView = true;

    var columnDefs = [
        {
            displayName: 'Pending',
            field: '',
            suppressSorting: true,
            suppressSizeToFit: true,
            templateUrl: './pending.icons.html',
            width: 92,
            headerCellRenderer: pendingHdr,
            headerTooltip: 'On/Off'
        },
        {
            displayName: 'Name', 
            field: 'name', 
            width: 180,
            suppressSizeToFit: true,
            cellStyle:  {'background-color': 'rgba(255, 255, 180, 0.5)'}
        },
        {
            displayName: 'Monday', 
            group: 'Weekly Editable Values',  
            field: 'mon', 
            newValueHandler: numberNewValueHandler, 
            editable: true,
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.data.mon, 1);
            },
            cellValueChanged: cellValueChangedFunction
        },
        {
            displayName: 'Tuesday',
            group: 'Weekly Editable Values',
            field: 'tue',
            newValueHandler: numberNewValueHandler,
            editable: true,
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.data.tue, 1);
            },
            cellValueChanged: cellValueChangedFunction
        },
        {
            displayName: 'Wednesday',
            group: 'Weekly Editable Values',
            field: 'wed',
            newValueHandler: numberNewValueHandler,
            editable: true,
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.data.wed, 1);
            },
            cellValueChanged: cellValueChangedFunction
        },
        {
            displayName: 'Thursday',
            group: 'Weekly Editable Values',
            field: 'thur',
            newValueHandler: numberNewValueHandler,
            editable: true,
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.data.thur, 1);
            },
            cellValueChanged: cellValueChangedFunction
        },
        {
            displayName: 'Friday',
            group: 'Weekly Editable Values',
            field: 'fri',
            newValueHandler: numberNewValueHandler,
            editable: true,
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.data.fri, 1);
            },
            cellValueChanged: cellValueChangedFunction
        },
        {
            displayName: 'Total',
            group: 'Volatile Summary',
            valueGetter: 'data.mon + data.tue + data.wed + data.thur + data.fri',
            volatile: true,
            cellStyle:  {'background-color': 'rgba(180, 255, 255, 0.5)'}, // light blue background
            cellClassRules: {
                'bold-and-red': 'x>20'
            },
            cellClass: 'text-right',
            cellRenderer: function(params) {
                return $filter('number')(params.value, 1);
            },
        },
        {
            displayName: 'Avg',
            group: 'Volatile Summary',
            valueGetter: '(data.mon + data.tue + data.wed + data.thur + data.fri) / 5',
            volatile: true,
            cellClass: 'text-right',
            cellStyle:  {'background-color': 'rgba(180, 255, 255, 0.5)'} // light blue background
        },
        {
            displayName: 'Total',
            group: 'Hard Summary',
            valueGetter: 'data.mon + data.tue + data.wed + data.thur + data.fri',
            cellClass: 'text-right',
            cellStyle:  {'background-color': 'rgba(255, 180, 255, 0.5)'}, // light red background
            cellClassRules: {
                'bold-and-red': 'x>20'
            }
        },
        {
            displayName: 'Avg',
            group: 'Hard Summary',
            valueGetter: '(data.mon + data.tue + data.wed + data.thur + data.fri) / 5',
            cellClass: 'text-right',
            cellStyle:  {'background-color': 'rgba(255, 180, 255, 0.5)'} // light red background
        }
    ];

    var unsorted = [
        {
            need_vote: true,
            has_comment: true,
            is_stale: true,
            is_watched: true,
            disbursement_issue: true,
            name: 'Katniss Everdeen',
            mon: 9,
            tue: 9,
            wed: 9,
            thur: 9,
            fri: 4
        },
        {
            need_vote: true,
            has_comment: false,
            is_stale: false,
            is_watched: false,
            disbursement_issue: true,
            name: 'Primrose Everdeen',
            mon: 5, 
            tue: 5, 
            wed: 5, 
            thur: 5, 
            fri: 5
        },
        {
            need_vote: false,
            has_comment: false,
            is_stale: true,
            is_watched: false,
            disbursement_issue: false,
            name: 'Gale Hawthorne',
            mon: 12,
            tue: 12,
            wed: 12,
            thur: 4, 
            fri: 0
        },
        {
            need_vote: false,
            has_comment: true,
            is_stale: false,
            is_watched: true,
            disbursement_issue: false,
            name: 'Peeta Mellark',
            mon: 8,
            tue: 8,
            wed: 8,
            thur: 8,
            fri: 8
        },
        {
            need_vote: false,
            has_comment: true,
            is_stale: false,
            is_watched: false,
            disbursement_issue: false,
            name: 'Haymitch Abernathy',
            mon: 4,
            tue: 4,
            wed: 4,
            thur: 4,
            fri: 4
        },
        {
            need_vote: true,
            has_comment: true,
            is_stale: true,
            is_watched: false,
            disbursement_issue: false,
            name: 'Effie Trinket',
            mon: 10,
            tue: 10,
            wed: 10,
            thur: 10,
            fri: 10
        },
        {
            need_vote: false,
            has_comment: false,
            is_stale: false,
            is_watched: false,
            disbursement_issue: true,
            name: 'Cinna',
            mon: 4,
            tue: 4,
            wed: 4,
            thur: 4,
            fri: 4
         },
        {
            need_vote: false,
            has_comment: false,
            is_stale: false,
            is_watched: true,
            disbursement_issue: false,
            name: 'Plutarch Heavensbee',
            mon: 8,
            tue: 8,
            wed: 8,
            thur: 8,
            fri: 8
        },
        {
            need_vote: false,
            has_comment: false,
            is_stale: false,
            is_watched: false,
            disbursement_issue: false,
            name: 'Finnick Odair',
            mon: 9,
            tue: 9,
            wed: 9,
            thur: 9,
            fri: 4
        },
        {
            need_vote: false,
            has_comment: false,
            is_stale: false,
            is_watched: false,
            disbursement_issue: false,
            name: 'Beetee',
            mon: 10,
            tue: 10,
            wed: 10,
            thur: 10,
            fri: 10
        },
        {
            need_vote: false,
            has_comment: false,
            is_stale: false,
            is_watched: false,
            disbursement_issue: false,
            name: 'President Alma Coin',
            mon: 3,
            tue: 3,
            wed: 3,
            thur: 3,
            fri: 0
        }
    ];

    var data = getSortedData($scope.pendingView, unsorted);

    function pendingHdr(params) {
        //console.log('before', params);
        if(params.context.pending_view){
            return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-exclamation-sign" ng-click="sortPending()" style="color:#006837;"></span></div>';
        } else {
            return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-exclamation-sign" ng-click="sortPending()" style="color:#aaaaaa;"></span></div>';
        }
    }

    $scope.sortPending = sortPending;

    $scope.gridOptions = {
        angularCompileRows: true,
        angularCompileHeaders: true,
        //rowData: data,
        columnDefs: columnDefs,
        colWidth: 100,
        groupHeaders: true,
        rowSelection: 'single',
        enableSorting: true,
        sortPending: sortPending,
        context: {
            pending_view: $scope.pendingView
        },
        ready: function(api) {
            api.setRows(data);
            //api.sizeColumnsToFit();
        }
    };

    $scope.onHardRefresh = function() {
        $scope.gridOptions.api.refreshView();
    };
    $scope.showSidebar = false;
    $scope.toggleSidebar = function() {
        $scope.showSidebar = !$scope.showSidebar;
    }

    //////////
    function getSortedData(state, collection) {
        var ds = [];
        if(state) {
            ds = _.sortByAll(collection, ['need_vote', 'has_comment', 'is_stale', 'is_watched', 'disbursement_issue', 'name']).reverse();
            //console.log('true', ds);
            return ds;
        } else {
            ds = _.sortByAll(collection, ['name']).reverse();
            //console.log('false', ds);
            return ds;
        }
    }
    function sortPending() {
        $scope.gridOptions.context.pending_view = !$scope.gridOptions.context.pending_view;

        var newData = getSortedData($scope.gridOptions.context.pending_view, unsorted);
        $scope.gridOptions.api.setRows(newData);
        $scope.gridOptions.api.refreshView();
        $scope.gridOptions.api.refreshHeader();
        $scope.gridOptions.api.onNewRows()
        return $scope.gridOptions.context.pending_view;
    }
    function numberNewValueHandler(params) {
        var valueAsNumber = parseInt(params.newValue);
        if (isNaN(valueAsNumber)) {
            window.alert("Invalid value " + params.newValue + ", must be a number");
        } else {
            params.data[params.colDef.field] = valueAsNumber;
        }
    }
    function cellValueChangedFunction() {
        // after a value changes, get the volatile cells to update
        $scope.gridOptions.api.softRefreshView();
    }
});
