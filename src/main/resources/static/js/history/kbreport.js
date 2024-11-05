// <select> 태그 내용이 바뀔 때(change) 함수가 실행되도록 하는 이벤트 리스너 설정
// DOMContentLoaded 이벤트(웹페이지 요소 전체 로드 완료)가 발생한 후 실행되도록 하기
document.addEventListener('DOMContentLoaded', (event) => {
    const yearSelect = document.querySelector('#year');
    getYearTable(yearSelect.value)
    // function(): 익명 함수, 이벤트 발생시 아래 내용이 즉시 실행
    yearSelect.addEventListener('change', function() {
        const yearValue = this.value;  // 선택된 값 가져오기
        getYearTable(yearValue)
    });
});

// 선택한 연도에 맞춰 flask 서버에서 데이터 가져오기
function getYearTable(yearValue){
    $.ajax({
        async: false,
        method: "GET",
        data: {'year': yearValue},
        url: "http://127.0.0.1:5000/getkbreporttable",
        success: (resp) => {
            response = JSON.parse(resp)
            // console.log(response);
            let html1 = ""
            let html2 = ""
            for (let i = 0; i < response.length; i++){
                let keyCount = 0
                html1 += `<tr>`
                html2 += `<tr>`
                for (const key in response[i]){
                    let cell = `<td>${response[i][key]}</td>`
                    if (keyCount < 11){
                        html1 += cell
                    } else {
                        html2 += cell
                    }
                    keyCount++
                }
                html1 += `</tr>`
                html2 += `</tr>`
            }
            document.querySelector(".historyTbody1").innerHTML = html1
            document.querySelector(".historyTbody2").innerHTML = html2
        },
        // jqXHR: jQuery의 XMLHttpRequest 객체, 응답 코드 등 데이터 포함
        error: (jqxhr) => {
            if (jqXHR.status === 404) {  // 응답코드 404시 실행
                console.error('404: 테이블 정보가 없습니다.');
                alert('해당 연도 자료가 없습니다. 다른 연도를 선택해 보세요.');
            } else {
                console.error('서버 통신 과정에서 오류가 발생했습니다:', jqXHR.status);
            }
        }
    })
}
