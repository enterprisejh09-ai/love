"use strict";

/*
 * Builds a hollow heart from repeated "I love you" words.
 * The points follow a mathematical heart curve; multiple contours
 * create the thick, layered 3D outline while keeping the center empty.
 */
const MESSAGE = "I love you";
const LAYERS = 5;
const WORDS_PER_LAYER = 34;

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t);

  return { x: x / 18, y: -y / 18 };
}

function heartTangent(t) {
  const before = heartPoint(t - 0.006);
  const after = heartPoint(t + 0.006);
  return Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
}

function createWord(layerIndex, wordIndex, scale) {
  const word = document.createElement("span");
  const t = (Math.PI * 2 * wordIndex) / WORDS_PER_LAYER;
  const point = heartPoint(t);
  const angle = heartTangent(t);
  const layer = layerIndex - (LAYERS - 1) / 2;
  const spread = 1 + layer * 0.075;

  word.className = "heart__word";
  word.textContent = MESSAGE;
  word.style.setProperty("--x", `${50 + point.x * scale * spread * 43}%`);
  word.style.setProperty("--y", `${50 + point.y * scale * spread * 43}%`);
  word.style.setProperty("--angle", `${angle}deg`);
  word.style.setProperty("--z", `${layer * 8}px`);
  word.style.setProperty("--delay", `${-(wordIndex * 0.09 + layerIndex * 0.22)}s`);
  word.style.setProperty("--pulse", `${2.5 + (wordIndex % 5) * 0.24}s`);

  return word;
}

function renderHeart(container) {
  const fragment = document.createDocumentFragment();

  for (let layerIndex = 0; layerIndex < LAYERS; layerIndex += 1) {
    const layer = document.createElement("div");
    const scale = 0.78 + layerIndex * 0.055;

    layer.className = "heart__layer";
    layer.style.setProperty("--layer-delay", `${layerIndex * -0.7}s`);
    layer.style.setProperty("--duration", `${7 + layerIndex * 0.8}s`);
    layer.style.setProperty("--depth", `${(layerIndex - 2) * 9}`);

    for (let wordIndex = 0; wordIndex < WORDS_PER_LAYER; wordIndex += 1) {
      layer.append(createWord(layerIndex, wordIndex, scale));
    }

    fragment.append(layer);
  }

  container.replaceChildren(fragment);
}

const heart = document.getElementById("heart");
if (heart) renderHeart(heart);
