Counter = function() {
  this.initial_time = (new Date).getTime();
};

Counter.COUNT = 60;

Counter.prototype = {
  get_current_seconds: function() {
    var current_time = (new Date).getTime();
    var current_miliseconds = current_time - this.initial_time
    return (Math.round(current_miliseconds/1000));
  },

  run: function(object, callback_method) {
    var self = this;

    self.interval = setInterval(function() {
      var current_seconds = self.get_current_seconds();
      var remining = Counter.COUNT - current_seconds;

      if (remining < 0) {
        self.stop();
      } else {
        if (callback_method) {
          object[callback_method](remining);
        }
      }
    }, 1000);
  },

  stop: function() {
    clearInterval(this.interval);
  }
};

CounterView = function(element) {
  this.el = element;
  this.counter = new Counter();
  this.counter.run(this, "render");
};

CounterView.prototype = {
  render: function(time) {
    var date = new Date(null);
    date.setSeconds(time);
    var time_string = date.toTimeString().substr(3, 5);
    this.el.text(time_string);
  }
};

jQuery(function(){
  $("#start").click(function(e) {
    e.preventDefault();
    view = new CounterView($(".countdown"));
  });
});
