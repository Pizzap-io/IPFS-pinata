var fs = require('fs')
var cofOrgEnd = 'png'
var dirPath = './babybunny'
fs.readdir(dirPath, function (err, data) {
    if (err) {
        console.log('file read error')
    } else {
        for (var i = 0; i < data.length; i++) {
            var tmpArr = data[i].split('.')
            console.log(tmpArr.length)
            if (tmpArr.length > 0) {
                if (tmpArr[1] == cofOrgEnd) {
                    var oldName = dirPath + '/' + data[i]
                    var newName = dirPath + '/' + tmpArr[0]
                    fs.rename(oldName, newName, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('file rename success')
                        }
                    })
                }
            }
        }
    }
})
