$(function () {
	var data = {
			currentCat: null,
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
						$('.catClicksInput').val(data.currentCat.clickCount);
					};
				}(i));
			};
		},

		adminShow: function () {
			$('.adminContainer').click(function () {
				$('form').show();
			})
		},

		inputCat: function () {
			$('.catForm').submit(function (event) {
				var catId = data.currentCat.id;
				data.cats[catId -1].name = $('.catNameInput').val();
				data.cats[catId -1].pic = $('.catUrlInput').val();
				data.cats[catId -1].clickCount = $('.catClicksInput').val();
				$('#catBtn'+catId).text(data.cats[catId -1].name);
				$('#catCounts').html('');
				octopus.createCat();
				$('.catClickMsg').eq(catId -1).html("You clicked " + data.cats[catId -1].clickCount + " times.");
				octopus.clickCat();
				octopus.switchCat();
				octopus.catHide();
				$('.cats').eq(catId-1).show();
    			return false;
			});
		},

		switchCat: function() {
			var catContainers = $('.cats');
				$btns = $('.catBtns');
			for (var i = 0; i < $btns.length; i++) {
				var btn = $btns.eq(i);
					catContainer = catContainers.eq(i);

				//see https://classroom.udacity.com/nanodegrees/nd001/parts/00113454014/modules/271165859175461/lessons/3417188540/concepts/34803486710923#
				btn.click(function(iCopy) {
					return function () {
						octopus.catHide();
						catContainers.eq(iCopy).show();

						//setCurrentCat
						var cat = data.cats[iCopy];
						octopus.setCurrentCat(cat);
						octopus.createForm();
					};
				}(i));	
			}
		},

		catHide: function () {
			var catContainers = $('.cats');
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

		setCurrentCat: function (cat) {
			data.currentCat = cat;
			//console.log(data.currentCat.id);
			return data.currentCat;
		},

		createForm: function () {
			$('.catNameInput').val(data.currentCat.name);
			$('.catUrlInput').val(data.currentCat.pic);
			$('.catClicksInput').val(data.currentCat.clickCount);
		},

		init: function() {
			data.currentCat = data.cats[0];
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
			octopus.createForm();
			octopus.adminShow();
		},

		render: function () {
			octopus.clickCat();
			octopus.switchCat();
			octopus.inputCat();
		}
	};

	octopus.init();
}());