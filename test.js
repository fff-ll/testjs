var process=require('child_process');
const iconv = require("iconv-lite");

function exec(shell,callback){
    process.execSync(shell,function(error,stdout,stderr){
        if(error !==null){           
            // var ee=iconv.decode(Buffer.from(error.stderr, 'binary'),'cp936');
            // if(error.toString()==="Error: Command failed: adb devices"){
            console.log('exec error: '+error);
            callback(false);
            return;
        }
    });
    callback(true);
}

function check(){
    console.log('check');
    var res;
    exec('adb devices',function(x){
        console.log('check '+x);
        res=x;
        // return res;
    });
    return res;
}

function open(game){
    console.log('open');
    switch(game){
        case 'chocolate':
            game='com.mf.town/com.microfun.Main';
    }

    var res;
    exec('adb shell am start -n '+game,function(x){
        console.log('open '+x);
        res=x;
    });
    return res;
}

function close(game){
    console.log('close');
    switch(game){
        case 'chocolate':
            game='com.mf.town';
    }

    var res;
    exec('adb shell am force-stop '+game,function(x){
        console.log('close '+x);
        res=x;
    });
    return res;
}

function circle(times,input_times,input_time,game) {
    if(input_times===0){
        return;
    }
    console.log("第"+(times-input_times+1)+"次:")
    open(game);
    setTimeout(() => {
        close(game);
        setTimeout(()=>{
            circle(times,--input_times,input_time,game);
        },2000);
    },input_time);
    
  }

function main(game,input_time,input_times){
    if(!check()){
        return;
    };
    // for(let i=1;i<=input_times;i++){
    //     setTimeout(() => {
    //         console.log("第"+i+"次:");
    //         open(game);
    //         setTimeout(() => {
    //             close(game);
    //         }, input_time*i);
    //     },(input_time+2000)*i);
    // }
    const times=input_times;
    circle(times,input_times,input_time,game);
}
main('chocolate',3000,20);





