var p = [];
var rad;
var diam;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  diam = 40;
  rad = diam / 2;

  for (var i = 0; i < 5; i++) {
    p.push(new Paper("📝", "paper"));
  }
  for (var i = 5; i < 10; i++) {
    p.push(new Rock("🪨", "rock"));
  }
  for (var i = 10; i < 15; i++) {
    p.push(new Scissors("✂️", "scissors"));
  }
}

function draw() {
  background(0, 0, 139);
  for (var i = p.length - 1; i >= 0; i--) {
    p[i].move();
    p[i].show();
  }
  testRockPaper();
  if (allTheSame(p) == true) {
    textSize(30);
    textAlign(CENTER);
    text("You're a winner,      !", width / 2, height / 2);
  }
  if (twoTheSame(p)) {
    textSize(30);
    textAlign(CENTER);
    text("You're a winner,      !", width / 2, height / 2);
    var git = createCounter();
    git();
  }
}

function createCounter() {
  let counter = 0;
  setInterval(increment, 1000);
  function increment() {
    counter++;
    if (counter == 2) {
      noLoop();
      console.log("git er done");
    }
  }
  return increment;
}

function testRockPaper() {
  for (var i = p.length - 1; i >= 0; i--) {
    for (var j = p.length - 1; j >= 0; j--) {
      if (p[i].id != p[j].id && p[i].collide(p[j]) === true) {
        textAlign(CENTER);
        text("OH SNAP!", width / 2, height / 2);

        if (p[i].id != p[j].id && p[i].whatKind(p[j]) === "paper") {
          p[i].id = "paper";
          p[j].id = "paper";
          p[i].t = "📝";
          p[j].t = "📝";
        }

        if (p[i].id != p[j].id && p[i].whatKind(p[j]) === "rock") {
          p[i].id = "rock";
          p[j].id = "rock";
          p[i].t = "🪨";
          p[j].t = "🪨";
        }

        if (p[i].id != p[j].id && p[i].whatKind(p[j]) === "scissors") {
          p[i].id = "scissors";
          p[j].id = "scissors";
          p[i].t = "✂️";
          p[j].t = "✂️";
        }
      }
    }
  }
}
function allTheSame(p) {
  var first = p[0].id;
  return p.every(function (element) {
    return element.id === first;
  });
}
function twoTheSame(p) {
  var roc = 0;
  var pape = 0;
  var scis = 0;
  for (var i = 0; i < p.length; i++) {
    if (p[i].id == "rock") {
      roc += 1;
    }
    if (p[i].id == "paper") {
      pape = pape + 1;
    }
    if (p[i].id == "scissors") {
      scis = scis + 1;
    }
  }
  if (pape > 1 && roc > 1 && scis < 1) {
    text("📝", 300, 200);
    return true;
  } else if (pape > 1 && scis > 1 && roc < 1) {
    text("✂️", 300, 200);
    return true;
  } else if (scis > 1 && roc > 1 && pape < 1) {
    text("🪨", 300, 200);
    return true;
  }
}
class Player {
  constructor(t, id) {
    this.x = random(380);
    this.y = random(380);
    this.t = t;
    this.nx = random(1, -1);
    this.ny = random(1, -1);
    this.r = 20;
    this.id = id;
  }

  move() {
    if (this.x > 400 - diam) {
      this.nx = random(-6, 4);
    }
    if (this.x < 0 + diam) {
      this.nx = random(6, 4);
    }
    if (this.y > 400 - diam) {
      this.ny = random(-6, 4);
    }
    if (this.y < 0 + diam) {
      this.ny = random(6, 4);
    } else {
      this.x += random(3, -3);
      this.y += random(3, -3);
    }
    this.x += random(this.nx);
    this.y += random(this.ny);
  }
  show() {
    fill(255);
    textSize(30);
    text(this.t, this.x, this.y);
    //text(this.id, this.x, this.y);
  }

  collide(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    }
    return false;
  }
  whatKind(other) {
    var kind;
    if (
      (this.id === "rock" && other.id === "paper") ||
      (this.id === "paper" && other.id === "rock")
    ) {
      kind = "paper";
    }
    if (
      (this.id === "scissors" && other.id === "paper") ||
      (this.id === "paper" && other.id === "scissors")
    ) {
      kind = "scissors";
    }
    if (
      (this.id === "rock" && other.id === "scissors") ||
      (this.id === "scissors" && other.id === "rock")
    ) {
      kind = "rock";
    }
    return kind;
  }
}

class Paper extends Player {
  constructor(t, id) {
    super(t, id);
  }
}

class Rock extends Player {
  constructor(t, id) {
    super(t, id);
  }
}

class Scissors extends Player {
  constructor(t, id) {
    super(t, id);
  }
}
