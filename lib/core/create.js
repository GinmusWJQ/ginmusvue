const program = require('commander');
const {
    createProjectAction,
    addComponentAction,
    addPageAndRoute,
    addStoreAction
} = require('./action');
const createCommands = () => {
    program
     .command('create <project> [others...]')
     .description('clone a repository into a floder')
     .action(createProjectAction);
    program
     .command('addcpn <name>')
     .description('add vue compoent,例如: why HelloWorld -d src/compontents')
     .action((name) => {
         addComponentAction(name,program.opts().dest || 'src/components');
     });
     program
    .command('addpage <page>')
    .description('add vue page and router config,例如: why addpage Home [-d src/pages]')
    .action((page) => {
        addPageAndRoute(page,program.opts().dest || 'src/pages')
    })
     program
    .command('addstore <store>')
    .description('add vue page and router config,例如: why addpage Home [-d src/pages]')
    .action((store) => {
        addStoreAction(store,program.opts().dest || 'src/store/modules')
    })
}

module.exports = createCommands;