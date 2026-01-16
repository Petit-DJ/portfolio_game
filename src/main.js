import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");
// to pass colors -duh-
k.setBackground(k.Color.fromHex("#510f7cff"));

// 
k.scene("main", async () => { // if we don't use await, the code would ruun without the mapData, that's why we wait.
  const mapData = await (await fetch("./map.json")).json(); // fetching map.json data to conv. it into js object.
  const layers = mapData.layers;
// in the above we are calling the layers property from map.json
// below is a game obj. (an obj that contains different components.)
  const map = k.add([
    k.sprite("map"), 
    k.pos(0,0), // position of game obj on screen  
    k.scale(scaleFactor)]);

  const player = k.add([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({ // usually it makes the shape = shape of sprite; but to control it exactly we use the shape property.
      shape: new k.Rect(k.vec2(0, 3), 10, 10), // from origin to +3 of x-axis, 2nd& 3rd parameters are width & height.
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    { // we can create these properties which can be accessed by player.speed (player is the name of const.)
      speed: 250,
      direction: "down",
      isInDialogue: false, // for when player is speaking & text box is visible,  so that player cannot move.
    },
    "player",
  ]);
      // reads collision rect created in tiled & turns them into wall
        /*Go through each layer in layers (from map.json)
        If you find a layer named "boundaries"
        For every boundary you find in the object layer create a new invisible game object
        whose shape matches the boundary, which does not move and does not let the player pass through,
      and tag it with the boundary name.*/

  for (const layer of layers) // will iterate through the various layers from map.json
  {
    if (layer.name === "boundaries") { // refer to map.json
      for (const boundary of layer.objects) {
        map.add([
          k.area({ 
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }), // makes sure that player doesnot pass through boundary.
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => { // players collides with bounfary, tell 'em that 
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false)
            );
          });
        }
      }

      continue;
    }
    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x)* scaleFactor,
            (map.pos.y + entity.y)* scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  
  }

   setCamScale (k)

   k.onResize (() => {
    setCamScale(k);
   });


   k.onUpdate(()=> {
    k.camPos(player.pos.x, player.pos.y +100);
   });

   k.onMouseDown( (mouseBtn) => {
      if (mouseBtn !== "left" || player.isInDialogue) return;
      
      const worldMousePos = k.toWorld(k.mousePos());
      player.moveTo(worldMousePos, player.speed);

      const mouseAngle = player.pos.angle(worldMousePos); 
      
      const lowerBound = 50;
      const upperBound = 125;

      if (
        mouseAngle > lowerBound &&
        mouseAngle < upperBound &&
        player.curAnim() !== "walk-up"
      ) {
        player.play("walk-up");
        player.direction = "up";
        return;
      } 
      if (
        mouseAngle > -lowerBound &&
        mouseAngle < -upperBound &&
        player.curAnim() !== "walk-down"
      ) {
        player.play("walk-down");
        player.direction = "down";
        return;
      }

      if (Math.abs(mouseAngle)>upperBound) {
        player.flipx = false;
        if (player.curAnim() !== "walk-side") player.play ("walk-side");
        player.direction = "right";
        return;
      }
      if (Math.abs(mouseAngle) < lowerBound) {
        player.flipx = true;
        if (player.curAnim() !== "walk-side") player.play ("walk-side");
        player.direction = "left";   
        return;
      }
   });

   k.onMouseRelease (()=> {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }
    player.play("idle-side");
   });
});
 k.go("main");