JS PORTFOLIO gAME

A 2D top-down portfolio game built with JavaScript, Kaboom.js, and Vite.  
The project is inspired by classic RPG-style movement and dialogue systems and is designed as an interactive portfolio.

------------------------------------------------------

 Features

-  Tilemap-based world (created using **Tiled**)
-  Player character with animated sprites
-  Collision boundaries (walls / interactable areas)
-  Auto-scrolling dialogue system
-  Mouse click movement
-  Camera follows the player
-  Custom background color & pixel-art style

------------------------------------------------------

## 🛠️ Tech Stack

- JavaScript (ES Modules)
- Kaboom.js – 2D game engine
- Vite – Development server & bundler
- Tiled Map Editor – Map and collision layout
- HTML / CSS – UI & dialogue box

------------------------------------------------------------
 
 Project Structure


portfolio_game/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js          # Game entry point
│   ├── kaboomCtx.js     # Kaboom context setup
│   ├── constants.js     # Game constants & dialogue data
│   ├── utils.js         # Dialogue logic
│   ├── map.json         # Tilemap data (from Tiled)
│   ├── map.png          # Map tileset image
│   ├── spritesheet.png # Player sprite sheet
│   └── monogram.ttf    # Pixel font



Controls

- Left Click → Move player to clicked position
- Collision with interactable areas → Triggers dialogue
- Close button → Closes dialogue and restores movement


HOW IT WORKS

Kaboom Context
Kaboom is initialized in `kaboomCtx.js` and exported as `k`, which is used throughout the project:

```js
import { k } from "./kaboomCtx";
```
This is why many functions look like:
```js
k.add()
k.sprite()
k.body()
k.scene()
```


Scene System
The game runs inside a Kaboom scene:

```js
k.scene("main", async () => {
  // game logic
});

k.go("main");
```

The scene:
- Loads map data
- Creates the map
- Spawns the player
- Adds collision boundaries
- Handles movement and camera


 Tilemap & Collisions
- The map is designed in Tiled
- Collision rectangles are stored in `map.json`
- Each boundary becomes an invisible static game object
- Player collisions are detected using tags

```js
player.onCollide("boundaryName", () => {
  displayDialogue(...);
});
```


Styling
- Uses Monogram pixel font
- Dialogue UI is HTML/CSS overlayed on top of the canvas
- Canvas background color is set using Kaboom.
