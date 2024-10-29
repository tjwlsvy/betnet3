let teamLogo = {
    '롯데':'https://upload.wikimedia.org/wikipedia/ko/0/0c/%EB%A1%AF%EB%8D%B0_%EC%9E%90%EC%9D%B4%EC%96%B8%EC%B8%A0_%EB%A1%9C%EA%B3%A0%282023~%29.png?20240731151823',
    'LG':'https://upload.wikimedia.org/wikipedia/ko/8/8a/LG_%ED%8A%B8%EC%9C%88%EC%8A%A4_%EB%A1%9C%EA%B3%A0.png' , 
    '두산':'https://upload.wikimedia.org/wikipedia/ko/0/05/%EB%91%90%EC%82%B0_%EB%B2%A0%EC%96%B4%EC%8A%A4_%EB%A1%9C%EA%B3%A0.png' , 
    '키움':'https://i.namu.wiki/i/8OIBhZIuoLOBU-jAkbyFWqsCZXga6FDLXSDcCxW65u17b-oJyobnxj11-jpcGyjw0d3LqmDx1xZhILUPigeAvO8oHl1iG6VES2FnyO_wyra0S7SNyfKONh03h-piv1Y-HCwLNnvbnVOYW4mlmB5NcQ.svg' , 
    'SSG':'https://i.namu.wiki/i/vjpuTXpyrwVXP4keQVivHUl9mJX0zZXIxMkFgMhZINZHVtXE8EHo1kfpR8oa5hgo6CmRIAn4njCXKGtiNIR4vNonDOPgBEkdosWMabZBd3WLI3T3E3Pt_4gSNbRw-NZpLYJHb9OJMkal4PT3z1O0_g.svg' , 
    'KIA':'https://tigers.co.kr/img/sub/emblem01_01.png' , 
    'NC': 'https://www.ncdinos.com/assets/images/sub/emblem01.png' , 
    '한화' : 'https://i.namu.wiki/i/mlh33164jnUot3lB-keosWy6bQ2vZSI2xXguIyvh_TO5bJnifYsAKeoLvC2VUPGVAeAbcygYP-ak3AQSryV2aFgb4H8nvxE0sMGhE71YVbkP9VffqsihMfpFliJsr2WihFWguRPbsFJkLW0pTDEynw.svg' , 
    '삼성' : 'https://upload.wikimedia.org/wikipedia/ko/e/ee/%EC%82%BC%EC%84%B1_%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88_%EB%A1%9C%EA%B3%A0.png' , 
    'KT' : 'https://upload.wikimedia.org/wikipedia/ko/7/7b/Kt_%EC%9C%84%EC%A6%88_%EB%A1%9C%EA%B3%A0.png' , 
}
console.log('index.js')
let memberInfo = {}   // 멤버정보 저장하는 변수 
console.log(memberInfo);
getSchedule()
// 파이썬 플라스크 서버에서 크롤링된 정보
// 우선 오늘 날짜 경기일정 + 내일 경기일정(혹시 없으면 모레 경기일정)
// 오늘 날짜 경기가 없으면 내일과 모레(없으면 사흘)
// X날과 X+1날 경기일정

function getSchedule(){
    let today = new Date();
    let formattedTime = today.toTimeString().split(' ')[0]; // HH:mm:ss 형식
    let formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    let fullFormattedDateTime = `${formattedDate} ${formattedTime}`; // YYYY-MM-DD HH:mm:ss 형식
    console.log(fullFormattedDateTime); // String 타입  // 2024-09-25 16:34:25

    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:5000/getschedule",
        data: {date: formattedDate},
        success: (result) => {
            result = JSON.parse(result);
            console.log(result);
            if(isEmptyObject(result)){
                alert('경기일정이 존재하지 않습니다.');
                return;
            }
            // 경기일정 표시
            // TODO: 09.22 추가 데이터
            // 어웨이예측순위, 홈예측순위, 어웨이배당률, 홈배당률, 어웨이승률, 홈승률
            // 7.116,             4.998,        1.59,                1.41,         0.41,       0.59
            let tbody = document.querySelector('.gamePrintBox');
            let html = '';
            for(let i = 0 ; i < result.length ; i++){
                let compareDate = `${result[i].연도}-${result[i].월}-${result[i].일} ${result[i].시작시간}`;
                console.log(compareDate);
                console.log(fullFormattedDateTime);


                let homelogo = teamLogo[`${result[i].홈팀명}`];
                let awaylogo = teamLogo[`${result[i].어웨이팀명}`];

               // 시간이 문장뎔이라 변환한 코드
               // 문자열을 ISO 8601 형식으로 변환
               let dateISO = compareDate.replace(' ', 'T'); // 'T'로 변경
               let date = new Date(dateISO); // Date 객체로 변환
               // 3시간을 밀리초로 변환
               let threeHoursInMillis = 3 * 60 * 60 * 1000;
               // 3시간 전의 시간 계산
               let threeHoursBefore = new Date(date.getTime() - threeHoursInMillis);
               let currentDateTime = new Date(fullFormattedDateTime.replace(' ', 'T')); // ISO 형식으로 변환

                if(fullFormattedDateTime > compareDate){
                    html += `<div>
                                <div> ${i+1} </div>
                                <div>
                                    KBO ( 일반 )
                                </div>
                                <div class="dateValue">
                                    ${result[i].월}/${result[i].일} ${result[i].시작시간}
                                </div>
                                <div>
                                    <div> ${result[i].월}/${result[i].일} ${result[i].시작시간}  </div>
                                    <div class="matchBox">
                                        <div class="teamLogoBox">
                                            <img src="${homelogo}" width="35px"/>
                                            <div> ${result[i].홈팀명} </div>
                                        </div>
                                        <span class="matchTxtBox"> vs </span>
                                        <div class="teamLogoBox">
                                            <img src="${awaylogo}" width="35px"/>
                                            <div> ${result[i].어웨이팀명} </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
                                </div>
                                <div>
                                    발매마감
                                </div>
                            </div>
                            `;
                    console.log('발매마감');
                }else{
                    if (currentDateTime <= threeHoursBefore) {
                          console.log("현재 시간이 경기 시작 3시간 전입니다.");
                          html += `<div>
                                      <div> ${i+1} </div>
                                      <div>
                                          KBO ( 일반 )
                                      </div>
                                      <div class="dateValue">
                                          ${result[i].월}/${result[i].일} ${result[i].시작시간}
                                      </div>
                                      <div>
                                          <div> ${result[i].월}/${result[i].일} ${result[i].시작시간}  </div>
                                          <div class="matchBox">
                                              <div class="teamLogoBox">
                                                   <img src="${homelogo}" width="35px"/>
                                                  <div> ${result[i].홈팀명} </div>
                                              </div>
                                              <span class="matchTxtBox"> vs </span>
                                              <div class="teamLogoBox">
                                                  <img src="${awaylogo}" width="35px"/>
                                                  <div> ${result[i].어웨이팀명} </div>
                                              </div>
                                          </div>
                                      </div>

                                      <div>
                                          <button type="button" onclick="location.href='/bus?gameCode=${result[i].경기코드}'">예약</button>
                                      </div>
                                      
                                      <div>
                                          <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 1 , ${result[i].홈배당률}); activateButton(this);"> 승 / ${result[i].홈배당률} </button>
                                          <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 0 , ${result[i].어웨이배당률}); activateButton(this);"> 패 / ${result[i].어웨이배당률} </button>
                                      </div>
                                      <div> <a href='/cheerchat?gameCode=${result[i].경기코드}'> 응원하러가기 </a> </div>
                                  </div>`;
                          console.log('발매중')
                      } //버스 예매 if end
                      else {
                          console.log("현재 시간이 경기 시작 3시간 전이 아닙니다.");
                          html += `<div>
                                    <div> ${i+1} </div>
                                    <div>
                                        KBO ( 일반 )
                                    </div>
                                    <div class="dateValue">
                                        ${result[i].월}/${result[i].일} ${result[i].시작시간}
                                    </div>
                                    <div>
                                        <div> ${result[i].월}/${result[i].일} ${result[i].시작시간}  </div>
                                        <div class="matchBox">
                                            <div class="teamLogoBox">
                                                 <img src="${homelogo}" width="35px"/>
                                                <div> ${result[i].홈팀명} </div>
                                            </div>
                                            <span class="matchTxtBox"> vs </span>
                                            <div class="teamLogoBox">
                                                <img src="${awaylogo}" width="35px"/>
                                                <div> ${result[i].어웨이팀명} </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button">예약불가</button>
                                    </div>
                                    <div>
                                        <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 1 , ${result[i].홈배당률}); activateButton(this);"> 승 / ${result[i].홈배당률} </button>
                                        <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 0 , ${result[i].어웨이배당률}); activateButton(this);"> 패 / ${result[i].어웨이배당률} </button>
                                    </div>
                                    <div> <a href='/cheerchat?gameCode=${result[i].경기코드}'> 응원하러가기 </a> </div>

                                </div>`;
                        console.log('발매중')
                     }//버스 예매 else end
                } // else end
                // if(fullFormattedDateTime > compareDate){
                //     html += `<tr>
                //     <td>${i+1}</td>
                //     <td class="dateValue">${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                //     <td>KBO</td>
                //     <td>일반</td>
                //     <td>${result[i].홈팀명} vs ${result[i].어웨이팀명}</td>
                //     <td> 발매마감 </td>
                //     <td>${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                //     </tr>`;
                //     console.log('발매마감');
                   
                // }else{
                //     html += `<tr>
                //     <td>${i+1}</td>
                //     <td class="dateValue">${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                //     <td>KBO</td>
                //     <td>일반</td>
                //     <td>${result[i].홈팀명} vs ${result[i].어웨이팀명}</td>
                //     <td> <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 1 , ${result[i].홈배당률}); activateButton(this);"> 승 / ${result[i].홈배당률} </button> <button type="button" onclick="choiceWinandLoss(${i+1}, '${result[i].경기코드}' , 0 , ${result[i].어웨이배당률}); activateButton(this);"> 패 / ${result[i].어웨이배당률} </button> </td>
                //     <td>${result[i].월}/${result[i].일} ${result[i].시작시간}</td>
                //     </tr>`;
                //     console.log('발매중')
                // }
            }
            tbody.innerHTML = html;
        }
    })  // ajax end
}


// 객체가 비어 있는지 확인하는 함수
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

let matchids = []    // 선택한 경기인덱스 넣는 배열
let winRates = []   // 선택한 게임 승률
let winandlosses = []
let oddses = []   // 각 게임에 맞는 배당률
    // winRates = [45 , 65 , 55 , 35];    // 승률 샘플 테스트 후 넘겨지는 값으로 가져와야함
    // console.log(winRates)
    // 배당률 계산
    // winRates.forEach(winRate => {
    //     console.log(winRate);
    //     odds.push((100 - winRate) * 0.036); 
    // });
    // console.log(odds);

// 승패 고를때마다 실행되는 함수
function choiceWinandLoss(number , matchid , winandloss , oods){
    // 매개변수 winandloss는 회원이 승을 누르는지 패를 누르는지 판단하기 위함
    // 1 -> 승 0 -> 패
    // 매개변수로 더 가져와야 할 것들 승률 , 경기 인덱스...?
    console.log('choiceWinorLoss()');
    // 같은 경기 인덱스인데 버튼을 두번 누르면 두번 리스트에 들어가는 경우 제외
    for(let i = 0; i < matchids.length; i++){
        if(matchid == matchids[i]){
            return;
        }
    }
    // 최대 경기 구매 수 제한
    if(matchids.length > 9 ){
        alert("최대 구매 가능 경기 수는 10개 입니다.");
        return;
    }
    console.log(matchid);
    // 내가 구매한 경기인지 판단!
    // 버튼 비활성화는 해제해야함... 어떻게..?
    let result = true;
    $.ajax({
        async : false , 
        method : "get" , 
        url : "/game/ispurchased" , 
        data : {matchid : matchid} , 
        success : (r) =>{
            console.log(r);
            if(r){
                alert("이미 구매한 경기입니다.");
                result = false;
            }
        }
    })
    if(result==false){
        return;
    }
    // 경기 고를때마다 출력
    let purchaseCartBox = document.querySelector(".purchaseCartBox");
    let winandlossStr = "";
    // 승을 골랐는지 패를 골랐는지 구분해주는 문자 출력
    if(winandloss == 1){
        winandlossStr = "승";
    }else{
        winandlossStr = "패";
    }
    let html = ``;
    html += ` <tr> <th> ${number} </th> <th> ${matchid} </th> <th> ${winandlossStr} / ${oods} </th> <th> <button onclick="removeMatch(this)">x</button></th></tr>`;
    purchaseCartBox.innerHTML += html;

    matchids.push(matchid); // 경기 인덱스 배열저장
    winandlosses.push(winandloss);    // 회원이 결정한 승패 배열 저장
    oddses.push(oods)   // 배당률 배열 저장
    console.log(matchids);
    console.log(winandlosses);
    console.log(oddses);

    updateTotalOdds();
}

// 금액 입력할 때마다 호출되는 함수
function updateTotalOdds() {
    let totalOdds = oddses.reduce((acc, cur) => acc * cur, 1).toFixed(2);
    console.log(totalOdds);

    let betPoint = document.querySelector(".pointChange").value || 0;
    let ifPoint = Math.round(totalOdds * betPoint);
    console.log(ifPoint);

    let purchaseInfoBox = document.querySelector(".purchaseInfoBox");
    let infohtml = `
        <tr> <th> 선택한 경기 수 </th> <td> ${matchids.length} </td> </tr>
        <tr> <th> 예상 적중 배당률 </th> <td>${totalOdds}</td> </tr>
        <tr> <th> 예상 적중 금액 </th> <td>${ifPoint.toLocaleString() }</td> </tr>`;
    
    purchaseInfoBox.innerHTML = infohtml;
}

function activateButton(button) {
    // 같은 tr 내의 모든 버튼 비활성화
    const buttons = button.closest('tr').querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true; // 또는 btn.style.display = 'none';
    });
    
    // 클릭한 버튼만 활성화
    button.disabled = false; // 또는 button.style.display = 'block';
}

// 선택한 경기를 제거하는 함수
function removeMatch(button) {
    const row = button.closest('tr');
    console.log(row)
    const matchid = row.children[1].innerText; // matchid를 가져옴
    console.log(matchid)

    // matchid, winandloss, odds 배열에서 해당 정보를 제거
    const index = matchids.indexOf(matchid);
    console.log(index)
    if (index > -1) {
        matchids.splice(index, 1);
        winandlosses.splice(index, 1);
        oddses.splice(index, 1);
    }

    row.remove(); // 테이블에서 행 제거

    console.log(matchids);
    console.log(winandlosses);
    console.log(oddses);
    
    updateTotalOdds(); // 정보 업데이트
    activateButtons(matchid);  // 버튼활성화
}

// 같은 matchid의 버튼만 활성화
function activateButtons(matchid) {
    const buttons = document.querySelectorAll('.gameScheduleBox tbody button');
    buttons.forEach(button => {
        const buttonMatchid = button.onclick.toString().match(/'([^']+)'/)[1]; // onclick에서 matchid 추출
        if (buttonMatchid === matchid) {
            button.disabled = false; // 해당 경기 버튼만 활성화
        }
    });
}

// 게임구매
function gamePurchase(){
    // 변수가 비어져있으면 실행되는 함수 // 로그인 후 게임 구매가 가능!
    if(isEmptyObject(memberInfo)){
        $.ajax({
            async:false,
            method:'get',
            url:"/member/logcheck",
            success:(result)=>{console.log(result);
                if(result == ""){
                    alert("로그인 후 이용가능합니다.")
                    location.href = "/member/login"
                }
                memberInfo = result
            }
        })
    }
    console.log(matchids);
    console.log(winandlosses);
    console.log(oddses);
    let memberid = memberInfo.memberid;
    let pointChange = document.querySelector(".pointChange").value;
    // 금액 제한
    if(pointChange > 50000){
        alert("구매가능 포인트는 50000포인트까지 가능합니다.")
        return;
    }
    let info = {
        memberid : memberid , pointChange : pointChange , matchids : matchids , winandlosses : winandlosses 
    }
    $.ajax({
        async:false,
        method:'post',
        url:"/game/purchase",
        data : JSON.stringify(info) ,
        contentType : "application/json" , 
        success:(r)=>{
            console.log(r);
            // db 저장 성공
            if(r == 1){
                alert("구매가 완료되었습니다.");
                location.href = "/game"
            }
            // 포인트 부족
            if(r == 3){
                alert("포인트 충전 후 구매 가능합니다.");
                location.href = "/point"
            }

        } , 
        error : (e) =>{
            console.log(e);
        }
    })
}   // gamePurchase end

// 메인페이지 kbo 기사 5개 
getMainArticle();
function getMainArticle(){
    console.log('getMainArticle()')
    $.ajax({
        async : false , 
        method:"GET",
        url:"http://127.0.0.1:5000/article/main",
        success: (r) => {
            console.log(r);
            let atricleBox = document.querySelector(".atricleBox")
            let html = ``
            
            Object.entries(r).forEach(([key, value]) => {   // JavaScript 객체의 키와 값을 쌍으로 포함하는 배열을 반환합니다.
                console.log(`${key}: ${value}`);
                Object.entries(value).forEach(([key2, value2]) => {   // JavaScript 객체의 키와 값을 쌍으로 포함하는 배열을 반환합니다.
                    console.log(`${key2}: ${value2}`);
                    let pubDate = value2.pubDate;
                    // Date 객체로 변환
                    let date = new Date(pubDate);

                    // 날짜와 시간 포맷
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
                    let day = String(date.getDate()).padStart(2, '0');
                    let hours = String(date.getHours()).padStart(2, '0');
                    let minutes = String(date.getMinutes()).padStart(2, '0');

                    // 최종 포맷
                    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                    html += `<tr>
                                <td><a href="${value2.org_link}">${value2.title}</a></td>
                                <td>${formattedDate}</td>
                            </tr>`
                })
            })
            atricleBox.innerHTML = html;
        }
    })
}


function adPoint(){
    console.log("adPoint()")
   $.ajax({
               method:'post',
               url:"/point/advertis",
               success:(result)=>{console.log(result);
                   if(result){
                        alert('광고 포인트 10 증정')
                   }
                   else{
                       alert('포인트 지급 실패')
                   } //else end
               } // success end
       }) // ajax end
}

