var points = [];

var m = 32;
var n = 4;
var dim = 400;
var vel = 0.01;

var random_animation;

var guiControls;
var datGUI;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  colorMode(HSB, 360);
  
  random_animation = 0;

  initGui();

  reset();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (guiControls.dark_theme) {
    background(0);
  } else {
    background(360);
  }

  if (points.length > guiControls.squares_number) {
    var howmany = points.length - guiControls.squares_number;
    points.splice(guiControls.squares_number, howmany);
  }

  if (points.length < guiControls.squares_number) {
    for (var i = points.length; i < guiControls.squares_number; i++) {
      var a = map(i, 0, guiControls.squares_number * guiControls.angles, 0, TWO_PI);
      points[i] = a;
    }
  }

  if (guiControls.angles != n) {
    n = guiControls.angles;
    for (var k = 0; k < points.length; k++) {
      var a = map(k, 0, guiControls.squares_number * guiControls.angles, 0, TWO_PI);
      points[k] = a;
    }
  }

  for (var j = 0; j < points.length; j++) {
    push();
    translate(width/2, height/2);
    rotate(points[j]);
    noFill();
    if (guiControls.colored) {
      var b;
      if (guiControls.dark_theme) {
        b = 360;
      } else {
        b = 100;
      }
      var c = color(guiControls.hue+abs(cos(points[j])*90), 100, b);
      stroke(c, 50);
    } else {
      if (guiControls.dark_theme) {
        stroke(360);
      } else {
        stroke(0);
      }
    }
    rectMode(CENTER);
    if (random_animation === 0) {
      rect(0, 0, abs(cos(points[j])) * guiControls.squares_dimension, abs(cos(points[j])) * guiControls.squares_dimension);
    } else if (random_animation === 1) {
      rect(0, 0, abs(cos(points[j])) * guiControls.squares_dimension, abs(sin(points[j]) * guiControls.squares_dimension));
    } else if (random_animation === 2) {
      rect(0, 0, abs(cos(points[j])) * guiControls.squares_dimension, abs(tan(sin(points[j])) * (guiControls.squares_dimension/5)));
    }
    pop();
    points[j] -= guiControls.rotation_velocity;
  }
}

function reset() {
  points = [];

  for (var i = 0; i < guiControls.squares_number; i++) {
    var a = map(i, 0, guiControls.squares_number * guiControls.angles, 0, TWO_PI);
    points[i] = a;
  }
}

function initGui() {
  
  guiControls = new function() {
    this.dark_theme = true;
    this.colored = false;
    this.hue = 135;
    this.squares_number = 32;
    this.angles = 4;
    this.squares_dimension = 400;
    this.rotation_velocity = 0.01;

    this.random_animation = function() {
      random_animation = floor(random(3));
    }
    
    this.realign = function() {
      reset();
    }
    
  }

  datGUI = new dat.GUI();

  datGUI.add(guiControls, 'dark_theme');
  datGUI.add(guiControls, 'colored');
  datGUI.add(guiControls, 'hue', 0, 270);
  datGUI.add(guiControls, 'squares_number', 2, 128);
  datGUI.add(guiControls, 'angles', 1, 16);
  datGUI.add(guiControls, 'squares_dimension', 10, 2000);
  datGUI.add(guiControls, 'rotation_velocity', 0.001, 0.1);
  datGUI.add(guiControls, 'random_animation');
  datGUI.add(guiControls, 'realign');

  datGUI.close();
}