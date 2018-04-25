/*
所支持的语言的main入口函数的样子
*/

function langList (username) {
  return {
    'c_cpp': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n#include <stdio.h>\n'+
    'int main (void) {\n'+
    '\tprintf("hello world!");\n\treturn 0;\n'+
    '}',

    'java': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\npublic class Main {\n'+
    '\tpublic static void main (String[] argv) {\n'+
    '\t\tSystem.out.println("hello world!");\n'+
    '\t}\n'+
    '}',

    'python': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support python language',

    'go': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support go language',

    'javascript': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support javaScript language',

    'ruby': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support ruby language',

    'csharp': '/*\nAuthor：'+ username +'\nDate：' +
    new Date().toString() +'\n*/\n' +'support csharp language'
  };
}

export default langList;
