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

  busywork: [
    "productivity",
    "work music",
    "focus beats",
    "hyperfocus",
    "cleaning groove",
    "motivation pop",
    "energetic indie",
    "study sprint"
  ]
};


function chooseMusicKeyword(activityText, type) {
    const text = activityText.toLowerCase();

    //1) Phrase rules first
    for (const rule of phraseToKeywordRules) {
        if (rule.match.some(m => text.includes(m))) return rule.keyword;
    }

    //2) fallback to type buckets 
    const options = typeToMusicKeywords[type] || ["chill"];
    return options[Math.floor(Math.random() * options.length)];


}


// ------------------------------
// 2) VIBE  → ARTISTS 
// ------------------------------

const vibeArtists = {
    // -- EDUCATION vibes --- 




    // --- RECREATIONAL vibes ---



    // --- SOCIAL vibes ---


    // --- CHARITY vibes ---



    // --- COOKING vibes ---


    // --- RELAXATION vibes ---




    // --- BUSYWORK vibes ---



};

//If a phrase rule picks something not in vibeArtists, 
// we still want a fallback list:

const DEFAULT_ARTISTS = [];


// ------------------------
// 3) HELPERS FOR DIVERSE PLAYLIST
// ------------------------ 

function pickRandomArtists(list, n = 5) {
    const copy = [...list];
    const picked = [];
    while (copy.length && picked.length < n) {
        const i = Math.floor(Math.random() * copy.length);
        picked.push(copy.splice(i,1)[0]);
    }
    return picked;
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


async function getArtistIdbyName(name) {
    const searchUrl = `${DEEZER_ARTIST_SEARCH}${encodeURIComponent(name)}`;
    const proxied = `${DEEZER_PROXY}${searchUrl}`;

    const res = await fetch(proxied);
    const data = await res.json();

    return data.data && data.data[0] ? data.data[0].id : null;

}

async function getTopTracksByArtistId(artistId, limit = 1) {
    const topUrl = `https://api.deezer.com/artist/${artistId}/top?limit=${limit}`;
    const proxied = `${DEEZER_PROXY}${topUrl}`;
    
    const res = await fetch(proxied);
    const data = await res.json();

    return data.data || [];
}


// DIVERSE PLAYLIST: 
// 5 artists from same vibe, 1 top track each
async function fetchDeezerPlaylistForVibe(vibe) {
    const pool = vibeArtists[vibe] || DEFAULT_ARTISTS;
    const chosenArtists = pickRandomArtists(pool, 5);


    let tracks = [];
    let artistsUsed = [];
     
    for (const artistName of chosenArtists) {
        const id = await getArtistIdByName(artistName);
        if (!id) continue;

        artistsUsed.push(artistName);
        const topTrack = await getTopTrakcsByArtistId(id,1);
        tracks = tracks.concat(topTrack);

    }

    //remove duplicate tracks
    const uniqueTracks = [];
    const seenIds = new Set();
    for (const t of tracks) {
        if (!seenIds.has(t.id)) {
            uniqueTracks.push(t);
            seenIds.add(t.id);
        }
    }

    return {
        tracks: shuffleArray(uniqueTracks),
        artistsUsed
    };
}


// --------------------------
// 4) RENDER PLAYLIST 
// --------------------------


function renderPlaylist(tracks, vibe, artistUsed) {
    if (!tracks.length) {
        playlistDiv.innerHTML = `<p>No tracks found for this vibe. Try again.</p>`;
        return;
    }
    
    const listItems = tracks.map(track => {
        const preview = track.preview
        ? `audio controls src="${track.preview}"></audio>`
        : `<p class ="label">No preview available</p>`;


        return `
        <li class="track">
        <p><strong>${track.title}</strong></p>
        <p class= "label">Artist: ${track.artist.name}</p>
        ${preview}
        </li>
        `;
    }).join("");

    playlistDiv.innerHTML = `
     <p class="label">Vibe: <strong>${vibe}</strong></p>
    <p class="label">Artists mixed: <strong>${artistsUsed.join(", ")}</strong></p>
    <ul class="playlist">${listItems}</ul>
    <span class="badge">Mini-Playlist 🎶</span>
    `;
}

// -----------------------------
// 5) MAIN FLOW 
// -----------------------------

async function getPairing() {
  activityDiv.innerHTML = "Loading activity...";
  playlistDiv.innerHTML = "Loading playlist..."; 
}

try {
    //Fetch activity
    const activityRes = await fetch(BORED_URL);
    const activityData = await activityRes.json();

    const activityText = activityData.activity;
    const type = activityData.type;

    activityDiv.innerHTML = `
    <p><strong>${activityText}</strong></p>
    <p class="label">Type: ${type}</p>
    <p class="label">Participants: ${activityData.participants}</p>
    <span class="badge">New Activity ✨</span>
    `;

}
