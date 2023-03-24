var readlineSync = require('readline-sync');
 
// Wait for user's response.
var game = readlineSync.question('游戏: '); 
// Handle the secret text (e.g. password).
var input_time = readlineSync.question('持续时间（秒）: ');
var i_times = readlineSync.question('重复次数: ');
console.log('Oh, ' + game + ' loves ' + input_time + '!'+i_times);