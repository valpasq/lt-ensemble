// |
// | LandTrendr Ensemble - Degenerate Trees thresholds
// | 
// | Results stored as nested dictionaries such that top-level key 
// | is basal area "stop". Each stop is associated with a
// | dictionary with keys for "thresholds" and "votes" such that
// | "thresholds" corresponds to spectral and spatial thresholds
// | and "votes" is threshold on number of indices for which
// | thresholds have been met/exceeded.
// |
// | These values are copied over from models trained externally.

// --------------------------------------------------------
// Percent basal area results
// thresholds format: 
// [nbr_mag, nbr_mmu, ndmi_mag, ndmi_mmu, tcw_mag, tcw_mmu]
var ENSEMBLE_OUPUTS = {
    0: {
        'thresholds': [0, 5, 0, 20, 300, 10],
        'votes': 1},
    10: {
        'thresholds': [100, 5, 0, 20, 300, 10],
        'votes': 1},
    20: {
        'thresholds': [0, 20, 100, 5, 300, 25],
        'votes': 1},
    30: {
        'thresholds': [100, 5, 0, 20, 300, 10],
        'votes': 1},
    40: {
        'thresholds': [100, 10, 100, 10, 300, 30],
        'votes': 1},
    50: {
        'thresholds': [100, 0, 0, 95, 300, 5],
        'votes': 2},
    60: {
        'thresholds': [100, 5, 0, 95, 400, 5],
        'votes': 2},
    70: {
        'thresholds': [400, 0, 200, 90, 600, 5],
        'votes': 1},
    80: {
        'thresholds': [400, 0, 0, 10, 600, 5],
        'votes': 2},
    90: {
        'thresholds': [400, 0, 200, 35, 700, 25],
        'votes': 2}
};

exports.ENSEMBLE_OUPUTS = ENSEMBLE_OUPUTS;