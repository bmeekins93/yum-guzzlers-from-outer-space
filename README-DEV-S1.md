# Yum Guzzlers — S1 T1.1 Scene Framework  
This scaffold delivers the scene framework requested for S1/T1.1:  

- Boot → Preload → **MainMenu** → **Level**  
- Overlay scenes: **HUD**, **Pause**, **GameOver**  
- Minimal placeholder art generated at runtime (no external assets)  
- Arcade Physics platforms + a controllable player box  
- Event-driven HUD (score, yum, lives, time)  
- Dev hotkeys: **Enter**=Start, **Esc/P**=Pause/Resume, **G**=GameOver, **M**=Menu  

## Run locally  

Any static web server works. Examples:  

- **Python**: `python3 -m http.server 8000` then open http://localhost:8000 in a browser.  
- **Node**: `npx http-server -p 8000` then open http://localhost:8000.  

> Opening via `file://` is discouraged because browsers restrict ES module imports.  

## File map  

```
/index.html  
/src/main.js  
/src/scenes/BootScene.js  
/src/scenes/PreloadScene.js  
/src/scenes/MainMenuScene.js  
/src/scenes/LevelScene.js  
/src/scenes/HUDScene.js  
/src/scenes/PauseScene.js  
/src/scenes/GameOverScene.js  
/assets/  (empty placeholder)  
```  

## Next steps (S1 outline tie-in)  

- T1.2 Player Controller: add coyote time & jump buffering, polished acceleration/drag.  
- T1.3 Cannon & Projectiles: implement object pooling, collisions.  
- T1.4 Yum System: resource drain/refill and HUD bar.  
- T1.5 Enemy (Grunt): patrol AI + 1 HP.  
- T1.6 Level 1: placeholder tiles + exit gate → completes loop.  
- T1.7 HUD polish: hearts, yum bar, score, timer.  
- T1.8 Screens polish: Start/Pause/GameOver visuals. 
