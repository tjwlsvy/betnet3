console.log("update.js")

let bno = new URL( location.href ).searchParams.get('bno'); // 현재 URL 경로상의 bno 값 호출
console.log( bno );


boardView( bno )
function boardView( bno ){
    let board = {}
    $.ajax({ // AJAX
        async : false , method : "get" ,
        url :"/board/find/bno", data : { bno : bno } ,
        success : r => { console.log(r); board = r}
    }) // AJAX END

    document.querySelector('.etcBox').value = `<span> 작성자 ${ board.memberid } </span>`;
    document.querySelector('.title').value = `${ board.title }`;
    document.querySelector('.content').value = `${ board.content }`;

    document.querySelector('.btnBox').innerHTML =
            `
            <button type="button" class="btn btn-primary" onclick="bUpdate(${bno})" >수정</button>
            `;
}



function bUpdate(bno) {
console.log("bUpdate()")

    // 1. form 가져오기, form 안에 있는 HTML 모두 한 번에 가져오기
    let boardWriteForm = document.querySelector('.boardWriteForm');
    console.log(boardWriteForm);

    // 2. form HTML 을 바이트로 변환해주는 객체 = new FormData
    let boardWriteFormData = new FormData(boardWriteForm);


    boardWriteFormData.append('postid', bno);

    console.log(boardWriteFormData);

    $.ajax({
        method : "put",
        url : "/board/update",
        data : boardWriteFormData,
        contentType : false,    // ((true : 일반 폼(생략 가능), false : 대용량 폼)
        processData : false,
        success : (r) => {  console.log(r);
            // 4. 통신 결과에 따른 실행문
            if (r) {
                alert('글쓰기성공');
                location.href="/board";
            } else {
                alert('글쓰기실패');
            }
        },
        error : (e) => {
            console.log(e);
        }
    })
}




// 3. 썸머노트 실행
$(document).ready(function() {
    // - 썸머노트 옵션
    let option = {
        height : 500 , // 에디터 높이
        lang : 'ko-KR' // 도움말이 한글로 표기
    }
  $('#summernote').summernote( option );
});
