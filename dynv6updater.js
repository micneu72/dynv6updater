// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;

//--------------------------------------------------
// 1) IP-Validierung
//--------------------------------------------------
function isIPv4(ip) {
  let ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return false;
  
  return ip.split('.').every(num => {
    let n = parseInt(num);
    return n >= 0 && n <= 255;
  });
}

function isIPv6(ip) {
  const ipv6Regex = /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:))$/;
  return ipv6Regex.test(ip);
}

//--------------------------------------------------
// 2) IP-Abfrage
//--------------------------------------------------
async function getPublicIPs() {
  const services = [
    "https://ip.micneu.de?format=json",
    "https://api.ipify.org?format=json",
    "https://api64.ipify.org?format=json"
  ];
  
  let ips = { ipv4: null, ipv6: null };
  
  for (let service of services) {
    try {
      let req = new Request(service);
      let result = await req.loadJSON();
      let ip = result.ip;
      
      if (isIPv4(ip)) ips.ipv4 = ip;
      if (isIPv6(ip)) ips.ipv6 = ip;
      
      if (ips.ipv4 && ips.ipv6) break;
    } catch (e) {
      console.log(`Fehler bei ${service}: ${e}`);
    }
  }
  
  return ips;
}

//--------------------------------------------------
// 3) dynv6-Update-Funktion
//--------------------------------------------------
async function updateDynv6(hostname, ipv4, ipv6, token) {
  let results = { ipv4: null, ipv6: null };
  
  if (ipv4) {
    let req4 = new Request(`https://ipv4.dynv6.com/api/update?hostname=${hostname}&token=${token}&ipv4=${ipv4}`);
    results.ipv4 = await req4.loadString();
  }
  
  if (ipv6) {
    let req6 = new Request(`https://ipv6.dynv6.com/api/update?hostname=${hostname}&token=${token}&ipv6=${ipv6}`);
    results.ipv6 = await req6.loadString();
  }
  
  return results;
}

//--------------------------------------------------
// 4) Haupt-Skript
//--------------------------------------------------
(async () => {
  // 4.1) Konfiguration
  const hostname = "DEIN_HOSTNAME";  // z.B. "meinserver.dynv6.net"
  const token = "DEIN_TOKEN";        // Dein dynv6.com API-Token

  try {
    // 4.2) IPs abrufen
    let myIPs = await getPublicIPs();
    
    if (!myIPs.ipv4 && !myIPs.ipv6) {
      throw new Error("Keine gültige IP gefunden!");
    }

    // 4.3) Update durchführen
    let updateResult = await updateDynv6(
      hostname,
      myIPs.ipv4,
      myIPs.ipv6,
      token
    );

    // 4.4) HTML für WebView
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>dynv6 Update</title>
  <style>
    body { 
      font-family: -apple-system, sans-serif; 
      margin: 20px; 
      background-color: #f5f5f7;
    }
    h2 { 
      margin-bottom: 0.5em; 
      color: #1d1d1f;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 600px;
      margin-bottom: 1em;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      border: 1px solid #e5e5e5;
      padding: 12px;
      text-align: left;
      font-size: 14px;
    }
    th { 
      background: #f8f8f8;
      font-weight: 600;
    }
    .resp {
      white-space: pre-wrap;
      background: white;
      border-radius: 8px;
      padding: 15px;
      font-family: monospace;
      font-size: 13px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <h2>dynv6 Update Ergebnis</h2>
  <table>
    <tr><th>Feld</th><th>Wert</th></tr>
    <tr><td>Hostname</td><td>${hostname}</td></tr>
    <tr><td>IPv4</td><td>${myIPs.ipv4 || "nicht verfügbar"}</td></tr>
    <tr><td>IPv6</td><td>${myIPs.ipv6 || "nicht verfügbar"}</td></tr>
    <tr><td>IPv4 Update</td><td>${updateResult.ipv4 || "nicht durchgeführt"}</td></tr>
    <tr><td>IPv6 Update</td><td>${updateResult.ipv6 || "nicht durchgeführt"}</td></tr>
  </table>
</body>
</html>
    `;

    // 4.5) WebView anzeigen
    let wv = new WebView();
    await wv.loadHTML(html);
    await wv.present();

  } catch (error) {
    console.error(error);
    let alert = new Alert();
    alert.title = "Fehler";
    alert.message = error.message;
    await alert.present();
  }
})();
