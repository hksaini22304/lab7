const activityDiv = document.getElementById("activity");
const playlistDiv = document.getElementById("playlist");
const btn = document.getElementById("generateBtn");


btn. addEventListener("click", getPairing);

// Bored API mirror
 const BORED_URL = "https://apis.scrimba.com/bored/api/activity";

 // Deezer proxy + endpoints
 const DEEZER_PROXY = "https://proxy.corsfix.com/?";
 const DEEZER_ARTIST_SEARCH = "https://api.deezer.com/search/artist?q=";
 