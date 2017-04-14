/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Application.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
        }
    },
    init :function() {
        this.getView().query('main-lessons')[0].getStore().filter('userID', 'user1');    
        var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.getSelectionModel().selectionMode = "MULTI";
            lessonsGrid.store.load(function(records, operation, success){
            lessonsGrid.getSelectionModel().select(0, true); 
        })
    },
    selsectAllButton: function(){
        var lessonsGrid = this.getView().query('main-lessons')[0];
        lessonsGrid.selModel.selectionMode = "MULTI";
        lessonsGrid.getSelectionModel().selectAll(true);
    },
    unSelsectAllButton: function(){
        var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.getSelectionModel().deselectAll(true);
    },
    inverseSelections: function(records){
        var lessonsGrid = this.getView().query('main-lessons')[0];
        var quantityofElements = lessonsGrid.getSelectionModel().getStore().getCount()
       
        for (var i=0; i<=quantityofElements; i++){
                var isSelected = lessonsGrid.getSelectionModel().isSelected(i);
                if(isSelected==true){
                    lessonsGrid.getSelectionModel().deselect(i, true); 
                }else if(isSelected==false){
                    lessonsGrid.getSelectionModel().select(i, true)
                }
        }
    },
    clickOnItem: function (record) {
        var r = record;
        debugger
    },
    onNameClick: function(record, node){
        var userID = node.data.userID;
        var isLeaf =node.isLeaf()
        if(isLeaf){
            var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.store.load(function(records, operation, success){
                lessonsGrid.getSelectionModel().select(0, true);
                })
            this.getView().query('main-lessons')[0].getStore().filter('userID',userID);
            }
        }
  });
