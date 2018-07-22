//hardware
let cur_pos = '0'
let watering_min = '0'
let ready = '0'
let lux = '0'
let luxs = 0
let humit = '0'
let temp = '0'
let cur_per = '0'
//
let change = '0'
//move
let moving = '0'
let watering = '0'
let done = '0'
let location_start = '0'
let location_end = '0'
const time_sec = '60'

//status
let time_p1 = '0'
let time_p2 = '0'
let time_p3 = '0'
let time_p4 = '0'
let time_p5 = '0'
let time_p6 = '0'
let pos_0 = '0'
let pos_1 = '0'
let pos_2 = '0'
let pos_3 = '0'
let emergency_button = '0'

//now
let check_p1 = '0'
let check_p2 = '0'
let check_p3 = '0'
let check_p4 = '0'
let check_p5 = '0'
let check_p6 = '0'

//time
let check_t1 = '0'
let check_t2 = '0'
let check_t3 = '0'
let check_t4 = '0'
let check_t5 = '0'
let check_t6 = '0'
let hr = '0'
let date_hr = '0'
let min = '0'
let date_min = '0'

//date
let check_d1 = '0'
let check_d2 = '0'
let check_d3 = '0'
let check_d4 = '0'
let check_d5 = '0'
let check_d6 = '0'
let dawn = '0'
let dusk = '0'
let number = 0
const check_lux = '0'
$(function () {
    $(set_position())
    setInterval(function () {
        //get time
        let date = new Date()
        date_hr = date.getHours()
        date_min = date.getMinutes()
        
        console.log(`1: ${pos_1}`)
        console.log(`2: ${pos_2}`)
        console.log(`3: ${pos_3}`)

        //get data from hardware
        $(get_value)
        snumber = number.toString()
        cur_per = snumber
        if(date_hr == hr && date_min == min){
            $(move())
        }

        if(cur_per === '0'){
            document.getElementById("pos-0").style.backgroundImage = "url(../images/firetruck.png)";
            document.getElementById("pos-0").style.backgroundRepeat = "no-repeat";
            document.getElementById("pos-0").style.backgroundPosition = "center center";
        }else{
            document.getElementById("pos-0").style.backgroundImage = "";
            document.getElementById("pos-0").style.backgroundColor = "rgba(66, 66, 66, 0.70)";
        }
        if(cur_per === '1'){
            document.getElementById("pos-1").style.backgroundImage = "url(../images/firetruck.png)";
            document.getElementById("pos-1").style.backgroundRepeat = "no-repeat";
            document.getElementById("pos-1").style.backgroundPosition = "center center";
            document.getElementById("pos-0").style.backgroundImage = "";
            if(change === '1'){
                document.getElementById("plant-s1").style.border = "5px dashed blue";
                document.getElementById("plant-s2").style.border = "5px dashed blue";
            } else {
                document.getElementById("plant-s1").style.border = "5px solid blue";
                document.getElementById("plant-s2").style.border = "5px solid blue";
            }
        } else {
            document.getElementById("pos-1").style.backgroundImage = "";
            document.getElementById("pos-1").style.backgroundColor = "rgba(66, 66, 66, 0.70)";
            document.getElementById("plant-s1").style.border = "5px solid black";
            document.getElementById("plant-s2").style.border = "5px solid black";
        }

        if (cur_per === '2') {
            document.getElementById("pos-2").style.backgroundImage = "url(../images/firetruck.png)";
            document.getElementById("pos-2").style.backgroundRepeat = "no-repeat";
            document.getElementById("pos-2").style.backgroundPosition = "center center";
            if (change === '1') {
                document.getElementById("plant-s3").style.border = "5px dashed blue";
                document.getElementById("plant-s4").style.border = "5px dashed blue";
            } else {
                document.getElementById("plant-s3").style.border = "5px solid blue";
                document.getElementById("plant-s4").style.border = "5px solid blue";
            }
        }else{
            document.getElementById("pos-2").style.backgroundImage = "";
            document.getElementById("pos-2").style.backgroundColor = "rgba(66, 66, 66, 0.70)";
            document.getElementById("plant-s3").style.border = "5px solid black";
            document.getElementById("plant-s4").style.border = "5px solid black";
        }

        if (cur_per === '3') {
            document.getElementById("pos-3").style.backgroundImage = "url(../images/firetruck.png)";
            document.getElementById("pos-3").style.backgroundRepeat = "no-repeat";
            document.getElementById("pos-3").style.backgroundPosition = "center center";
            if (change === '1') {
                document.getElementById("plant-s5").style.border = "5px dashed blue";
                document.getElementById("plant-s6").style.border = "5px dashed blue";
            } else {
                document.getElementById("plant-s5").style.border = "5px solid blue";
                document.getElementById("plant-s6").style.border = "5px solid blue";
            }
        } else {
            document.getElementById("pos-3").style.backgroundImage = "";
            document.getElementById("pos-3").style.backgroundColor = "rgba(66, 66, 66, 0.70)";
            document.getElementById("plant-s5").style.border = "5px solid black";
            document.getElementById("plant-s6").style.border = "5px solid black";
        }

        if(dawn === '1'){
            if(luxs > check_lux){
                $(move())
            }
        }

        if (change === '1') {
            change = '0'
        } else {
            change = '1'
        }
    }, 1000)
    
    //emergency butt
    $('#emergency-button').on('click', function () {
    //    $(set('emer','1'))
        number++;
    })

    $('#hr0').click(function () {
        console.log('hr0')
      })

    //submit[now]
    $('#submit-n').on('click', function () {
        $(select_plantn('','','1'))
        $(set_position())
        $(move('3'))
    })
    //submit[time]
    $('#submit-t').on('click', function () {
        $(select_plantt('','','1'))
        $(set_position())
    })
    //submit[day]
    $('#submit-d').on('click', function () {
        $(select_plantd('','','1'))
        $(set_position())
    })

     $(`#plant-n1`).click(function () {
        $(select_plantn('1','plant-n1','0'))
     })

     $(`#plant-n2`).click(function () {
        $(select_plantn('2','plant-n2','0'))
     })

     $(`#plant-n3`).click(function () {
        $(select_plantn('3','plant-n3','0'))
     })

     $(`#plant-n4`).click(function () {
        $(select_plantn('4','plant-n4','0'))
     })

     $(`#plant-n5`).click(function () {
        $(select_plantn('5','plant-n5','0'))
     })

     $(`#plant-n6`).click(function () {
        $(select_plantn('6','plant-n6','0'))
     })

     $(`#plant-d1`).click(function () {
        $(select_plantn('1','plant-d1','0'))
     })

     $(`#plant-d2`).click(function () {
        $(select_plantn('2','plant-d2','0'))
     })

     $(`#plant-d3`).click(function () {
        $(select_plantn('3','plant-d3','0'))
     })

     $(`#plant-d4`).click(function () {
        $(select_plantn('4','plant-d4','0'))
     })

     $(`#plant-d5`).click(function () {
        $(select_plantn('5','plant-d5','0'))
     })

     $(`#plant-d6`).click(function () {
        $(select_plantn('6','plant-d6','0'))
     })

     $(`#plant-t1`).click(function () {
        $(select_plantn('1','plant-t1','0'))
     })

     $(`#plant-t2`).click(function () {
        $(select_plantn('2','plant-t2','0'))
     })

     $(`#plant-t3`).click(function () {
        $(select_plantn('3','plant-t3','0'))
     })

     $(`#plant-t4`).click(function () {
        $(select_plantn('4','plant-t4','0'))
     })

     $(`#plant-t5`).click(function () {
        $(select_plantn('5','plant-t5','0'))
     })

     $(`#plant-t6`).click(function () {
        $(select_plantn('6','plant-t6','0'))
     })

     $(`#hr0`).click(function () {
       hr = '0'
       document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr1`).click(function () {
        hr = '1'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr2`).click(function () {
        hr = '2'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr3`).click(function () {
        hr = '3'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr4`).click(function () {
        hr = '4'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr5`).click(function () {
        hr = '5'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr6`).click(function () {
        hr = '6'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr7`).click(function () {
        hr = '7'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr8`).click(function () {
        hr = '8'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr9`).click(function () {
        hr = '9'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr10`).click(function () {
        hr = '10'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr11`).click(function () {
        hr = '11'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr12`).click(function () {
        hr = '12'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr13`).click(function () {
        hr = '13'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr14`).click(function () {
        hr = '14'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr15`).click(function () {
        hr = '15'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr16`).click(function () {
        hr = '16'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr17`).click(function () {
        hr = '17'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr18`).click(function () {
        hr = '18'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr19`).click(function () {
        hr = '19'
        document.getElementById("hour-select").innerHTML = hr; 
     })
     $(`#hr20`).click(function () {
        hr = '20'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr21`).click(function () {
        hr = '21'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr22`).click(function () {
        hr = '22'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#hr23`).click(function () {
        hr = '23'
        document.getElementById("hour-select").innerHTML = hr;
     })
     $(`#min0`).click(function () {
        min = '0'
        document.getElementById("minute-select").innerHTML = min;
        
     })
     $(`#min10`).click(function () {
        min = '10'
        document.getElementById("minute-select").innerHTML = min;
     })
     $(`#min20`).click(function () {
        min = '20'
        document.getElementById("minute-select").innerHTML = min;
     })
     $(`#min30`).click(function () {
        min = '30'
        document.getElementById("minute-select").innerHTML = min;
     })
     $(`#min40`).click(function () {
        min = '40'
        document.getElementById("minute-select").innerHTML = min;
     })
     $(`#min50`).click(function () {
        min = '50'
        document.getElementById("minute-select").innerHTML = min;
     })

     $('#dusk').click(function(){
         dusk = '1'
         dawn = '0'
     })

     $('#dawn').click(function(){
         dawn = '1'
         dusk = '0'
     })
})

let GET = (u) => {
    return $.ajax({
        type: "GET",
        url: `http://ecourse.cpe.ku.ac.th/exceed/api/palmmy-${u}/view/`,
        dataType: "text",

    });
}


let get_value = () => {
    let t = GET('pos_1').then((res) => {
        pos_1 = res
    })
    let tt = GET('pos_2').then((res) => {
        pos_2 = res
    })
    let ttt = GET('pos_3').then((res) => {
        pos_3 = res
    })
    let test = GET('cur_pos').then((res) => {
        cur_pos = res
    })
    let test2 = GET('watering').then((res) => {
        watering = res
    })
    let test3 = GET('readysts').then((res) => {
        ready = res
    })
    let test4 = GET('lux').then((res) => {
        lux = res
        luxs = parseInt(res)
        $('#bright').html(`${lux} lx`)
    })
    let test5 = GET('humit').then((res) => {
        humit = res
        $('#mois').html(`${humit} %`)
    })
    let test6 = GET('temperature').then((res) => {
        temp = res
        $('#temp').html(`${temp} ˚C`)
    })
}

let set = (u, send) => {
    return $.ajax({
        type: "POST",
        url: `http://ecourse.cpe.ku.ac.th/exceed/api/palmmy-${u}/set/`,
        data: {
            value: send
        },
        dataType: "json",
    });
}

let next_pos = (now) => {
    if ( now == 0 ){
        if( pos_1 == 1){
            return '1'
        }else if ( pos_2 ==1 ){
            return '2'
        }else if ( pos_3 == 1){
            return '3'
        }else {
            return '0'
        }
    }else if (now == 1) {
        if (pos_2 == 1) {
            return '2'
        } else if (pos_3 == 1) {
            return '3'
        } else {
            return '0'
        }
    } else if (now == 2) {
        if (pos_3 == 1) {
            return '3'
        } else {
            return '0'
        }
    } else {
        return '0'
    }
}

let move = (position) => {
    let last_data = '0'
    let work_done = '0'
    // while (cur_per <= position) {
    let loop = setInterval(function() {
        console.log('loop')
        $(get_value)
        if (watering === '0' && cur_per !== '0' && done === '0') {
            // $(set('watering', '60'))

            done = '1'
        }
        else if ((watering !== last_data && last_data !== '0')|| cur_per === '0') {
            let next_position = $(next_pos(cur_per))
            // $(set('move', next_position))
            // cur_per =next_position
        }
        else if (moving === '1') {
            done = '0'
        }
        if(cur_per == position) {
            work_done = '1'
        }
        if (cur_per == '0' && work_done == '1'){
            clearInterval(loop);
        }
        last_data = watering
    },1000) 
}

let select_plantn = (plant,select,del) => {
        if(plant == '1'){
            if(check_p1 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p1 = '1'
             }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p1 = '0'
            }
        }else if(plant == '2'){
            if(check_p2 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p2 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p2 = '0'
            }
        }else if(plant == '3'){
            if(check_p3 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p3 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p3 = '0'
            }
        }else if(plant == '4'){
            if(check_p4 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p4 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p4 = '0'
            }
        }else if(plant == '5'){
            if(check_p5 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p5 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p5 = '0'
            }
        }else if(plant == '6'){
            if(check_p6 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_p6 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_p6 = '0'
            }
        }else if(del === '1'){
            if(check_p1 == '1' || check_p2 == '1'){
                pos_1 = '1'
            }if(check_p3 == '1' || check_p4 == '1'){
                pos_2 = '1'
            }
            if(check_p5 == '1' || check_p6 == '1'){
                pos_3 = '1'
            }
            check_p1='0'
            check_p2='0'
            check_p3='0'
            check_p4='0'
            check_p5='0'
            check_p6='0'
            document.getElementById(`plant-n1`).style.border = "5px solid black";
            document.getElementById(`plant-n2`).style.border = "5px solid black";
            document.getElementById(`plant-n3`).style.border = "5px solid black";
            document.getElementById(`plant-n4`).style.border = "5px solid black";
            document.getElementById(`plant-n5`).style.border = "5px solid black";
            document.getElementById(`plant-n6`).style.border = "5px solid black";
        }
}

let select_plantt = (plant, select,del) => {
        if (plant == '1') {
            if (check_t1 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t1 = '1'
             }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t1 = '0'
            }
        } else if (plant == '2') {
            if (check_t2 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t2 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t2 = '0'
            }
        } else if (plant == '3') {
            if (check_t3 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t3 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t3 = '0'
            }
        } else if (plant == '4') {
            if (check_t4 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t4 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t4 = '0'
            }
        } else if (plant == '5') {
            if (check_t5 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t5 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t5 = '0'
            }
        } else if (plant == '6') {
            if (check_t6 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t6 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t6 = '0'
            }
        }else if(del === '1'){
            if(check_t1 == '1' || check_t2 == '1'){
                pos_1 = '1'
            }if(check_t3 == '1' || check_t4 == '1'){
                pos_2 = '1'
            }
            if(check_t5 == '1' || check_t6 == '1'){
                pos_3 = '1'
            }
            check_t1='0'
            check_t2='0'
            check_t3='0'
            check_t4='0'
            check_t5='0'
            check_t6='0'
            document.getElementById(`plant-t1`).style.border = "5px solid black";
            document.getElementById(`plant-t2`).style.border = "5px solid black";
            document.getElementById(`plant-t3`).style.border = "5px solid black";
            document.getElementById(`plant-t4`).style.border = "5px solid black";
            document.getElementById(`plant-t5`).style.border = "5px solid black";
            document.getElementById(`plant-t6`).style.border = "5px solid black";
            
        }
}

let select_plantd = (plant, select,del) => {
        if (plant == '1') {
            if (check_d1 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d1 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d1 = '0'
            }
        } else if (plant == '2') {
            if (check_d2 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d2 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d2 = '0'
            }
        } else if (plant == '3') {
            if (check_d3 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d3 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d3 = '0'
            }
        } else if (plant == '4') {
            if (check_d4 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d4 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d4 = '0'
            }
        } else if (plant == '5') {
            if (check_d5 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d5 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d5 = '0'
            }
        } else if (plant == '6') {
            if (check_d6 == '0') {
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d6 = '1'
            } else {
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d6 = '0'
            }
        }else if(del === '1'){
            if(check_d1 == '1' || check_d2 == '1'){
                pos_1 = '1'
            }if(check_d3 == '1' || check_d4 == '1'){
                pos_2 = '1'
            }
            if(check_d5 == '1' || check_d6 == '1'){
                pos_3 = '1'
            }
            check_d1='0'
            check_d2='0'
            check_d3='0'
            check_d4='0'
            check_d5='0'
            check_d6='0'
            document.getElementById(`plant-d1`).style.border = "5px solid black";
            document.getElementById(`plant-d2`).style.border = "5px solid black";
            document.getElementById(`plant-d3`).style.border = "5px solid black";
            document.getElementById(`plant-d4`).style.border = "5px solid black";
            document.getElementById(`plant-d5`).style.border = "5px solid black";
            document.getElementById(`plant-d6`).style.border = "5px solid black";
            
        }
}
let set_position = () => {
    $(set('pos_1',pos_1))
    $(set('pos_2',pos_2))
    $(set('pos_3',pos_3))
}