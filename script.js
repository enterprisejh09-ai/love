"use strict";

/* Full, centered heart contour built from repeated glowing words. */
const MESSAGE = "I love you";
const LAYERS = 5;
const WORDS_PER_LAYER = 42;

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const rawY = 13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t);

  // Center the mathematical curve vertically before placing it in the stage.
  return {
    x: x / 18,
    y: (-rawY - 6) / 18
  };
}

function heartTangent(t) {
  const before = heartPoint(t - 0.004);
  const after = heartPoint(t + 0.004);
  return Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
}

function createWord(layerIndex, wordIndex) {
  const word = document.createElement("span");
  const t = (Math.PI * 2 * wordIndex) / WORDS_PER_LAYER;
  const point = heartPoint(t);
  const angle = heartTangent(t);
  const depth = layerIndex - (LAYERS - 1) / 2;

  // Each contour is a slightly different size to create a soft 3D ribbon.
  const scale = 0.91 + depth * 0.035;
  const x = 50 + point.x * scale * 39;
  const y = 50 + point.y * 1.35 * scale * 39;

  word.className = "heart__word";
  word.textContent = MESSAGE;
  word.style.setProperty("--x", `${x}%`);
  word.style.setProperty("--y", `${y}%`);
  word.style.setProperty("--angle", `${angle}deg`);
  word.style.setProperty("--z", `${depth * 7}px`);
  word.style.setProperty("--delay", `${-(wordIndex * 0.075 + layerIndex * 0.18)}s`);
  word.style.setProperty("--pulse", `${2.8 + (wordIndex % 6) * 0.2}s`);

  return word;
}

function renderHeart(container) {
  const fragment = document.createDocumentFragment();

  for (let layerIndex = 0; layerIndex < LAYERS; layerIndex += 1) {
    const layer = document.createElement("div");
    layer.className = "heart__layer";
    layer.style.setProperty("--layer-delay", `${layerIndex * -0.65}s`);
    layer.style.setProperty("--duration", `${7 + layerIndex * 0.7}s`);
    layer.style.setProperty("--depth", `${(layerIndex - 2) * 8}`);

    for (let wordIndex = 0; wordIndex < WORDS_PER_LAYER; wordIndex += 1) {
      layer.append(createWord(layerIndex, wordIndex));
    }

    fragment.append(layer);
  }

  container.replaceChildren(fragment);
}

const heart = document.getElementById("heart");
if (heart) renderHeart(heart);
