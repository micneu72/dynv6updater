// ==== KONFIGURATION ==== //
const kodihost = 'DEIN-HOSTNAME.dynv6.net'; // <-- Anpassen!
const token = 'DEIN-TOKEN';                 // <-- Anpassen!

// ==== HILFSFUNKTIONEN ==== //
async function getWanIPv4() {
  let req = new Request("https://api.ipify.org?format=text");
  req.method = "GET";
  req.headers = { "Accept": "text/plain" };
  req.timeoutInterval = 5;
  try {
    let ip = await req.loadString();
    return ip.trim();
  } catch(e) {
    return null;
  }
}

async function getWanIPv6() {
  let req = new Request("https://api6.ipify.org?format=text");
  req.method = "GET";
  req.headers = { "Accept": "text/plain" };
  req.timeoutInterval = 5;
  try {
    let ip = await req.loadString();
    return ip.trim();
  } catch(e) {
    return null;
  }
}

async function getDnsIP(type) {
  try {
    const url = `https://cloudflare-dns.com/dns-query?name=${kodihost}&type=${type}`;
    let req = new Request(url);
    req.headers = { 'Accept': 'application/dns-json' };
    let data = await req.loadJSON();
    if (data.Answer && Array.isArray(data.Answer)) {
      const rec = data.Answer.find(a => a.type === (type === 'A' ? 1 : 28));
      return rec ? rec.data : null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function updateDynv6(ipv4, ipv6) {
  let url = `https://dynv6.com/api/update?hostname=${kodihost}&token=${token}`;
  if (ipv4) url += `&ipv4=${ipv4}`;
  if (ipv6) url += `&ipv6=${ipv6}`;
  let req = new Request(url);
  req.method = "GET";
  try {
    let resp = await req.loadString();
    return resp;
  } catch(e) {
    return "Fehler beim Update";
  }
}

// ==== HAUPTFUNKTION ==== //
async function main() {
  try {
    // 1. WAN-IPs ermitteln
    let myIPs = {
      ipv4: await getWanIPv4(),
      ipv6: await getWanIPv6()
    };

    // 2. DNS-Records ermitteln
    let currentARecord = await getDnsIP('A');
    let currentAAAARecord = await getDnsIP('AAAA');

    // 3. Update-Logik bestimmen
    let needUpdate4 = myIPs.ipv4 && myIPs.ipv4 !== currentARecord;
    let needUpdate6 = myIPs.ipv6 && myIPs.ipv6 !== currentAAAARecord;
    let updateType = "Kein Update nötig";
    let updateResponse = "DNS ist aktuell, kein Update durchgeführt.";

    // 4. Dynv6-Update ggf. durchführen
    if (needUpdate4 || needUpdate6) {
      updateType = [
        needUpdate4 ? "IPv4" : null,
        needUpdate6 ? "IPv6" : null
      ].filter(Boolean).join(" & ");
      updateResponse = await updateDynv6(needUpdate4 ? myIPs.ipv4 : null, needUpdate6 ? myIPs.ipv6 : null);
    }

    // 5. HTML für WebView
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>dynv6 Update</title>
      <style>
        body { font-family: -apple-system, sans-serif; margin: 20px; background-color: #f5f5f7;}
        h2 { margin-bottom: 0.5em; color: #1d1d1f;}
        table { border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom: 1em; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;}
        th, td { border: 1px solid #e5e5e5; padding: 12px; text-align: left; font-size: 14px;}
        th { background: #f8f8f8; font-weight: 600;}
        .resp { white-space: pre-wrap; background: white; border-radius: 8px; padding: 15px; font-family: monospace; font-size: 13px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 15px;}
        .update-type { color: #2c5282; font-weight: bold;}
        .status-header { font-weight: 600; margin-top: 20px; color: #1d1d1f;}
      </style>
    </head>
    <body>
      <h2>dynv6 Update Ergebnis</h2>
      <table>
        <tr><th>Feld</th><th>Wert</th></tr>
        <tr><td>Hostname</td><td>${kodihost}</td></tr>
        <tr><td>WAN IPv4</td><td>${myIPs.ipv4 || "nicht verfügbar"}</td></tr>
        <tr><td>WAN IPv6</td><td>${myIPs.ipv6 || "nicht verfügbar"}</td></tr>
        <tr><td>A-Record (DNS)</td><td>${currentARecord || "n/a"}</td></tr>
        <tr><td>AAAA-Record (DNS)</td><td>${currentAAAARecord || "n/a"}</td></tr>
        <tr><td>Update-Typ</td><td class="update-type">${updateType}</td></tr>
      </table>
      <div class="status-header">dynv6-Antwort:</div>
      <div class="resp">${updateResponse}</div>
    </body>
    </html>
    `;

    // 6. WebView anzeigen
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
}

// ==== SCRIPT AUSFÜHREN ==== //
await main();
