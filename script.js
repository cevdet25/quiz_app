function Question(questionText, answerOptions, rightAnswer){
    this.questionText=questionText;
    this.answerOptions=answerOptions;
    this.rightAnswer=rightAnswer;
}

Question.prototype.controlRightAnswer=function(cevap){
    return cevap === this.rightAnswer
}

let questions=[
    new Question("1-Which country has the longest coastline in the world?",{A:"Australia", B:"Canada", C:"Indonesia", D:"Russia"}, "C"),
    new Question("2-What is the world's most populated country?",{A:"Australia", B:"China", C:"Indonesia", D:"Russia"}, "B"),
    new Question("3-What is the capital of the Philippines?",{A:"Marawi", B:"Dili", C:"Manilla", D:"Jakarta"}, "C"),
    new Question("4-The Great Barrier Reef is off the coast of which country?",{A:"Australia", B:"New Zealand", C:"Fiji", D:"South Africa"}, "A"),
    new Question("5-What is the World's Smallest Country?",{A:"Luxembourg", B:"Monaco", C:"Lichtenstein", D:"Vatican City"}, "D"),
]

function Quiz(questions){
    this.questions=questions;
    this.questionIndex=0;
    this.right=0;
    this.wrong=0;
}

Quiz.prototype.bringQuestion=function(){
    return this.questions[this.questionIndex];
}

const quiz=new Quiz(questions);

document.querySelector(".btn_start").addEventListener("click", function(){
    document.querySelector(".quiz_box").classList.add("active");
    showQuestion(quiz.bringQuestion());
    document.querySelector(".btn_start").classList.add("hidden");
    showQuestionOrder(quiz.questionIndex + 1, quiz.questions.length)
    timer(5);
    time_line();
    
})

function showQuestion(question){
    let question_list=`<span class="fw-bold">${question.questionText}</span>`;
    let answers='';

    for(let cevap in question.answerOptions){
        answers+=`
            <div class="answer">
                <span><b>${cevap}</b>: ${question.answerOptions[cevap]}</span>
            </div>
        `;
    }
    // yukarıdaki kodda ${cevap}'tan sonra bırakılan boşluk if'i false getiriyodu. dikkat

    document.querySelector(".var").innerHTML=question_list;
    document.querySelector(".answers").innerHTML=answers;
    const answer = document.querySelector(".answers").querySelectorAll(".answer ");

    for(let ans of answer){
        ans.setAttribute("onclick", "optionSelected(this)");
    }
};

function optionSelected(answer){ 
    
    let cevap = answer.querySelector("span b").textContent;
    let soru= quiz.bringQuestion();
   
   
   if(soru.controlRightAnswer(cevap)){
        answer.classList.add("correct");
        let tag_correct=`<i class="fa-solid fa-circle-check"></i>`;
        document.querySelector(".correct").insertAdjacentHTML("beforeend",tag_correct);
         quiz.right +=1;
   }else{
        answer.classList.add("incorrect")
        let tag_incorrect=`<i class="fa-solid fa-circle-xmark"></i>`;
        document.querySelector(".incorrect").insertAdjacentHTML("beforeend",tag_incorrect);
        quiz.wrong +=1;
    }

    calculateResult(quiz.right,quiz.wrong);

   const mark=document.querySelector(".answers");
   for(let i=0; i<mark.children.length;i++){
    mark.children[i].classList.add("disabled");
   }
}
let counter;

function timer(time){
    
     counter = setInterval(repeat,1000);
    
    function repeat(){
        time--;
        document.querySelector(".time_panel_second").textContent=time;

        if(time==0){
            clearInterval(counter);
            let fun = document.querySelector(".time_panel_text");
            fun.innerHTML="Time is UP!"

            let soru=quiz.bringQuestion();
            let cevap=soru.rightAnswer;
            let marku=document.querySelector(".answers").children;

            for(let pto of marku){
                if(pto.querySelector("span b").textContent == cevap){
                    pto.classList.add("correct");
                    let tag_correct=`<i class="fa-solid fa-circle-check"></i>`;
                    pto.insertAdjacentHTML("beforeend",tag_correct);
                    pto.classList.add("disabled");
                }else{
                    pto.classList.add("incorrect")
                    let tag_incorrect=`<i class="fa-solid fa-circle-xmark"></i>`;
                    pto.insertAdjacentHTML("beforeend",tag_incorrect);
                    pto.classList.add("disabled");
                }
            }
        }
    }

}

let timeLine=document.querySelector(".time_line");
let counter_two;

function time_line(){
    let width=0;
    counter_two=setInterval(cut,12.5);
   function cut(){
    width += 1.5;
    timeLine.style.width=width + "px";
    if(width==600){
        clearInterval(counter_two);
    }
   }
}

document.querySelector(".btn_next").addEventListener("click", function(){
    document.querySelector(".time_panel_text").textContent = "Remaining Time:";
            
    if(quiz.questionIndex + 1 !== quiz.questions.length){

        clearInterval(counter);
        clearInterval(counter_two);
        time_line();
        timer(5);
        
        quiz.questionIndex +=1;
        showQuestion(quiz.bringQuestion());
        showQuestionOrder(quiz.questionIndex + 1,quiz.questions.length); 
        endTheTest();
    }else{
        document.querySelector(".quiz_box").classList.remove("active");
        document.querySelector(".score_box").classList.add("active");
        if(quiz.right>=3){
            let tag=document.querySelector(".note");
            let note=`
                <b>You are a genius</b>
            `;
            tag.innerHTML=note;
        }else{
            let tag=document.querySelector(".note");
            let note=`
                <b>You need to try again</b>
            `;
            tag.innerHTML=note;
        }
        
    }

})

function showQuestionOrder(currentQuestionNumber, totalQuestionNumber){
    let order=document.querySelector(".question_index");
    let orderNumber=`
        ${currentQuestionNumber} / ${totalQuestionNumber}
    `;

    order.innerHTML=orderNumber;
}

function endTheTest(){
    if(quiz.questionIndex + 1==quiz.questions.length){
        let button = document.querySelector(".btn_next");
        let text=`
            End Quiz
        `;
       
        
        button.innerHTML=text;
    }
    
    
}

function calculateResult(right, notright){
    
    let resulty=document.querySelector(".total_score .score_right");
    let resultyy=document.querySelector(".total_score .score_wrong");
    let insert=`
        TRUE: ${right}
    `;
    let inserty=`
        FALSE: ${notright}
    `;

    resulty.innerHTML=insert;
    resultyy.innerHTML=inserty;
}

document.querySelector(".replay").addEventListener("click", function(){
    quiz.questionIndex=0;
    quiz.right=0;
    quiz.wrong=0;
    clearInterval(counter);
    clearInterval(counter_two);
    document.querySelector(".btn_next").textContent = "Next Question";
    document.querySelector(".btn_start").click();
    document.querySelector(".score_box").classList.remove("active");
    document.querySelector(".quiz_box").classList.add("active");
})

document.querySelector(".end").addEventListener("click", function(){
    window.location.reload();
})
