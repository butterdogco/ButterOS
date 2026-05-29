const taskbar = document.getElementById("taskbar");
const desktop = document.getElementById("desktop");
const start = document.getElementById("startMenu");
const installedAppsGroupContainer = document.getElementById("installedAppsGroupContainer");
const time = document.getElementById("time");
const startup = document.getElementById("startupContainer");
const startupImg = startup.querySelector("img");

var BreakException = {};
let appCategories = [];
let daHubApps = [];
let butterdogcoApps = [];
let taskbarApps = [];
let desktopApps = [];
let startApps = [];

let isStartMenuOpen = false;
let openWindowsCount = 999;
let noGenreCategoryIndex = 0;

const STARTED_MAXIMIZED_SIZE_X_DECREASE = "10vw";
const STARTED_MAXIMIZED_SIZE_Y_DECREASE = "20vh";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MAX_DESKTOP_APPS = 40;
const MAX_TASKBAR_APPS = 40;
const DEFAULT_WINDOW_WIDTH = "800px";
const DEFAULT_WINDOW_HEIGHT = "600px";
const MAX_WINDOW_WIDTH = "100vw";
const MAX_WINDOW_HEIGHT = `calc(100vh - ${taskbar.offsetHeight}px - 4px)`;
const NO_GENRE_CATEGORY_NAME = "Uncatagorized";
const DA_HUB_URL = "https://dahub.butterdogco.com";
const DA_HUB_APPS_URL_PREFIX = `${DA_HUB_URL}/apps/`;
const DA_HUB_APPS_SCRIPT_URL = `${DA_HUB_URL}/js/apps.js`;
const BUTTERDOGCO_CARDS_SCRIPT_URL = "https://butterdogco.com/js/cards.js";

function onAppIconClicked(app = {}, clickEvent = undefined) {
  setStartMenuOpenState(false);
  createWindow(app, clickEvent || undefined);
}

function createAppIcon(app, smallIcon, clickEvent, defaultClickEventEnabled) {
  const element = document.createElement("button");
  element.classList.add("appIcon");
  element.classList.add(smallIcon !== true && "largeAppIcon" || "smallAppIcon");
  element.title = app.name;

  const image = document.createElement("img");
  image.classList.add("loading");
  image.setAttribute("loading", "lazy");
  image.setAttribute("alt", app.name || "App Icon");
  image.src = app.icon || "";
  image.onload = () => image.classList.remove("loading");
  element.onclick = function () {
    if (clickEvent) {
      clickEvent();
    }

    if (defaultClickEventEnabled == true || defaultClickEventEnabled == undefined) {
      onAppIconClicked(app);
    }
  };
  element.appendChild(image);

  if (smallIcon !== true) {
    const text = document.createElement("p");
    text.innerText = app.name;
    element.appendChild(text);
  }

  return element;
}

function addAppToDesktop(app) {
  if (desktopApps.length >= MAX_DESKTOP_APPS) {
    return;
  }

  const icon = createAppIcon(app, false);
  desktop.appendChild(icon);
  desktopApps.push(icon);
}

function addAppToStart(app, container) {
  const icon = createAppIcon(app, false, () => setStartMenuOpenState(false), true);
  if (container) {
    container.appendChild(icon);
  } else {
    start.appendChild(icon);
  }

  startApps.push(app);
}

function isAppInTaskbar(app) {
  return taskbarApps.indexOf(app) !== -1;
}

function addAppToTaskbar(app, id) {
  if (taskbarApps.length < MAX_TASKBAR_APPS) {
    const icon = createAppIcon(app, true, function () {
      const window = document.getElementById(`app${id}`);
      windowClicked(window);
    }, false);
    icon.setAttribute("data-window-id", id);
    taskbar.appendChild(icon);
    taskbarApps.push({ id, button: icon });
  }
}

function removeAppFromTaskbar(appId) {
  const appIndex = taskbarApps.findIndex(app => app.button.getAttribute("data-window-id") == String(appId));
  if (appIndex !== -1) {
    const app = taskbarApps[appIndex];
    app.button.remove();
    taskbarApps.splice(appIndex, 1);
  } else {
    console.log("App not found in taskbar:", appId);
  }
}

function windowClicked(div) {
  if (div.classList.contains("hidden")) {
    div.classList.remove("hidden");
  }

  const windows = document.querySelectorAll(".window");
  windows.forEach(function (otherWindow) {
    if (otherWindow != div) {
      otherWindow.style.zIndex -= 1;
    } else {
      div.style.zIndex = openWindowsCount;
    }
  });
}

function closeWindow(div) {
  openWindowsCount -= 1;
  div.style.animation = "windowClose 0.2s ease-in-out";
  setTimeout(() => {
    div.remove();
  }, 180);
}

function centerWindow(div) {
  div.style.top = `calc(${window.innerHeight / 2}px - (${div.style.height} / 2) - ${taskbar.offsetHeight / 2}px)`;
  div.style.left = `calc(${window.innerWidth / 2}px - (${div.style.width} / 2))`;
}

function maximizeWindow({ div, maximized = false, lastInfo, changePos = false, startedMaximized = false }) {
  if (maximized === true) {
    lastInfo.PosX = div.style.left;
    lastInfo.PosY = div.style.top;
    lastInfo.SizeX = div.style.width;
    lastInfo.SizeY = div.style.height;

    div.style.top = "0";
    div.style.left = "0";
    div.style.width = MAX_WINDOW_WIDTH;
    div.style.height = MAX_WINDOW_HEIGHT;
  } else {
    if (changePos == true || changePos == undefined) {
      if (lastInfo.PosX == "0" && lastInfo.PosY == "0") {
        centerWindow(div);
      } else {
        div.style.left = lastInfo.PosX;
        div.style.top = lastInfo.PosY;
      }
    }

    if (startedMaximized == true) {
      div.style.width = `calc(${lastInfo.SizeX || "100vw"} - ${STARTED_MAXIMIZED_SIZE_X_DECREASE})`;
      div.style.height = `calc(${lastInfo.SizeY || "100vh"} - ${STARTED_MAXIMIZED_SIZE_Y_DECREASE})`;
      centerWindow(div);
    } else {
      div.style.width = lastInfo.SizeX;
      div.style.height = lastInfo.SizeY;
    }
  }
  div.classList.toggle("maximized");

  return lastInfo;
}

function createWindow(app) {
  let lastInfo = {};
  let maximized = false;
  let minimized = false;

  let randomId = Math.floor(Math.random() * 1000000);
  if (document.getElementById(`app${randomId}`)) {
    while (document.getElementById(`app${randomId}`)) {
      randomId = Math.floor(Math.random() * 1000000);
    }
  }

  // Create elements and setup events
  const div = document.createElement("div");
  div.classList.add("window");
  div.setAttribute("id", `app${randomId}`);

  if (app.startsMaximized != null && app.startsMaximized === true) {
    maximizeWindow({ div: div, maximized: true, lastInfo: lastInfo, changePos: false });
    maximized = true;
  } else {
    div.style.width = app.width || DEFAULT_WINDOW_WIDTH;
    div.style.height = app.height || DEFAULT_WINDOW_HEIGHT;
    centerWindow(div);
  }

  div.addEventListener("mousedown", () => {
    windowClicked(div);
  });

  const titleBar = document.createElement("div");
  titleBar.classList.add("titleBar");
  titleBar.id = app.name + "header";
  titleBar.addEventListener("mousedown", function () {
    if (maximized === true) {
      maximized = false;
      maximizeWindow({ div: div, maximized: maximized, lastInfo: lastInfo, changePos: false, startedMaximized: app.startsMaximized });
    }
  });

  const titleBarIcon = document.createElement("img");
  titleBarIcon.classList.add("titleBarIcon");
  titleBarIcon.setAttribute("loading", "lazy");
  titleBarIcon.setAttribute("alt", app.name || "App Icon");
  titleBarIcon.src = app.icon || "";
  titleBar.appendChild(titleBarIcon);

  const titleBarText = document.createElement("p");
  titleBarText.classList.add("titleBarText");
  titleBarText.innerText = app.name || "App Name";
  titleBar.appendChild(titleBarText);

  const titleBarButtons = document.createElement("div");
  titleBarButtons.classList.add("titleBarButtons");

  const minimize = document.createElement("button");
  minimize.setAttribute("aria-label", "Minimize window");
  minimize.setAttribute("title", "Minimize window");
  minimize.classList.add("minimize", "titleButton");
  minimize.innerText = "-";
  minimize.onclick = () => {
    minimized = !minimized;
    div.classList.toggle("hidden");
  }
  titleBarButtons.appendChild(minimize);

  const expand = document.createElement("button");
  expand.setAttribute("aria-label", "Maximize window");
  expand.setAttribute("title", "Maximize window");
  expand.classList.add("expand", "titleButton");
  expand.innerText = "O";
  expand.onclick = () => {
    maximized = !maximized;
    lastInfo = maximizeWindow({ div: div, maximized: maximized, lastInfo: lastInfo, changePos: true, startedMaximized: app.startsMaximized });
  };
  titleBarButtons.appendChild(expand);

  const close = document.createElement("button");
  close.setAttribute("aria-label", "Close window");
  close.setAttribute("title", "Close window");
  close.classList.add("close", "titleButton");
  close.innerText = "X";
  close.onclick = () => {
    closeWindow(div);
    removeAppFromTaskbar(randomId);
  };
  titleBarButtons.appendChild(close);

  const iframe = document.createElement("iframe");
  iframe.src = app.url;

  titleBar.appendChild(titleBarButtons);
  div.appendChild(titleBar);
  div.appendChild(iframe);
  document.getElementById("workspace").appendChild(div);

  // On browser window resize, adjust the window position to make sure it's still in the viewport.
  // If not, clamp the position to the viewport.
  window.addEventListener("resize", () => {
    const rect = div.getBoundingClientRect();
    const newPosX = Math.max(0, Math.min(window.innerWidth - rect.width, rect.left));
    const newPosY = Math.max(0, Math.min(window.innerHeight - rect.height, rect.top));
    div.style.left = `${newPosX}px`;
    div.style.top = `${newPosY}px`;
  });

  // Final setup
  addAppToTaskbar(app, randomId);
  dragElement(div);
  windowClicked(div);
  openWindowsCount += 1;
}

function setStartMenuOpenState(open) {
  start.classList.toggle("closed", !open);
  isStartMenuOpen = open;
}

function onStartClicked() {
  setStartMenuOpenState(!isStartMenuOpen);
}

function updateTime() {
  const date = new Date();
  const month = MONTHS[date.getMonth()].substring(0, 3);
  const day = date.getDate();
  const hour = date.getHours() > 12 && date.getHours() - 12 || date.getHours();
  const minute = date.getMinutes() < 10 && "0" + date.getMinutes() || date.getMinutes();
  const suffix = date.getHours() > 12 && "PM" || "AM";
  time.innerText = `${hour}:${minute} ${suffix}\n${month}. ${day}`;
  setTimeout(updateTime, 1000);
}

/**
 * Function to update the desktop background. It assumes the file is a .jpg
 * @param {string} name - The name of the image file (without extension).
 */
function updateBackground(name) {
  document.body.classList.add("backgroundTransition");
  const img = new Image();
  img.src = `img/background/${name}.jpg`;
  img.onload = () => {
    document.body.classList.remove("backgroundTransition");
    document.body.style.backgroundImage = `url("img/background/${name}.jpg")`;
  };
}

function appCategoryExists(name) {
  let found = false;
  appCategories.forEach(function (category) {
    if (category.name == name) {
      found = true;
    }
  });

  return found;
}

function getAppCategoryIndex(name) {
  let index = null;
  try {
    appCategories.forEach(function (category, i) {
      if (category.name == name) {
        index = i;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return index;
}

function desktopClicked() {
  setStartMenuOpenState(false);
}

function startupImageLoaded() {
  startupImg.style.opacity = 1;
  startup.style.animation = "startupAnim 1.5s ease-in-out";
  startup.style.opacity = "";
  startup.classList.remove("visible");
}

function gotDaHubApps(apps) {
  apps.forEach(function (app) {
    if (app.Hidden) {
      return;
    }

    const info = {
      name: app.Name || "",
      icon: `${DA_HUB_APPS_URL_PREFIX}${app.Folder && app.Folder || app.Name}/${app.Thumbnail || "thumbnail.png"}`,
      url: `${DA_HUB_APPS_URL_PREFIX}${app.Folder && app.Folder || app.Name}/${app.Index || "index.html"}`,
      startsMaximized: true,
    };

    if (app.Genres != undefined) {
      app.Genres.forEach(function (genre) {
        if (appCategoryExists(genre) == false) {
          appCategories.push({
            ["name"]: genre,
            ["apps"]: []
          });
        }
        index = getAppCategoryIndex(genre);
        if (index) {
          appCategories[getAppCategoryIndex(genre)]["apps"].push(info);
        }
      });
    } else {
      if (appCategories[noGenreCategoryIndex] == undefined) {
        appCategories.push({
          ["name"]: NO_GENRE_CATEGORY_NAME,
          ["apps"]: []
        });
      }
      noGenreCategoryIndex = getAppCategoryIndex(NO_GENRE_CATEGORY_NAME);
      if (noGenreCategoryIndex != null) {
        appCategories[noGenreCategoryIndex]["apps"].push(info);
      }
    }
  });

  // Sort the categories
  appCategories.sort((a, b) => {
    // Compare the "name" attributes (in lowercase to ensure case-insensitive sorting)
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return -1; // a comes before b
    if (nameA > nameB) return 1;  // b comes before a
    return 0; // they are equal
  });

  const daHubAppsSection = document.getElementById("daHubAppsSection");
  const seperator = document.createElement("hr");
  daHubAppsSection.appendChild(seperator);

  const appsNoticeHeader = document.createElement("h2");
  appsNoticeHeader.innerText = "Apps from Da Hub";
  daHubAppsSection.appendChild(appsNoticeHeader);

  const appsNoticeText = document.createElement("p");
  appsNoticeText.innerText = "Grouped by category";
  daHubAppsSection.appendChild(appsNoticeText);

  // Add the apps to the start menu
  appCategories.forEach(function (category) {
    const apps = category["apps"];
    if (apps) {
      const text = document.createElement("h2");
      text.innerText = category.name && category.name.charAt(0).toUpperCase() + category.name.slice(1) || "Category";
      daHubAppsSection.appendChild(text);

      const appGroupContainer = document.createElement("div");
      appGroupContainer.classList.add("appGroup");
      apps.forEach(function (app) {
        addAppToStart(app, appGroupContainer);
      });
      daHubAppsSection.appendChild(appGroupContainer);
    }
  });
}

function gotButterDogApps(apps) {
  apps["apps"].forEach((app) => {
    let link = app.AltLink || app.Link || "";
    const lowerLink = link.toLowerCase();
    if (!lowerLink.includes("google.com") && !lowerLink.includes("b-dog.co") && !lowerLink.includes("butteros")) {
      if (!lowerLink.includes("http")) {
        link = `https://butterdogco.com/${link}`;
      }

      const info = {
        name: app.Name || "",
        icon: `https://butterdogco.com/${app.Icon}` || "",
        url: link || "#invalidLink",
        startsMaximized: false,
        width: "70vw",
        height: "70vh"
      };

      addAppToStart(info, installedAppsGroupContainer);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Update background when "updateBackground" message is received
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "updateBackground") {
      updateBackground(event.data.value);
    }
  });

  const savedBackground = localStorage.getItem("BUTTEROS_SETTING_Background") || "Crystal";
  if (savedBackground != "Crystal") {
    updateBackground(savedBackground);
  }

  builtInApps.forEach(function (app) {
    // addAppToTaskbar(app);
    addAppToDesktop(app);
    addAppToStart(app, installedAppsGroupContainer);
  });

  // Get Da Hub app list
  fetch(DA_HUB_APPS_SCRIPT_URL)
    .then(response => response.text())
    .then(scriptContent => {
      const script = document.createElement("script");
      script.textContent = scriptContent;
      document.head.appendChild(script);

      daHubApps = apps;
      gotDaHubApps(daHubApps);
    })
    .catch(err => console.error(err));

  // Get ButterDogCo app list
  fetch(BUTTERDOGCO_CARDS_SCRIPT_URL)
    .then(response => response.text())
    .then(scriptContent => {
      const script = document.createElement("script");
      script.textContent = scriptContent;
      document.head.appendChild(script);

      butterdogcoApps = cards;
      gotButterDogApps(butterdogcoApps);
    })
    .catch(err => console.error(err));

  desktop.addEventListener("click", desktopClicked);

  startup.classList.add("startup");
  setTimeout(() => {
    startupImageLoaded();
  }, 200);

  updateTime();
});
