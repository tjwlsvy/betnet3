console.log('signup.js');
// 현재 유효성검사 체크 현황
let checkArray=[false,false,false,false];// id,비밀번호,전화번호,이메일


function checkUsername(){ console.log('checkUsername()')
    // 1. 입력된 값 가져오기
    let userName = document.querySelector('#username').value;   console.log( userName );
    let modalBody = document.getElementById('usernameModalBody');
    // 2. 정규표현식 : 영소문자와 숫자 조합의 5~12글자 까지 허용
    let idReg =  /^[a-z0-9]{5,12}$/
    // 3. 정규표현식 검사.
    console.log( idReg.test( userName ) )
    if( idReg.test(userName) ){
        // 아이디 중복검사 REST API 통신
        $.ajax({
            async : false,              // 비동기true vs 동기false
            method : "get",             // HTTP method
            url : "/member/idchecking",    // HTTP url
            data : { userName : userName } ,        // HTTP 전송할 DATA
            success : (result)=>{   console.log(result);
                // HTTP 응답받을 DATA
                if( result ){
                    modalBody.textContent = '이미 사용 중인 아이디입니다.';
                    modalBody.classList.remove('text-success');
                    modalBody.classList.add('text-danger');
                    checkArray[0]=false;
                    console.log(checkArray);
                }else{
                    modalBody.textContent = '사용 가능한 아이디입니다.';
                    modalBody.classList.remove('text-danger');
                    modalBody.classList.add('text-success');
                    checkArray[0]=true;
                    console.log(checkArray);
                }
            } // success method end
        }) // ajax end
    }else{
        modalBody.textContent = '영소문자와 숫자 조합의 5~12글자 까지 가능합니다.';
        modalBody.classList.remove('text-success');
        modalBody.classList.add('text-danger');
        checkArray[0]=false;
    }
     // 모달 창 표시
     $('#usernameModal').modal('show');
} // method end

// 모달 창 닫기
function hideModal(){console.log('hideModal()');

    $('#usernameModal').modal('hide');
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
        checkArray[1]=false;
        console.log(checkArray);
    } else if (confirmPassword !== "") {
        confirmPasswordHelp.textContent = '비밀번호가 일치합니다.';
        checkArray[1]=true;
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
                    checkArray[2]=false;
                    console.log(checkArray);
                }else{
                    modalBody.textContent = '사용 가능한 연락처입니다.';
                    modalBody.classList.remove('text-danger');
                    modalBody.classList.add('text-success');
                    checkArray[2]=true;
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
                    checkArray[3]=false;
                    console.log(checkArray);
                }else{
                    modalBody.textContent = '사용 가능한 이메일입니다.';
                    modalBody.classList.remove('text-danger');
                    modalBody.classList.add('text-success');
                    checkArray[3]=true;
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

teams()
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

// 1. 회원가입
function doSignup(){ console.log( 'doSignup()' )
    // 유효성 검사 체크
    console.log(checkArray);
    for(let i=0;i<checkArray.length;i++){
        if(!checkArray[i]){
            alert('유효하지 않은 정보가 있습니다.')
            return;
        }
    }

    // 1. 입력값 가져오기
    let userName = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let contact = document.querySelector("#phone").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let age=document.querySelector('#age').value;
    let teamCode=document.querySelector('#favoriteTeam').value;
    let account=document.querySelector('#account').value;
    // 2. 객체
    let info = {  userName : userName , password : password , name : name ,
                email : email , contact : contact , gender : gender , age : age , teamCode : teamCode , account : account
    }; console.log( info );
    // 3. ajax ( jquery 라이브러리 필요 ) , 비동기 통신
    $.ajax( {
        async : false ,         //  async : true 비동기(기본값) , false 동기식
        method : 'post' ,       // HTTP POST
        url : "/member/signup", // HTTP URL
        data : info ,           // HTTP 보낼 데이터
        success : ( result )=>{ console.log( result ); // HTTP 받을 데이터
            // 4. 결과에 따른 처리
            if( result ){alert('회원가입성공');
                location.href="/member/login";
            }else{  alert('회원가입실패');  }
        } // success end
    } ); // ajax end

    //alert('ajax 처리 이후');
    // async : true  ,  alert('ajax 처리 이후'); -> alert('회원가입성공');
    // async : false ,  alert('회원가입성공'); ->  alert('ajax 처리 이후');
} // method end