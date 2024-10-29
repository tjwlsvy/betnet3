/*
티켓단체구매 -> (중고나라) 사고팔기
야구 관련 중고물건 사고팔기 (회원제)
글 클릭시 나오는 내용:
사진 1~3장 (멀티파트 사용, 써머노트와는 따로)
소개글 (써머노트)
판매금액
회원이 접속했을 시에 뜨는 [연락? 버튼]
눌렀을 시 상대 회원에게 쪽지처럼 템플릿 메시지 전송- 
"{name}님이 회원님의 {prodname} 판매물품 구매 의사가 있습니다. {name}님의 연락처는 {phone}입니다."
현재 몇명이 버튼을 눌렀는지 버튼 옆에 출력
DB:
쪽지 느낌 테이블: 번호 메시지 보낸사람 받는사람 날짜
게시글 테이블: 글번호 제목 작성자 구매제안수 조회수 날짜
*/

// console.log("market.js");

// 페이지 정보 관리 객체
let pageInfo ={
    page : 1,   // 1. page : 현재페이지 기본값 : 1
    mkState : 100,   // 2. 거래현황 카테고리, 기본값 : 100 (필터링이 없는 값)
    searchKeyword : '',      // 4. searchKeyword : 검색필드값 기본값 : ""
}

// 현재 페이지 정보를 쿼리스트링에 있으면 가져와 갱신하기
let urlParams = new URL(location.href).searchParams;
let pageNo = parseInt(urlParams.get("page")) // 페이지번호
let mkState = parseInt(urlParams.get("mkstate")) // 거래현황
let searchKeyword = urlParams.get("searchkeyword") // 검색어
if (!isNaN(pageNo)){pageInfo.page = pageNo}
if (!isNaN(mkState)){pageInfo.mkState = mkState}
if (searchKeyword != null){pageInfo.searchKeyword = searchKeyword}

//페이지 오픈시 자동 실행
getall();

// 5. 검색 초기화
function searchClear(){
    // 입력창 초기화
    document.querySelector("#searchInput").value = "";
    document.querySelector("#stateSearch").value = 100;
    // 전역변수 초기화
    pageInfo.page = 1;
    pageInfo.searchKeyword = '';
    pageInfo.mkState = 100;
    getall()
}

//검색버튼 클릭
function search(){
    let mkState = document.querySelector('#stateSearch').value;
    let sKeyword = document.querySelector("#searchInput").value;
    pageInfo.mkState = mkState;  // 선택된 값 가져오기
    pageInfo.searchKeyword = sKeyword;
    getall()
}

//게시글 출력
function getall(){ //getall(page, bcno)
    // console.log("getall");
    
    let tbody=document.querySelector('.marketTbody');
    let html='';
    $.ajax({
        async : false,
        method:'get',
        url:"/market/readall",
        data : {mkstate : pageInfo.mkState, page : pageInfo.page, pagesize : pageInfo.pageSize, searchkeyword : pageInfo.searchKeyword},
        success:result =>{
            console.log(result);
            // 페이지화 변수
            let totalPage = result.totalpage;
            let startBtn = result.startbtn;
            let endBtn = result.endbtn;
            result.data.forEach(data =>{
                // console.log(data);
                
                let imageUrl = "/upload/" + data.filenames[0]; // 첫 번째 파일명을 이미지 URL로 사용
                let mkStateStr = data.mkstate === 0 ? "진행중" : "거래완료"
                html+=`<tr>
                        <td>${data.mkid}</td>
                        <td><img src="${imageUrl}" alt="상품 이미지" style="width: 100px; height: auto;" /></td>
                        <td><a class="title-link"mkid=${data.mkid}>${data.mktitle}</a></td>
                        <td>${data.username}</td>
                        <td>${mkStateStr}</td>
                        <td>${data.mkview}</td>
                        <td>${data.mkdate}</td>
                    </tr>`;
            });
            tbody.innerHTML=html;
            // 제목 클릭시 현재 페이지 쿼리스트링을 포함해서 글 상세보기 페이지로 가는 이벤트 리스너
            document.querySelectorAll('.title-link').forEach(link => {
                link.addEventListener('click', function(event) {
                    // 게시글 번호
                    const mkid = this.getAttribute('mkid');
                    // 상세보기 페이지로 이동 (쿼리 스트링 포함)
                    location.href = `/marketview?page=${pageInfo.page}&mkstate=${pageInfo.mkState}&searchkeyword=${pageInfo.searchKeyword}&mkid=${mkid}`;
                });
            });
            let pageHtml = ``;
            // 페이지네이션
            // 이전 버튼
            pageHtml += `<li class="page-item"><a class="page-link" href="/market?page=${Math.max(pageInfo.page - 1, 1)}" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </a></li>`
            // 페이지버튼
            // 페이지마다 시작 버튼 수
            // 페이지마다 끝 버튼 수
            // 최대 페이지 수
            for (let i = startBtn; i <= endBtn; i++){
                pageHtml += `<li class="page-item"><a class="page-link ${i == pageInfo.page ? 'active' : ''}" href="/market?page=${i}">${i}</a></li>`
            }   
            // 다음버튼
            pageHtml += `<li class="page-item"><a class="page-link" href="/market?page=${Math.min(pageInfo.page + 1, totalPage)}" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            </a></li>`
            document.querySelector(".pagination").innerHTML = pageHtml;
        }
    })
}