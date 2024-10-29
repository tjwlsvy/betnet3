console.log("chatballpt.js")


function sendMessage() {
    // document.querySelector('#loadingSpinner').style.display = 'block';
    let text = document.querySelector("#userInput").value;
    // 버튼 비활성화
    document.querySelectorAll('.team-button').forEach(button => button.disabled = true);

    $.ajax({
        url: 'http://127.0.0.1:5000/ballchat',
        method: 'POST',
        contentType: 'application/json', // JSON 형식으로 보내기
        data: JSON.stringify({ question: text }), // 사용자 입력을 JSON으로 변환
        success: function(result) {
            console.log(result);
            // 만약에 result에 hhtp가 포함되어있으면 로케이션
            if(result.indexOf('http')>=0){
                location.href = result
                return
            }
            let html = result;
            // document.querySelector("#messageBox").innerHTML = html;

            // let responseText = result.response;
            // let formattedResponse = responseText.split("**").map((part, index) => {
            //     if (index > 0) {
            //         return `\n${part}`;
            //     }
            //     return part;
            // }).join('');
            // let finalResponse = formattedResponse.replace(/\*/g, '');

            // document.querySelector("#messageBox").innerHTML += `<p>검색한 키워드 : ${message}</p>`;

            function printResponseCharacterByCharacter(response , interval) {
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
            } // printResponseCharacterByCharacter end

            printResponseCharacterByCharacter(html, 30);
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