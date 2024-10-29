loginCheck()

let gameCode = new URL( location.href ).searchParams.get('gameCode'); // 현재 URL 경로상의 bno 값 호출
    console.log( gameCode );
    let selectedSeats = []; // 선택된 좌석 배열
let totalPrice = 0; // 총 가격 변수
const seatPrice = 18000; // 좌석당 가격
const maxSeats = 4; // 최대 선택 가능한 좌석 수
createSeats()






function createSeats() {
    let seatsContainer = document.getElementById('seats');
    let seatsHTML = ''; // 좌석 HTML 문자열 초기화
    let bookedSeats = []; // 예매 완료된 좌석 배열 초기화

    // AJAX 요청으로 예약된 좌석 가져오기
    $.ajax({
        async: false,
        method: 'get',
        url: "/bus/check",
        data: { gameCode: gameCode },
        success: result => {
            console.log(result);
            result.forEach(log => {
                if (log.sumStatus == -1) {
                    bookedSeats.push(log.seat);
                }
            });
        }
    });

    let seatImg = 1;
    // 1줄 좌석 배열
    const seatLayout = [
        [4, 8, 12, 16, 20, 24, 28, 32, 36, 40], // 1줄
        [3, 7, 11, 15, 19, 23, 27, 31, 35, 39], // 2줄
        [], // 공백 3줄
        [2, 6, 10, 14, 18, 22, 26, 30, 34, 38], // 4줄
        [1, 5, 9, 13, 17, 21, 25, 29, 33, 37]  // 5줄
    ];

    seatLayout.forEach((row, rowIndex) => {
        if (rowIndex === 2) {
            // 공백 처리 (3줄)
            seatsHTML += `<div class="seat-row"><div class="empty-seat" style="width: 100%; height: 40px;"></div></div>`;
            return; // 다음 줄로 넘어감
        }

        let rowDiv = `<div class="seat-row">`; // 각 줄 시작

        row.forEach(seatNumber => {
            let isBooked = bookedSeats.includes(seatNumber);
            let buttonClass = isBooked ? 'seat unavailable' : 'seat available';
            let buttonDisabled = isBooked ? 'disabled' : '';
            let buttonOnClick = isBooked ? '' : `onclick="toggleSeat(${seatNumber})"`; // 클릭 이벤트 추가

            // 버튼 HTML 생성
        rowDiv += `<img src="/img/${isBooked ? 'r' : 'w'}${seatNumber}.png" class="${buttonClass}" id="seat${seatNumber}" ${buttonDisabled} ${buttonOnClick} />`;
            seatImg++ // 좌석 이미지 1 증가
        });

        rowDiv += `</div>`; // 각 줄 종료
        seatsHTML += rowDiv; // 전체 HTML 문자열에 추가
    });

    seatsContainer.innerHTML = seatsHTML; // 생성된 HTML 삽입

}





// 좌석 상태 변경 함수 (4개 좌석까지 선택 가능)
function toggleSeat(seatNumber) {
    let seat = document.getElementById('seat' + seatNumber); // 좌석 ID는 번호로 생성됨
    let cartBox = document.querySelector(".purchaseCartBox"); // 선택된 좌석을 표시할 위치

    if (selectedSeats.includes(seatNumber)) {
        // 좌석이 이미 선택된 경우 (취소 로직)
        seat.classList.remove('unavailable');
        seat.classList.add('available');
        selectedSeats = selectedSeats.filter(num => num !== seatNumber); // 선택 해제된 좌석 배열에서 제거
        totalPrice -= seatPrice; // 총 가격에서 해당 좌석 가격 제거
        document.getElementById(`cart-seat-${seatNumber}`).remove(); // 선택된 좌석 Cart에서 제거
    } else {
        if (selectedSeats.length >= maxSeats) {
            alert(`최대 ${maxSeats} 좌석까지만 선택할 수 있습니다.`);
            return; // 선택을 중단
        }

        // 좌석 선택
        seat.classList.remove('available');
        seat.classList.add('unavailable');
        selectedSeats.push(seatNumber); // 선택된 좌석 배열에 추가
        totalPrice += seatPrice; // 총 가격에 좌석 가격 추가

        // 선택된 좌석을 Cart에 추가
        let seatInfo = document.createElement('tr');
        seatInfo.innerHTML = `<td>좌석 번호: ${seatNumber} ${seatPrice}포인트</td>`;
        seatInfo.id = `cart-seat-${seatNumber}`; // 각 좌석에 고유 ID 할당
        cartBox.appendChild(seatInfo); // 좌석 정보 추가
    }

    // 총 가격 표시 업데이트
    updateTotalPrice();
}

// 총 가격 업데이트 함수
function updateTotalPrice() {
    let priceDisplay = document.getElementById('totalPrice');
    
    // 총 가격을 표시할 div가 없으면 새로 추가
    if (!priceDisplay) {
        priceDisplay = document.createElement('div');
        priceDisplay.id = 'totalPrice';
        priceDisplay.style.marginTop = '20px'; // 총 가격 표시를 맨 밑에 여백을 주어 표시
        document.querySelector('.purchaseCartBox').appendChild(priceDisplay);
    }

    // 총 가격 내용 갱신
    priceDisplay.innerHTML = `<strong>총 가격: ${totalPrice} 포인트</strong>`;
}



    // 취소 버튼 클릭 시 선택된 좌석을 다시 가능 좌석으로 변경
    function resetSeats() {
        if (selectedSeat !== null) {
            let seat = document.getElementById('seat'+selectedSeat);
            seat.classList.remove('unavailable');
            seat.classList.add('available');
            seat.disabled = false;
            console.log(`좌석 ${seat.textContent} 다시 가능 상태로 변경됨`);
            selectedSeat = null;  // 선택된 좌석 초기화

            // Cart에서 선택된 좌석 정보 삭제
            let cartBox = document.querySelector(".purchaseCartBox");
            let seatInfo = document.getElementById("cart-seat");
            if (seatInfo) {
                cartBox.removeChild(seatInfo);  // 선택된 좌석 정보를 Cart에서 삭제
            }
        } else {
            alert("선택된 좌석이 없습니다.");
        }
    }




// 좌석 선택 함수에서 예약 요청 추가
function busPurchase() {
    console.log("busPurchase()");

    let selectedSeatsArray = selectedSeats;
    if (selectedSeatsArray.length == 0) {
        alert('선택된 좌석이 없습니다.');
        return;
    }

    // 선택된 좌석들에 대한 중복 예약 확인
    $.ajax({
        method: 'get',
        url: "/bus/check",
        data: { gameCode: gameCode },
        success: (result) => {
            let unavailableSeats = [];

            result.forEach(log => {
                if (log.sumStatus == -1 && selectedSeatsArray.includes(log.seat)) {
                    alert(`좌석 ${log.seat}은(는) 이미 예약되었습니다.`);
                    unavailableSeats.push(log.seat);
                }
            });

            selectedSeatsArray = selectedSeatsArray.filter(seat => !unavailableSeats.includes(seat));

            if (selectedSeatsArray.length == 0) {
                return;
            }

            let busDtoList = selectedSeatsArray.map(seat => ({
                gameCode: gameCode,
                pointChange: -18000,
                description: 9,
                seat: seat,
                reStatus: -1
            }));

            // 예약 요청
            $.ajax({
                method: "post",
                url: "/bus/Reservation",
                contentType: "application/json",
                data: JSON.stringify(busDtoList),
                success: (response) => {
                    if (response) {
                        alert('예약이 완료되었습니다.');

                        // WebSocket을 통해 예약 알림 전송
                        selectedSeatsArray.forEach(seat => {
                            clientSocket.send(JSON.stringify({
                                type: 'reservation',
                                data: { seat: seat }
                            }));
                        });

                        location.href = "/";
                    }
                    else {
                        alert('포인트가 부족합니다');
                    }
                },
                error: (error) => {
                    console.error('예약 중 오류 발생:', error);
                    alert('예약 중 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            });
        },
        error: (error) => {
            console.error('중복 예약 확인 중 오류 발생:', error);
            alert('중복 예약 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    });
}


//로그인 체크
    //로그인한 회원만 예약 가능
function loginCheck() {
    $.ajax ({
        async : false,
        method : "get",
        url : "/member/logincheck",
        success : r => {    console.log(r);
            if ('' == r) {
                alert('버스 예매는 로그인 후 가능합니다');
                location.href = '/member/login';
            }
        }

    })
}



// console 에 계속 중복 사용뜬다 해서
if (!window.clientSocket) {
    window.clientSocket = new WebSocket("ws://localhost:8080/bus/conn");
}

// WebSocket 메시지 수신 처리
clientSocket.onmessage = function(event) {
    try {
        const message = JSON.parse(event.data);
        if (message.type === 'reservation') {
            handleReservationUpdate(message.data);
        }
    } catch (error) {
        console.error('WebSocket 메시지 처리 오류:', error);
    }
};

// 예약 업데이트 처리 함수
function handleReservationUpdate(data) {
    // 버튼 클릭 이벤트 트리거
    const button = document.getElementById('liveToastBtn');
    button.click(); // 버튼 클릭을 시뮬레이션

    createSeats(); // 좌석 재생성
}

