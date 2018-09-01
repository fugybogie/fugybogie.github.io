/* 
  Make cards clickable 
  ====================
*/

$('.card-body').on('click', function() {
  $(this).parent().find("a").trigger('click'); 
});