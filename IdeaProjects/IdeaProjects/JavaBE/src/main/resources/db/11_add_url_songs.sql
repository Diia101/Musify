ALTER TABLE songs ADD COLUMN url VARCHAR(255);

UPDATE songs
SET url = 'https://open.spotify.com/track/50zfJv2p95W1jCJp1SmFBH?si=00340ec7d2914c33'
WHERE song_id = 1;

UPDATE songs
SET url = 'https://open.spotify.com/track/6WLnZ4iqz6wPILTWPUCJZA?si=97e4ad16bd584cfb'
WHERE song_id = 2;

UPDATE songs
SET url = 'https://open.spotify.com/track/6GeQ3CtCRdGeMt4y2NWWjU?si=99996d6e720b4f5d'
WHERE song_id = 3;


UPDATE songs
SET url = 'https://open.spotify.com/track/5Ck4zhYkBRelKGPQDrmhN1?si=09e5256b6eef40b4'
WHERE song_id = 4;

