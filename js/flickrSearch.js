$(document).ready(function(){

	//Global variables
	var keywordInput = $('#keyword'),
		searchButton = $('#search'),
		displayFeed = $('#feed'),
		twitterFeed = $('#boxtwo'),
		facebookFeed = $('#boxthree'),
		keyword = '',
		content = '';

	//Clear
	keywordInput.focus(function(){
		displayFeed.empty();
		twitterFeed.empty();
		keywordInput.val('');
	});

	//Search
	searchButton.click(function(){
		keyword = keywordInput.val();
		$.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags='+keyword+'&jsoncallback=?', function(data){
			$.each(data.photos.photo, function(i, results){
				content = '<a href="http://farm'+results.farm+'.staticflickr.com/'+results.server+'/'+results.id+'_'+results.secret+'.jpg"><img src="http://farm'+results.farm+'.staticflickr.com/'+results.server+'/'+results.id+'_'+results.secret+'.jpg"></a>';
				displayFeed.append(content);
			})
		});

		$.getJSON('http://search.twitter.com/search.json?callback=?&q='+keyword, function(tweetdata){
			$.each(tweetdata.results, function(ind, tweets){
				content = '<p><a href="http://www.twitter.com/'+tweets.from_user+'"><img src='+tweets.profile_image_url+'></a>&quot;'+tweets.text+'&quot; -<a href="http://www.twitter.com/'+tweets.from_user+'">'+tweets.from_user+'</a> <span class="date">['+tweets.created_at+']</span></p>';
				twitterFeed.append(content);
			})
		});

		$.getJSON('https://graph.facebook.com/search?q='+keyword+'&type=post&access_token=AAAAAAITEghMBALua7xxlv47YQbJOTWHPH0dA8JV1eCPMr21p31tTnkmidpatZAYk3G2ekkGAEgq0qZCocJXZBEyNKthDRCLkHneRZBeODajcAy2VpZCZCU', function(mydata){
				$.each(mydata.data, function(ind, value){
					content = '<p><a href="'+value.link+'"><img src="'+value.picture+'"></a> '+(value.caption||value.name||value.message||value.story||value.link||value.type)+' -<a href="'+value.link+'">'+value.from.name+'</a></p>';
					facebookFeed.append(content);
					facebookFeed.find('p').highlight(keyword);
				})
		});
	});

		


});
