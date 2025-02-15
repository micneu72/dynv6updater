# dynv6updater
dynv6.com javascript, update IPs from iPhone (scriptable)

## Installation and Configuration of **dynv6updater.js** for Scriptable

This document describes step by step how to install and configure a JavaScript script (e.g., for DynDNS/IP queries) in Scriptable on iOS.

---

### 1. Place Script in iCloud Drive

1. **Find Folder**  
   Open your **iCloud Drive** (via the Files app on iPhone/iPad or via [icloud.com](https://icloud.com) in browser).

2. **Directory `Scriptable`**  
   Navigate to the `Scriptable` folder. This is automatically monitored by the Scriptable app.

3. **Upload File**  
   Place your script as a `.js` file in this folder. In our example, it's called **`dynv6updater.js`**.  
   - Alternatively, you can copy the script to any folder and import it into Scriptable later.  
   - If you only have access to a PC/Mac while on the go, you can also upload the script via [icloud.com](https://icloud.com).

---

### 2. View Script in Scriptable

1. **Open Scriptable App**  
   Launch the **Scriptable app** on your iPhone or iPad.

2. **Automatic Synchronization**  
   Wait a moment for iCloud synchronization to complete.  
   - All scripts in the iCloud folder `Scriptable` are automatically listed in the app.

3. **Select Script**  
   Tap the name **`dynv6updater.js`** to open the source code in Scriptable.

---

### 3. Adjust Variables

In some scripts (e.g., for DynDNS) you need to adjust **hostname** and/or **token** before running:

1. **Edit Source Code**  
   Scroll to the section where your variables are defined. Example:
   ```js
   let kodihost   = "meinhost.dedyn.io";  // <-- deinen dynv6-Hostnamen hier eintragen
   let dedynToken = "MEIN_SUPER_TOKEN";   // <-- deinen dynv6.com-Token hier einfügen
