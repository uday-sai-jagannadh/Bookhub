

jQuery.expr[':'].Contains = function(a,i,m){
    //alert('sd');
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};



$(function(){

	
	//Getting data and displaying name and prices;
	
	$.ajax({ 
    	type: 'GET', 
    	url: 'https://capillary.0x10.info/api/books?type=json&query=list_books', 
    	data: { get_param: 'value' }, 
    	dataType: 'json',
    	success: function (data) { 
    	//alert('there');
        
        	//updating total bokks
        	$('#totb').text(data.books.length);
        
        	var clickitem=-1;
        	var visited=[];
        	var totalbm=0;
        	
        	//adding bookitems to ul items
        	
        	for(var i=1;i<=data.books.length;i++){
        		$('#items').append('<li id="'+(i-1)+'"><div class="bookitem" id="d'+(i-1)+'"> <p id="bn'+i+'"></p> <p id="bp'+i+'"> </p>   </div> </li>');
        	}
        	
        	
        	//assigning book names and prices to the list items
        	for(var i=1;i<=data.books.length;i++){
        		$('#bn'+ i).text(data.books[i-1].name);
        		$('#bp' + i).text(data.books[i-1].price);
        		//console.log('asas',data.books[i].name);
        		visited[i-1]=0;
        	}
        
        
        	//displaying details of the book clicked
		$("#items li").click(function() {
       			//alert('Clicked list. ' + this.id);
       			$('#bookimg').attr("src",data.books[parseInt(this.id)].image);
			$('#publ').text(data.books[parseInt(this.id)].details.Publisher);
			$('#isbn').text(data.books[parseInt(this.id)].details.ISBN);
			$('#bind').text(data.books[parseInt(this.id)].details.Binding);
			$('#rating').text(data.books[parseInt(this.id)].rating);
			$('#descrp').text(data.books[parseInt(this.id)].description);
       		
       			clickitem=parseInt(this.id);
		  });
		  
		
		//bookmarking  
		$("#bookmarkimg").click(function(){
			if(visited[clickitem]===0)totalbm++;
			visited[clickitem]=1;
			//alert('BookMarked!');
			$('#totbm').text(totalbm);
		});  

	
		//list bookmarks
		$('#listbm').click(function(){
			if(totalbm>0){
				for(var k=0;k<data.books.length;k++){
				if(visited[k]===0){
					$('#'+k).hide();
				}
				}
			}
			else{
				alert('No Bookmarks yet!');
			}
			
		});
		
		//sorting books
		
		
		
			var ul = $('#items');
			$('input:radio[name="sort"]').change(
    		function(){

        	
        		if ($(this).val() == 'Rating') {
				var bitems = $('#items li').get();  //change
				bitems.sort(function(a,b){
  			
  				var A = parseInt($(a).attr('id'));
  				var B = parseInt($(b).attr('id'));
  				
  				var keyA= parseFloat(data.books[A].rating);
  				var keyB= parseFloat(data.books[B].rating);
  				
  				if (keyA < keyB) return 1;
  				if (keyA > keyB) return -1;
  				return 0;
  		
		});
		
		$.each(bitems, function(i, li){
  			ul.append(li);
		});	
            		
        		}
        		else {
				var bitems = $('#items li').get();  //change
				bitems.sort(function(a,b){
  			
  				var A = parseInt($(a).attr('id'));
  				var B = parseInt($(b).attr('id'));
  				
  				var keyA= data.books[A].price;
  				keyA= keyA.substring(0, keyA.length - 2);
  				var keyB= data.books[B].price;
  				keyB= keyB.substring(0, keyB.length - 2);
  				
  				if (keyA < keyB) return -1;
  				if (keyA > keyB) return 1;
  				return 0;
  			
  		
  		
			});
			//var ul = $('#items');
			$.each(bitems, function(i, li){
  				ul.append(li);
			});
            		
        		}
    		});
		
		
		//searching
		
		$('#searchbox').change( function () {
			var filter = $(this).val();
			if(filter) {
			  $('#items').find("p:not(:Contains(" + filter + "))").parent().slideUp();
			  $('#items').find("p:Contains(" + filter + ")").parent().slideDown();
			} else {
			  $('#items').find("li").slideDown();
			}
			return false;
		  })
		.keyup( function () {
			$(this).change();
		});
		
   	 }
	});
	
	
	
	
	


});
