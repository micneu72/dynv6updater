# dynv6updater
dynv6.com javascript, update IPs from iPhone (scriptable)

## Installation und Konfiguration des Skripts **getIP.js** für Scriptable

Dieses Dokument beschreibt Schritt für Schritt, wie du ein JavaScript-Skript (z. B. für DynDNS-/IP-Abfragen) in Scriptable auf iOS installierst und konfigurierst.

---

### 1. Skript in iCloud Drive ablegen

1. **Ordner finden**  
   Öffne deinen **iCloud Drive** (über die Dateien-App auf dem iPhone/iPad oder über [icloud.com](https://icloud.com) im Browser).

2. **Verzeichnis `Scriptable`**  
   Navigiere in den Ordner `Scriptable`. Dieser wird von der Scriptable-App automatisch überwacht.

3. **Datei hochladen**  
   Lege dein Skript als `.js`-Datei in diesem Ordner ab. In unserem Beispiel heißt es **`dynv6updater.js`**.  
   - Alternativ kannst du das Skript in einen beliebigen Ordner kopieren und es später in Scriptable importieren.  
   - Wenn du unterwegs nur Zugriff auf einen PC/Mac hast, kannst du das Skript auch über [icloud.com](https://icloud.com) hochladen.

---

### 2. Skript in Scriptable anzeigen

1. **Scriptable-App öffnen**  
   Starte die **Scriptable-App** auf deinem iPhone oder iPad.

2. **Automatische Synchronisierung**  
   Warte einen kurzen Augenblick, bis die iCloud-Synchronisierung abgeschlossen ist.  
   - Alle Skripte im iCloud-Ordner `Scriptable` werden automatisch in der App gelistet.

3. **Skript auswählen**  
   Tippe auf den Namen **`dynv6updater.js`**, um den Quellcode in Scriptable zu öffnen.

---

### 3. Variablen anpassen

In manchen Skripten (z. B. für DynDNS) musst du **Hostname** und/oder **Token** vor dem Ausführen anpassen:

1. **Quellcode bearbeiten**  
   Scrolle zum Abschnitt, in dem deine Variablen definiert sind. Beispiel:
   ```js
   let kodihost   = "meinhost.dedyn.io";  // <-- deinen dynv6-Hostnamen hier eintragen
   let dedynToken = "MEIN_SUPER_TOKEN";   // <-- deinen dynv6.com-Token hier einfügen
