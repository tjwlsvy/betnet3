
getSchedule()
function getSchedule(){
    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:5000/getschedule",
        success: (result) => {
            result = JSON.parse(result);
            console.log(result);
//            if(isEmptyObject(result)){
//                alert('경기일정이 존재하지 않습니다.');
//                return;
//            }
            // 경기일정 표시
            let tbody = document.querySelector('.gameScheduleBody');
            let html = '';
            for(let i = 0 ; i < result.length ; i++){
                html += `<tr>
                    <td>${i+1}</td>
                    <td>${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                    <td>KBO</td>
                    <td>일반</td>
                    <td>${result[i].홈팀명} vs ${result[i].어웨이팀명}</td>
                    <td> <button type="button" onclick="cancel('${result[i].경기코드}')"> 취소 </button> </td>
                    <td>${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                    </tr>`;
            }
            tbody.innerHTML = html;
        }
    })
}


function cancel(matchid){
console.log(matchid)
    $.ajax({
            method: "PUT",
            url: "/cadmin/update",
            data : {matchid : matchid} ,
            success: (result) => { console.log(result)
                if (result) {
                    // matchid에 해당하는 버튼을 찾고 비활성화
                    const button = document.querySelector(`button[onclick="cancel('${matchid}')"]`);
                    if (button) {
                        button.disabled = true; // 버튼 비활성화
                        button.style.backgroundColor = 'gray'; // 배경색 변경
                        button.style.color = 'red'; // 글자색 변경
                    }
                }

            }
    })
}






