const Application = PIXI.Application;
let score = 0;
let speed = 1;

//sets our screen size
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

app.renderer.view.style.position = "aboslute";

//adds our view to the dom
document.body.appendChild(app.view);

//we are defining our sprites and text here
const susMan = PIXI.Sprite.from("./image/Sus.webp");
const background = PIXI.Sprite.from("./image/space.webp");
const rock = PIXI.Sprite.from("./image/Rock.png");
const dead = PIXI.Sprite.from("./image/Death.jpeg");
const style = new PIXI.TextStyle({
  fontSize: 50,
  fontFamily: "Comic Sans MS",
  fill: "white",
});
const finalStyle = new PIXI.TextStyle({
  fontSize: 100,
  fill: "white",
  fontFamily: "Comic Sans MS",
});
let scoreBoard = new PIXI.Text(`Score: ${score}`, style);

//this renders our background and susMan. order matters here as if its layers
app.stage.addChild(background);
app.stage.addChild(susMan);
app.stage.addChild(rock);
app.stage.addChild(scoreBoard);

//this loop varies by monitor framerate
//this loops our rocks, moves the rocks and handles the rotation on both items
app.ticker.add((delta) => loop(delta));
function loop(delta) {
  susMan.rotation += 0.01;
  rock.rotation += 0.05;
  rock.position.x -= speed;
  if (rock.position.x <= 0) {
    rock.position.set(1500, Math.floor(Math.random() * 800));
    score += 1;
    speed += 1;
    scoreBoard.text = `Score: ${score}`;
  }
  if (hitDetect(susMan, rock)) {
    let finalScore = new PIXI.Text(`Final Score : ${score}`, finalStyle);
    finalScore.position.set(360, 100);
    app.ticker.stop();
    app.stage.addChild(dead);
    music.stop();
    deathSound.play();
    app.stage.addChild(finalScore);
  }
}

//hit detector
function hitDetect(a, b) {
  let firstObj = a.getBounds();
  let secondObj = b.getBounds();

  return (
    firstObj.x + firstObj.width - 100 > secondObj.x &&
    firstObj.x < secondObj.x + secondObj.width - 100 &&
    firstObj.y + firstObj.height - 100 > secondObj.y &&
    firstObj.y < secondObj.y + secondObj.height - 100
  );
}

//death screen stuff
dead.scale.set(0.9, 0.9);
dead.position.set(-110, -90);

//our params for our rock
rock.scale.set(0.3, 0.3);
rock.position.set(1500, Math.floor(Math.random() * 800));
rock.anchor.set(0.5, 0.5);

//this gives our susMan size, its starting position, and sets its anchor point to the middle so it spinning doesnt look weird
susMan.scale.set(0.3, 0.3);
susMan.position.set(450, 450);
susMan.anchor.set(0.5, 0.5);

//this adds keyboard controls
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    susMan.x += 20;
  }
  if (e.key === "ArrowLeft") {
    susMan.x -= 20;
  }
  if (e.key === "ArrowUp") {
    susMan.y -= 20;
  }
  if (e.key === "ArrowDown") {
    susMan.y += 20;
  }
});

//this is for our awsome soundtrack. needed to install howler to get it to work
const music = new Howl({
  src: ["./music/AmongSong.mp3"],
  volume: 0.2,
  loop: true,
});

const deathSound = new Howl({
  src: ["./music/DeathSound.mp3"],
  volume: 0.3,
});

music.play();
