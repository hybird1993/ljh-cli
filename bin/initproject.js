const fs = require('fs');
const path = require('path')
module.exports = function(name) {
    const demoPath = path.resolve(__dirname, '..') + '/project';
    const targetPath = process.cwd() + '/' + name;
    const arr = [];
    fs.mkdir(targetPath, () => {
        const pushArr = (_path) => {
            const files = fs.readdirSync(_path);
            files.forEach((item) => {
            	const nowPath = _path + '/' + item;
            	const stat = fs.statSync(nowPath);
            	if (stat.isDirectory()) {
                    arr.push({
            	    	type: 'dir',
            	    	path: nowPath,
            	    });	  
            	    pushArr(nowPath);
            	} else {
            	    arr.push({
            	    	type: 'file',
            	    	path: nowPath,
            	    });	
            	}
            })
        }
        pushArr(demoPath);
        arr.forEach((item) => {
            if (item.type === 'dir') {
                fs.mkdir(targetPath + '/' + item.path.replace(demoPath, ''), () => {})
            } else {
                fs.readFile(item.path, (err, data) => {
                    fs.writeFile(targetPath + '/' + item.path.replace(demoPath, ''), data, () => {})
                })
            }
        })
    })
}