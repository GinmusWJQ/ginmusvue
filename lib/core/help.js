const program = require('commander');
const helpOptions = () => {
    program
.option('-a, --aebug', 'output extra debugging')
.option('-s, --small', 'small pizza size')
.option('-d, --dest <dest>', 'a destination floder')
.option('-f, --framework <framework>', 'your framework');

program.on('--help',function(){
  console.log(" ");
  console.log("Other:");
  console.log("   other option~");
})
// return options = program.opts;
}
module.exports = helpOptions;