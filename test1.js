var c_p=require('child_process');

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

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function rlPromisify(fn) {
    return async (...args) => {
        return new Promise(resolve => fn(...args, resolve));
    };
}

const question = rlPromisify(rl.question.bind(rl));
(async () => {
    const game = await question('游戏: ');
    const input_time = await question('持续时间（秒）: ');
    const i_times = await question('重复次数: ');
    main(game,input_time,i_times);
    rl.close();
})();


function exec(shell){
    try{
        c_p.execSync(shell);
    }catch(error){
        if(error !==null){           
            console.log('exec error: '+error);
            // document.getElementById('idlog').innerHTML+= '<br />'+'exec error: '+error;
            return false;
        }
    }
    return true;
}

function check(){
    console.log('check');
    var res=exec('adb devices');
    console.log('check '+res);
    // document.getElementById('idlog').innerHTML+= '<br />'+'check '+res;
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
    // document.getElementById('idlog').innerHTML+= '<br />'+'open '+res;
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
    // document.getElementById('idlog').innerHTML+= '<br />'+'isrunning '+res;
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
    // document.getElementById('idlog').innerHTML+= '<br />'+'close '+res;
    return res;
}

function circle(times,i_times,input_time,game) {
    if(i_times===0){
        console.log("完成，无异常");
        return;
    }
    console.log("第"+(times-i_times+1)+"次:");
    // document.getElementById('idlog').innerHTML+= '<br />'+"第"+(times-i_times+1)+"次:";
    if(!open(game)){
        console.log("打开游戏失败");
        // alert("打开游戏失败");
        return ;
    };
    setTimeout(() => {
        if(!isrunning(game)){
            console.log("游戏异常结束");
            // alert("游戏异常结束");
            return;
        };
        if(!close(game)){
            console.log("关闭游戏失败");
            // alert("关闭游戏失败");
            return;
        };
        setTimeout(()=>{
            circle(times,--i_times,input_time,game);
        },2000);
    },input_time);
    
  }

function main(game,input_time,i_times){
    if(!check()){
        // alert("adb连接失败/缺少adb");
        console.log("adb连接失败/缺少adb");
        return;
    };
    const times=i_times;
    input_time*=1000;
    circle(times,i_times,input_time,game);
}








