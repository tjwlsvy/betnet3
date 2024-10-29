console.log("game.js");

doLoginCheck();
function doLoginCheck(){
    console.log(doLoginCheck);
    
    $.ajax({
        async:false,
        method:'get',
        url:"/member/logcheck",
        success:(result)=>{console.log(result);
            if(result == ""){
                alert("로그인 후 이용가능합니다.")
                location.href = "/member/login"
            }
            // memberInfo = result
            // console.log(memberInfo)
        }
    })
}


busLog();
function busLog(){
    console.log(busLog);

    $.ajax({
        async : false , 
        method : "get" , 
        url : "/bus/log" ,
        success : (r) => {
            console.log(r);
            let gameListBox = document.querySelector('.gameListBox');
            let html = ``;

            let currentTime = new Date();  // 현재 시간
            // 12시간을 밀리초로 변환
            let HoursInMillis = 3 * 60 * 60 * 1000;

            // gameCode와 seat 별로 최신 logDate를 추적할 객체
            let latestLogMap = {};

            // 먼저 각 gameCode-seat 조합의 최신 logDate를 찾아서 기록
            r.forEach(log => {
                let key = `${log.gameCode}-${log.seat}`;
                let logDate = new Date(log.logDate);

                if (!latestLogMap[key] || latestLogMap[key].logDate < logDate) {
                    latestLogMap[key] = log; // 최신 logDate로 업데이트
                }
            });

            // 다시 배열을 순회하면서 출력 HTML을 생성
            r.forEach(log => {
                // 게임코드 문자열 시간 타입으로 변환 코드
                let parts = log.gameCode.split('-');
                let datePart = parts[0]; // "20241023"
                let timePart = parts[2]; // "1830"
                let formattedDateTime = `${datePart.substring(0, 4)}-${datePart.substring(4, 6)}-${datePart.substring(6, 8)}T${timePart.substring(0, 2)}:${timePart.substring(2, 4)}`;
                let gameDateTime = new Date(formattedDateTime);
                let HoursBefore = new Date(gameDateTime.getTime() - HoursInMillis);

                // gameCode와 seat 조합에 대한 키
                let key = `${log.gameCode}-${log.seat}`;
                
                // 최신 log인지 확인
                let isLatest = (latestLogMap[key].logDate === log.logDate);

                if (HoursBefore > currentTime && isLatest) {
                    html += `<tr>
                        <td> ${log.resNo} </td> 
                        <td> ${log.gameCode} </td>
                        <td> ${log.logDate} </td>
                        <td> ${log.seat} </td>
                        <td> ${log.reStatus == -1 ? '예약완료' : '예약취소'} </td>
                        <td><button type="button" onclick="cancel('${log.gameCode}',${log.seat})">${log.reStatus==-1?'취소':''}</button></td>
                    </tr>`;
                } else {
                    html += `<tr>
                        <td> ${log.resNo} </td> 
                        <td> ${log.gameCode} </td>
                        <td> ${log.logDate} </td>
                        <td> ${log.seat} </td>
                        <td> ${log.reStatus == -1 ? '예약완료' : '예약취소'} </td>
                        <td>.</td>
                    </tr>`;
                }
            });

            gameListBox.innerHTML = html;
        },
        error : (e) => {
            console.log(e);
        }
    });
}


function cancel(gameCode,seat){
    console.log(cancel);
    $.ajax({
        async : false ,
        method:"post",
        url:"/bus/cancel",
        data:{gameCode:gameCode,pointChange:18000,description:10,seat:seat,reStatus:1},
        success: (r) => {
            console.log(r);
            if(r){alert('취소가 완료되었습니다.')
                location.href="/"
            }else{alert('취소가 실패하였습니다.')}
        } //success end
}) // ajax end

}