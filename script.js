const cells = document.querySelectorAll(".cell");
const input = document.querySelector("input");
const rows = document.querySelectorAll(".row");
const loaderContainer = document.querySelector(".loader-container");
const hintContainer = document.querySelector(".hint-container");
let i = 0;
let enterCount = 0;
let givenWord;
let wordCopy;
function hintShow() {
  hintContainer.classList.toggle("active");
}
function defGet(def = "Sorry no definitions") {
  hintContainer.textContent = def;
}
function wordPrint(word) {
  wordCopy = word.toUpperCase();
  givenWord = () => Array.from(word.toUpperCase());
  loaderContainer.classList.add("ready");
  afterReady();
}

function ansShow() {
  hintContainer.classList.toggle("active");
  hintContainer.textContent = givenWord().join("");
}
function afterReady() {
  input.focus();
  document.body.onclick = () => {
    input.focus();
  };
  let j = 0;
  let isEnter;
  input.addEventListener("keyup", (e) => {
    if (e.key === "Backspace" && j > 0) {
      if (i != 0) --i;
      --j;
      isEnter = true;
      cells[i].textContent = "";
      cells[i].classList.remove("active");
    } else if (e.key === "Enter" && i % 5 == 0 && input.value) {
      input.value = "";
      if (enterCount >= 4) {
        setTimeout(() => {
          document.body.classList.add("lose");
          document.body.textContent = `You Lose!.The word is '${wordCopy}'`;
          setTimeout(() => {
            location.reload();
          }, 1000);
          document.body.classList.add("lose");
        }, 1500);
      }
      j = 0;
      const arr = [];
      const givenWordCopy = givenWord();
      for (let j = i - 5; j < i; j++) {
        arr.push(cells[j].textContent);
      }
      const crct = [];
      rows[Math.floor(i / 5) - 1].classList.add("completed");
      for (const ltr of givenWordCopy) {
        for (const entry of arr) {
          if (ltr === entry) {
            if (givenWordCopy.indexOf(ltr) === arr.indexOf(entry)) {
              rows[enterCount]
                .querySelectorAll(".cell")
                [arr.indexOf(entry)].classList.add("green");
              crct.push(entry);
              givenWordCopy[givenWordCopy.indexOf(ltr)] = "$";
              arr[arr.indexOf(entry)] = "$";
              break;
            } else {
              rows[enterCount]
                .querySelectorAll(".cell")
                [arr.indexOf(entry)].classList.add("yellow");
            }
            break;
          }
        }
      }

      enterCount++;
      isEnter = true;
      input.blur();
      setTimeout(() => {
        input.focus();
        if (crct.length == 5) {
          document.body.textContent = "Correct word";
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }, 1500);
    } else if (
      e.keyCode >= 65 &&
      e.keyCode <= 90 &&
      i <= 24 &&
      (i % 5 != 0 || isEnter || i == 0)
    ) {
      isEnter = false;
      j = j >= 5 ? 1 : ++j;
      cells[i].textContent = e.key.toUpperCase();
      cells[i].classList.add("active");
      i++;
    }
  });
}
