const activityDiv = document.getElementById("activity");
const playlistDiv = document.getElementById("playlist");
const btn = document.getElementById("generateBtn");


btn. addEventListener("click", getPairing);

// Bored API mirror
 const BORED_URL = "https://apis.scrimba.com/bored/api/activity";

 // Deezer proxy + endpoints
 const DEEZER_PROXY = "https://proxy.corsfix.com/?";
 const DEEZER_ARTIST_SEARCH = "https://api.deezer.com/search/artist?q=";


 //-------------------------------------
 // 1) Activity → VIBE BUCKETS
 // ------------------------------------

 const typeToMusicKeywords = {

     education: [
    "lofi coding",
    "focus",
    "focus beats",
    "deep work",
    "instrumental study",
    "soft piano",
    "ambient concentration",
    "productive indie",
    "classical focus"
  ],

  recreational: [
     "upbeat",
    "summer vibes",
    "feel good pop",
    "indie pop",
    "alt fun",
    "road trip",
    "dance chill",
    "happy acoustic",
    "retro fun"
  ], 

  social: [
     "party hits",
    "dance pop",
    "throwbacks",
    "girls night",
    "karaoke pop",
    "club energy",
    "latin party",
    "afrobeats party",
    "r&b slow jams"
  ],

  charity: [
    "uplifting",
    "inspiring acoustic",
    "hopeful pop",
    "soulful gospel",
    "feel good indie",
    "peaceful ambient",
    "heartwarming piano"
  ],

  cooking: [
    "chill kitchen jazz",
    "bossa nova",
    "r&b chill",
    "cafe vibes",
    "italian dinner",
    "soft indie",
    "oldies cooking",
    "funky kitchen",
    "late night snacks"
  ],

  relaxation: [
"calm ambient",
    "soft piano",
    "mindfulness",
    "spa music",
    "sleepy lo-fi",
    "rainy day",
    "acoustic calm",
    "nature chill",
    "meditation bowls"
  ],

  









 }