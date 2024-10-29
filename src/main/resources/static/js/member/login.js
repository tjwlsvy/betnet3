console.log('login.js');

// 엔터키 이벤트 리스너 추가
document.getElementById('pw').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        doLogIn(); // 로그인 함수 호출
    }
});

function doLogIn(){console.log('doLogIn()');
    let id=document.querySelector('#id').value;
    let pw=document.querySelector('#pw').value;
    $.ajax({
        
        method:'post',
        url:"/member/login",
        data:{'userName':id,'password':pw},
        success:(result)=>{console.log(result);
            if(result){
                loginPoint(result.memberid)
                location.href="/"
            }
            else{
                alert('로그인 실패')
                document.querySelector('#id').value='';
                document.querySelector('#pw').value=''
            }
        }
    })
}


function loginPoint(memberid){
    console.log('loginPoint()');
    $.ajax({
            method:'post',
            url:"/point/login",
            data:{'memberid':memberid},
            success:(result)=>{console.log(result);
                if(result){
                     alert('로그인 포인트 10 증정')
                }
                else{
                    alert('포인트 지급 실패')
                } //else end
            } // success end
    }) // ajax end
}// function end