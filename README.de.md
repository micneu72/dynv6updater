# Dynv6up -Daten

Dynv6.com JavaScript, iPS vom iPhone (skriptierbar) aktualisieren

## Installation und Konfiguration von**Dynv6updater.js**für skriptierbar

In diesem Dokument wird Schritt für Schritt beschrieben, wie Sie ein JavaScript -Skript (z. B. für DynDNS/IP -Abfragen) in scriptable auf iOS installieren und konfigurieren.

* * *

### 1. Platzieren Sie das Skript im iCloud -Laufwerk

1.  **Ordner finden**  
    Öffne deine**iCloud Drive**(über die Dateien -App auf iPhone/iPad oder über die Dateien[icloud.com](https://icloud.com)im Browser).

2.  **Verzeichnis`Scriptable`**  
    Navigieren zum`Scriptable`Ordner. Dies wird automatisch von der skriptierbaren App überwacht.

3.  **Datei hochladen**  
    Platzieren Sie Ihr Skript als als`.js`Datei in diesem Ordner. In unserem Beispiel heißt es**`dynv6updater.js`**.
    -   Alternativ können Sie das Skript in einen beliebigen Ordner kopieren und später in skriptierbar importieren.
    -   Wenn Sie unterwegs nur Zugriff auf einen PC/Mac haben[icloud.com](https://icloud.com).

* * *

### 2. Das Skript in skriptierbar anzeigen

1.  **Öffnen Sie die skriptierbare App**  
    Starten Sie die**Skriptierbare App**Auf Ihrem iPhone oder iPad.

2.  **Automatische Synchronisation**  
    Warten Sie einen Moment, bis die iCloud -Synchronisation abgeschlossen ist.
    -   Alle Skripte im iCloud -Ordner`Scriptable`werden automatisch in der App aufgeführt.

3.  **Wählen Sie Skript**  
    Tippen Sie auf den Namen**`dynv6updater.js`**So öffnen Sie den Quellcode in skriptierbar.

* * *

### 3. Einstellen Sie Variablen

In einigen Skripten (z. B. für DynDNs) müssen Sie sich anpassen**Hostname**und/oder**Token**Vor dem Laufen:

1.  **Quellcode bearbeiten**  
    Scrollen Sie zu dem Abschnitt, in dem Ihre Variablen definiert sind. Beispiel:
    ```js
    let kodihost   = "meinhost.dedyn.io";  // <-- deinen dynv6-Hostnamen hier eintragen
    let dedynToken = "MEIN_SUPER_TOKEN";   // <-- deinen dynv6.com-Token hier einfügen
    ```
