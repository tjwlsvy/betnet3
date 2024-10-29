let mkid = new URL( location.href ).searchParams.get('mkid'); // 현재 URL 경로상의 mkid 값 호출

let currentUserId = 0;
let mkState = 0;
// 게시글 출력
load()
function load() {
    // AJAX 요청으로 게시글 데이터 불러오기
    $.ajax({
        async: false,
        url: '/market/read', // 서버 측 스크립트 URL
        type: 'GET',
        data: { mkid: mkid }, // 게시글 ID 전송
        success: function(data) {
            console.log(data);
            
            // 데이터를 각각 HTML에 추가
            $('#mktitle').text(data.mktitle);
            $('#mkwriter').text(data.username);
            $('#mkview').text(data.mkview);
            $('#mkdate').html(data.mkdate);
            // document.querySelector('.mkcontent').innerHTML = `${ data.mkcontent }`; 와 같은 역할
            $('#mkcontent').html(data.mkcontent);
            mkState = data.mkstate;
            // 댓글
            let repliesHtml = '';
            data.mkreplies.forEach(element => {
                repliesHtml += `
                    <tr>
                        <td>${element.username}</td>
                        <td>${element.mkreplycontent}</td>
                        <td>${element.mkreplydate}</td>
                    </tr>
                `;
            });
            document.querySelector('.replyTbody').innerHTML = repliesHtml;

            // 이미지
            let imageHtml = '';
            for (let i = 0; i < data.filenames.length; i++) {
                let imageUrl = "/upload/" + data.filenames[i];
                imageHtml += `
                    <div class="col-4">
                        <img alt="상품 이미지 ${i + 1}" src="${imageUrl}" class="img-fluid"/>
                    </div>
                `;
            }
            document.querySelector('#imageBox').innerHTML = imageHtml;

            // 로그인한 경우에만 수정/삭제 버튼 표시
            $.ajax({
                async: false,
                method: 'GET',
                url: "/member/logcheck", // member 로그인 체크 함수
                success:(result)=>{
                    // console.log("loginresult");
                    // console.log(result); 
                    // console.log(result.memberid == data.mkwriter );
                    // console.log(result.memberid === data.mkwriter );
                    let buttonHtml = '';
                    if (result && result.memberid){
                        currentUserId = result.memberid  // success로 가져온 현재 로그인된 아이디를 currentUserId에 대입
                        if ( currentUserId==data.mkwriter ) {  // 현재 접속한 아이디와 글작성자 아이디가 같으면
                            // 수정 삭제 버튼 넣기
                            buttonHtml +=
                                `<button type="button" class="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#editModal">
                                    글 수정
                                </button>
                                <button type="button" class="btn btn-danger mx-3" onclick="mkDelete()">
                                    글 삭제
                                </button>`
                            if (data.mkstate == 0){
                                buttonHtml += `<button type="button" class="btn btn-warning mx-3" onclick="changeState()">거래완료</button>`
                            }
                            buttonHtml += `<button type="button" class="btn btn-primary mx-3" onclick="goBack()">돌아가기</button>`;
                            document.querySelector('#btnBox').innerHTML = buttonHtml;
                        } else {  // 아이디가 일치하지 않을 경우
                            document.querySelector('#btnBox').innerHTML = '<button type="button" class="btn btn-primary mx-3" onclick="goBack()">돌아가기</button>';
                        }
                    }
                    else {  // 아이디가 일치하지 않을 경우
                        document.querySelector('#btnBox').innerHTML = '<button type="button" class="btn btn-primary mx-3" onclick="goBack()">돌아가기</button>';
                    }
                } //success end
            })
        },
    });
}

// 진행중 게시글에만 출력, 거래완료로 상태 변경
function changeState(){
    $.ajax({
        url: '/market/edit',
        type: 'PUT',
        data: {
            mkid: mkid, changemkstate: 1, mkstate: 1
        },
        success: (data) => {
            // console.log(data);
            if (data){
                alert('거래완료로 상태 변경 성공.');
                location.reload(true)
            } else {
                alert("거래완료로 변경할 수 없습니다.");
            }
        }
    })
}

function writeReply(){
    let replyContent = document.querySelector('#replyContent').value
    $.ajax({
        url: '/market/replywrite',
        type: 'POST',
        data: {mkid: mkid, mkreplycontent: replyContent},
        success: (data) => {
            // console.log(data);
            if (data){
            alert('댓글 등록 성공.');
            location.reload(true)
            } else {
                alert("로그인 후 댓글 쓰기가 가능합니다.");
                location.href = "/member/login";
            }
        }
    })
}

// 돌아가기 버튼 클릭 시 이전 페이지로 이동
function goBack() {
    window.history.back();
};

// 게시물 삭제하기
function mkDelete(){
        $.ajax({
                async : false,
                method : 'delete',
                data : {mkid : mkid} ,
                url : "/market/delete",
                success:(r) =>{
                    if ( r ) {
                        alert('글 삭제 성공, 이전 화면으로 돌아갑니다.');
                        location.href="/market"
                    } else {
                        alert('본인이 작성한 글만 삭제 가능합니다.');
                    }
                } ,
                error : (e) => {console.log(e)}
        })
    }
    
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

// 수정 모달에서 수정 버튼을 눌렀을 때 실행
function mkEdit() {
    // 제목과 내용 가져오기
    const newTitle = document.querySelector('#postTitle').value;
    const newContent = document.querySelector('#summernote').value;
    // 수정 로직 (여기서는 콘솔에 출력, 실제로는 서버에 AJAX 요청 등을 통해 수정)
    $.ajax({
        async : false,
        method : 'PUT',
        data : {mkid: mkid, mktitle: newTitle, mkcontent: newContent} ,
        url : "/market/edit",
        success:(r) =>{
            if ( r ) {
                alert('글 수정 성공');
                // 모달 닫기
                $('#editModal').modal('hide');
                location.reload(true);
            } else {
                alert('글 수정 실패.');
                // 모달 닫기
                $('#editModal').modal('hide');
            }
        } ,
        error : (e) => {console.log(e)}
    })
}
