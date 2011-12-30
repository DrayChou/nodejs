console.log(__dirname);

var filePathTmp = __dirname.split('\\');
console.log(filePathTmp);
console.log(filePathTmp.pop());
console.log(filePathTmp.join('\\'));

console.log('This platform is ' + process.platform);