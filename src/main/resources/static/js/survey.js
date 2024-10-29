

function survey(){
    // 각 질문에 대해 선택된 값 가져오기
    const questions = ['question1', 'question2', 'question3', 'question4', 'question5',
         'question6', 'question7', 'question8', 'question9', 'question10'];
    let result = {};

    let check = true ;
    // 질문 배열을 순회하며 선택된 라디오 버튼의 값을 찾음
    questions.forEach((question) => {
        const selectedRadio = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedRadio) {
            result[`${question}`] = `${selectedRadio.value}`; // 선택된 값 대입
        } else {
            check = false ;
        }
    });

    if( check ) {

    console.log(result)
        $.ajax({
            async : false,
            method : "get",
            url : "http://127.0.0.1:5000/survey/save",
            data : result,
            success :(result2 =>{ console.log(result2)
            document.querySelector(".modal-body").innerHTML = result2

            }) // successs
        }) // ajax

    }else{
        alert(' 체크 안된 사항이 있습니다.')
    }
$('.modal').modal('show');
} // survey

