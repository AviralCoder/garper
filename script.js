console.log("DON'T WRITE ANYTHING YOU DON'T UNDERSTAND OR ELSE YOUR BROWSER COULD CRASH AND YOU WON'T BE ABLE TO OPEN THE SAME BROWSER AGAIN, I AM NOT KIDDING")
//putting html elements in variables so that i can use it in the later part of the code
const input_gender = document.getElementById("gender-input");
const input_submit = document.getElementById("gender-submit");
const gender_div = document.getElementById("gend-div");
const avatar = document.getElementById("avatar-image");
const bet_button = document.getElementById("bet-button");
const bet_input = document.getElementById("bet-money");
const money_left_text = document.getElementById("user-money-left");
const roll_button = document.getElementById("roll-button");
const random_dice = document.getElementById("dice");
const computer_money_text = document.getElementById("money-left_computer");
//making variables to be used in the game
let gender;
let money_left = 10_000;
let state;
let money_inputted;
let seconds_before_reload = 1000;
let computer_money = 10_000;

//initializing sounds
const aww = new Audio("sounds/aww.mp3");
const money = new Audio("sounds/cash.mp3");


//setting text content to money left
$(computer_money_text).text(computer_money);
$(money_left_text).text(`Money left: ${money_left}`);

//functions
const genderCheck = () =>{
    if((input_gender.value.toLowerCase() == "male") || (input_gender.value.toLowerCase() == "female")){
        $(gender_div).addClass("gender-input-done");
        $(gender_div).removeClass("gender-input");
        if($(input_gender).val().toLowerCase() == "male"){
            gender = "male";
            avatar.style.background = "none";
            avatar.style.borderRadius = "0%";
            avatar.src = "images/profile.png";
        }else if($(input_gender).val().toLowerCase() == "female"){
            gender = "female";
            avatar.src = "images/woman.png";
            avatar.style.background = "white";
            avatar.style.borderRadius = "50%";
        }
    }else{
        location.reload();
    }
}

const hideRollButton = () =>{
    $(roll_button).hide();
}

const showRollButton = () =>{
    $(roll_button).show();
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

hideRollButton();

$(input_submit).click(function (e) { 
    e.preventDefault();
    genderCheck();
});

$(input_gender).keydown(function (e) { 
    if(e.key == "Enter"){
        genderCheck();
    }
});


let bet_money;

$(bet_button).click(function (e) { 
    e.preventDefault();
    if(($(bet_input).val() > 0) && ($(bet_input).val() <= money_left)){
        if(money_left == 0){
            alert("You lost, the computer won")
            location.reload();
        }else{
            money_inputted = Number($(bet_input).val());
            $(money_left_text).text(`Money left: ${money_left}`);
        }
        $(bet_input).val("");
        $(bet_button).hide();
        $(bet_input).css("border", "4px solid transparent");
        showRollButton();
    }else{
        $(bet_input).css("border", "4px solid red");
    }
});

$(roll_button).click(function (e) { 
    window.scrollTo(0,document.body.scrollHeight);
    e.preventDefault();
    let random_num = random(1,12);
    $(random_dice).text(random_num)
    $(roll_button).hide();
    $(bet_button).show();
    $(random_dice).css("visibility", "visible");
    if(random_num >= 7){
        money.play();
        state = "doubled";
        money_left+= money_inputted;
        computer_money -= money_inputted;
        $(computer_money_text).text(computer_money);
        $(money_left_text).text(`Money left: ${money_left}`);
        setTimeout(() =>{
            if(money_left == 0){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(money_left > 1_000_000){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
            if(computer_money > 1_000_000){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(computer_money <= 0){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
        },1000)
    }else if(random_num <= 5){
        state = "removed";
        aww.play();
        money_left -= money_inputted;
        computer_money += money_inputted;
        $(computer_money_text).text(computer_money);
        $(money_left_text).text(`Money left: ${money_left}`);
        setTimeout(() =>{
            if(money_left == 0){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(money_left > 1_000_000){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
            if(computer_money > 1_000_000){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(computer_money <= 0){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
        },1000)
    }else if(random_num == 6){
        money.play();
        state = "tripled";
        money_left+= money_inputted + money_inputted;
        computer_money -= money_inputted + money_inputted;
        $(computer_money_text).text(computer_money);
        $(money_left_text).text(`Money left: ${money_left}`);
        setTimeout(() =>{
            if(money_left == 0){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(money_left > 1_000_000){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
            if(computer_money > 1_000_000){
                alert("You lost, the computer won")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }else if(computer_money <= 0){
                alert("You won,the computer lost")
                setTimeout(() =>{location.reload();},seconds_before_reload)
            }
        },1000)
    }else{
        location.reload();
    }
    console.log(state);
});


console.log("hello world");
