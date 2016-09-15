$(document).ready(function(){
	console.log('jquery load test');
});

$(document).ready(function() {
 
  $(".check-out__slider").owlCarousel({
    items : 4,
    margin: 30,
    responsive:{
    	1200:{
    		items: 4
    	},
    	992:{
    		items: 3
    	},
    	481:{
    		items: 2
    	},
    	320:{
    		items: 1
    	}
    }
  });
 
  $('.link').on('click', function(event){
    var $this = $(this);
    if($this.hasClass('clicked')){
      $this.removeAttr('style').removeClass('clicked');
    } else{
      $this.css('background','#7fc242').addClass('clicked');
    }
  });
 
});

// toggle menu

$('#toggle').click(function(e){
		$(this).toggleClass('on');
	$('#menu').fadeToggle();
});

$(document).ready(function() {
	$(document).on('click', '.modal_btn', function(){
		$('#small-modal').arcticmodal();
		});
	});