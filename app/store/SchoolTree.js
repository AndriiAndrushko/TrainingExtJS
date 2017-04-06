Ext.define('Application.store.SchoolTree', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.schoolTree',

    // fields: [
    //     'name', 'email', 'phone'
    // ],

    // data: { items: [
    //     { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
    //     { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
    //     { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
    //     { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
    // ]},

    // proxy: {
    //     type: 'memory',
    //     reader: {
    //         type: 'json',
    //         rootProperty: 'items'
    //     }
    // }
    // store: {
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

});
