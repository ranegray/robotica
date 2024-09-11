import React, { useState, useEffect } from "react";

const GRID_SIZE = 16;
const START_POSITION = { x: 0, y: 0 };

const TerrainSVG = ({ type }) => {
  const svgContent = {
    0: `<rect width="8" height="8" fill="#c1440e"/>
    <rect x="0" y="0" width="1" height="1" fill="#a93a0c"/>
    <rect x="3" y="2" width="1" height="1" fill="#a93a0c"/>
    <rect x="6" y="4" width="1" height="1" fill="#a93a0c"/>
    <rect x="2" y="6" width="1" height="1" fill="#a93a0c"/>
    <rect x="5" y="7" width="1" height="1" fill="#a93a0c"/>
    <rect x="7" y="1" width="1" height="1" fill="#d94e10"/>
    <rect x="1" y="3" width="1" height="1" fill="#d94e10"/>
    <rect x="4" y="5" width="1" height="1" fill="#d94e10"/>`,
    1: `<rect width="8" height="8" fill="#8b4513"/>
        <polygon points="0,8 3,5 5,7 8,4 8,8" fill="#6d3610"/>
        <polygon points="1,3 3,1 4,2 2,4" fill="#9e5a2e"/>
        <polygon points="5,1 7,0 8,2 6,3" fill="#9e5a2e"/>
        <rect x="1" y="6" width="1" height="1" fill="#6d3610"/>
        <rect x="6" y="2" width="1" height="1" fill="#9e5a2e"/>`,
    2: `<rect width="8" height="8" fill="#a52a2a"/>
        <rect x="1" y="1" width="1" height="1" fill="#8e2323"/>
        <rect x="3" y="0" width="1" height="1" fill="#8e2323"/>
        <rect x="5" y="2" width="1" height="1" fill="#8e2323"/>
        <rect x="7" y="1" width="1" height="1" fill="#8e2323"/>
        <rect x="0" y="4" width="1" height="1" fill="#8e2323"/>
        <rect x="2" y="6" width="1" height="1" fill="#8e2323"/>
        <rect x="4" y="5" width="1" height="1" fill="#8e2323"/>
        <rect x="6" y="7" width="1" height="1" fill="#8e2323"/>
        <rect x="2" y="3" width="1" height="1" fill="#c64242"/>
        <rect x="5" y="4" width="1" height="1" fill="#c64242"/>
        <rect x="7" y="6" width="1" height="1" fill="#c64242"/>`,
    3: `<rect width="8" height="8" fill="#94a3b8"/>
        <polygon points="0,0 2,0 0,2" fill="#bfdbfe"/>
        <polygon points="3,1 5,1 4,3" fill="#bfdbfe"/>
        <polygon points="6,0 8,0 8,2" fill="#bfdbfe"/>
        <polygon points="1,4 3,4 2,6" fill="#bfdbfe"/>
        <polygon points="5,5 7,5 6,7" fill="#bfdbfe"/>
        <polygon points="0,6 2,6 0,8" fill="#bfdbfe"/>
        <rect x="7" y="3" width="1" height="1" fill="#bfdbfe"/>
        <rect x="4" y="7" width="1" height="1" fill="#bfdbfe"/>`,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      className="h-full w-full"
    >
      <g dangerouslySetInnerHTML={{ __html: svgContent[type] }} />
    </svg>
  );
};

const RoverSVG = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    className="h-full w-full"
  >
    <rect x="1" y="1" width="6" height="6" fill="#C0C0C0" />
    <rect x="0" y="0" width="2" height="2" fill="#404040" />
    <rect x="6" y="0" width="2" height="2" fill="#404040" />
    <rect x="0" y="6" width="2" height="2" fill="#404040" />
    <rect x="6" y="6" width="2" height="2" fill="#404040" />
    <rect x="2" y="2" width="4" height="2" fill="#4169E1" />
    <rect x="3" y="5" width="2" height="1" fill="#000000" />
    <g
      transform={`rotate(${
        direction === "up"
          ? 0
          : direction === "right"
            ? 90
            : direction === "down"
              ? 180
              : 270
      }, 4, 4)`}
    >
      <polygon points="4,0 3,1 5,1" fill="red" />
    </g>
  </svg>
);

const ObjectiveMarkerSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    className="h-full w-full"
  >
    <rect x="0" y="0" width="1" height="1" fill="#FFFF00" />
    <rect x="7" y="0" width="1" height="1" fill="#FFFF00" />
    <rect x="0" y="7" width="1" height="1" fill="#FFFF00" />
    <rect x="7" y="7" width="1" height="1" fill="#FFFF00" />
    <rect x="1" y="0" width="6" height="1" fill="#FFFF00" />
    <rect x="0" y="1" width="1" height="6" fill="#FFFF00" />
    <rect x="7" y="1" width="1" height="6" fill="#FFFF00" />
    <rect x="1" y="7" width="6" height="1" fill="#FFFF00" />
    <rect x="2" y="2" width="4" height="4" fill="#FF0000" />
    <rect x="3" y="1" width="2" height="6" fill="#FF0000" />
    <rect x="1" y="3" width="6" height="2" fill="#FF0000" />
  </svg>
);

const RoverCam = () => {
  const [grid, setGrid] = useState([]);
  const [roverPosition, setRoverPosition] = useState(START_POSITION);
  const [roverDirection, setRoverDirection] = useState("right");

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    // Step 1: Initialize the grid with sand
    const newGrid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({ contents: null, terrain: 0 })),
    );

    // Step 2: Place the objective in the center
    const objectivePosition = {
      x: Math.floor(GRID_SIZE / 2),
      y: Math.floor(GRID_SIZE / 2),
    };
    newGrid[objectivePosition.y][objectivePosition.x] = {
      contents: "objective",
      terrain: 0,
    };

    // Step 3: Create a path from the start position to the objective
    const createPath = (start, end) => {
      const path = [];
      let current = { ...start };

      while (current.x !== end.x || current.y !== end.y) {
        if (current.x < end.x) current.x++;
        else if (current.x > end.x) current.x--;

        if (current.y < end.y) current.y++;
        else if (current.y > end.y) current.y--;

        path.push({ ...current });
      }

      return path;
    };

    const path = createPath(START_POSITION, objectivePosition);

    // Step 4: Randomly place other terrain types while ensuring the path remains clear
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (path.some((p) => p.x === x && p.y === y)) continue; // Skip path cells

        const rand = Math.random();
        if (rand < 0.1)
          newGrid[y][x] = { contents: null, terrain: 1 }; // Rocks
        else if (rand < 0.2)
          newGrid[y][x] = { contents: null, terrain: 2 }; // Iron ore
        else if (rand < 0.25) newGrid[y][x] = { contents: null, terrain: 3 }; // Water ice
      }
    }

    setGrid(newGrid);
  };

  const moveRover = (direction) => {
    setRoverDirection(direction);
    let newX = roverPosition.x;
    let newY = roverPosition.y;

    switch (direction) {
      case "up":
        newY = Math.max(0, roverPosition.y - 1);
        break;
      case "right":
        newX = Math.min(GRID_SIZE - 1, roverPosition.x + 1);
        break;
      case "down":
        newY = Math.min(GRID_SIZE - 1, roverPosition.y + 1);
        break;
      case "left":
        newX = Math.max(0, roverPosition.x - 1);
        break;
      default:
        break;
    }

    if (grid[newY][newX].terrain === 1 || grid[newY][newX].terrain === 3) {
      return;
    }

    setRoverPosition({ x: newX, y: newY });

    if (grid[newY][newX].contents === "objective") {} // TODO: Handle objective found
  };

  const renderCell = (value, x, y) => {
    const isRover = x === roverPosition.x && y === roverPosition.y;
    const isObjective = value.contents === "objective";

    return (
      <div key={`${x}-${y}`} className={`h-8 w-8 ${isRover || isObjective ? "relative" : ""}`}>
        <TerrainSVG type={value.terrain} />
        {isRover && (
          <div className="absolute inset-0 z-10 flex items-center justify-center font-bold text-white">
            <RoverSVG direction={roverDirection} />
          </div>
        )}
        {isObjective && (
          <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
            ⭐️
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 text-xl font-bold uppercase">Rover Cam</h2>
      <div className="bg-[#a93a0c]">
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => renderCell(cell, x, y))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-1">
        <button
          onClick={() => moveRover("up")}
          className="w-20 border border-white bg-blue-500 px-4 py-2 text-white"
        >
          ▲
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => moveRover("left")}
            className="w-20 border border-white bg-blue-500 px-4 py-2 text-white"
          >
            ◀
          </button>
          <button
            onClick={() => moveRover("right")}
            className="w-20 border border-white bg-blue-500 px-4 py-2 text-white"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => moveRover("down")}
          className="w-20 border border-white bg-blue-500 px-4 py-2 text-white"
        >
          ▼
        </button>
      </div>
    </div>
  );
};

export default RoverCam;
