
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = new FormData(this); // FormData 객체 생성

    fetch('https://www.babywithus-server.o-r.kr/login', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }
            return response.json(); // JSON 응답으로 변환
        })
        .then(data => {
            // 로그인 성공 시 main.html로 이동
            window.location.href = '../html/main.html';
        })
        .catch(error => {
            // 로그인 실패 시 메시지 표시
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.textContent = '로그인 실패: ' + error.message;
            responseMessage.style.color = 'red';
        });
});
