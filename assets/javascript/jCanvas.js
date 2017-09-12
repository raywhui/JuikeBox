
	$('.group-logo').drawArc({
		layer:true,
		name:'circle',
		strokeStyle: '#000',
		strokeWidth: 5,
		x: 300, y: 300,
		radius: 200,
		start:0, end:0
	});

	$('.group-logo').animateLayer('circle', {
		start:0, end:360
	}, 1000);

	$('.group-logo').drawArc({
		layer:true,
		name:'c',
		strokeStyle: '#000',
		strokeWidth: 12,
		ccw: true,
		x: 150+54, y: 300,
		radius: 50,
		start:25, end:375
	});

	$('.group-logo').animateLayer('c', {
		start:25, end:155
	}, 1000);

	$('.group-logo').drawVector({
		layer:true,
		name: 'h',
	  strokeStyle: 'blue',
	  strokeWidth: 12,
	  x: 185+54, y:245,
	  a1: 180, l1: 0
	}).drawVector({
		name:'h2',
		layer:true,
		strokeStyle: 'blue',
	  strokeWidth: 12,
	  x: 185+54, y:300,
	  a1: 90, l1: 0
	}).drawVector({
		layer:true,
		name:'k',
		strokeStyle: 'red',
	  strokeWidth: 12,
	  x: 260+54, y:245,
	  a1: 180, l1: 0
	});

	$('.group-logo').animateLayer('h', {
		l1: 112
	}, 1000).animateLayer('h2', {
		l1: 65
	}, 1000);

	$('.group-logo').drawVector({
		layer:true,
		name:'k2',
		strokeStyle: 'red',
	  strokeWidth: 12,
	  x: 260+54, y:306,
	  a1: 50, l1: 0
	}).drawVector({
		layer:true,
		name:'k3',
		strokeStyle: 'red',
	  strokeWidth: 12,
	  x: 260+54, y:297,
	  a1: 130, l1: 0
	})

	// .drawVector({
	// 	layer:true,
	// 	strokeStyle: 'white',
	//   strokeWidth: 12,
	//   x: 330+54, y:240,
	//   a1: 180, l1: 138
	// });

	$('.group-logo').animateLayer('k2', {
		l1: 90
	}, 1000).animateLayer('k3', {
		l1: 90
	}, 1000).animateLayer('k', {
		l1: 112
	}, 1000);


	$('.group-logo').drawVector({
		layer:true,
		name:'r',
		strokeStyle: 'purple',
	  strokeWidth: 12,
	  x: 334+54, y:359,
	  a1: 0, l1: 0,
	  a2: 120, l2:0,
	  a3: 240, l3:0,
	  a4:140, l4: 0
	});

	// $('.group-logo').drawVector({
	// 	layer:true,
	// 	strokeStyle: 'white',
	//   strokeWidth: 12,
	//   x: 347+54, y:363,
	//   a1: 90, l1: 60
	// })

	$('.group-logo').animateLayer('r', {
		l1: 104
	}, 250).animateLayer('r', {
		l2: 60
	},250).animateLayer('r', {
		l3: 40
	},250).animateLayer('r', {
		l4: 75
	},250);
