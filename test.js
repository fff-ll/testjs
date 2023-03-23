var process=require('child_process');
const iconv = require("iconv-lite");

// function exec(shell,callback){
//     // process.exec(shell,function(error,stdout,stderr){
//     //     if(error !==null){           
//     //         // var ee=iconv.decode(Buffer.from(error.stderr, 'binary'),'cp936');
//     //         // if(error.toString()==="Error: Command failed: adb devices"){
//     //         console.log('exec error: '+error);
//     //         callback(false);
//     //         return;
//     //     }
//     // });
//     callback(true);
// }

function exec(shell){
    try{
        // var x;
        process.execSync(shell);
    }catch(error){
        if(error !==null){           
            console.log('exec error: '+error);
            return false;
        }
    }
    // console.log("xx"+x);
    return true;
}

function check(){
    console.log('check');
    // var res;
    // exec('adb devices',function(x){
    //     console.log('check '+x);
    //     res=x;
    //     // return res;
    // });

    var res=exec('adb devices');
    console.log('check '+res);
    return res;
}

function open(game){
    console.log('open');
    switch(game){
        case 'chocolate':
            game='com.mf.town/com.microfun.Main';
    }

    var res=exec('adb shell am start -n '+game);
    console.log('open '+res);
    return res;
}

function isrunning(game){
    console.log('isrunning');
    switch(game){
        case 'chocolate':
            game='com.mf.town';
    }

    var res=exec('adb shell dumpsys activity activities | findstr '+game);
    console.log('isrunning '+res);
    return res;
}

function close(game){
    console.log('close');
    switch(game){
        case 'chocolate':
            game='com.mf.town';
    }

    var res=exec('adb shell am force-stop '+game);
    console.log('close '+res);
    return res;
}

function circle(times,i_times,input_time,game) {
    if(i_times===0){
        return;
    }
    console.log("第"+(times-i_times+1)+"次:")
    if(!open(game)){
        console.log("打开游戏失败");
        alert("打开游戏失败");
        return;
    };
    setTimeout(() => {
        if(!isrunning(game)){
            console.log("游戏异常结束");
            alert("游戏异常结束");
            return;
        };
        if(!close(game)){
            console.log("关闭游戏失败");
            alert("关闭游戏失败");
            return;
        };
        setTimeout(()=>{
            circle(times,--i_times,input_time,game);
        },2000);
    },input_time);
    
  }

function main(game,input_time,i_times){
    if(!check()){
        alert("adb连接失败/缺少adb");
        return;
    };
    // for(let i=1;i<=i_times;i++){
    //     setTimeout(() => {
    //         console.log("第"+i+"次:");
    //         open(game);
    //         setTimeout(() => {
    //             close(game);
    //         }, input_time*i);
    //     },(input_time+2000)*i);
    // }
    const times=i_times;
    circle(times,i_times,input_time,game);
}
// main('chocolate',3000,2);






