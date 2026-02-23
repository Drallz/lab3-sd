/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */
function getMusicTitlesByYear(tracks) {
    if (!Array.isArray(tracks)) return {};

    const result = {};

    for (const track of tracks) {
        if (
            !track ||
            typeof track.title !== 'string' ||
            typeof track.year !== 'number'
        ) {
            continue; // Skip invalid tracks
        }

        if (!result[track.year]) {
            result[track.year] = [];
        }

        result[track.year].push(track.title);
    }

    // Sort titles alphabetically within each year
    for (const year in result) {
        result[year].sort();
    }

    return result;
}

/**
 * Filters tracks by criteria and adds decade information
 * @param {Array} tracks - Array of track objects
 * @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
 * @returns {Array} - Filtered and transformed track objects
 */
function filterAndTransformTracks(tracks, criteria) {
    if (!Array.isArray(tracks)) return [];
    if (!criteria || typeof criteria !== 'object') criteria = {};

    const { minYear, maxYear, artist } = criteria;

    return tracks
        .filter(track => {
            if (
                !track ||
                typeof track.title !== 'string' ||
                typeof track.artist !== 'string' ||
                typeof track.year !== 'number'
            ) {
                return false; // Skip invalid tracks
            }

            if (typeof minYear === 'number' && track.year < minYear) {
                return false;
            }

            if (typeof maxYear === 'number' && track.year > maxYear) {
                return false;
            }

            if (
                typeof artist === 'string' &&
                track.artist.toLowerCase() !== artist.toLowerCase()
            ) {
                return false;
            }

            return true;
        })
        .map(track => {
            const decade = Math.floor(track.year / 10) * 10;
            return {
                title: track.title,
                artist: track.artist,
                year: track.year,
                decade: `${decade}s`
            };
        });
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};