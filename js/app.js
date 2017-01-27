$(function () {
	var data = {
		   cats:[
		      {
		         "name":"Alpha",
		         'id':1,
		         "pic":"images/cat1.jpg",
		         'clickCount':0
		      },
		      {
		         "name":"Beta",
		         'id':2,
		         "pic":"images/cat2.jpg",
		         'clickCount':0
		      },
		      {
		         "name":"Charlie",
		         'id':3,
		         "pic":"images/cat3.jpg",
		         'clickCount':0
		      },
		      {
		         "name":"Delta",
		         'id':4,
		         "pic":"images/cat4.jpg",
		         'clickCount':0
		      },
		      {
		         "name":"Echo",
		         'id':5,
		         "pic":"images/cat5.jpg",
		         'clickCount':0
		      }
		   ],
		   btn:[
		      {
		         "id":1
		      },
		      {
		         "id":2
		      },
		      {
		         "id":3
		      },
		      {
		         "id":4
		      },
		      {
		         "id":5
		      }
		   ]
		};

	var octopus = {
		clickCat: function () {
			var $catImg = $('.catImg');
			for (var i = 0; i < $catImg.length; i++) {
				$catImg.eq(i).click(function(iCopy) {
					return function () {
						data.cats[iCopy].clickCount++;
						$('.catClickMsg').eq(iCopy).html("You clicked " + data.cats[iCopy].clickCount + " times.");
					};
				}(i));
			};
		},

		switchCat: function() {
			var catContainers = view.$catContainers;
				$btns = $('.catBtns');
			for (var i = 0; i < $btns.length; i++) {
				var btn = $btns.eq(i);
					catContainer = catContainers.eq(i);

				//see https://classroom.udacity.com/nanodegrees/nd001/parts/00113454014/modules/271165859175461/lessons/3417188540/concepts/34803486710923#
				btn.click(function(iCopy) {
					return function () {
						octopus.catHide();
						catContainers.eq(iCopy).css('display', '');
					};
				}(i));	
			}
		},

		catHide: function () {
			var catContainers = view.$catContainers;
			for (var i = 0; i < catContainers.length; i++) {
				catContainers[i].style.display = 'none';
			};
		},

		createCat: function () {
			for (var i = 0; i < data.cats.length; i++) {
				var cat = view.$catTemplate.replace(/{{id}}/g,data.cats[i].id).replace(/{{catName}}/g,data.cats[i].name).replace(/{{pic}}/g,data.cats[i].pic).replace(/{{clickCount}}/g,'Click Me!');
				view.$catCounts.append(cat);
			};
		},

		createBtn: function() {
			for (var i = 0; i < data.btn.length; i++) {
				var catBtn = view.$btnTemplate.replace(/{{id}}/g,data.btn[i].id).replace(/{{name}}/g,data.cats[i].name);
				view.$catList.append(catBtn);
			};
		},

		init: function() {
			view.init();
			view.render();
		}
	};

	var view = {
		init: function () {
			//generate buttons
			this.$catList = $('.catList');
			this.$btnTemplate = $('script[data-template="btnTemp"]').html();
			octopus.createBtn();

			this.$catCounts = $('#catCounts');
			this.$catTemplate = $('script[data-template="catTemp"]').html();
			octopus.createCat();

			this.$catContainers = $('.cats');

			octopus.catHide();
			octopus.switchCat();
		},

		render: function () {
			octopus.clickCat();
		}
	};

	octopus.init();
}());