const path = require('path')

const filePath = '/path/to/myfile.txt'

const parsedPath = path.parse(filePath)
console.log(parsedPath)
// Output: { root: '/', dir: '/path/to', base: 'myfile.txt', ext: '.txt', name: 'myfile' }

const resolvedPath = path.resolve('dir/1233456', 'file.txt')
console.log(resolvedPath)
// Output (on POSIX): '/current/working/directory/dir/file.txt'

const normalizedPath = path.normalize('/path/../to/myfile.txt')
console.log(normalizedPath)
// Output: '/to/myfile.txt'

const dirname = path.dirname(filePath)
console.log(dirname)
// Output: '/path/to'

const extname = path.extname(filePath)
console.log(extname)
// Output: '.txt'