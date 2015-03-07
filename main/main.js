if (Meteor.isServer) {
	Meteor.startup(function () {
	});
}

Router.route('/', function() {
  this.render('main', {
    data: function () {
    	return stuff.find();
    }
  });
});

if (Meteor.isClient) {
	Meteor.startup(function () {
	});
}
