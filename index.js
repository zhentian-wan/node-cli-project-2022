#! /usr/bin/env node

import runv16 from './nodev16.js';
import runv17 from './nodev17.js';
import run, {addQuestion} from './service.js';



/**
  running command:
  `node index.js`
  process.argv
  [
  '/usr/local/bin/node',
  '/Users/zhentianwan/Documents/learning/cli-tools/index.js'
  ]
  
  If running command:
  `node index.js hello world`
  [
    '/usr/local/bin/node',
    '/Users/zhentianwan/Documents/learning/cli-tools/index.js',
    'hello',
    'world'
 ]

 If running:
 `node index.js hello world -a --add`
 [
  '/usr/local/bin/node',
  '/Users/zhentianwan/Documents/learning/cli-tools/index.js',
  'hello',
  'world',
  '-a',
  '--add'
]

If running;
`node index.js "hello world"`
[
  '/usr/local/bin/node',
  '/Users/zhentianwan/Documents/learning/cli-tools/index.js',
  'hello world'
]
 */

const flags = [];

process.argv.forEach((arg) => {
    if (/^-/.test(arg)) {
        flags.push(arg.replaceAll('-', ''))
    }
})

console.log(flags)

if (flags.includes('a') || flags.includes('add')) {
    // console.log("add some values")
    addQuestion()
} else {
    //console.log("Do something else")
    run()
}

