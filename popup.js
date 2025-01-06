document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("settings-modal");
    const saveButton = document.getElementById("save-settings");
    const cancelButton = document.getElementById("cancel-settings");
    const closeModal = document.getElementById("close-modal");
    const playButton = document.getElementById("play-icon");
    const stopButton = document.getElementById("stop-icon");
    const refreshButton = document.getElementById("refresh-icon");
    const languageDisplay = document.getElementById("language-display");
    const languageText = document.getElementById("language-text");
    const languageDropdown = document.getElementById("language");
    const themeDropdown = document.getElementById("theme");
    const prismTheme = document.getElementById("prism-theme");
    const editor = document.getElementById("editor");

    let isWriting = false;
    let pasteInterval = null;
    let currentIndex = 0;
    let content = '';
    let mode = '';
    let speed = 10;
    let isFullScreen = JSON.parse(localStorage.getItem("isFullScreen")) || false;
    
    const info = [
        "function displayProfile_Tahir() {",
        "                                 let educationStatus = 'Pursuing Computer Science & Engineering';",
        "           if (educationStatus === 'Pursuing Computer Science & Engineering') {",
        "                                                                  console.log('Still learning and expanding skillset in programming and design.');",
        "                   } else {",
        "                                               console.log('Graduated and ready to conquer the professional world!');",
        "                                  }",
        "                                                                        profile_Tahir();",
        "                            }",
    
        "                                              function checkSkills_Tahir() {",
        "                  let skills = ['Programming', 'Web Development', 'UI/UX Design', 'Cybersecurity'];",
        "                                   if (skills.includes('Programming') && skills.includes('Web Development')) {",
        "                                                                                   console.log('Skills are being constantly refined and expanded.');",
        "                                             } else {",
        "                       console.log('Skillset improvement in progress.');",
        "               }",
        "                                       console.log('Current skills: ' + skills.join(', '));",
        "                             }",
    
        "                                                         function contactDetails_Tahir() {",
        "                                  let email = 'tahirnaseer@gmail.com';",
        "                                                                                    let github = 'https://github.com/imtahirnaseer';",
        "                            let website = 'https://imtahirnaseer.github.io/Portfolio/';",
        "                                                                                         let linkedin = 'https://www.linkedin.com/in/imtahirnaseer/';",
        "                    let instagram = 'https://www.instagram.com/imtahirnaseer/';",
        "                                                               console.log('Contact me via:');",
        "        console.log('Email: ' + email);",
        "                                                   console.log('GitHub: ' + github);",
        "                                                                                                console.log('Website: ' + website);",
        "                                              console.log('LinkedIn: ' + linkedin);",
        "                                                                          console.log('Instagram: ' + instagram);",
        "                                }",
    
        "                                                                              function showcaseProfile_Tahir() {",
        "                        console.log('Displaying the complete profile...');",
        "                                                                                                            displayProfile_Tahir();",
        "                               checkSkills_Tahir();",
        "                                                                                                                                   contactDetails_Tahir();",
        "                                                                 }",
    
        "                                                      // Run the profile showcase",
        "                                                                                                                                                            showcaseProfile_Tahir();"
    ];
    
    
    const displayInfo = () => {
        let infoIndex = 0;
    
        const printNextCharacter = (text, textIndex, p) => {
            if (textIndex < text.length) {
                p.textContent += text.charAt(textIndex);
                p.style.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
                p.style.textShadow = "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4)";
                
                // Automatically scroll to the caret position
                autoScroll();
    
                setTimeout(() => printNextCharacter(text, textIndex + 1, p), speed);
            } else {
                infoIndex++;
                if (infoIndex < info.length) {
                    setTimeout(printNextLine, 500);
                }
            }
        };
    
        const printNextLine = () => {
            if (infoIndex < info.length) {
                const p = document.createElement("p");
                editor.appendChild(p);
                printNextCharacter(info[infoIndex], 0, p);
            }
        };
    
        const autoScroll = () => {
            // Check if the caret is near the bottom of the editor
            const editorHeight = editor.scrollHeight;
            const editorBottom = editor.scrollTop + editor.clientHeight;
            
            // If the editor is near the bottom, scroll it down automatically
            if (editorHeight - editorBottom < 50) {
                editor.scrollTop = editorHeight;
            }
        };
    
        printNextLine();
    };
    
    displayInfo();
    
    

    const languageThemes = {
        html: "tomorrow",
        javascript: "coy",
        css: "okaidia",
        python: "solarizedlight",
        java: "dark",
        c: "funky",
        csharp: "twilight",
        cpp: "dracula",
        php: "night-owl",
        ruby: "shade-of-purple",
        swift: "oceanic-next",
        typescript: "vs",
        go: "atom-dark",
        rust: "duotone-dark",
        kotlin: "nord",
        scala: "ghcolors",
        r: "ayu-light",
        perl: "gruvbox-dark",
        lua: "synthwave",
        bash: "nord",
        powershell: "material-darker",
        sql: "one-light",
        dart: "panda",
        haskell: "base16",
        elixir: "solarized-dark",
        clojure: "prism",
        fsharp: "prism-okaidia"
    };

    const languageIcons = {
        html: "fa-code",
        javascript: "fa-js",
        css: "fa-css3-alt",
        python: "fa-python",
        java: "fa-coffee",
        c: "fa-c",
        csharp: "fa-c",
        cpp: "fa-c",
        php: "fa-php",
        ruby: "fa-gem",
        swift: "fa-swift",
        typescript: "fa-js",
        go: "fa-golang",
        rust: "fa-rust",
        kotlin: "fa-kotlin",
        scala: "fa-scala",
        r: "fa-r-project",
        perl: "fa-project-diagram",
        lua: "fa-lira-sign",
        bash: "fa-terminal",
        powershell: "fa-terminal",
        sql: "fa-database",
        dart: "fa-bullseye",
        haskell: "fa-project-diagram",
        elixir: "fa-project-diagram",
        clojure: "fa-project-diagram",
        fsharp: "fa-project-diagram"
    };

    const updateLanguageDisplay = (selectedLanguage) => {
        const selectedIcon = languageIcons[selectedLanguage] || "fa-code";
        languageDisplay.querySelector("i").className = `fa-solid ${selectedIcon}`;
        languageText.textContent = selectedLanguage ? selectedLanguage.toUpperCase() : "LANGUAGE";
    };

    const applyLanguageAndTheme = (selectedLanguage, selectedTheme = null) => {
        const language = selectedLanguage || 'html';
        const theme = selectedTheme || languageThemes[language];

        editor.className = `language-${language}`;

        const newThemeUrl = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-${theme}.min.css`;
        const newPrismTheme = prismTheme.cloneNode();
        newPrismTheme.href = newThemeUrl;

        prismTheme.replaceWith(newPrismTheme);
        newPrismTheme.onload = () => Prism.highlightElement(editor);

        updateLanguageDisplay(language);
    };

    const saveSettings = () => {
        const selectedLanguage = languageDropdown.value;
        const selectedTheme = themeDropdown.value;
        applyLanguageAndTheme(selectedLanguage, selectedTheme);
        modal.classList.add("hidden");
    };

    saveButton.addEventListener("click", saveSettings);
    cancelButton.addEventListener('click', () => modal.classList.add('hidden'));
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.add('hidden');
    });

    document.getElementById("settings-icon").addEventListener("click", () => modal.classList.remove("hidden"));

    applyLanguageAndTheme('Creator Information');

    const pasteFunction = () => {
        if (!isWriting) return;
    
        const lines = content.split("\n"); // Split content into lines
    
        const scrollToBottom = () => {
            // Ensure the editor scrolls to the bottom whenever a line is added.
            editor.scrollTop = editor.scrollHeight;
        };
    
        if (mode === "character") {
            if (currentIndex < content.length) {
                editor.innerHTML = content.substring(0, currentIndex) + "<span class='caret'>|</span>";
                currentIndex++;
                setTimeout(pasteFunction, speed); // Move to the next character
                scrollToBottom();  // Scroll to the bottom of the editor
            } else {
                editor.innerHTML = content; // Finish and remove caret
                isWriting = false;
                Prism.highlightElement(editor);
            }
        } else if (mode === "word") {
            const currentLineWords = lines[currentIndex]?.split(/\s+/) || []; // Words of the current line
            let wordIndex = 0;
    
            const printNextWord = () => {
                if (wordIndex < currentLineWords.length) {
                    editor.innerHTML += currentLineWords[wordIndex] + " ";
                    wordIndex++;
                    setTimeout(printNextWord, speed); // Print next word
                } else {
                    editor.innerHTML += "<br>"; // Move to the next line
                    currentIndex++;
                    if (currentIndex < lines.length) {
                        setTimeout(pasteFunction, speed); // Move to the next line
                    } else {
                        isWriting = false; // Finish when all lines are done
                        Prism.highlightElement(editor);
                    }
                }
                scrollToBottom(); // Scroll to the bottom of the editor
            };
    
            printNextWord();
        } else if (mode === "line") {
            if (currentIndex < lines.length) {
                editor.innerHTML += lines[currentIndex] + "<br>";
                currentIndex++;
                setTimeout(pasteFunction, speed); // Move to the next line
            } else {
                isWriting = false; // Finish when all lines are done
                Prism.highlightElement(editor);
            }
            scrollToBottom(); // Scroll to the bottom of the editor
        } else if (mode === "full") {
            editor.innerHTML = content; // Paste all content at once
            isWriting = false; // Finish immediately
            Prism.highlightElement(editor);
            scrollToBottom(); // Ensure the editor scrolls to the bottom when pasting all
        }
    };

    editor.addEventListener("paste", (event) => {
        mode = document.getElementById("mode").value;
        speed = parseInt(document.getElementById("speed").value, 10) || 500;

        event.preventDefault();
        navigator.clipboard.readText().then((text) => {
            content = text;
            editor.innerHTML = "";
            currentIndex = 0;
            isWriting = true;
            pasteFunction();
        }).catch((err) => console.error('Failed to read clipboard contents:', err));
    });

    playButton.addEventListener("click", () => {
        if (!isWriting && content) {
            isWriting = true;
            pasteFunction();
        }
    });

    stopButton.addEventListener("click", () => {
        isWriting = false;
        clearTimeout(pasteInterval);
    });

    refreshButton.addEventListener("click", () => {
        localStorage.setItem("isFullScreen", JSON.stringify(isFullScreen));
        location.reload();
    });

     const robotIcon = document.getElementById('robot-icon');
    document.getElementById("robot-icon").addEventListener("click", function () {
        window.location.href = "https://imtahirnaseer.github.io/Advanced-Virtual-Assistant/";
    });

    const instagramIcon = document.getElementById('instagram-icon');
    document.getElementById("instagram-icon").addEventListener("click", function () {
        window.location.href = "https://www.instagram.com/imtahirnaseer/";
    });

    const githubIcon = document.getElementById('github-icon');
    document.getElementById("github-icon").addEventListener("click", function () {
        window.location.href = "https://github.com/imtahirnaseer";
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveSettings();
        }
    });

    // Minimize and Maximize functionality
    const screenIcon = document.createElement("div");
    screenIcon.id = "screen-icon";
    screenIcon.innerHTML = isFullScreen ? "<i class='fa-solid fa-compress'></i>" : "<i class='fa-solid fa-expand'></i>";
    document.body.appendChild(screenIcon);

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
            screenIcon.innerHTML = "<i class='fa-solid fa-compress'></i>";
        } else {
            document.exitFullscreen();
            screenIcon.innerHTML = "<i class='fa-solid fa-expand'></i>";
        }
        isFullScreen = !isFullScreen;
        localStorage.setItem("isFullScreen", JSON.stringify(isFullScreen));
    };

    screenIcon.addEventListener("click", toggleFullScreen);

    screenIcon.addEventListener("mouseover", () => {
        screenIcon.style.opacity = "1";
    });

    screenIcon.addEventListener("mouseout", () => {
        screenIcon.style.opacity = "0.6";
    });

    screenIcon.style.position = "fixed";
    screenIcon.style.bottom = "32px";
    screenIcon.style.right = "14px";
    screenIcon.style.backgroundColor = "#333";
    screenIcon.style.color = "#fff";
    screenIcon.style.padding = "10px";
    screenIcon.style.borderRadius = "50%";
    screenIcon.style.cursor = "pointer";
    screenIcon.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    screenIcon.style.opacity = "0.6";
    screenIcon.style.transition = "opacity 0.3s ease";

    // Preserve full-screen state on load
    if (isFullScreen) {
        document.documentElement.requestFullscreen();
    }
});
