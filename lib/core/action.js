//为了支持promise
const path = require('path');
const{ promisify } = require('util');
const download = promisify(require('download-git-repo'));
const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile,writeToFile,createDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
    console.log('why helps you creat a project');
    //1.clone项目
    await download(vueRepo,project,{clone:true});
    //2.执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await commandSpawn(command,['install'],{cwd:`./${project}`})
    //3.执行npm runstart
    await commandSpawn(command,['run','serve'],{cwd:`./${project}`})
    //4.打开浏览器


    // await download(vueRepo);
}

const addComponentAction = async (name,dest) => {
    // 1.有对应的ejs模块

    // 2.编译ejs模板 result
    const result = await compile("vue-component.ejs",{name, lowerName: name.toLowerCase()});
    // console.log(result);
    // 3.将result写入到vue文件中
    const targetPath = path.resolve(dest,`${name}.vue`);
    console.log(targetPath);
    writeToFile(targetPath,result)
    // 4.放到对应的文件夹中

}

const addPageAndRoute = async (name,dest) => {
    const pageResult = await compile("vue-component.ejs",{name, lowerName: name.toLowerCase()});
    const routeResult = await compile("vue-router.ejs",{name, lowerName: name.toLowerCase()});
    const targetDest = path.resolve(dest,name.toLowerCase())
    if(createDirSync(targetDest)){
        const targetPagePath = path.resolve(targetDest,`${name}.vue`);
        const targetRoutePath = path.resolve(targetDest,'router.js');
        writeToFile(targetPagePath,pageResult);
        writeToFile(targetRoutePath,routeResult);
    }   
}
const addStoreAction = async (name,dest) => {
    //1.遍历的过程
    const storeResult = await compile('vue-store.ejs',{});
    const typesResult = await compile('vue-store.ejs',{});

    //2.创建文件
    const targetDest = path.resolve(dest,name.toLowerCase())
    if(createDirSync(targetDest)){
        const targetPagePath = path.resolve(targetDest,`${name}.js`);
        const targetRoutePath = path.resolve(targetDest,'router.js');
        writeToFile(targetPagePath,storeResult);
        writeToFile(targetRoutePath,typesResult);
    }   
}


module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRoute,
    addStoreAction
};