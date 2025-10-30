# Yum Guzzlers From Outer Space

This repository contains the source code for the game **Yum Guzzlers From Outer Space**.

## Getting Started

To run the game locally during development you need a simple HTTP server. If you have Python 3 installed, you can start a local server from the repository root with:

```bash
python3 -m http.server --bind 0.0.0.0 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser to launch the game. The game will load from `index.html` and start a Phaser 3 instance.

## Project Structure

```
.
├── index.html        # Main HTML file that loads Phaser and the game code
├── styles.css        # Base styles for the game (neon-friendly dark theme)
├── src/
│   └── main.js       # Game boot / configuration (Phaser initialization)
└── assets/           # Placeholder for game assets (audio, graphics, etc.)
```

## Roadmap

See `roadmap.json` for the list of development stages and tasks.
