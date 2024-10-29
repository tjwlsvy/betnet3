// board.js 에서 view 페이지 이동 코드  <th> <a href="/board/view?bno=${ b.bno }">${ b.btitle }</a>
    // JS 코드가 HTML 를 만들어내고 사용자는 표현된 HTML 에서 a 클릭이벤트
    // <a href="/board/view?bno=3">안녕하세요</a>    ---> /board/view?bno=3

// URL 상의 쿼리스트링 매개변수를 JS에서 꺼내는방법
    // JAVA SPRING 에서 HTTP URL 상의 쿼리스트링 매개변수를 꺼내는 방법
        // @RequestParam 이용한 쿼리스트링 매개변수 매핑
    // JS 에서 HTTP URL 상의 쿼리스트링 매개변수를 꺼내는 방법
        // 1. new URL( location.href )  : 현재 JS가 포함된 URL 경로 의 정보가 담긴 객체 호출
        // 2. .searchParams;            : 현재경로상의 쿼리스트링 매개변수 속성 호출
        // 3. .get( key )               : 쿼리스트링 매개변수의 key에 해당 하는 value 호출
let bno = new URL( location.href ).searchParams.get('bno'); // 현재 URL 경로상의 bno 값 호출
console.log( bno );

//게시물 개별 출력하기
boardView()
function boardView(){
    let board = {}
    let currentUserId = ''; //현재 아이디 저장할 변수
    $.ajax({ // AJAX
        async : false , method : "get" ,
        url :"/board/find/bno", data : { bno : bno } ,
        success : r => { console.log(r); board = r; bReplyRead();}
    }) // AJAX END

    document.querySelector('.teamname').innerHTML = `${ board.teamname }`;
    document.querySelector('.etcBox').innerHTML = `
        <div class="d-flex justify-content-between bg-light p-2 rounded">
            <div class="d-flex align-items-center">
                <span class="text-muted mr-3">작성자: <strong>${board.memberid}</strong></span>
                <span class="text-muted">조회수: <strong>${board.views}</strong></span>
            </div>
            <span class="text-muted">작성일: <strong>${board.createdat}</strong></span>
        </div>
    `;
    document.querySelector('.title').innerHTML = `${ board.title }`;
    document.querySelector('.content').innerHTML = `${ board.content }`;

// 글작성자만 수정 버튼이 보이게
// 로그인 체크함수 연동
    $.ajax({
            async:false,
            method:'get',
            url:"/member/logcheck", //멤버함수의 로그인 체크 함수
            success:(result)=>{console.log(result);
                currentUserId = result.memberid // success로 가져온 현재 로그인된 아이디를 currentUserId에 대입
                if(currentUserId==board.memberid){ //현재 접속한 아이디와 글작성자 아이디가 같으면
                    // 수정 삭제 버튼 넣기
                    document.querySelector('.btnBox').innerHTML =
                        `
                        <button type="button" class="btn btn-primary" onclick="location.href='/board/update?bno=${bno}'">수정</button>
                        <button type="button" class="btn btn-primary" onclick="bDelete(${bno})" >삭제</button>
                        `;
                }
                else{ // 아이디가 일치하지 않으면 공백 넣기
                    document.querySelector('.btnBox').innerHTML = '';
                }
            } //success end
        })
}

// 게시물 삭제하기
function bDelete( bno ){
//    console.log(bno);
//    console.log('bDelete()');
    $.ajax({
            async : false,
            method : 'delete',
            data : {postid : bno} ,
            url : "/board/delete",
            success:(r) =>{
                console.log(r);
                if(r){
                    alert('삭제성공');
                    location.href="/board"
                }else{
                    alert('본인이 작성한 글만 삭제 가능합니다.');
                }
            } ,
            error : (e) => {console.log(e)}
    })
}


////////////////////////////////댓글/////////////////////////////////////
// 3. 댓글쓰기
function onReplyWrite(){
    console.log('onReplyWrite()');
    // 1. 입력받은 값 가져오기
    let content = document.querySelector(".brcontent").value;
    // 2. 객체화
    let info = {
        commentindex : 0 ,  // 이건 왜 0으로 넣는거지
        content : content ,
        postid : bno   // 현재 보고 있는 게시물 번호 //보고있는 게시물에 댓글을 추가해야 하니까
    };
//    console.log(info);
    $.ajax({
        async : false ,
        method : 'post' ,
        url : "/board/reply/write" ,
        data : JSON.stringify(info) , // 객체를 JSON 문자열로 변환
        contentType : "application/json" ,
            // - contentType : "application/x-www-form-urlencoded" --> ajax 기본값(생략시)
            // - contentType : false --> multipart/form-data 첨부파일(바이너리)
            // - contentType : "application/json"
        success : (r) => {
//            console.log(r);
            if(r == true){
                alert("댓글쓰기 성공");
                document.querySelector(".brcontent").value = '';
                bReplyRead();
            }else{
                alert("댓글쓰기 실패 : 로그인 후 쓰기가 가능합니다.");
                location.href = "/member/login";
            }
        } , // success end
        error : (e) => {console.log(e);}   // error end
    })  // ajax end
}   // onReplyWrite() end




bReplyRead();
// 4. 댓글 출력
function bReplyRead(){
//    console.log('bReplyRead()');
//    console.log(bno);
    let currentUserId = ''; //현재 아이디 저장할 변수
    let reply = {};
    $.ajax({
        async : false ,
        method : 'get' ,
        url : "/board/reply/read" ,
        data : {bno : bno} ,
        success : (r) =>{
//            console.log(r);
            reply = r;
//            console.log(reply);
        } ,
        error : (e) => {console.log(e);}
    }); // ajax end

    // 로그인 체크 ajax
    $.ajax({
            async:false,
            method:'get',
            url:"/member/logcheck", //멤버함수의 로그인 체크 함수
            success:(result)=>{console.log(result);
                currentUserId = result.memberid // success로 가져온 현재 로그인된 아이디를 currentUserId에 대입
            } //success end
    })
    console.log(currentUserId)

    // 어디에
    let replyBox = document.querySelector(".replyBox");
    // 무엇을
    let html = ``;
    reply.forEach(rp => { // bno에 맞는 목록들 전체 출력
        if(currentUserId==rp.memberid){ //그 목록중 현재접속된 아이디와 댓글 작성자가 일치하면
            // 수정 삭제 버튼까지 출력하기
                // '${rp.content}' => 뮨문는 문자취급
            html += `<tr>
                                <td> ${rp.userName} </td>
                                <td class="td${rp.commentid}" > <input value="${rp.content}" readonly style="border: none; outline: none;" /> </td>
                                <td> ${rp.createdat} </td>
                                <td class="updatetd${rp.commentid}"> <button type="button" class="btn btn-primary" onclick="ReUpdate( ${rp.commentid} , '${rp.content}' )">수정</button> </td>
                                <td> <button type="button" class="btn btn-primary" onclick="ReDelete(${rp.commentid})">삭제</button> </td>
                            </tr>

                    `;
        }
        //일치하지 않는다면 나머지 부분만 출력하기
        else{
            html += `<tr>
                        <td> ${rp.userName} </td>
                        <td> ${rp.content} </td>
                        <td> ${rp.createdat} </td>
                    </tr>
            `;
        }
    });
    // 출력
    replyBox.innerHTML = html;
}   // bReplyRead() end


///////////////댓글 수정///////////////////////
    ///댓글 수정 보이게
function ReUpdate(commentid , content ){
    let uptd = document.querySelector(`.td${commentid}`)
    uptd.innerHTML = `<input  value="${ content }" class="newContent"/>`

    let updatetd = document.querySelector(`.updatetd${commentid}`)
    updatetd.innerHTML = `<button type="button" class="btn btn-primary" onclick="ReUpdate2( ${commentid}  )">수정완료</button>`

}

function ReUpdate2(commentid){
    console.log("ReUpdate2()")
    console.log(commentid)

    let newContent =  document.querySelector(`.newContent`).value

    let info = {
            postid : bno,
            commentid : commentid ,
            content : newContent
        };

        $.ajax({
            async : false ,
            method : 'put' ,
            url : "/board/reply/update" ,
            data : JSON.stringify(info) , // 객체를 JSON 문자열로 변환
            contentType : "application/json" ,
            success : (r) => {
    //            console.log(r);
                if(r == true){
                    alert("댓글수정 성공");
                    bReplyRead();
                }else{
                    alert("댓글쓰기 실패 : 로그인 후 쓰기가 가능합니다.");
                    location.href = "/member/login";
                }
            } , // success end
            error : (e) => {console.log(e);}   // error end
        })  // ajax end
}







////////댓글 삭제
function ReDelete (commentid) {
    console.log("ReDelete()")
    console.log(commentid)
    data = {
        postid : bno,
        commentid : commentid
    }
    $.ajax({
                async : false,
                method : 'delete',
                data : data ,
                url : "/board/reply/delete",
                success:(r) =>{ bReplyRead(); //댓글 삭제후 최신화
                    console.log(r);
                    if(r){
                        alert('삭제성공');
                    }else{
                        alert('본인이 작성한 글만 삭제 가능합니다.');
                    }
                } , //success end
                error : (e) => {console.log(e)}
    }) // ajax end

}
