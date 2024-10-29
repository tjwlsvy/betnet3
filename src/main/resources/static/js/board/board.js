console.log("board.js")

let boards = []
let boardPage = 10 // 한 페이지에 출력할 게시물 갯수

function search(){
    let search = document.querySelector("#searchInput").value
    let pagination1 = document.querySelector(".pagination")
    boards = boards.filter(board => board.title.includes(`${search}`));
    console.log(boards);
    
    totalBoardSize = boards.length // 전체 게시물수
            console.log(totalBoardSize)
            totalPages = totalBoardSize % boardPage == 0 ? // 전체 게시물이 5의 배수라면
                         parseInt( totalBoardSize/boardPage )  :    // 나눈거 그대로 출력
                         parseInt( totalBoardSize/boardPage ) + 1; // 5의 배수가 아니라면 1페이지 더 출력
            console.log(totalPages)
            let html = ''
            for (let i = 1; i <= totalPages; i++) {

                html += `
                  <li class="page-item" onclick="pagination(${i},${totalPages})">
                    <span class="page-link">${i}</span>
                  </li>`;

                } //for end
                pagination1.innerHTML  = html
         pagination( 1 ,totalPages);
}

// 전체 조회 함수
raadAll(0)
function raadAll(value){

    let teamcode = document.querySelector(".teamcode").value;
    let pagination1 = document.querySelector(".pagination")

    console.log( 'teamcode' )
    console.log( teamcode )

    console.log("raadAll()")
    $.ajax({
       async : false, method : "get" , url : "/board/readAll" ,
       data : { teamcode : value } ,
       success : r => {console.log(r);
            boards = r;
            totalBoardSize = boards.length // 전체 게시물수
            console.log(totalBoardSize)
            totalPages = totalBoardSize % boardPage == 0 ? // 전체 게시물이 5의 배수라면
                         parseInt( totalBoardSize/boardPage )  :    // 나눈거 그대로 출력
                         parseInt( totalBoardSize/boardPage ) + 1; // 5의 배수가 아니라면 1페이지 더 출력
            console.log(totalPages)
            let html = ''
            for (let i = 1; i <= totalPages; i++) {

                html += `
                  <li class="page-item" onclick="pagination(${i},${totalPages})">
                    <span class="page-link">${i}</span>
                  </li>`;

                } //for end
                pagination1.innerHTML  = html
         pagination( 1 ,totalPages);
       } // success end
    }) //ajax end

} //fun end


function pagination( p ,totalPages ){
    let page = p
    let startRow = (page-1) * boardPage  // 페이지의 게시물 시작번호       0   6  12
    console.log(startRow)
    let endRow = startRow + 9            // 페이지 게시물 끝번호          5   11  17


    console.log( page)
    console.log(totalPages)
    if(page == totalPages){
        endRow = boards.length-1
    }
console.log(endRow)
   let tbody = document.querySelector('tbody')
   let html = '';

    for( let i = startRow ; i <=endRow; i++ ) {
        console.log(i)
        console.log(boards[i])
        let 게시판 = boards[i];

            html += `
                       <tr>
                           <td>${게시판.postid}</td>
                           <td>${게시판.teamname}</td>
                           <td><a href="/board/view?bno=${게시판.postid}" class="title">${게시판.title}</a></td>
                           <td>${게시판.userName}</td>
                           <td>${게시판.createdat}</td>
                           <td>${게시판.views}</td>
                       </tr>
                   `;



    }
    tbody.innerHTML = html;


}