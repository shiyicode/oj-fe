/*
所支持的语言的main入口函数的样子
*/

function langList (username) {
  return {
    'c': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n#include <stdio.h>\n'+
    'int main (void) {\n'+
    '\tint a, b;\n ' +
    '\tscanf("%d%d", &a, &b);\n'+
    '\tprintf("%d\\n", a + b);\n\treturn 0;\n'+
    '}',

    'c++': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n#include <iostream>\n'+
    'using namespace std;\n'+

    'int main() {\n'+
    '\tint a, b, sum;\n'+
    '\tcin >> a >> b;\n'+
    '\tcout  << a + b << endl;\n'+
    '\treturn 0;\n'+
    '}',

    'java': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\npublic class Main {\n'+
    '\tpublic static void main (String[] argv) {\n'+
    '\t\tSystem.out.println("hello world!");\n'+
    '\t}\n'+
    '}',

    'python': '#coding=utf-8\n#Author：'+ username +'\n#Date：' +
    new Date().toString() +'\n\n' +'import string\n' +
    'while True:\n' +
    '    try:\n' +
    '        s = raw_input()\n' +
    '        arr = string.split(s,\' \')\n' +
    '        a = int(arr[0])\n' +
    '        b = int(arr[1])\n' +
    '        print a + b\n' +
    '    except EOFError:\n' +
    '        exit(0)',

    'golang': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support go language',

    'javascript': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support javaScript language',

    'ruby': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support ruby language',

    'csharp': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support csharp language',
  };
}

export default langList;
