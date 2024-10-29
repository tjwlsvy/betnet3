let memberInfo={} //멤버정보 저장 변수
getMyPoint();
function getMyPoint(){
    console.log('getMyPoint');
    $.ajax({
        async : false ,
        method : "get" ,
        url : "/point/mypoint" ,
        success : (r) => {
            console.log(r);
            let point = 0;
            // r 값이 null이 아니면 점수 업데이트
            if (r && r.sum !== undefined) {
                point = r.sum;
            }
            let myPointBox = document.querySelector(".myPointBox");
            let html =`<a class="nav-link" href="/point">${point}</a>`
            myPointBox.innerHTML = html;
        } ,
        error : (e) => {
            console.log(e)
        }
    })  // ajax end
}   // getMyPoint() end

doLoginCheck();
function doLoginCheck(){
    $.ajax({
        async:false,
        method:'get',
        url:"/member/logcheck",
        success:(result)=>{
            if(result == ""){
                alert("로그인 후 이용가능합니다.")
                location.href = "/member/login"
            }
            else{console.log(result);
                memberInfo=result
                document.querySelector("#name").value=result.name
                document.querySelector("#userName").value=result.userName
                document.querySelector("#contact").value=result.contact
                document.querySelector("#email").value=result.email
                document.querySelector("#account").value=result.account
                document.querySelector("#teamCode").value=result.teamName
                document.querySelector("#age").value=result.age
                document.querySelector("#joinDate").value=result.joinDate
                if(result.gender=='M'){document.querySelector("#gender").value='남성'}
                else{document.querySelector("#gender").value='여성'}
            }
        }
    })
}

function pwCheckModal(){
    // 모달 창 표시
    $('#pwCheckModal').modal('show');
    
}

function pwCheck(){
    let = password=document.querySelector('#pwCheck').value;
    if(password==memberInfo.password){
        location.href="/member/edit"
    }
    else{
        alert('비밀번호가 일치하지 않습니다.')
    }
}
