# ![Logo](https://github.com/sudolev/StravaMultiMapper/assets/61996958/3ac93fc4-6c78-460b-b964-22db9b5045d2) Strava Activity Heatmap

[![Discord](https://img.shields.io/discord/1166050503998849154?logo=discord&logoColor=white&label=discord&color=%235d6af2&link=https%3A%2F%2Fdiscord.gg%2F5P3AYFrwQG)](https://discord.gg/5P3AYFrwQG)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fstravamap.pages.dev%2F)](https://stravamap.pages.dev/)
[![CI](https://github.com/sudolev/StravaMultiMapper/actions/workflows/ci.yml/badge.svg)](https://github.com/sudolev/StravaMultiMapper/actions/workflows/ci.yml)
[![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade-score/stravamap.pages.dev)](https://observatory.mozilla.org/analyze/stravamap.pages.dev)
[![license](https://img.shields.io/github/license/sudolev/StravaMultiMapper)](https://github.com/sudolev/StravaMultiMapper/blob/main/LICENSE)
<!-- ![Lines of Code](https://tokei.rs/b1/github/syslev/StravaMultiMapper?type=Svelte,Typescript,Javascript&style=flat) -->

The best way to visualize your Strava activities--free, modern, fast and feature-rich. Currently WIP!

## Standout Features

- Privacy-focused with no user data stored, no client cookies used, and complete stack transparency.

### ❖ Data Visualization

- Filter activities by date, sport type, commute status and visibility

- Many separate display modes incorporating different metrics (Frequency Heatmap, Elevation, Time of Year, Solid Color)

- Tabular list of activities with support for displaying & sorting by many metrics (Name, Distance, Calories, Avg. Speed, Avg. Power, Avg. Heartrate, Date) & filtering by keyword

### ❖ Map

- Customizable basemap appearance (Light, Dark, Satellite, Landscape, Topographic, Winter, or none)

- Map export to PNG, JPG, PDF and SVG with detailed control over export dimensions and resolution.

- Distance measurements via measurement control

- Automatic zoom-to-fit activities added to map

### ❖ Comforts

- Fully-featured light/dark mode with persistence via browser stores & automatic preference detection + manual control

- Resizable & collapsible settings sidebar (desktop) or drawer (mobile) with layout persistence through browser stores

### ❖ Technical

- Session persistence via Auth.js

- Parallel fetching of activities

## Screenshots

## Website Stack

TODO - WRITE DESCRIPTION OF STACK

## Contributing/Building

Clone the repository. If you don't have pnpm installed, install that.

```bash
npm i -g pnpm
```

Install dependencies

```bash
pnpm i
```

Run the development server

```bash
pnpm dev
```

## License

© [Alexander Weimer](github.com/syslev). Published under the [GPL-3.0](./LICENSE) license.
