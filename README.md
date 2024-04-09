# ![Logo](https://github.com/sudolev/StravaMultiMapper/assets/61996958/3ac93fc4-6c78-460b-b964-22db9b5045d2) Strava Activity Heatmap

[![Discord](https://img.shields.io/discord/1166050503998849154?logo=discord&logoColor=white&label=discord&color=%235d6af2&link=https%3A%2F%2Fdiscord.gg%2F5P3AYFrwQG)](https://discord.gg/5P3AYFrwQG)
[![CI](https://github.com/sudolev/StravaMultiMapper/actions/workflows/ci.yml/badge.svg)](https://github.com/sudolev/StravaMultiMapper/actions/workflows/ci.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fstravamap.pages.dev%2F)](https://stravamap.pages.dev/)
[![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade-score/stravamap.pages.dev)](https://observatory.mozilla.org/analyze/stravamap.pages.dev)
[![license](https://img.shields.io/github/license/sudolev/StravaMultiMapper)](https://github.com/sudolev/StravaMultiMapper/blob/main/LICENSE)

<!-- ![Lines of Code](https://tokei.rs/b1/github/syslev/StravaMultiMapper?type=Svelte,Typescript,Javascript&style=flat) -->

The best way to visualize your Strava activities--free, modern, fast and feature-rich. Currently WIP!

## Standout Features

- Privacy-focused with no user data stored, no client cookies used, and complete transparency.

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
### Heatmap usage
![Heatmap Screenshot](https://github.com/syslev/StravaMultiMapper/assets/61996958/9223ab7a-991d-476d-8fad-4b33665744f0)
### Layers tool
![Connected Screenshot](https://github.com/syslev/StravaMultiMapper/assets/61996958/2104676e-73f8-413e-a967-7239599cf50a)
### Loading Screen
![Loading Screen](https://github.com/syslev/StravaMultiMapper/assets/61996958/67c75f01-7af2-4fb9-aa1f-53f0e52950fd)

## Website Stack

This website is a [SvelteKit](https://github.com/sveltejs/kit) app with [Typescript](https://github.com/microsoft/TypeScript) and [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) hosted on [Cloudflare Pages](https://pages.cloudflare.com/). Pretty standard.

It's centerpiece is a [MapLibre GL](https://github.com/maplibre/maplibre-gl-js) map with various plugins. Also used is [Auth.js](https://github.com/nextauthjs/next-auth) and [shadcn/ui Svelte](https://github.com/huntabyte/shadcn-svelte)

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
