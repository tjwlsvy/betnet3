
loginCheck();


// 3. 썸머노트 실행
$(document).ready(function() {
    // - 썸머노트 옵션
    let option = {
        height : 500 , // 에디터 높이
        lang : 'ko-KR' // 도움말이 한글로 표기
    }
  $('#summernote').summernote( option );
});


// 2. 게시물 쓰기 (첨부파일 전송하는 대용량 form 타입의 통신)
function doBoardWrite() {

    // 1. form 가져오기, form 안에 있는 HTML 모두 한 번에 가져오기
    let boardWriteForm = document.querySelector('.boardWriteForm');
    console.log(boardWriteForm);

    // 2. form HTML 을 바이트로 변환해주는 객체 = new FormData
    let boardWriteFormData = new FormData(boardWriteForm);
    console.log(boardWriteFormData);

    $.ajax({
        method : "post",
        url : "/board/write",
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

// 4. 로그인 체크
function loginCheck() {
    $.ajax ({
        async : false,
        method : "get",
        url : "/member/logincheck",
        success : r => {    console.log(r);
            if ('' == r) {
                alert('글쓰기는 로그인 후 가능합니다');
                location.href = '/member/login';
            }
        }

    })
}


