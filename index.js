let xhr = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();
let xhr3 = new XMLHttpRequest();

let userImage = document.querySelector('.user-image');
let userInfo = document.querySelector('.user-info');
let userName = document.getElementById('user-name');

let userId = document.getElementById('user-id');
let followers = document.querySelectorAll('.follower-list li');
let following = document.querySelectorAll('.following-list li');

let input = document.querySelector('input');
input.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		for (let i = 0; i < 5; i++) {
			following[i].firstChild.src = '';
			followers[i].firstChild.src = '';
		}
		xhr.open('GET', `https://api.github.com/users/${e.target.value}`);

		xhr.onload = () => {
			let userData = JSON.parse(xhr.response);
			buildUI(userData, 0);
		};

		xhr.send();

		xhr2.open('GET', `https://api.github.com/users/${e.target.value}/following`);
		xhr2.onload = () => {
			let followingData = JSON.parse(xhr2.response);
			buildUI(followingData, 1);
		};
		xhr2.send();
		xhr3.open('GET', `https://api.github.com/users/${e.target.value}/followers`);
		xhr3.onload = () => {
			let followerData = JSON.parse(xhr3.response);
			buildUI(followerData, 2);
		};
		xhr3.send();
		e.target.value = '';
		userInfo.style.display = 'block';
	}
});
// https://api.github.com/users/{username}
//https://api.github.com/users/{username}/following

function buildUI(data, n) {
	if (n === 0) {
		userImage.src = data.avatar_url;
		userName.innerText = data.name;
		userId.innerText = `@${data.login}`;
	}
	if (n === 1) {
		let max = 5;
		for (let i = 0; i < max; i++) {
			if (data.length < 5) {
				max = data.length;
			}
			following[i].firstChild.src = data[i].avatar_url;
		}
	}
	if (n === 2) {
		let max = 5;
		for (let i = 0; i < max; i++) {
			if (data.length < 5) {
				max = data.length;
			}
			followers[i].firstChild.src = data[i].avatar_url;
		}
	}
}
