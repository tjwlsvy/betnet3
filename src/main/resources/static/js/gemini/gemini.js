console.log("gemin.js");

function sendMessages(message) {
    const subButtons = document.querySelector('#subButtons');

    // 각 팀에 대한 버튼 정보를 모은 객체 
    const teamButtons = {
        '두산 베어스': [
            { text: '역사', keyword: '두산 베어스의 역사' },
            { text: '역대 선수', keyword: '두산 베어스의 역대 선수단' },
            { text: '역대 기록', keyword: '두산 베어스의 역대 기록' },
            { text: '역대 감독', keyword: '두산 베어스의 역대 감독' },
            { text: '구장 위치', keyword: '두산 베어스의 구장 위치' },
            { text: '역대 성적', keyword: '두산 베어스의 역대 성적' },
            { text: '응원가', keyword: '두산 베어스의 응원가' },
            { text: '팬 문화', keyword: '두산 베어스의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '두산 베어스의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '두산 베어스의 역대 코치들' }
        ],
        '키움 히어로즈': [
            { text: '역사', keyword: '키움 히어로즈의 역사' },
            { text: '역대 선수', keyword: '키움 히어로즈의 역대 선수단' },
            { text: '역대 기록', keyword: '키움 히어로즈의 역대 기록' },
            { text: '역대 감독', keyword: '키움 히어로즈의 역대 감독' },
            { text: '구장 위치', keyword: '키움 히어로즈의 구장 위치' },
            { text: '역대 성적', keyword: '키움 히어로즈의 역대 성적' },
            { text: '응원가', keyword: '키움 히어로즈의 응원가' },
            { text: '팬 문화', keyword: '키움 히어로즈의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '키움 히어로즈의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '키움 히어로즈의 역대 코치들' }
        ],
        '삼성 라이온즈': [
            { text: '역사', keyword: '삼성 라이온즈의 역사' },
            { text: '역대 선수', keyword: '삼성 라이온즈의 역대 선수단' },
            { text: '역대 기록', keyword: '삼성 라이온즈의 역대 기록' },
            { text: '역대 감독', keyword: '삼성 라이온즈의 역대 감독' },
            { text: '구장 위치', keyword: '삼성 라이온즈의 구장 위치' },
            { text: '역대 성적', keyword: '삼성 라이온즈의 역대 성적' },
            { text: '응원가', keyword: '삼성 라이온즈의 응원가' },
            { text: '팬 문화', keyword: '삼성 라이온즈의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '삼성 라이온즈의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '삼성 라이온즈의 역대 코치들' }
        ],
        '엘지 트윈스': [
            { text: '역사', keyword: 'LG 트윈스의 역사' },
            { text: '역대 선수', keyword: 'LG 트윈스의 역대 선수단' },
            { text: '역대 기록', keyword: 'LG 트윈스의 역대 기록' },
            { text: '역대 감독', keyword: 'LG 트윈스의 역대 감독' },
            { text: '구장 위치', keyword: 'LG 트윈스의 구장 위치' },
            { text: '역대 성적', keyword: 'LG 트윈스의 역대 성적' },
            { text: '응원가', keyword: 'LG 트윈스의 응원가' },
            { text: '팬 문화', keyword: 'LG 트윈스의 팬 문화' },
            { text: '구장 안 먹거리', keyword: 'LG 트윈스의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: 'LG 트윈스의 역대 코치들' }
        ],
        '엔씨 다이노스': [
            { text: '역사', keyword: '엔씨 다이노스의 역사' },
            { text: '역대 선수', keyword: '엔씨 다이노스의 역대 선수단' },
            { text: '역대 기록', keyword: '엔씨 다이노스의 역대 기록' },
            { text: '역대 감독', keyword: '엔씨 다이노스의 역대 감독' },
            { text: '구장 위치', keyword: '엔씨 다이노스의 구장 위치' },
            { text: '역대 성적', keyword: '엔씨 다이노스의 역대 성적' },
            { text: '응원가', keyword: '엔씨 다이노스의 응원가' },
            { text: '팬 문화', keyword: '엔씨 다이노스의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '엔씨 다이노스의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '엔씨 다이노스의 역대 코치들' }
        ],
        '기아 타이거즈': [
            { text: '역사', keyword: '기아 타이거즈의 역사' },
            { text: '역대 선수', keyword: '기아 타이거즈의 역대 선수단' },
            { text: '역대 기록', keyword: '기아 타이거즈의 역대 기록' },
            { text: '역대 감독', keyword: '기아 타이거즈의 역대 감독' },
            { text: '구장 위치', keyword: '기아 타이거즈의 구장 위치' },
            { text: '역대 성적', keyword: '기아 타이거즈의 역대 성적' },
            { text: '응원가', keyword: '기아 타이거즈의 응원가' },
            { text: '팬 문화', keyword: '기아 타이거즈의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '기아 타이거즈의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '기아 타이거즈의 역대 코치들' }
        ],
        '롯데 자이언츠': [
            { text: '역사', keyword: '롯데 자이언츠의 역사' },
            { text: '역대 선수', keyword: '롯데 자이언츠의 역대 선수단' },
            { text: '역대 기록', keyword: '롯데 자이언츠의 역대 기록' },
            { text: '역대 감독', keyword: '롯데 자이언츠의 역대 감독' },
            { text: '구장 위치', keyword: '롯데 자이언츠의 구장 위치' },
            { text: '역대 성적', keyword: '롯데 자이언츠의 역대 성적' },
            { text: '응원가', keyword: '롯데 자이언츠의 응원가' },
            { text: '팬 문화', keyword: '롯데 자이언츠의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '롯데 자이언츠의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '롯데 자이언츠의 역대 코치들' }
        ],
        'SSG 랜더스': [
            { text: '역사', keyword: 'SSG 랜더스의 역사' },
            { text: '역대 선수', keyword: 'SSG 랜더스의 역대 선수단' },
            { text: '역대 기록', keyword: 'SSG 랜더스의 역대 기록' },
            { text: '역대 감독', keyword: 'SSG 랜더스의 역대 감독' },
            { text: '구장 위치', keyword: 'SSG 랜더스의 구장 위치' },
            { text: '역대 성적', keyword: 'SSG 랜더스의 역대 성적' },
            { text: '응원가', keyword: 'SSG 랜더스의 응원가' },
            { text: '팬 문화', keyword: 'SSG 랜더스의 팬 문화' },
            { text: '구장 안 먹거리', keyword: 'SSG 랜더스의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: 'SSG 랜더스의 역대 코치들' }
        ],
        '한화 이글스': [
            { text: '역사', keyword: '한화 이글스의 역사' },
            { text: '역대 선수', keyword: '한화 이글스의 역대 선수단' },
            { text: '역대 기록', keyword: '한화 이글스의 역대 기록' },
            { text: '역대 감독', keyword: '한화 이글스의 역대 감독' },
            { text: '구장 위치', keyword: '한화 이글스의 구장 위치' },
            { text: '역대 성적', keyword: '한화 이글스의 역대 성적' },
            { text: '응원가', keyword: '한화 이글스의 응원가' },
            { text: '팬 문화', keyword: '한화 이글스의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '한화 이글스의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '한화 이글스의 역대 코치들' }
        ],
        '케이티 위즈': [
            { text: '역사', keyword: '케이티 위즈의 역사' },
            { text: '역대 선수', keyword: '케이티 위즈의 역대 선수단' },
            { text: '역대 기록', keyword: '케이티 위즈의 역대 기록' },
            { text: '역대 감독', keyword: '케이티 위즈의 역대 감독' },
            { text: '구장 위치', keyword: '케이티 위즈의 구장 위치' },
            { text: '역대 성적', keyword: '케이티 위즈의 역대 성적' },
            { text: '응원가', keyword: '케이티 위즈의 응원가' },
            { text: '팬 문화', keyword: '케이티 위즈의 팬 문화' },
            { text: '구장 안 먹거리', keyword: '케이티 위즈의 구장 안 먹거리' },
            { text: '역대 코치들', keyword: '케이티 위즈의 역대 코치들' }
        ]
    };

    let html = '';

    // 팀에 대한 버튼 생성
    if (teamButtons[message]) {
        teamButtons[message].forEach(button => {
            html += `<button class="team-button" onclick="sendMessage('${button.keyword}')">${button.text}</button>`;
        });
    }

    subButtons.innerHTML = html;
    document.querySelector('#loadingSpinner').style.display = 'block';
}
// 스크롤 고정 상태 변수
let isScrollLocked = true;

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    isScrollLocked = false; // 사용자가 스크롤하면 고정 해제
});

function sendMessage(message) {
    console.log(message);
    document.querySelector('#loadingSpinner').style.display = 'block';

    // 버튼 비활성화
    document.querySelectorAll('.team-button').forEach(button => button.disabled = true);

    $.ajax({
        url: 'http://127.0.0.1:5000/gemini',
        type: 'GET',
        data: { keyword: message },
        success: function(result) {
            console.log(result);

            let responseText = result.response;
            let formattedResponse = responseText.split("**").map((part, index) => {
                if (index > 0) {
                    return `\n${part}`;
                }
                return part;
            }).join('');
            let finalResponse = formattedResponse.replace(/\*/g, '');

            document.querySelector("#messageBox").innerHTML += `<p>검색한 키워드 : ${message}</p>`;

            function printResponseCharacterByCharacter(response, interval) {
                let charIndex = 0;
                const messageBox = document.querySelector("#messageBox");
                const totalLength = response.length;

                const intervalId = setInterval(() => {
                    if (charIndex < totalLength) {
                        messageBox.innerHTML += response.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(intervalId);
                        document.querySelector('#loadingSpinner').style.display = 'none';

                        // 버튼 활성화
                        document.querySelectorAll('.team-button').forEach(button => button.disabled = false);
                    }

                    // 스크롤을 항상 하단으로
                    messageBox.scrollTop = messageBox.scrollHeight;
                }, interval);
            }

            printResponseCharacterByCharacter(finalResponse, 20);
            document.querySelector('#loadingSpinner').style.display = 'none';
        },
        error: function() {
            console.error("서버에 문제가 발생했습니다.");
            document.querySelector('#loadingSpinner').style.display = 'none';

            // 버튼 활성화
            document.querySelectorAll('.team-button').forEach(button => button.disabled = false);
        }
    });
}