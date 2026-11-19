"use strict";

const WORD_COUNT = 140;
const MESSAGE = "I love you";

function createItem(index) {
  const item = document.createElement("div");
  item.className = "heart__item";
  item.style.setProperty("--index", index);

  const word = document.createElement("span");
  word.className = "heart__word";
  word.textContent = MESSAGE;
  item.append(word);

  return item;
}

function renderHeart(container, count = WORD_COUNT) {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= count; i++) {
    fragment.append(createItem(i));
  }

  container.append(fragment);
}

const heart = document.getElementById("heart");
if (heart) renderHeart(heart);
