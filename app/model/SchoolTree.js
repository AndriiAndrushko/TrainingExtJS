Ext.define('Application.model.SchoolTree',{
	extend: 'Ext.data.Model',
	
		fields: [{
	                name: 'text',
	                type: 'string'
	            },
	            {
	                name: 'leaf',
	                type: 'bool'
	            }
		]
	
})