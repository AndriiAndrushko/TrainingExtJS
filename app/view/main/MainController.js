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
    init :function(){
         Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
            expires : new Date(Ext.Date.now() + (1000*60*60*24*90)) // 90 days
        }));
        
        this.getView().query('main-lessons')[0].getStore().filter('userID', 'user1');  

        var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.getSelectionModel().selectionMode = "MULTI";
            lessonsGrid.store.load(function(records, operation, success){
            Ext.state.Manager.get('selectedItems').forEach(function(elem){
                lessonsGrid.getSelectionModel().select(elem, true)
            })
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
        var quantityofElements = lessonsGrid.getSelectionModel().getStore().getCount();
        for (var i=0; i<=quantityofElements; i++){
                var isSelected = lessonsGrid.getSelectionModel().isSelected(i);
                if(isSelected==true){
                    lessonsGrid.getSelectionModel().deselect(i, true); 
                }else if(isSelected==false){
                    lessonsGrid.getSelectionModel().select(i, true)
                }
        }
    },

    clickOnLesson: function (record) {
        var lessonsGrid = this.getView().query('main-lessons')[0];
        var selected = lessonsGrid.getSelectionModel().selected.length;
        var quantityofElements = lessonsGrid.getSelectionModel().getStore().getCount();
        var selectedItemsarray=[];
        for (var i=0; i<=quantityofElements; i++){
                var isSelected = lessonsGrid.getSelectionModel().isSelected(i);
                if(isSelected==true){
                   selectedItemsarray.push(i);
                }
        }
        Ext.state.Manager.set('selectedItems', selectedItemsarray);
    },

    onNameClick: function(record, node){
        var userID = node.data.userID;
        var isLeaf =node.isLeaf();
        if(isLeaf){
            var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.store.load(function(records, operation, success){
                lessonsGrid.getSelectionModel().select(0, true);
                })
            }
        }
  });
