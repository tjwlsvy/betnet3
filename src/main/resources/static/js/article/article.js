console.log("article.js");

getKboArticle();
function getKboArticle(){
    console.log("getKboArticle()");
    $.ajax({
        async : false , 
        method : "get" , 
        url : "http://127.0.0.1:5000/article/kbo" , 
        success : (r) =>{
            Object.entries(r).forEach(([key, value]) => {   // JavaScript 객체의 키와 값을 쌍으로 포함하는 배열을 반환합니다.
                console.log(`${key}: ${value}`);
                let html = ``;
                value.forEach(v =>{
                    let pubDate = v.pubDate;
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
                    console.log(v);
                    
                    html += ` <tr>
                                <td><a href="${v.org_link}">${v.title}</a></td>
                                <td>${formattedDate}</td>
                                </tr>`;
                })
                // 팀별 키에 대한 조건문을 이동
                if (key === "KIA야구") {
                    document.querySelector(".kiaNewsBox").innerHTML = html;
                }
                if (key === "KT야구") {
                    document.querySelector(".ktNewsBox").innerHTML = html;
                }
                if (key === "LG야구") {
                    document.querySelector(".lgNewsBox").innerHTML = html;
                }
                if (key === "NC야구") {
                    document.querySelector(".ncNewsBox").innerHTML = html;
                }
                if (key === "SSG야구") {
                    document.querySelector(".ssgNewsBox").innerHTML = html;
                }
                if (key === "두산야구") {
                    document.querySelector(".duNewsBox").innerHTML = html;
                }
                if (key === "롯데야구") {
                    document.querySelector(".lotNewsBox").innerHTML = html;
                }
                if (key === "삼성야구") {
                    document.querySelector(".samNewsBox").innerHTML = html;
                }
                if (key === "키움야구") {
                    document.querySelector(".kiNewsBox").innerHTML = html;
                }
                if (key === "한화야구") {
                    document.querySelector(".hanNewsBox").innerHTML = html;
                }
            });
        }   // success end
    })  // ajax end

}

getText();
function getText(){
    console.log("getText()");
    $.ajax({
        async : false , 
        method : "get" , 
        url : "http://127.0.0.1:5000/article/text" , 
        success : (r) =>{
            console.log(r);

            Object.entries(r).forEach(([key, value]) => {   // JavaScript 객체의 키와 값을 쌍으로 포함하는 배열을 반환합니다.
                console.log(`${value.src}`);
                let html = ``;
                let keywords = value.keywords
                Object.entries(keywords).forEach(([key2, value2]) => {   
                    console.log(`${key2}: ${value2}`);
                    html += `<div> ${key2} </div>`;
                })
                if (value.src === "KIA야구") {
                    document.querySelector(".kiaKeywordBox").innerHTML = html;
                }
                if (value.src === "KT야구") {
                    document.querySelector(".ktKeywordBox").innerHTML = html;
                }
                if (value.src === "LG야구") {
                    document.querySelector(".lgKeywordBox").innerHTML = html;
                }
                if (value.src === "NC야구") {
                    document.querySelector(".ncKeywordBox").innerHTML = html;
                }
                if (value.src === "SSG야구") {
                    document.querySelector(".ssgKeywordBox").innerHTML = html;
                }
                if (value.src === "두산야구") {
                    document.querySelector(".duKeywordBox").innerHTML = html;
                }
                if (value.src === "롯데야구") {
                    document.querySelector(".lotKeywordBox").innerHTML = html;
                }
                if (value.src === "삼성야구") {
                    document.querySelector(".samKeywordBox").innerHTML = html;
                }
                if (value.src === "키움야구") {
                    document.querySelector(".kiKeywordBox").innerHTML = html;
                }
                if (value.src === "한화야구") {
                    document.querySelector(".hanKeywordBox").innerHTML = html;
                }
            })
        }   // success end
    })  // ajax end

}