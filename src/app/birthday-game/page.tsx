"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const gridSize = 60; // Reduced grid size to make the maze smaller

export default function BirthdayGame() {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [cakeEaten, setCakeEaten] = useState<{ [key: string]: boolean } | null>(null);
  const router = useRouter();

  // Initialize cakes
  useEffect(() => {
    const initialCakes: { [key: string]: boolean } = {};
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) initialCakes[`${x},${y}`] = false;
      });
    });
    setCakeEaten(initialCakes);
  }, []);

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      if (!cakeEaten) return;

      setPlayerPos((prev) => {
        const newX = prev.x + dx;
        const newY = prev.y + dy;

        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < maze[0].length &&
          newY < maze.length &&
          maze[newY][newX] === 0
        ) {
          const cakeKey = `${newX},${newY}`;
          if (cakeEaten[cakeKey] === false) {
            setCakeEaten((prev) => ({ ...prev, [cakeKey]: true }));
          }

          return { x: newX, y: newY };
        }
        return prev;
      });
    },
    [cakeEaten]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
      }
    },
    [movePlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (cakeEaten && Object.values(cakeEaten).every((eaten) => eaten)) {
      router.push("/congratulations");
    }
  }, [cakeEaten, router]);

  return (
    <div className="flex justify-center items-center h-[90vh] bg-pink-100">
      {/* Adjusted height to 90% of the viewport height */}
      <div
        className="relative"
        style={{
          width: maze[0].length * gridSize,
          height: maze.length * gridSize,
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`absolute ${
                cell === 1 ? "bg-pink-500" : "bg-white"
              }`}
              style={{
                top: y * gridSize,
                left: x * gridSize,
                width: gridSize,
                height: gridSize,
              }}
            >
              {cakeEaten && cell === 0 && !cakeEaten[`${x},${y}`] && (
                <div
                  className="absolute"
                  style={{
                    width: 30, // Adjusted cupcake size
                    height: 30, // Adjusted cupcake size
                    top: 15, // Centered within the grid
                    left: 15, // Centered within the grid
                    backgroundImage: 'url("/cupcake.png")',
                    backgroundSize: "cover",
                  }}
                />
              )}
            </div>
          ))
        )}
        <motion.div
          className="absolute"
          style={{
            width: gridSize * 1.8, // Reduced size to 80% larger than gridSize
            height: gridSize * 1.8, // Reduced size to 80% larger than gridSize
            backgroundImage: 'url("/character.png")',
            backgroundSize: "contain", // Ensure the icon fits within the grid
            backgroundRepeat: "no-repeat", // Prevent tiling of the image
            backgroundPosition: "center", // Center the icon within the grid
          }}
          animate={{
            top: playerPos.y * gridSize,
            left: playerPos.x * gridSize,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
    </div>
  );
}