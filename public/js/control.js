$(document).ready( function() {
  
  var live_update = function(hsb, hex, rgb) {
    if($('#live-update:checked').attr('checked')) {
      set_color(hsb, hex, rgb);
    }
  }
  
  var set_color = function(hsb, hex, rgb) {
      jQuery.post('/set', {color: hex}); 
  }
  
  $('#colorpick').ColorPicker({
    flat: true,
    onSubmit: set_color,
    onChange: live_update,
  });
});