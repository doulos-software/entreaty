stuff = new Meteor.Collection("stuff");

stuff.allow({
  insert: function(userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function(userId, doc, fields, modifier) {
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    return doc.owner === userId;
  }
});

if (Meteor.isServer) {
	Meteor.startup(function () {
	});

	Meteor.publish("stuff", function() {
	  return stuff.find({
	  	owner: this.userId
	  });
	});
}

Router.route('/stuff', function() {
  this.render('service_template', {
    data: function () {
    	return stuff.find();
    }
  });
});

if (Meteor.isClient) {
	Meteor.startup(function () {
	});

	Meteor.subscribe("stuff");
	
	Template.service_template.helpers({
		stuff: function () {
			return this.data.fetch();
		}
	});
}
