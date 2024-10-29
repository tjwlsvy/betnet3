console.log("gameDetailList.js");

let listid = new URL( location.href ).searchParams.get('listid'); // 현재 URL 경로상의 bno 값 호출
console.log( listid );

printListid(listid);
function printListid(listid){
    let html = `<h3> ${listid}번 구매내역 </h3>`;
    document.querySelector(".printListid").innerHTML = html;
}

getSchedule();
function getSchedule(){
    let gameSchedule = []
    let myGame = []
    let printMyGame = []
    $.ajax({
        async : false , 
        method: "GET",
        url: "http://127.0.0.1:5000/monthlyschedule",
        success: (result) => {
            console.log(result);
            // 경기일정 가지고 와서 배열에 저장 // 경기코드랑 for문 돌려서 그 열 가지고 오기.
            gameSchedule = result;
        }
    })
    $.ajax({
        async : false , 
        method: "GET",
        url: "/game/detail",
        data : {listid : listid} , 
        success: (result) => {
            console.log(result);
            // 게임 상세출력 가져와서 배열에 저장하기
            myGame = result;
        }
    })
    console.log(gameSchedule);
    console.log(myGame);
    for(let i = 0; i < myGame.length; i++){
        for(let j = 0; j < gameSchedule.length; j++){
            if(myGame[i].matchid == gameSchedule[j].경기코드){
                console.log(myGame[i])
                console.log(gameSchedule[j])
                // 한 줄에 출력
                const mergedObject = Object.assign({}, myGame[i], gameSchedule[j]);
                printMyGame.push(mergedObject);
            }
        }
    }
    console.log(printMyGame);
    let gameDetailListBox = document.querySelector(".gameDetailListBox");
    let html = ``;
    let oddses = [];
    let totalOdds = 1;
    for(let i = 0; i < printMyGame.length; i++){
        let winandlossStr = "";
        let oods = 0;
        if(printMyGame[i].winandloss == 1){
            oddses.push(printMyGame[i].홈배당률)
            oods = printMyGame[i].홈배당률;
        }else{
            oddses.push(printMyGame[i].어웨이배당률)
            oods = printMyGame[i].어웨이배당률;
        }
        console.log(oddses);
        totalOdds = oddses.reduce((acc, cur) => acc * cur, 1).toFixed(2);
        console.log(totalOdds);
        if(printMyGame[i].winandloss == 1){
            winandlossStr = "승";
        }else{
            winandlossStr = "패";
        }
        let matchstateStr = "";
        if(printMyGame[i].matchstate == 1){
            matchstateStr = "경기정상";
        }else{
            matchstateStr = "경기취소";
        }
        let correctStr = "";
        if(printMyGame[i].correct == 0){
            correctStr = "진행중";
        }
        if(printMyGame[i].correct == 1){
            correctStr = "적중";
        }
        if(printMyGame[i].correct == 2){
            correctStr = "적중실패";
        }
        html += `<tr>
                    <td> ${i+1} </td> 
                    <td> ${printMyGame[i].월}/${printMyGame[i].일} ${printMyGame[i].시작시간} </td> 
                    <td> KBO </td> <td> ${printMyGame[i].경기코드} </td> 
                    <td> ${printMyGame[i].홈팀명} vs ${printMyGame[i].어웨이팀명} </td> <td> ${winandlossStr}/${oods} </td> <td> ${printMyGame[i].월}/${printMyGame[i].일} ${printMyGame[i].시작시간} </td>
                    <td> ${matchstateStr} </td>
                    <td> ${correctStr} </td>
                </tr>`;
    }
    gameDetailListBox.innerHTML = html;
    getBet(printMyGame , totalOdds);
}

function getBet(printMyGame , totalOdds){
    console.log('getBet()');
    console.log(printMyGame);
    console.log(totalOdds)
    let betBox = document.querySelector(".betBox");
    let html = ``;
    
    html = `<tr>
                <td> ${printMyGame.length} </td> <td> ${totalOdds} </td> <td> ${Math.abs(printMyGame[0].pointChange)} </td> <td> ${Math.abs(printMyGame[0].pointChange)*totalOdds} </td>
            </tr>
            <tr class="betPoint">
                <td colspan="5"> 총 배팅포인트 ${Math.abs(printMyGame[0].pointChange)} </td> 
            </tr>`;
    betBox.innerHTML = html;
}   //getSchedule() end