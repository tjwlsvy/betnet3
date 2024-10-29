// console.log("marketadd.js");

// Summernote 초기화
$('#summernote').summernote({
    height: 300, // 에디터 높이 설정
    placeholder: '여기에 내용을 입력하세요...', // 플레이스홀더 텍스트
    lang : 'ko-KR', // 도움말이 한글로 표기
    toolbar: [ // 에디터의 툴바 설정
        ['style', ['bold', 'italic', 'underline', 'clear']], // 글꼴 스타일 관련 버튼
        ['font', ['strikethrough', 'superscript', 'subscript']], // 글꼴 관련 버튼
        ['para', ['ul', 'ol', 'paragraph']], // 문단 관련 버튼
        ['view', ['fullscreen', 'codeview', 'help']] // 보기 관련 버튼
    ],
});

function mkWrite(){
    // Summernote 내용
    const content = document.querySelector('#summernote').value;
    // 첨부된 이미지 파일 가져오기
    const files = document.querySelector('#uploadfiles').files;
    // 제목
    const title = document.querySelector('#mktitle').value;
    // 유효성 검사
    // .trim(): 양쪽 공백 제거
    if (!title || title.trim() === '') {
        alert('제목을 입력하세요.');
        return;
    }
    // Summernote 빈 입력도 html 코드 일부를 반환하므로 추가 검사
    if (!content || content.trim() === '<p><br></p>' || content.trim() === '') {
        alert('내용을 입력하세요.');
        return;
    }
    // 첨부파일이 있는지 확인
    if (files.length === 0) {
        // 파일이 없을 경우 안내 메시지 표시
        alert( '첨부된 사진이 없습니다. 굿즈 사진을 최소 한 장 추가해 주세요.')
        return;
    }

    if (files.length > 3) {
        alert("사진은 최대 3장까지 첨부할 수 있습니다.");
        return;
    }

    // FormData를 사용하여 폼 데이터 준비
    let formData = new FormData();
    formData.append("mkcontent", content);
    formData.append("mktitle", title);

    // 이미지 파일 추가
    for (let i = 0; i < files.length; i++) {
        formData.append("uploadfiles", files[i]); // images로 DTO에 전달
    }

    // AJAX 요청으로 데이터 전송
    $.ajax({
        url: '/market/write', // 서버의 게시글 제출 엔드포인트
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response === true){
                alert("게시글 작성 완료. 게시판으로 돌아갑니다.");
                location.href="/market"
            } else {
                alert("게시글 작성 실패, 로그인 여부를 확인해 주세요.")
                // location.href="/member/login"
            }
            
        },
        error: function() {
            alert("게시글 제출에 실패했습니다.");
        }
    });
};

// 이전 페이지로 돌아가기
function goBack() {
    window.history.back(); 
}

// 이미지 파일 미리보기
$('#uploadfiles').change(function() {
    const files = this.files;
    const previewContainer = $('#imagePreview'); // 미리보기 영역

    previewContainer.empty(); // 기존 미리보기 제거

    for (let i = 0; i < files.length && i < 3; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.append(`<img src="${e.target.result}" width="100" style="margin: 5px;">`);
        };
        reader.readAsDataURL(files[i]);
    }
});