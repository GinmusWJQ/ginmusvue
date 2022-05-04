#!/usr/bin/env node
const program = require('commander');
const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

//查看版本
program.version(require('./package.json').version);

//帮助--help还有可选信息[option]
helpOptions();

//创造指令
createCommands();

program.parse(process.argv);
// console.log(options.dest);











// if (options.aebug) console.log(options);
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size');
// if (options.dest) console.log(`- ${options.dest}`);

