Ext.define('LessonsModel', {

    extend: 'Ext.data.Model',
    fields: [ 'name', 'email', 'phone' ]

});

Ext.define('Application.view.main.Lessons', {
	renderTo: document.body,
	store: Ext.create('Ext.data.Store', {
			    model: 'LessonsModel',
			    proxy:{
			    	type: 'ajax',
			    	url: 'resources/lessons.json',
			    	reader: {
			    		type: 'json',
			    		rootProperty: 'data'
			    	}
			    },
			    autoLoad: true
			}),
    extend: 'Ext.grid.Panel',
    xtype: 'main-lessons',
    title:'Lessons',
	columns: [
		        {
		            text: 'Name',
		            dataIndex: 'lessons',
		            flex: .3
		        },
		        {
		            text: 'Email Address',  
		            dataIndex: 'score',
		            flex: .3
		           
		        },
		        {
		            text: 'Phone Number',   
		            dataIndex: 'needImprovement',
		            flex: .3
		        }
		    ],
    region: 'center',
   	flex: 0.8,

    margin: '5 5 5 5'
})