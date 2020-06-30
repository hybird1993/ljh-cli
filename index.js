#!/usr/bin/env node
const cm = require('commander');
const iq = require('inquirer');
const init = require('./bin/initproject.js')

cm.version('1.0.4', '-v --version');

cm.command('init [name]').action((name) => {
	if (name) {
        init(name);
	} else {
		iq.prompt(
		[
		    {
				type: 'input',
				name: 'projectName',
				message: '项目叫什么名字？'
			},
			// {
			//     type: "checkbox",
			//     message: "选择要引入的js:",
			//     name: "extendJs",
			//     choices: [
			//         "jquery",
			//         "vue",
			//         "echart",
			//     ],
			//     // pageSize: 2 // 设置行数
			// }	
		]).then(res => {
			// console.log(res)
	        init(res.projectName);
		})
	}
})

cm.parse(process.argv);
