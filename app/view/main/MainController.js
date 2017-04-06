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
    onTreeItemClick: function(record){
         debugger
        },
    changeScores: function(record, node) {
            var isLeaf =node.isLeaf();
            var text= node.data.text;
            var id = node.data.userID;
            var dinamicProp='data.'+id;
            if(isLeaf){
                this.getView().query('main-lessons')[0].getStore().getProxy().reader.config.rootProperty = dinamicProp;
                this.getView().query('main-lessons')[0].getStore().save();
                // console.log(isLeaf, text,id , this.getView().query('main-lessons')[0].getStore().getProxy().reader.config.rootProperty);       
            }
            console.log(this.getView().query('main-lessons')[0].getStore().getProxy().reader.config.rootProperty);
    }
});
