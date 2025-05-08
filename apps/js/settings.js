const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const settingsStoragePrefix = "BUTTEROS_SETTING_";
const settings = [];

function createSidebarCategory(name) {
    const category = document.createElement("div");
    category.classList.add("sidebarCategory");
    category.setAttribute("role", "button");
    const header = document.createElement("h2");
    header.textContent = name;
    category.appendChild(header);
    return category;
}

function createMainContent(name) {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("settingCategory");
    const header = document.createElement("h2");
    header.textContent = name;
    contentDiv.appendChild(header);
    return contentDiv;
}

// Function to add a setting
function addSetting(name="", value, values=[], category="General", initFunc=()=>{}, updateFunc=()=>{}) {
    // Check if the category already exists
    const categoryExists = settings.some(setting => setting.category === category);
    if (!categoryExists) {
        // If not, create a new category
        settings.push({ category, settings: [] });
    }
    
    const categoryObject = settings.find(setting => setting.category === category);
    categoryObject.settings.push({ name, value, values, initFunc, updateFunc });
}

function addSettingsToPage() {
    // Sort categories alphabetically
    settings.sort((a, b) => a.category.localeCompare(b.category));
    settings.forEach(category => {
        const categoryElement = createSidebarCategory(category.category);
        sidebar.appendChild(categoryElement);
        
        const mainContent = createMainContent(category.category);
        content.appendChild(mainContent);

        category.settings.forEach(setting => {
            const settingElement = document.createElement("div");
            settingElement.classList.add("setting");
            const label = document.createElement("label");
            label.textContent = setting.name;
            settingElement.appendChild(label);
            
            const select = document.createElement("select");
            setting.values.forEach(value => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                if (value === setting.value) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            
            select.value = setting.value;
            select.addEventListener("change", () => {
                setting.value = select.value;
                localStorage.setItem(settingsStoragePrefix + setting.name, select.value);
                setting.updateFunc(setting.value, settingElement);
            });
            
            settingElement.appendChild(select);
            mainContent.appendChild(settingElement);
            setting.initFunc(settingElement);
        });

        const click = () => {
            mainContent.classList.toggle("hidden");
            categoryElement.classList.toggle("active", !mainContent.classList.contains("hidden"));
        }

        categoryElement.addEventListener("click", click);
        click();
    });
}

// When not in an iframe
if (window.self === window.top) {
    document.body.style.backgroundColor = "#000000";
}

// Add settings
addSetting(
    "Background",
    "Crystal", 
    ["Crystal", "Gliding stars", "Starlapse", "WD2_Barge", "WD2_CanalTunnels", "WD2_Clarion", "WD2_Crane_view", "WD2_Greenhouse", "WD2_NewDawn", "WD2_Nudle", "WD2_Oakland", "WD2_San_Francisco", "WD2_SOMA", "WD2_Tidis", "WD2_TwinPeaks", "WD2_VistaTwinPeaks"],
    "Appearance", 
    (element) => { // Initialize the setting
        const value = localStorage.getItem(settingsStoragePrefix + "Background") || "Crystal";
        const select = element.querySelector("select");
        if (value != null && select != null) {
            select.value = value;
        }
    },
    (value) => { // Update the setting
        // Send a message to the iframe to update the background
        if (window.self !== window.top) {
            window.parent.postMessage({ type: "updateBackground", value: value }, "*");
        }
    }
);
addSettingsToPage();