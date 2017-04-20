// Ext.define('Application.view.main.EditUserForm',{
//     extend: 'Ext.form.Panel',
//     xtype: 'edit-form',
//     items: [
//         {
//             // xtype: 'textfield',
//             name: 'name',
//             label: 'Name'
//         },
//         {
//             // xtype: 'emailfield',
//             // name: 'email',
//             label: 'Email'
//         },
//         {
//             // xtype: 'passwordfield',
//             // name: 'password',
//             label: 'Password'
//         }
//     ]
// }),
Ext.define('Application.view.main.SchoolTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'main-schoolTree',
    title: 'School Tree',
    flex: 0.2,

    region: 'west',
    margin: '5 5 5 5', 
    listeners: {
        itemclick: 'onNameClick'
    },
     buttons: [
    {
        text:"Edit ",
        handler: 'editButton',
        // flex: 0.1,
        width: '150px',
        region: 'east'
     }],
    editing:true,
    store: {
            root: {
            text: 'School',
            expanded: true,
            expandable: false
    },
           proxy: {
            type: 'ajax',
            url : 'resources/school.json',
            reader: {
                type: 'json'
            },
        }
    }
});
