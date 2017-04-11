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
            //
        }
    },
    init :function() {
        this.getView().query('main-lessons')[0].getStore().filter('userID', 'user1');
        
        var firstItem = this.getView().query('main-lessons')[0];
            firstItem.store.load(function(records, operation, success){
            firstItem.getSelectionModel().select(0, true);
        })
    },
    onNameClick: function(record, node){
        var userID = node.data.userID;
        var isLeaf =node.isLeaf()
        if(isLeaf){
            var firstItem = this.getView().query('main-lessons')[0];
            firstItem.store.load(function(records, operation, success){
                firstItem.getSelectionModel().select(0, true);
                })
            this.getView().query('main-lessons')[0].getStore().filter('userID',userID);
            }
        }
  });
