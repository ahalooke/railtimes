# Train Departure Board

A dynamic web application that displays live rail departures, TFL status updates, station information, and optional AI-driven features. This project integrates:

- **TransportAPI** for live train departures (Darwin data).
- **TFL** API for London transport line status.
- **OpenAI** (optional) to enhance station info and produce friendly text explanations.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the App](#running-the-app)
6. [Usage](#usage)
7. [Directory Structure](#directory-structure)
8. [Roadmap](#roadmap)
9. [License](#license)

---

## Features

1. **Live Departures Board**  
   - Shows upcoming trains, departure times, platforms, and countdown timers (via [TransportAPI](https://www.transportapi.com/)).  
   - Countdown changes color/animation as departure time approaches.

2. **TFL Network Status**  
   - Displays line status for Tube, Overground, DLR, Tram, and Elizabeth line.  
   - Color-coded for quick reference (Good service, Minor delays, Severe delays, etc.).

3. **Station Search & Tooltip**  
   - Change the station by clicking the three-letter code in the board title.  
   - A station search modal with **predictive** or manual input.  
   - Hover tooltip provides station details (fetched via an OpenAI prompt or your own data).

4. **Timetable Popups**  
   - Clicking a train destination shows its planned timetable (from TransportAPI / Darwin).  
   - **Optional** AI integration: friendly or expanded "reason for delay" or "route summary."

5. **Extra Box (Ticker & Fullscreen)**  
   - A floating box with large text for next departures, clock, and a scrolling ticker.  
   - Great for kiosk or big display usage.

6. **Dark/Light Toggle & Responsive UI**  
   - Quickly switch between dark & light modes.  
   - Responsive layout for desktop, tablet, and mobile.

---

## Requirements

- **Node.js** (14 or later recommended)
- **npm** or **yarn**
- A **TransportAPI** account (for live departures)
- A **TFL** API endpoint (free, no key required for TFL line statuses)
- **OpenAI** API key (optional, only if you want the AI station info or advanced text generation)

---

## Installation

1. **Clone** the repository:
   ```bash
   git clone https://github.com/<username>/train-departure-board.git
   cd train-departure-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Environment Variables

Create a **.env** file in the project root. Provide the following:

```ini
# For OpenAI (optional)
OPENAI_API_KEY=sk-<YOUR_KEY_HERE>

# Transport API Credentials
APP_ID=<YOUR_TRANSPORTAPI_APP_ID>
APP_KEY=<YOUR_TRANSPORTAPI_APP_KEY>

# Server Configuration
PORT=3000
```

> **Note**: If you do not plan to use OpenAI, you can omit or leave it blank. The app will still run with just TransportAPI details.

---

## Running the App

1. **Start the server**:
   ```bash
   node server.js
   ```
   or with nodemon (if installed):
   ```bash
   npx nodemon server.js
   ```

2. **Open your browser** at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Viewing Departures**  
   - The board defaults to station **LST** (London Liverpool Street) if no code is set.  
   - Real-time train data is fetched from TransportAPI’s `/v3/uk/train/station/:code/live.json` endpoint.

2. **Changing Stations**  
   - Click the station code (e.g., “LST”) in the heading.  
   - A search modal lets you type a new station code or name.  
   - If **predictive search** is enabled, results appear in a dropdown as you type.

3. **Viewing Timetable Details**  
   - Click a row’s **destination** to open a popup.  
   - It shows planned intermediate stops from Darwin (TransportAPI’s service timetable).

4. **TFL Status**  
   - A separate table displays line statuses.  
   - The color-coded lines indicate disruptions or closures.

5. **Extra Box**  
   - Click the “Hamburger” button → “Open Extra Box” to display a floating box with next trains, a clock, and a scrolling ticker.

---

## Directory Structure

```
train-departure-board/
│
├── data/
│    └── stations.json          # (Optional) Station list for predictive search
│
├── public/ or root folder for static files
│    ├── index.html             # The main HTML front-end
│    ├── style.css              # Additional CSS
│    └── script.js              # Additional JS (or inline in index.html)
│
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── server.js                   # Main Express server
└── README.md                   # This file
```

---

## Roadmap

1. **Predictive Station Search**  
   - Add `fuse.js` or an OpenAI-based station matching approach.

2. **AI Summaries**  
   - Use the OpenAI API to summarize frequent disruptions or “explain” delay reasons in plain English.

3. **Alternative Journey Suggestions**  
   - If a train is canceled, optionally show next best routes from TransportAPI’s journey endpoint.

4. **Voice Assistant**  
   - Implement speech synthesis on the front-end to read out the next departures.

5. **Historical Stats**  
   - Cache daily logs, feed them into OpenAI for “weekly performance” summaries.

---

## License

This project is open-sourced under the [MIT License](LICENSE). See the `LICENSE` file for details.

---

**Happy hacking!** If you have any issues or questions, please open an issue on GitHub or submit a pull request.

