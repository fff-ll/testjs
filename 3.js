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
    console.log(`你是：${game,i_times,input_time}`);
    rl.close();
})();