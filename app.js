const dateOfBirth=document.querySelector('#dob');
const button=document.querySelector('#show-btn');
const message=document.querySelector('#result');

const daysInMonth= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

button.addEventListener('click', clickHandler);



function reverseStr(str){
    let listOfChars=str.split('');
    let reverseListOfChars = listOfChars.reverse();
    let reversedStr =reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str){
    let reverse=reverseStr(str);
    return str===reverse;
}


function convertDateToStr(date){
    let dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month;
    } else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;
}

function getAllDateFromats(date){
    let dateStr=convertDateToStr(date);
    let ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    let mmddyyy=dateStr.month+dateStr.day+dateStr.year;
    let yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    let ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    let mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    let yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return[ddmmyyyy, mmddyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkpalindromeForAlldate(date){
    let listOfPalindrome=getAllDateFromats(date);

    let flag =false;
    for(let i=0; i<listOfPalindrome.length;i++){
       if(isPalindrome(listOfPalindrome[i])){
        flag=true;
        break;
       }
    }
    return flag;
}

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}

function getNextDate(date){
    let day =date.day +1;
    let month=date.month;
    let year=date.year;


    if(month===2){
        //check for leap year
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        } else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    //check for other months
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }
    return{
        day: day,month:month,year:year
    };
}

function getPreviouDate(date){
    let day=date.day-1;
    let month=date.month;
    let year =date.year;
    
    if(month===3){
        if(isLeapYear(year)){
            if(day<1){
                day=28;
                month--;
            }
        }else{
            if(day<1){
                day=28;
                month--;
            }
        }
    }else{
        if(month===1 && day<1){
            day=31;
            month=12;
            year--;
        }
        if(month>1 && day<1){
            day=daysInMonth[month-2];
            month--;
        }
    }
    return{
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindromeDate(date){
    let ctr1=0;
    let nextDate= getNextDate(date);
   while(1){
    ctr1++;
    let isPalindrome=checkpalindromeForAlldate(nextDate);
    if(isPalindrome){
        break;
    }
    nextDate=getNextDate(nextDate);
   }
   return[ctr1,nextDate];
}

function getPreviousPalindromeDate(date){
    let ctr2=0;
    let previousDate=getPreviouDate(date);
    while(1){
        ctr2++;
        let isPalindrome=checkpalindromeForAlldate(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate=getPreviouDate(previousDate);
    }
    return[ctr2,previousDate]
}

function clickHandler(){
    let bdayStr=dateOfBirth.value;
    if(bdayStr){
        let listOfDate=bdayStr.split('-');

        let date={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        let isPalindrome=checkpalindromeForAlldate(date);
        if(isPalindrome){
            message.innerText='Yay! your birthday is a palindrome!😀🎉';
        }else{
            let[ctr1,nextDate]=getNextPalindromeDate(date);
            let [ctr2,previousDate]=getPreviousPalindromeDate(date);
            message.innerText=`No! your birthday is not a palindrome. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr1} days 😔.
            The previous palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${ctr2} days ☹️.`
        }
    }
}
