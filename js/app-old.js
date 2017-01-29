/*
* @description create cats and count clicks.
*/
var cats = {
		    "cats": [{
		        "name": "Alpha",
		        "pic": "images/cat1.jpg",
		        'clickCount': 0
		    }, {
		        "name": "Beta",
		        "pic": "images/cat2.jpg",
		        'clickCount': 0
		    }, {
		        "name": "Charlie",
		        "pic": "images/cat3.jpg",
		        'clickCount': 0
		    }, {
		        "name": "Delta",
		        "pic": "images/cat4.jpg",
		        'clickCount': 0
		    }, {
		        "name": "Echo",
		        "pic": "images/cat5.jpg",
		        'clickCount': 0
		    }]
		};

		var catElementGenerator = function (i) {
			var catContainer,
				catImage,
				catName,
				catClickMsg,
				clickCount;

			catContainer = document.createElement('div');
			catImage = document.createElement('img');
			catName = document.createElement('h1');
			catClickMsg = document.createElement('p');
			clickCount = cats.cats[i].clickCount;

			catContainer.classList.add('cats');
			catContainer.id = 'cat' + i;
			catContainer.style.display = 'none';

			catImage.src = cats.cats[i].pic;
			catImage.classList.add('catImg');
			catImage.id= 'catImg' + i;

			catName.classList.add('catName');
			catName.id= 'catName' +1;
			catName.innerHTML = 'My name is ' + cats.cats[i].name + '.';

			catClickMsg.classList.add('catClickMsg');
			catClickMsg.id = 'catClickMsg' +i;
			catClickMsg.innerHTML = 'Click Me';

			catContainer.appendChild(catName);
			catContainer.appendChild(catImage);
			catContainer.appendChild(catClickMsg);

			catImage.addEventListener('click', function (i) {
				clickCount++;
				catClickMsg.innerHTML = 'Clicked ' + clickCount + ' times.'; 
			}, false)

			return catContainer;
		}

/*
* @description append catContainer to catCounts
*/
		for (var i = 0; i < 5; i++) {
			document.getElementById('catCounts').appendChild(catElementGenerator(i));
		}

/*
* @description add switch listener to
*/		
		for (var i = 0; i < 5; i++) {
			var catLink = document.getElementById('catLink' + i);
			catLink.addEventListener('click',function () {
				var catNum = this.id.slice(-1);
				var catContainers = document.getElementsByClassName('cats');
				for (var i = 0; i < 5; i++) {
					catContainers[i].style.display = 'none';
				}
				var catShow = document.getElementById('cat' + catNum);
				catShow.style.display = '';
			});
		};