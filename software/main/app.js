//hardware
let cur_pos = '0'
let watering_min = '0'
let ready = '0'
let lux = '0'
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

//date
let check_d1 = '0'
let check_d2 = '0'
let check_d3 = '0'
let check_d4 = '0'
let check_d5 = '0'
let check_d6 = '0'
$(function () {
    setInterval(function () {

        //get data from hardware
        $(get_value)

        cur_per = cur_pos
        
        if(cur_per === '1'){
            if(change === '1'){
                document.getElementById("plant-s1").style.border = "5px dashed blue";
                document.getElementById("plant-s2").style.border = "5px dashed blue";
            }else {
                document.getElementById("plant-s1").style.border = "5px solid blue";
                document.getElementById("plant-s2").style.border = "5px solid blue";
            }
        }else{
            document.getElementById("plant-s1").style.border = "5px solid black";
            document.getElementById("plant-s2").style.border = "5px solid black";
        }

        if(cur_per === '2'){
            if(change === '1'){
                document.getElementById("plant-s3").style.border = "5px dashed blue";
                document.getElementById("plant-s4").style.border = "5px dashed blue";
            }else {
                document.getElementById("plant-s3").style.border = "5px solid blue";
                document.getElementById("plant-s4").style.border = "5px solid blue";
            }
        }else{
            document.getElementById("plant-s3").style.border = "5px solid black";
            document.getElementById("plant-s4").style.border = "5px solid black";
        }

        if(cur_per === '3'){
            if(change === '1'){
                document.getElementById("plant-s5").style.border = "5px dashed blue";
                document.getElementById("plant-s6").style.border = "5px dashed blue";
            }else {
                document.getElementById("plant-s5").style.border = "5px solid blue";
                document.getElementById("plant-s6").style.border = "5px solid blue";
            }
        }else{
            document.getElementById("plant-s5").style.border = "5px solid black";
            document.getElementById("plant-s6").style.border = "5px solid black";
        }


        if(change === '1'){
            change = '0'
        }else {
            change = '1'
        }
    }, 1000)

    $('#test').click(function(){
        set('cur_pos','1')
    })
    $('#emergency-button').click(function(){
        set('emg','1')
    })

    //emergency butt
    $('#emergency-button').on('click',function () { 
        set('emg','1')
     })

    //ok butt[now]
    $('#ok-now').on('click',function () { 
        location_start = Math.min(check_list)
        location_end = Math.max(check_list)
     })

     $(`#plant-n1`).click(function () {
        $(select_plantn('1','plant-n1'))
     })

     $(`#plant-n2`).click(function () {
        $(select_plantn('2','plant-n2'))
     })

     $(`#plant-n3`).click(function () {
        $(select_plantn('3','plant-n3'))
     })

     $(`#plant-n4`).click(function () {
        $(select_plantn('4','plant-n4'))
     })

     $(`#plant-n5`).click(function () {
        $(select_plantn('5','plant-n5'))
     })

     $(`#plant-n6`).click(function () {
        $(select_plantn('6','plant-n6'))
     })

     $(`#plant-d1`).click(function () {
        $(select_plantn('1','plant-d1'))
     })

     $(`#plant-d2`).click(function () {
        $(select_plantn('2','plant-d2'))
     })

     $(`#plant-d3`).click(function () {
        $(select_plantn('3','plant-d3'))
     })

     $(`#plant-d4`).click(function () {
        $(select_plantn('4','plant-d4'))
     })

     $(`#plant-d5`).click(function () {
        $(select_plantn('5','plant-d5'))
     })

     $(`#plant-d6`).click(function () {
        $(select_plantn('6','plant-d6'))
     })

     $(`#plant-t1`).click(function () {
        $(select_plantn('1','plant-t1'))
     })

     $(`#plant-t2`).click(function () {
        $(select_plantn('2','plant-t2'))
     })

     $(`#plant-t3`).click(function () {
        $(select_plantn('3','plant-t3'))
     })

     $(`#plant-t4`).click(function () {
        $(select_plantn('4','plant-t4'))
     })

     $(`#plant-t5`).click(function () {
        $(select_plantn('5','plant-t5'))
     })

     $(`#plant-t6`).click(function () {
        $(select_plantn('6','plant-t6'))
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

let set =  (u,send) => {
    return $.ajax({
        type: "POST",
        url: `http://ecourse.cpe.ku.ac.th/exceed/api/palmmy-${u}/set/`,
        data : {
            value : send
        },
        dataType: "json",
    });
}

let next_pos = (now) => {
    if(now == 1) {
        if(pos_2 == 1){
            return 2
        }else if (pos_3 == 1){
            return 3
        }else {
            return 0
        }
    }else if(pos_2 == 1){
        if (pos_3 == 1){
            return 3
        }else {
            return 0
        }
    }else{
        return 0
    }
}

let move = (position) => {
    let last_data = 0
    while (cur_per <= position) {
        $(get_value)
        if(moving === '0' && cur_per !== '0' && done === '0') {
            $(set('time-watering',''))
            done = '1'
        }
        else if (watering !== last_data && last_data !== 0){
            let next_position = $(next_pos(cur_per))
            $(set('move',next_position))
        }
        else if (moving === '1') {
            done ='0'
        }
    last_data = watering
    }
}

let select_plantn = (plant,select) => {
        if(plant == '1'){
            console.log('test')
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
        }
}

let select_plantt = (plant,select) => {
    $(`#${select}`).click(function () {
        if(plant == '1'){
            if(check_t1 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t1 = '1'
             }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t1 = '0'
            }
        }else if(plant == '2'){
            if(check_t2 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t2 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t2 = '0'
            }
        }else if(plant == '3'){
            if(check_t3 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t3 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t3 = '0'
            }
        }else if(plant == '4'){
            if(check_t4 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t4 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t4 = '0'
            }
        }else if(plant == '5'){
            if(check_t5 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t5 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t5 = '0'
            }
        }else if(plant == '6'){
            if(check_t6 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_t6 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px solid black";
                check_t6 = '0'
            }
        }
    })
}

let select_plantd = (plant,select) => {
    $(`#${select}`).click(function () {
        if(plant == '1'){
            if(check_d1 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d1 = '1'
             }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d1 = '0'
            }
        }else if(plant == '2'){
            if(check_d2 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d2 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d2 = '0'
            }
        }else if(plant == '3'){
            if(check_d3 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d3 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d3 = '0'
            }
        }else if(plant == '4'){
            if(check_d4 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d4 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d4 = '0'
            }
        }else if(plant == '5'){
            if(check_d5 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d5 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d5 = '0'
            }
        }else if(plant == '6'){
            if(check_d6 == '0'){
                document.getElementById(`${select}`).style.border = "5px dashed red";
                check_d6 = '1'
            }else{
                document.getElementById(`${select}`).style.border = "5px dashed black";
                check_d6 = '0'
            }
        }
    })
}
