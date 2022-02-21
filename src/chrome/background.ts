import { copyTextClipboard } from "../chrome/utils";
export {}

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
    console.log('[background.js] onInstalled', details);
    alert('[background.js] onInstalled');
});

chrome.runtime.onConnect.addListener((port) => {
    console.log('[background.js] onConnect', port)
    alert('[background.js] onInstalled');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('[background.js] onStartup')
    alert('[background.js] onInstalled');
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
    console.log('[background.js] onSuspend')
   // alert('[background.js] onSuspend');
});


// storage changed
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//       console.log(
//         `Storage key "${key}" in namespace "${namespace}" changed.`,
//         `Old value was "${oldValue}", new value is "${newValue}".`
//       );
//     }
//   });

// Design choice: any encrption will return the cipher text and the key.
// if we replace clipboad with ciphertext/url, how should we return key?
        // 1. return key as alert();
        // 2. display key and ciphertext in popup window.


var pasteBinMenuItem = {
    "id": "pasteBin",
    "title": "Share via PasteBin", //name of menu
    "contexts": ['selection'] // what type of content menu appears on
}

var clipboardMenuItem = {
    "id": "clipboardMenuItem",
    "title": "Encrpyt to Clipboard",
    "contexts": ['selection']
} // if we allow user to select/choose the key, might need to add children to these menus
  // if keys are random and stored in password manager then not a problem

chrome.contextMenus.create(pasteBinMenuItem);
chrome.contextMenus.create(clipboardMenuItem);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    copyTextClipboard(clickData.selectionText);
    alert(clickData.menuItemId + "\n" + clickData.selectionText);
})
