 var songArray = [
 	'https://soundcloud.com/awfulrecords/ilovemakonnen-vodka-on-the-weekend-feat-pyramid-quince-rich-po-slim-archibald-slim',
	'https://soundcloud.com/soxich/gin-and-juice-snoop-doggy-dogg',
	'https://soundcloud.com/alexandra-pride/alexey-lisin-feat-alexandra-pride-when-the-light-is-rum-original-mix',
	'https://soundcloud.com/rico-dman/brandy-monica-the-boy-is-mine',
	'https://soundcloud.com/alltrapcity/tequila-remix-trap-sick',
	'https://soundcloud.com/blookah/dark-rum',
	'https://soundcloud.com/scotchbonnet/kenny-rogers-the-gambler',
	'https://soundcloud.com/caribbeansoundplus-1/beenie-man-im-okay-drinking',
	'https://soundcloud.com/gallant/bourbon'];

	var random = Math.floor(Math.random()*9);
	var songPicked = songArray[random];
	console.log(songArray[random])

	var appVersion = '1505226596';
	var clientId = 'JlZIsxg2hY5WnBgtn3jfS0UYCl0K8DOg';

	$.ajax({
		url: 'https://api.soundcloud.com/resolve',
		data: {
		  url: songPicked,
		  client_id: clientId
		},
		success: function(data) {
		  // debugger;
		  console.log(data)
		  var scPic = data.artwork_url;
		  var scArtist = data.user.username;
		  var scTitle = data.title;
		  var trackId = "/tracks/" + data.id;
		  $('.scPicture').attr('src',scPic);
		  $('.artist').text(scArtist);
		  $('.songTitle').text(scTitle);

		 }

		})
	