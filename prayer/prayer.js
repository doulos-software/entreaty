prayers = new Meteor.Collection("prayers");

prayers.allow({
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

	Meteor.publish("prayers", function() {
	  return prayers.find({
	  	owner: this.userId
	  });
	});
}

Router.route('/prayers', function() {
  this.render('prayers', {
    data: function () {
    	return prayers.find();
    }
  });
});

Router.route('/prayer/:id', function() {
	this.render('prayer', {
		data: function() {
			return prayers.findOne(this.params.id);
		}
	})
})

if (Meteor.isClient) {
	Meteor.startup(function () {
	});

	Meteor.subscribe("prayers");

	Template.prayers.events({
		'click #addPrayerRequest': function () {
			Meteor.call('addPrayerRequest', 'New Prayer Request');	
		}
	});	
	Template.prayers.helpers({
		prayers: function() {
			return this.data.fetch();
		}
	});

	Template.prayer.helpers({
		name: function () {
			return this.data.name;
		}
	});
}

Meteor.methods({
	addPrayerRequest: function(name, location, image, date, number, color) {
		var name = name || '';
		var location = location || '';
		var image = image || '';
		var date = date || '';
		var number = number || '';
		var color = color || '';

		prayers.insert({
			name: name,
			location: location,
			image: image,
			date: date,
			number: number,
			color: color,
		}, function(id) {
			console.log(name);
			console.log(id);
		});
	}
});
