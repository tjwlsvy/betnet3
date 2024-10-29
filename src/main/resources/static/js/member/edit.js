console.log('edit.js');
let memberid=0;
// 현재 유효성검사 체크 현황
let checkArray=[true,true,true];// 비밀번호,전화번호,이메일

// 팀목록 가져오기
function teams(){
    let teams=document.querySelector('#favoriteTeam');
    let html=`<option value="">선택하세요</option>`
    $.ajax({
        async:false, method:'get',
        url:"/member/teams",
        success:result =>{
            result.forEach(r =>{
                html+=`<option value=${r.teamCode}>${r.teamName}</option>`
            })
            teams.innerHTML=html;
        }

    })
};

doLoginCheck();
function doLoginCheck(){
    teams();
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
                document.querySelector("#password").value=result.password
                document.querySelector("#confirmPassword").value=result.password
                document.querySelector("#phone").value=result.contact
                document.querySelector("#email").value=result.email
                document.querySelector("#account").value=result.account
                document.querySelector("#favoriteTeam").value=result.teamCode
                memberid=result.memberid
            }
        }
    })
}



// 모달 창 닫기
function hideModal(){console.log('hideModal()');

    $('#contactModal').modal('hide');
    $('#emailModal').modal('hide');
}

// 비밀번호 유효성검사
function validatePassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let passwordHelp = document.getElementById('passwordHelp');
    let confirmPasswordHelp = document.getElementById('confirmPasswordHelp');
    let pwReg=/^(?=.*[A-Za-z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{5,15}$/;
    console.log(pwReg.test(password));
    
    
    if (pwReg.test(password)) {
        passwordHelp.textContent = '사용가능한 비밀번호입니다.';
    } else {
        passwordHelp.textContent = '비밀번호는 영대소문자,숫자,특수문자(!@#$%^&*)가 최소 하나씩 포함된 5~15글자 까지 가능합니다.';
    }

    if (password !== confirmPassword) {
        confirmPasswordHelp.textContent = '비밀번호가 일치하지 않습니다.';
        checkArray[0]=false;
        console.log(checkArray);
    } else if (confirmPassword !== "") {
        confirmPasswordHelp.textContent = '비밀번호가 일치합니다.';
        checkArray[0]=true;
        console.log(checkArray);
    } else {
        confirmPasswordHelp.textContent = '';
    }
}

// 전화번호 유효성검사
function checkPhone(){console.log('checkPhone');
    // 1. 입력된 값 가져오기
    let contact = document.querySelector('#phone').value;   console.log( contact );
    let modalBody = document.getElementById('contactModalBody');
    // 2. 정규표현식 : 000-000-0000 또는 000-0000-0000 형식
    let phoneReg = /^([0-9]{3})+[-]+([0-9]{3,4})+[-]([0-9]{4})$/
    // 3. 정규표현식 검사.
    console.log( phoneReg.test( contact ) )
    if( phoneReg.test(contact) ){
        // 연락처 중복검사 REST API 통신
        $.ajax({
            async : false,              // 비동기true vs 동기false
            method : "get",             // HTTP method
            url : "/member/phonecheck",    // HTTP url
            data : { contact : contact } ,        // HTTP 전송할 DATA
            success : (result)=>{   console.log(result);
                // HTTP 응답받을 DATA
                if( result ){
                    modalBody.textContent = '이미 등록된 연락처입니다.';
                    modalBody.classList.remove('text-success');
                    modalBody.classList.add('text-danger');
                    checkArray[1]=false;
                    console.log(checkArray);
                }else{
                    modalBody.textContent = '사용 가능한 연락처입니다.';
                    modalBody.classList.remove('text-danger');
                    modalBody.classList.add('text-success');
                    checkArray[1]=true;
                    console.log(checkArray);
                }
            } // success method end
        }) // ajax end
    }else{
        modalBody.textContent = '000-000-0000 또는 000-0000-0000 형식만 가능합니다.';
        modalBody.classList.remove('text-success');
        modalBody.classList.add('text-danger');
        checkArray[2]=false;
    }
     // 모달 창 표시
     $('#contactModal').modal('show');
}

// 이메일 유효성검사
function checkEmail(){console.log('checkEmail()');
    // 1. 입력된 값 가져오기
    let email = document.querySelector('#email').value;   console.log( email );
    let modalBody = document.getElementById('emailModalBody');
    // 2. 정규표현식 : id@도메인주소 형식으로 입력해주세요.
    let emailReg = /^[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]+$/
    // 3. 정규표현식 검사.
    console.log( emailReg.test( email ) )
    if( emailReg.test(email) ){
        // 이메일 중복검사 REST API 통신
        $.ajax({
            async : false,              // 비동기true vs 동기false
            method : "get",             // HTTP method
            url : "/member/emailcheck",    // HTTP url
            data : { email : email } ,        // HTTP 전송할 DATA
            success : (result)=>{   console.log(result);
                // HTTP 응답받을 DATA
                if( result ){
                    modalBody.textContent = '이미 등록된 이메일입니다..';
                    modalBody.classList.remove('text-success');
                    modalBody.classList.add('text-danger');
                    checkArray[2]=false;
                    console.log(checkArray);
                }else{
                    modalBody.textContent = '사용 가능한 이메일입니다.';
                    modalBody.classList.remove('text-danger');
                    modalBody.classList.add('text-success');
                    checkArray[2]=true;
                    console.log(checkArray);
                }
            } // success method end
        }) // ajax end
    }else{
        modalBody.textContent = 'id@도메인주소 형식만 가능합니다.';
        modalBody.classList.remove('text-success');
        modalBody.classList.add('text-danger');
        checkArray[3]=false;
    }
     // 모달 창 표시
     $('#emailModal').modal('show');
}



// 1. 수정
function doEdit(){ console.log( 'doEdit()' )

    // 유효성 검사 체크
    console.log(checkArray);
    for(let i=0;i<checkArray.length;i++){
        if(!checkArray[i]){
            alert('유효하지 않은 정보가 있습니다.')
            return;
        }
    }

    // 1. 입력값 가져오기
    let password = document.querySelector("#password").value;
    let email = document.querySelector("#email").value;
    let contact = document.querySelector("#phone").value;
    let teamCode=document.querySelector('#favoriteTeam').value;
    let account=document.querySelector('#account').value;
    // 2. 객체
    let info = { memberid:memberid ,password : password , email : email , contact : contact ,  teamCode : teamCode , account : account
    }; console.log( info );
    // 3. ajax ( jquery 라이브러리 필요 ) , 비동기 통신
    $.ajax( {
        async : false ,         //  async : true 비동기(기본값) , false 동기식
        method : 'put' ,       // HTTP POST
        url : "/member/edit", // HTTP URL
        data : info ,           // HTTP 보낼 데이터
        success : ( result )=>{ console.log( result ); // HTTP 받을 데이터
            // 4. 결과에 따른 처리
            if( result ){alert('수정성공');
                location.href="/member/mypage";
            }else{  alert('수정실패');  }
        } // success end
    } ); // ajax end

    //alert('ajax 처리 이후');
    // async : true  ,  alert('ajax 처리 이후'); -> alert('회원가입성공');
    // async : false ,  alert('회원가입성공'); ->  alert('ajax 처리 이후');
} // method end