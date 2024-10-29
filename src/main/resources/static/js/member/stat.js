let memberInfo = {}   // 결제에 필요한 member정보 저장하는 전역변수
let yearPurchase=[] // 최근 1년 구매금액
let yearRefund=[]   // 최근 1년 적중금액

doLoginCheck();
function doLoginCheck(){
    $.ajax({
        async:false,
        method:'get',
        url:"/member/logcheck",
        success:(result)=>{console.log(result);
            if(result == ""){
                alert("로그인 후 이용가능합니다.")
                location.href = "/member/login"
            }
            memberInfo = result
            console.log(memberInfo)
        }
    })
}

let date = new Date();
console.log(date);
let currentYear = date.getFullYear();
let currentMonth = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
let currentDay = date.getDate() < 10 ? "0"+(date.getDate()) : date.getDate();
date = `${currentYear}-${currentMonth}-${currentDay}`;
console.log(date)

document.querySelector('.endDate').value = date;
// 날짜 버튼을 눌렀을 때
function changeDate(day){
    // startdate에 넣을 때 빼기로 설정을 해줘야하므로 설정에 따른 값 매개변수 day로 받아오기
    console.log("changeDate()")
    let startDateInput = document.querySelector(".startDate");
    let startDate = new Date();     // 왼쪽 input
    startDate.setDate(startDate.getDate()-day);     // 오늘 날짜에서 매개변수로 받아온 일수 만큼 빼주기 js라이브러리 함수
    console.log(startDate);
    let startYear = startDate.getFullYear();    console.log(startYear);
    // 한자리수일 경우에 0 앞에 붙이는 삼항연산자
    let startMonth = startDate.getMonth()+1 < 10 ? "0"+(startDate.getMonth()+1) : startDate.getMonth()+1;      
    console.log(startMonth);
    let startDay = startDate.getDate() < 10 ? "0"+(startDate.getDate()) : startDate.getDate();          
    console.log(startDay);
    let strStartDate = `${startYear}-${startMonth}-${startDay}`;    // input date 포맷이 문자열 "YY-MM-DD" 형식으로만 받기 떄문에 문자 따로 만들어주기
    console.log(strStartDate)
    startDateInput.value = strStartDate;
    let endDateInput = document.querySelector(".endDate");  // 오른쪽 input
    endDateInput.value = date;  // 컨셉 상 enddate는 오늘 날짜를 기준으로 함 전역변수로 설정해둔 오늘 날짜 대입.
}
let startDate = new Date();     // 왼쪽 input
    startDate.setDate(startDate.getDate()-365);     // 오늘 날짜에서 매개변수로 받아온 일수 만큼 빼주기 js라이브러리 함수
    console.log(startDate);
    let startYear = startDate.getFullYear();    console.log(startYear);
    // 한자리수일 경우에 0 앞에 붙이는 삼항연산자
    let startMonth = startDate.getMonth()+1 < 10 ? "0"+(startDate.getMonth()+1) : startDate.getMonth()+1;      
    console.log(startMonth);
    let startDay = startDate.getDate() < 10 ? "0"+(startDate.getDate()) : startDate.getDate();          
    console.log(startDay);
    let strStartDate = `${startYear}-${startMonth}-${startDay}`;

// 검색 기능 객체 컨셉 상 검색 조건이 문의 유형별 , 처리상태별 , 검색별 , 기간별 이므로 해당하는 객체 만들어주기
let searchInfo = {
    startDate : strStartDate , 
    endDate : date , 
    memberid : memberInfo.memberid
}
// 검색버튼 눌렀을 때
function onSearch(){
    console.log('onSearch()');
    let startDate = document.querySelector('.startDate').value;
    let endDate = document.querySelector('.endDate').value;
    searchInfo.startDate = startDate;
    searchInfo.endDate = endDate;
    console.log(searchInfo);
    // 새로고침
    myPurchase();
    myRefund();
    returnRate();
}


let purchase=0;
myPurchase();
// 포인트내역 출력
function myPurchase(){
    console.log('purchase');
    
    $.ajax({
        async : false , 
        method : 'get' , 
        url : "/member/purchase" , 
        data : searchInfo , // 전역변수 보내기
        success : (r) => {
            console.log(r);
            let purchaseAmount = document.querySelector("#purchaseAmount");
            let sum=0;
            yearPurchase=r
            r.forEach(log => {
                sum+=log.pointChange
            });
            sum=Math.abs(sum)
            purchase=sum;
            purchaseAmount.innerHTML = `${sum}포인트`
        } , 
        error : (e) => {
            console.log(e);
        }
    })  // ajax end
} // mypointlog end

let refund=0;
myRefund();
// 포인트내역 출력
function myRefund(){
    console.log('purchase');
    
    $.ajax({
        async : false , 
        method : 'get' , 
        url : "/member/refund" , 
        data : searchInfo , // 전역변수 보내기
        success : (r) => {
            console.log(r);
            let purchaseAmount = document.querySelector("#hitAmount");
            let sum=0;
            yearRefund=r
            r.forEach(log => {
                sum+=log.pointChange
            });
            sum=Math.abs(sum)
            refund=sum;
            purchaseAmount.innerHTML = `${sum}포인트`
        } , 
        error : (e) => {
            console.log(e);
        }
    })  // ajax end
} // mypointlog end
returnRate();
function returnRate(){
    let returnRate = 0;
    if(refund != 0 && purchase != 0){
        returnRate=Math.round( (refund/purchase)*100)
    }
    console.log(refund)
    console.log(purchase)
    console.log(returnRate)
    document.querySelector("#returnRate").innerHTML=`${returnRate}%`
}

// 현재 날짜를 기준으로 1년 전까지의 월 목록 생성
function generateLast12Months() {
    let months = [];
    let currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
        if (month < 10) month = '0' + month; // 두 자리로 맞추기
        months.push(`${year}-${month}`);
        currentDate.setMonth(currentDate.getMonth() - 1); // 이전 달로 이동
    }
    
    return months.reverse(); // 과거부터 현재까지 나열
}

console.log(yearPurchase);
console.log(yearRefund);

// 날짜를 "YYYY-MM" 형식으로 변환하는 함수
function getMonth(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}`;
}

// 월별로 데이터를 그룹화하고 금액을 합산하는 함수
function groupByMonth(data) {
    let months = generateLast12Months(); // 최근 12개월 목록
    let monthlyData = {};

    // 기본적으로 모든 달을 0으로 설정
    months.forEach(month => {
        monthlyData[month] = 0;
    });
    
    data.forEach(item => {
        console.log(item);
        
        let month = getMonth(item.logDate);
        console.log(month);
        
        console.log(monthlyData[month]);
        
        
        
        monthlyData[month] += Math.abs(item.pointChange);
        
       
        
        
    });
    
    return monthlyData;
}

// 두 데이터셋을 그룹화
let monthlyData1 = groupByMonth(yearPurchase);
let monthlyData2 = groupByMonth(yearRefund);

// 월별 라벨과 각 데이터셋의 금액 추출
let labels = Object.keys(monthlyData1); // 월 리스트 (연도-월 형식)
let values1 = Object.values(monthlyData1); // 첫 번째 데이터 금액
let values2 = Object.values(monthlyData2); // 두 번째 데이터 금액

// Chart.js로 차트 생성
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line', // 꺾은선 그래프
    data: {
        labels: labels, // 월 (YYYY-MM)
        datasets: [
            {
                label: '구매금액', // 첫 번째 데이터셋 라벨
                data: values1, // 첫 번째 데이터셋 값
                borderColor: 'rgba(75, 192, 192, 1)', // 첫 번째 선 색상
                borderWidth: 2,
                fill: false
            },
            {
                label: '적중금액', // 두 번째 데이터셋 라벨
                data: values2, // 두 번째 데이터셋 값
                borderColor: 'rgba(255, 99, 132, 1)', // 두 번째 선 색상
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: '최근1년간 구매금액과 적중금액의 추이'
                }
            },
            y: {
                beginAtZero: true, // Y축을 0에서 시작
                title: {
                    display: true,
                    text: '포인트'
                }
            }
        }
    }
});




