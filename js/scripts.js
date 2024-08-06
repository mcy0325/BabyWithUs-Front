document.getElementById('babyInfo').addEventListener('click', function () {
    toggleContent('yellow-info');
});

document.getElementById('momInfo').addEventListener('click', function () {
    toggleContent('pink-info');
});

document.getElementById('dadInfo').addEventListener('click', function () {
    toggleContent('blue-info');
});

function toggleContent(infoClass) {
    const infos = document.querySelectorAll('.info');
    infos.forEach(info => {
        if (info.classList.contains(infoClass)) {
            info.style.display = info.style.display === 'block' ? 'none' : 'block';
            info.classList.toggle('expanded');
        } else {
            info.style.display = 'none';
        }
    });
}

// 카카오 SDK 초기화
Kakao.init('e286df7511b332b5d132d450cdc4cfc6'); // 발급받은 JavaScript 키

document.getElementById('kakao-login-btn').addEventListener('click', function () {
    Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8080/callback'
    });
});


// 카카오 로그인 버튼 생성
Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function (authObj) {
        // 인증 성공 시 백엔드로 인증 코드 전송
        fetch('http://localhost:8080/auth/kakao/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: authObj.code})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 로그인 성공 후 처리
            });
    },
    fail: function (err) {
        console.error(err);
    }
});

function updateNavUI() {
    var navImgDiv = document.getElementById('nav-img');
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        navImgDiv.innerHTML = `
            <img src="../images/mypage.png" class="account-icon">
            <img src="../images/logout.png" class="logout-icon" style="margin-left: 30px" onclick="logout()">
        `;
    } else {
        navImgDiv.innerHTML = `<img src="../images/login.png" class="login-icon" onclick="login()">`;
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

function login() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.reload();
}
