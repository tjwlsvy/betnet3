console.log('chat.js')

let randomNo = Math.floor( Math.random() * 1001) + 1
let nickName = ``
console.log(nickName)

function doLoginCheck(){
    $.ajax({
        async:false,
        method:'get',
        url:"/member/logcheck",
        success:(result)=>{
            if(result == ""){

                nickName = `익명${randomNo}`
                console.log(nickName)
            }
            else{console.log(result);
                nickName = `${result.userName}(${result.teamName})`
            }
        }
    })
}
doLoginCheck()
// JS 클라이언트 웹소켓 # new WebSocket("ws://localhost:8080/ws매핑주소")
let clientSocket = new WebSocket("ws://localhost:8080/chat/conn")
console.log( clientSocket );

// [1] clientSocket 의 onclose , onerror , onmessage , onopen 정의 해야한다.
    // (1) WebSocket객체내 onopen 속성은 서버소켓과 접속을 성공했을때 발동되는 함수 정의해서 대입
clientSocket.onopen = ( e ) => {
    // 1. 클라이언트 서버와 접속을 성공했을때 (알림) 메시지 구성
    let msg = {
        'type' : 'alarm' , // (알림)메시지
        'message' : `${ nickName }님이 입장 했습니다.`
    }
    // 2. 보내기
    clientSocket.send( JSON.stringify( msg ) );
}

    // (2) WebSocket객체내 onmessage 속성은 서버소켓이 메시지를 보내왔을때 발동되는 함수 정의해서 대입
clientSocket.onmessage = ( messageEvent ) => { // e : 매개변수
    console.log( messageEvent );
    console.log( messageEvent.data ) // 받은 내용물이 들어있는 속성
    // 1. 받은 메시지를 출력할 HTML 호출
    let msgBox = document.querySelector('.msgBox')
    // 2. 받은 메시지의 내용물( .data 속성) 를 HTML 에 대입
    msg = JSON.parse( messageEvent.data  )  // - JSON.parse( 문자열  ) : 문자열타입(JSON형식) --> js객체타입(JSON형식)
        // 2-1 알람 메시지
    if( msg.type == 'alarm'){
        msgBox.innerHTML += `<div class="alarmMsgBox">
                                <span>${ msg.message }</span>
                            </div>`;
        return // 알람 메시지 HTML 출력후 일반 메시지 HTML 코드가 실행되지 않도록 함수 종료
    }
        // 2-2 일반 메시지
    if( msg.from == nickName  ){ // - 내가 보낸 메시지
        msgBox.innerHTML += `<div class="fromMsgBox">
                                <div> <i> ${ msg.date.split(' ')[4] } </i>  ${ msg.from } </div>
                                <div>
                                    <span> ${ msg.message } </span>
                                </div>
                            </div>`
    }else{  // - 남이 보낸 메시지
        msgBox.innerHTML += `<div class="toMsgBox">
                                <div> ${ msg.from }  <i> ${ msg.date.split(' ')[4] } </i> </div>
                                <div>
                                    <span> ${ msg.message } </span>
                                </div>
                            </div>`
    }
}
// [2] 메시지 전송 이벤트
function onMsgSend(){
    //
    let msgInput = document.querySelector('.msgInput')
    // - (일반)메시지 내용 들을 객체 형식으로 구성
    let msg = {
        'type' : 'msg' ,  // (일반)메시지
        'message' : msgInput.value ,
        'from' : nickName ,
        'date' : new Date().toLocaleString()
    }
    // - 현재 클라이언트소켓과 연결 유지된 서버소켓에게 메시지 전송 # .send( ) : 서버소켓에게 메시지 전송
    clientSocket.send( JSON.stringify( msg )  );
        // msg ----> [object Object]
        // JSON.stringify( msg ) ---> {"message":"DFGDFG","from":"익명209","date":"2024. 9. 12. 오후 12:18:21"}

        // - JSON.stringify( js객체  ) : js객체타입(JSON형식) --> 문자열타입(JSON형식)
        // -  "3"(문자열타입 숫자형식) VS 3(정수타입 숫자형식)
        // -  { key : value } (객체타입 JSON형식 )  vs   "{ key : value }" ( 문자열타입 JSON형식 )
    //
    msgInput.value = "";
}
// 채팅방 생성
function createChatRoom() {
    let roomId = Object.keys(chatRooms).length + 1; // 새로운 방 ID
    chatRooms[roomId] = []; // 새로운 방 초기화
    console.log(`채팅방 ${roomId}가 생성되었습니다.`);
    return roomId;
}

// 채팅방 목록을 표시하는 함수
function showChatRooms() {
    let roomList = document.querySelector('.roomList');
    roomList.innerHTML = ''; // 기존 목록 초기화

    for (let roomId in chatRooms) {
        roomList.innerHTML += `<button onclick="openChat(${roomId})">채팅방 ${roomId}</button>`;
    }
}

// 메시지 로드 (기본 기능, 필요에 따라 구현)
function loadMessages(roomId) {
    let msgBox = document.querySelector('.msgBox');
    msgBox.innerHTML = chatRooms[roomId].map(msg => `
        <div>${msg.from}: ${msg.message}</div>
    `).join('');
}
