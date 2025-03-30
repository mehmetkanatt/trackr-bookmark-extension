let serverUrl = "";
let apiToken = "";

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "saveHighlight",
        title: "Save highlight to Trackr",
        contexts: ["selection"],
        icons: {
            "16": "favicon.ico", // Path to icon for selected text item
            "32": "favicon.ico",
            "48": "favicon.ico"
        }
    });

    browser.contextMenus.create({
        id: "saveBookmark",
        title: "Save bookmark to Trackr",
        contexts: ["page"],
        icons: {
            "16": "favicon.ico", // Path to icon for selected text item
            "32": "favicon.ico",
            "48": "favicon.ico"
        }
    });

    browser.contextMenus.create({
        id: "extensionMenu",
        title: "Extension Menu",
        contexts: ["browser_action"]
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info)
    if (info.menuItemId === "saveHighlight") {
        const payload = {
            highlight: info.selectionText,
            bookmark: info.pageUrl,
            title: tab.title
        };

        fetch(serverUrl + "/api/highlights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Trackr-Token": apiToken
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error));
    }

    if (info.menuItemId === "saveBookmark") {
        const payload = {
            bookmark: info.pageUrl,
            title: tab.title
        };

        fetch(serverUrl + "/api/bookmarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Trackr-Token": apiToken
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error));
    }
});

browser.browserAction.onClicked.addListener(() => {
    const payload = {
        bookmark: info.pageUrl,
        title: tab.title
    };

    fetch(serverUrl + "/api/bookmarks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Trackr-Token": apiToken
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(data => console.log("Success:", data))
        .catch(error => console.error("Error:", error));
});