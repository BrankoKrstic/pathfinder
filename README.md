# Pathfinder Project

This project was bootstrapped with Create React App and inspired by Clement Mihailescu's Pathfinding Visualizer.

It demonstrates the route different pathfinding algorithms take to explore a graph. The app works at serveral speeds, can generate a maze, and allows custom wall setups. A [live demo is available here](https://relaxed-poincare-7c78bc.netlify.app/)

Behind the scenes, the app uses a custom graph data structure together with custom classes like a priority queue to render a grid and search for the shoretst path. React state is used to visualize the exploration path and the shortest route in the UI.

## To install

Clone the github repo to your machine.
Execute `cd pathfinder` into the terminal to go into the repo folder
Execute `npm install` to download all dependencies
`npm start` to open the project on a development server

## Using the app

Once in the app, you can refer to the help page for info about the algorithms and the controls. Pick your desired algorithm, draw a maze, or move around the start and end nodes. Once you're ready, hit the `run` button and see Pathfinder do its magic.
