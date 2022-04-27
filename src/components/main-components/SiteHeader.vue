<template>
  <header id="site-header" class="fade--out">
    <div class="wrap-header">
      <div class="terminal-header">
        <span id="terminal-header-text" class="terminal-header-text"></span>
        <div class="fake-terminal-btn">
          <button class="fake-terminal__btn theme-border theme-shadow">
            <svg
              class="terminal-svg"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 150 150"
            >
              <g>
                <path
                  d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"
                />
                <path
                  d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"
                />
                <path
                  d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"
                />
              </g>
            </svg>
          </button>
          <button class="fake-terminal__btn theme-border theme-shadow">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16px"
              height="16px"
              x="0px"
              y="0px"
              viewBox="0 0 487.95 487.95"
            >
              <g>
                <path
                  d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                  c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                  c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                />
              </g>
            </svg>
          </button>
          <button class="fake-terminal__btn theme-border theme-shadow">
            -
          </button>
          <button class="fake-terminal__btn theme-border theme-shadow">
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.93,9.36a.38.38,0,0,0-.37.38V13a.76.76,0,0,1-.75.75H6.19A.76.76,0,0,1,5.44,13V6.89a.75.75,0,0,1,.75-.74h3.94a.38.38,0,0,0,.38-.38.37.37,0,0,0-.38-.37H6.19a1.5,1.5,0,0,0-1.5,1.49V13a1.51,1.51,0,0,0,1.5,1.5h7.62a1.51,1.51,0,0,0,1.5-1.5V9.74A.38.38,0,0,0,14.93,9.36Z"
              />
              <path
                d="M12.06,6.18H14L9.61,9.81a.38.38,0,0,0,.24.67.38.38,0,0,0,.24-.09l4.45-3.7,0,1.56a.38.38,0,0,0,.37.37h0a.38.38,0,0,0,.38-.38l0-2.42a.37.37,0,0,0-.37-.37l-2.85,0h0a.38.38,0,0,0,0,.75Z"
              />
            </svg>
          </button>
          <button class="fake-terminal__btn theme-border theme-shadow">
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div id="header-asset" class="header-asset">
        <video
          v-if="play === 'sdr'"
          id="header__asset"
          class="header__asset fade--in"
          preload="auto"
          muted
          playsinline
        >
          <source
            rel="preload"
            src="@/assets/images/sdr-title-ani300x156.webm"
            type="video/webm"
          />
          <source
            rel="preload"
            src="@/assets/images/sdr-title-ani300x156.mp4"
            type="video/mp4"
          />
          <img rel="preload" src="@/assets/images/sdr-title-ani300x156.png" />
        </video>

        <video
          v-else-if="play === 'gears'"
          id="header__asset"
          class="header__asset fade--in"
          preload="auto"
          autoplay
          loop
          muted
          playsinline
        >
          <source
            rel="preload"
            src="@/assets/images/gears300x156.webm"
            type="video/webm"
          />
          <source
            rel="preload"
            src="@/assets/images/gears300x156.mp4"
            type="video/mp4"
          />
          <img rel="preload" src="@/assets/images/gears300x156.png" />
        </video>

        <video
          v-else
          id="header__asset"
          class="header__asset fade--in"
          preload="auto"
          autoplay
          loop
          muted
          playsinline
        >
          <source
            rel="preload"
            src="@/assets/images/planetary300x156.webm"
            type="video/webm"
          />
          <source
            rel="preload"
            src="@/assets/images/planetary300x156.mp4"
            type="video/mp4"
          />
          <img rel="preload" src="@/assets/images/planetary300x156.png" />
        </video>
      </div>
      <div class="black-area">
        <div class="scrollbar">
          <span id="line-1" class="header-text">user@computer-name:~$</span
          ><br />
          <span id="line-2" class="header-text"></span><br />
          <span id="line-3" class="header-text"></span><br />
          <span id="line-4" class="header-text"></span><br />
          <span id="line-5" class="header-text"></span><br />
          <span id="line-6" class="header-text"></span><br />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
let pageTitle = document.getElementsByTagName("title")[0]!.innerHTML.toString();
pageTitle = pageTitle.replaceAll(/\s+/g, `-`).toLowerCase();
const user = `user@computer-name:`;
const changeDir = ["\u00A0", "c", "d", "\u00A0"];
const documents = "Documents/scripts";
const docScripts = Array.from(documents);
const directoryPath = changeDir.concat(docScripts);
const list = ["l", "s"];
const listedContents = `automation-scripts\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0awesome-dude.js\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0cool.js\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0hacker-scripts\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0new-server.js\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${pageTitle}.js`;
const action = Array.from(`node ${pageTitle}.js`);
const running = "running";
const period = [
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
  "\u00A0",
  ".",
];
const sequnceTwo = "starting sequence two protocol";
let play = ref("sdr");
watch(play, () => {
  return play.value;
});
onMounted((): void => {
  runHeaderAnimation();
});

onBeforeUnmount((): void => {
  clearExisting();
});

const updatePlay = (value: string) => {
  play.value = value;
};

const clearExisting = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      if (document.getElementById("cursor")) {
        document.getElementById("cursor")!.remove();
      }
      document.getElementById("line-1")!.textContent = "";
      document.getElementById("line-2")!.textContent = "";
      document.getElementById("line-3")!.textContent = "";
      document.getElementById("line-4")!.textContent = "";
      document.getElementById("line-5")!.textContent = "";
      document.getElementById("line-6")!.textContent = "";
      resolve();
    } catch {
      reject();
    }
  });
};

const getCharacter = function* (characterArray: Array<string>) {
  for (let i = 0; i < characterArray.length; i++) {
    yield characterArray[i];
  }
};

const printSentence = (
  characterArray: Array<string>,
  tagID: string,
  delay: number
) => {
  return new Promise<void>((resolve, reject): void => {
    const returnCharacter = getCharacter(characterArray);
    const interval = setInterval(() => {
      const tag = document.getElementById(tagID)!;
      let next = returnCharacter.next();
      try {
        if (next.done) {
          clearInterval(interval);
          resolve();
        } else {
          tag.textContent = tag.textContent!.concat(next.value);
        }
      } catch (err) {
        reject();
      }
    }, delay);
  });
};

const buildCursorTag = (): HTMLSpanElement => {
  const output = document.createElement("span");
  document.createElement("span");
  output.id = "cursor";
  output.style.width = "0.5rem";
  output.style.height = ".75rem";
  output.style.display = "inline-block";
  output.style.opacity = "1";
  output.style.backgroundColor = "green";
  return output;
};

const makeBlink = (
  delay: number,
  repetitions: number,
  tagID: string
): Promise<void> => {
  return new Promise<void>(function (resolve, reject) {
    const tag = document.getElementById(tagID);
    let count = 0;
    setTimeout(function a() {
      try {
        tag!.style.opacity === "0"
          ? (tag!.style.opacity = "1")
          : (tag!.style.opacity = "0");
        if (++count !== repetitions) {
          setTimeout(a, delay);
        } else {
          resolve();
        }
      } catch {
        reject();
      }
    }, delay);
  });
};
/* kinda violates DRY, but conforms to single responsiblily principle and preserves promise chain timing */
const fadeOut = (tagID = "header__asset"): Promise<void> => {
  return new Promise((resolve) => {
    const tag = document.getElementById(tagID)! as HTMLElement;
    tag.classList.remove("fade--in");
    tag.classList.add("fade--out");
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
/* kinda violates DRY, but conforms to single responsiblily principle and preserves promise chain timing */
const fadeIn = (tagID = "header__asset"): Promise<void> => {
  return new Promise((resolve) => {
    const tag = document.getElementById(tagID)! as HTMLElement;
    tag.classList.remove("fade--out");
    tag.classList.add("fade--in");
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const runHeaderAnimation = () => {
  let headerGif = document.getElementById("header__asset") as HTMLVideoElement;
  let cursorTag: HTMLElement;
  let terminalHeader: HTMLElement;

  clearExisting()
    .then(async () => {
      terminalHeader = document.getElementById(
        "terminal-header-text"
      )! as HTMLElement;
      terminalHeader.textContent = `${user}~$`;
      await fadeIn("site-header");
      headerGif!.play();
    })
    .then(async () => {
      document.getElementById("line-1")!.textContent = `${user}~$`;
      cursorTag = buildCursorTag();
      document
        .getElementById("line-1")!
        .insertAdjacentElement("afterend", cursorTag);
      await makeBlink(500, 6, cursorTag.id);
      await printSentence(directoryPath, "line-1", 200);
      await makeBlink(500, 4, cursorTag.id);
      document.getElementById(cursorTag.id)?.remove();
    })
    .then(() => {
      document.getElementById(
        "line-2"
      )!.textContent = `${user}~/${documents}$\u00A0`;
      terminalHeader.textContent = `${user}~/${documents}$\u00A0`;
    })
    .then(() => {
      cursorTag = buildCursorTag();
      const line2 = document.getElementById("line-2")!;
      line2.insertAdjacentElement("afterend", cursorTag);
      line2.textContent = line2.textContent! + "\u00A0";
    })
    .then(async () => {
      headerGif!.play();
      await makeBlink(500, 10, cursorTag.id);
    })
    .then(async () => {
      await printSentence(list, "line-2", 200);
      await makeBlink(500, 6, cursorTag.id);
    })
    .then(async () => {
      cursorTag = buildCursorTag();
      document.getElementById(cursorTag.id)?.remove();
      document.getElementById("line-3")!.textContent = listedContents;
      document.getElementById(
        "line-4"
      )!.textContent = `${user}~/${documents}$\u00A0`;
      document
        .getElementById("line-4")!
        .insertAdjacentElement("afterend", cursorTag);
      await makeBlink(500, 6, cursorTag.id);
      headerGif!.play();
    })
    .then(async () => {
      document.getElementById(cursorTag.id)?.remove();
      await printSentence(action, "line-4", 200);
      cursorTag = buildCursorTag();
      document
        .getElementById("line-4")!
        .insertAdjacentElement("afterend", cursorTag);
      await makeBlink(500, 6, cursorTag.id);
    })
    .then(async () => {
      document.getElementById(cursorTag.id)?.remove();
      cursorTag = buildCursorTag();
      document
        .getElementById("line-5")!
        .insertAdjacentElement("afterend", cursorTag);
      await makeBlink(500, 6, cursorTag.id);
      document.getElementById("line-5")!.textContent = running;
    })
    .then(async () => {
      makeBlink(500, 8, cursorTag.id);
      await fadeOut();
    })
    .then(async () => {
      updatePlay("gears");
      await fadeIn();
      await makeBlink(500, 6, cursorTag.id);
      await printSentence(period, "line-5", 500);
      await printSentence(period, "line-5", 500);
      await printSentence(period, "line-5", 500);
      document.getElementById(cursorTag.id)?.remove();
    })
    .then(async () => {
      cursorTag = buildCursorTag();
      document
        .getElementById("line-6")!
        .insertAdjacentElement("afterend", cursorTag);
      await makeBlink(500, 4, cursorTag.id);
      document.getElementById("line-6")!.textContent = sequnceTwo;
    })
    .then(async () => {
      makeBlink(500, 8, cursorTag.id);
      await fadeOut();
    })
    .then(async () => {
      updatePlay("planetary");
      await fadeIn();
      await printSentence(period, "line-6", 500);
      await printSentence(period, "line-6", 500);
      await printSentence(period, "line-6", 500);
      await printSentence(period, "line-6", 500);
      await makeBlink(500, 20, cursorTag.id);
    })
    .then(async () => {
      makeBlink(500, 8, cursorTag.id);
      await fadeOut("site-header");
      updatePlay("sdr");
    })
    .then(() => {
      runHeaderAnimation();
    })
    .catch((err): void => {
      //in middle of a promise execution user navigated to page with no header, swallow headerAnimation error
      // eslint-disable-next-line no-unused-vars
      console.info(err);
    });
};
</script>

<style>
.wrap-header {
  position: relative;
  top: 10rem;
  margin: auto auto 12rem auto;
  z-index: 190;
  height: 10rem;
  background-color: black;
  padding: 0 0 0 0;
  border-radius: 0.1875rem;
  box-shadow: 0 0 0.5rem var(--bgcolor3);
}
.terminal-header {
  width: 100%;
  height: 2rem;
  background-color: white;
  position: absolute;
  line-height: 2rem;
  border-radius: 0.1875rem 0.1875rem 0 0;
  display: flex;
  justify-content: baseline;
  align-content: center;
}
.terminal-header-text {
  padding-left: 0.325rem;
}
.terminal-svg {
  position: relative;
  height: 1rem;
  width: 1rem;
}
.fake-terminal-btn {
  position: relative;
  margin: auto 0.325rem auto auto;
  display: flex;
  align-self: baseline;
}

.fake-terminal__btn {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  padding: 0.125rem 0.125rem 0.125rem 0.125rem;
}
.header-text {
  color: green;
}
.black-area {
  max-height: 10rem;
  width: 100%;
  padding-top: 2.0625rem;
  padding-left: 0.325rem;
}
.scrollbar {
  height: 8rem;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 0.325rem;
}
.header-asset {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.header__asset {
  position: relative;
  display: block;
  width: 300px;
  height: 156px;
  margin-left: auto;
  margin-right: auto;
}
.fade--out {
  animation: fadeOut 2s ease-in-out;
}
.fade--in {
  animation: fadeIn 2s ease-in-out;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/*--------------------------320px----------------------*/
@media (min-width: 20rem) {
  .terminal-btn {
    display: none;
  }
  #site-header {
    width: 95%;
    margin: auto;
  }
}
/*-------------------------420px------------------------*/
@media (min-width: 26.25rem) {
}
/*--- Nav from desktop to mobile -640px- login links moved with js-------------------*/
@media (min-width: 40rem) {
  .terminal-btn {
    display: inline-flex;
  }
}
/*---------------------728px-----------------------------*/
@media (min-width: 45.5rem) {
}
/*-------------------------960 px-----------------------*/
@media (min-width: 60rem) {
}
/*--------------------------------1328 px---------------*/
@media (min-width: 83rem) {
}
</style>
