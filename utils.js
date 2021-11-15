// | 
// | Utils for LandTrendr ensemble workflow.
// | 

// Get magnitude and mmu bands from pre-processed LT collections
function get_bands(collection, index, map_year, band_selection) {
  return collection
      .filterMetadata('map_year', 'equals', map_year)
      .first()
      .select(band_selection)
      .rename([index + '_mag', index + '_mmu']);
}

// Apply thresholds to generate ensemble map
function generate_ensemble(map_year, threshold, nbr, ndmi, tcw, band_selection, ensemble_outputs) {
  var combined = get_bands(nbr, 'nbr', map_year, band_selection)
      .addBands(get_bands(ndmi, 'ndmi', map_year, band_selection))
      .addBands(get_bands(tcw, 'tcw', map_year, band_selection))
      .unmask();
    
  var ensemble_result = combined.gte(ensemble_outputs[threshold]['thresholds']);
  var nbr_vote = ensemble_result.select('nbr_mag')
      .and(ensemble_result.select('nbr_mmu'));
  var ndmi_vote = ensemble_result.select('ndmi_mag')
      .and(ensemble_result.select('ndmi_mmu'));
  var tcw_vote = ensemble_result.select('tcw_mag')
      .and(ensemble_result.select('tcw_mmu'));
  var all_votes = nbr_vote
      .add(ndmi_vote)
      .add(tcw_vote)
      .rename('change');
  
  var votes_threshold = ensemble_outputs[threshold]['votes'];
  var is_harvest = all_votes.gte(votes_threshold);
  
  return is_harvest.updateMask(is_harvest);
}


// Get 2016 NLCD for masking
var nlcd2016 = ee.ImageCollection("USGS/NLCD_RELEASES/2016_REL")
    .filter(ee.Filter.eq('system:index', '2016'))
    .first();

// Agricultural land uses mask
var ag_mask = nlcd2016.select('landcover').gt(80)
    .and(nlcd2016.select('landcover').lt(90));

// Built land uses mask
var built_mask = nlcd2016.select('landcover').gt(20)
    .and(nlcd2016.select('landcover').lt(30));

// Water mask 
var water_mask = nlcd2016.select('landcover').eq(11);

// Apply 2016 NLCD masks
function nlcd_mask(image) {
  return ee.Image(image)
      .updateMask(ag_mask.not())
      .updateMask(built_mask.not())
      .updateMask(water_mask.not());
}

exports.get_bands = get_bands;
exports.generate_ensemble = generate_ensemble;
exports.nlcd_mask = nlcd_mask;
