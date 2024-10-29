
console.log('log.js')

// 회원 접속 조회 함수
function mAccessLog(){
    $.ajax({
       async : false,
       method : "GET" ,
       url : "/cadmin/accessLog" ,
       success : r => {
           console.log(r);
           let html = '';
           html += `<table class="table table-hover table-bordered">
                        <thead class="thead-dark">
                        <tr>
                          <th scope="col">접속번호</th>
                          <th scope="col">회원번호</th>
                          <th scope="col">이름</th>
                          <th scope="col">접속날짜</th>
                        </tr>
                        </thead>
                        <tbody>`;
           r.forEach(log => {
                html += `<tr>
                    <td>${log.accessid}</td>
                    <td>${log.memberid}</td>
                    <td>${log.username}</td>
                    <td>${log.memberdatetime}</td>
                    </tr>`;
           });
           html += `    </tbody>
                       </table>`;
           document.querySelector('.indexMain').innerHTML = html
       }    // success end
    })  // ajax end
}   // function end


// 배당금 지급 내역
function dividend(){
$.ajax({
       async : false,
       method : "GET" ,
       url : "/cadmin/dividend" ,
       success : r => {
            console.log(r);
           let html = '';
           html += `<table class="table table-hover table-bordered">
                        <thead class="thead-dark">
                        <tr>
                          <th scope="col">회원번호</th>
                          <th scope="col">이름</th>
                          <th scope="col">접속날짜</th>
                          <th scope="col">배당금 지금 내역</th>
                        </tr>
                        </thead>
                        <tbody>`;
           r.forEach(log => {
                html += `<tr>
                    <td>${log.memberid}</td>
                    <td>${log.username}</td>
                    <td>${log.logDate}</td>
                    <td>${log.pointChange}</td>
                    </tr>`;
           });
           html += `    </tbody>
                       </table>`;
           document.querySelector('.indexMain').innerHTML = html
       }    // success end
    })  // ajax end
}
//
//// 포인트 구매 내역
//function pointBuy(){
//$.ajax({
//       async : false,
//       method : "GET" ,
//       url : "/cadmin/pointBuy" ,
//       success : r => {
//            console.log(r);
//           let html = '';
//           html += `<table class="table table-hover table-bordered">
//                        <thead class="thead-dark">
//                        <tr>
//                          <th scope="col">접속번호</th>
//                          <th scope="col">회원번호</th>
//                          <th scope="col">이름</th>
//                          <th scope="col">접속날짜</th>
//                        </tr>
//                        </thead>
//                        <tbody>`;
//           r.forEach(log => {
//                html += `<tr>
//                    <td>${log.accessid}</td>
//                    <td>${log.memberid}</td>
//                    <td>${log.username}</td>
//                    <td>${log.memberdatetime}</td>
//                    </tr>`;
//           });
//           html += `    </tbody>
//                       </table>`;
//           document.querySelector('.indexMain').innerHTML = html
//       }    // success end
//    })  // ajax end
//}
//
//// 포인트 출금 내역
//function pointWithdrawal(){
//$.ajax({
//       async : false,
//       method : "GET" ,
//       url : "/cadmin/pointWithdrawal" ,
//       success : r => {
//            console.log(r);
//           let html = '';
//           html += `<table class="table table-hover table-bordered">
//                        <thead class="thead-dark">
//                        <tr>
//                          <th scope="col">접속번호</th>
//                          <th scope="col">회원번호</th>
//                          <th scope="col">이름</th>
//                          <th scope="col">접속날짜</th>
//                        </tr>
//                        </thead>
//                        <tbody>`;
//           r.forEach(log => {
//                html += `<tr>
//                    <td>${log.accessid}</td>
//                    <td>${log.memberid}</td>
//                    <td>${log.username}</td>
//                    <td>${log.memberdatetime}</td>
//                    </tr>`;
//           });
//           html += `    </tbody>
//                       </table>`;
//           document.querySelector('.indexMain').innerHTML = html
//       }    // success end
//    })  // ajax end
//}
//
//// 게임 구매 내역
//function gameBuy(){
//$.ajax({
//       async : false,
//       method : "GET" ,
//       url : "/cadmin/gameBuy" ,
//       success : r => {
//            console.log(r);
//           let html = '';
//           html += `<table class="table table-hover table-bordered">
//                        <thead class="thead-dark">
//                        <tr>
//                          <th scope="col">접속번호</th>
//                          <th scope="col">회원번호</th>
//                          <th scope="col">이름</th>
//                          <th scope="col">접속날짜</th>
//                        </tr>
//                        </thead>
//                        <tbody>`;
//           r.forEach(log => {
//                html += `<tr>
//                    <td>${log.accessid}</td>
//                    <td>${log.memberid}</td>
//                    <td>${log.username}</td>
//                    <td>${log.memberdatetime}</td>
//                    </tr>`;
//           });
//           html += `    </tbody>
//                       </table>`;
//           document.querySelector('.indexMain').innerHTML = html
//       }    // success end
//    })  // ajax end
//}
//
