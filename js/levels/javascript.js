const JavaScriptLevels = [
    {
        id: 'js-1',
        title: '变量声明',
        language: 'javascript',
        difficulty: 1,
        category: '变量定义',
        buggyCode: `// 定义一个名字变量
name = "小明";
console.log(name);`,
        correctCode: `// 定义一个名字变量
let name = "小明";
console.log(name);`,
        errorLine: 2,
        hint: '在JavaScript中，声明变量需要使用关键字',
        options: [
            {
                id: 'a',
                label: '使用 let 关键字声明变量',
                explanation: '正确！在JavaScript中，应该使用 let 或 const 来声明变量，避免创建全局变量。'
            },
            {
                id: 'b',
                label: '使用 var 关键字声明变量',
                explanation: 'var 也是声明变量的方式，但 let 和 const 是更现代的做法，有块级作用域。不过这不是最佳答案。'
            },
            {
                id: 'c',
                label: '给变量加引号',
                explanation: '不对，变量名不需要加引号，加引号就变成字符串了。'
            },
            {
                id: 'd',
                label: '去掉分号',
                explanation: '分号不是问题所在，变量声明才是关键问题。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '变量声明',
            description: 'JavaScript 中使用 let、const、var 声明变量',
            example: `let name = "小明";
const age = 18;
var city = "北京";`,
            tip: '推荐使用 const 声明不会改变的变量，let 声明会改变的变量，尽量避免使用 var。'
        }
    },
    {
        id: 'js-2',
        title: '字符串引号',
        language: 'javascript',
        difficulty: 1,
        category: '字符串',
        buggyCode: `// 输出一句问候
let greeting = "你好，世界;
console.log(greeting);`,
        correctCode: `// 输出一句问候
let greeting = "你好，世界";
console.log(greeting);`,
        errorLine: 2,
        hint: '字符串的引号需要成对出现',
        options: [
            {
                id: 'a',
                label: '在字符串末尾添加双引号',
                explanation: '正确！字符串必须用成对的引号包裹，缺少闭合引号会导致语法错误。'
            },
            {
                id: 'b',
                label: '把双引号换成单引号',
                explanation: '单引号也可以，但同样需要成对出现，原来的问题是缺少闭合引号。'
            },
            {
                id: 'c',
                label: '去掉所有引号',
                explanation: '不对，字符串必须用引号包裹，否则会被当作变量名。'
            },
            {
                id: 'd',
                label: '在开头添加一个引号',
                explanation: '开头已经有引号了，问题在结尾缺少闭合引号。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '字符串的引号',
            description: '字符串必须用成对的引号包裹，可以是单引号、双引号或反引号',
            example: `let single = '单引号字符串';
let double = "双引号字符串";
let template = \`模板字符串\`;`,
            tip: '单引号和双引号在 JavaScript 中没有本质区别，保持一致即可。模板字符串（反引号）支持换行和变量插值。'
        }
    },
    {
        id: 'js-3',
        title: '函数括号',
        language: 'javascript',
        difficulty: 2,
        category: '函数',
        buggyCode: `// 定义一个打招呼的函数
function sayHello(name {
    console.log("你好，" + name);
}

sayHello("小红");`,
        correctCode: `// 定义一个打招呼的函数
function sayHello(name) {
    console.log("你好，" + name);
}

sayHello("小红");`,
        errorLine: 2,
        hint: '检查函数参数列表的括号是否完整',
        options: [
            {
                id: 'a',
                label: '在 name 后添加右括号：function sayHello(name)',
                explanation: '正确！函数参数列表必须用圆括号包裹，缺少右括号会导致语法错误。'
            },
            {
                id: 'b',
                label: '去掉大括号',
                explanation: '不对，函数体必须用大括号包裹，去掉会导致更多语法错误。'
            },
            {
                id: 'c',
                label: '把 function 改成 def',
                explanation: 'def 是 Python 的关键字，JavaScript 用 function 定义函数。'
            },
            {
                id: 'd',
                label: '在函数名后添加 = 号',
                explanation: '这是函数表达式的写法，但原来的语法问题是缺少括号，不是缺少等号。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '函数定义',
            description: '使用 function 关键字定义函数，函数名后跟参数列表（用圆括号包裹）和函数体',
            example: `// 无参数函数
function sayHi() {
    console.log("Hi!");
}

// 有参数函数
function add(a, b) {
    return a + b;
}`,
            tip: '函数名后面的圆括号是必须的，参数列表必须完整包裹在括号内，即使没有参数也要写空括号。'
        }
    },
    {
        id: 'js-4',
        title: 'if语句',
        language: 'javascript',
        difficulty: 2,
        category: '条件语句',
        buggyCode: `// 判断成绩等级
let score = 85;

if score >= 60 {
    console.log("及格了");
} else {
    console.log("不及格");
}`,
        correctCode: `// 判断成绩等级
let score = 85;

if (score >= 60) {
    console.log("及格了");
} else {
    console.log("不及格");
}`,
        errorLine: 4,
        hint: 'if 语句的条件需要用什么包裹？',
        options: [
            {
                id: 'a',
                label: '给条件加上圆括号',
                explanation: '正确！if 语句的条件必须用圆括号包裹，这是 JavaScript 的语法要求。'
            },
            {
                id: 'b',
                label: '把大括号换成冒号',
                explanation: '不对，JavaScript 用大括号表示代码块，不是冒号（那是 Python 的写法）。'
            },
            {
                id: 'c',
                label: '在 if 后添加 then',
                explanation: 'JavaScript 没有 then 关键字，条件后直接跟代码块。'
            },
            {
                id: 'd',
                label: '把 else 去掉',
                explanation: 'else 是合法的，问题不在这。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'if 条件语句',
            description: 'if 语句的条件必须用圆括号包裹，后跟大括号表示代码块',
            example: `if (条件) {
    // 条件为真时执行
} else if (其他条件) {
    // 其他条件为真时执行
} else {
    // 都不满足时执行
}`,
            tip: '即使只有一行代码，也建议使用大括号，提高代码可读性和可维护性。'
        }
    },
    {
        id: 'js-5',
        title: '数组访问',
        language: 'javascript',
        difficulty: 2,
        category: '数组',
        buggyCode: `// 获取数组的第一个元素
let fruits = ["苹果", "香蕉", "橙子"];
let first = fruits[1];
console.log("第一个水果是：" + first);`,
        correctCode: `// 获取数组的第一个元素
let fruits = ["苹果", "香蕉", "橙子"];
let first = fruits[0];
console.log("第一个水果是：" + first);`,
        errorLine: 3,
        hint: '数组的索引是从几开始的？',
        options: [
            {
                id: 'a',
                label: '把索引从 1 改成 0',
                explanation: '正确！JavaScript 数组索引从 0 开始，所以第一个元素的索引是 0，不是 1。'
            },
            {
                id: 'b',
                label: '用圆括号代替方括号',
                explanation: '不对，访问数组元素使用方括号，不是圆括号。'
            },
            {
                id: 'c',
                label: '使用 first() 方法',
                explanation: 'JavaScript 数组没有 first() 方法来获取第一个元素。'
            },
            {
                id: 'd',
                label: '把数组改成对象',
                explanation: '问题是索引不正确，不需要改成对象。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '数组索引',
            description: 'JavaScript 数组索引从 0 开始，第一个元素的索引是 0',
            example: `let arr = ["a", "b", "c"];
console.log(arr[0]); // "a"
console.log(arr[1]); // "b"
console.log(arr.length); // 3`,
            tip: '数组的 length 属性返回元素个数，而最后一个元素的索引是 length - 1。'
        }
    },
    {
        id: 'js-6',
        title: 'for循环',
        language: 'javascript',
        difficulty: 3,
        category: '循环',
        buggyCode: `// 打印 1 到 5
for (let i = 1; i <= 5; i++)
    console.log(i);
}`,
        correctCode: `// 打印 1 到 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,
        errorLine: 3,
        hint: '检查循环体的括号是否匹配',
        options: [
            {
                id: 'a',
                label: '在 for 语句后添加左大括号',
                explanation: '正确！代码块需要成对的大括号，只有右大括号没有左大括号会导致语法错误。'
            },
            {
                id: 'b',
                label: '去掉右大括号',
                explanation: '虽然去掉右大括号语法上也对（单行代码可以省略大括号），但保留成对的大括号是更好的实践。'
            },
            {
                id: 'c',
                label: '把 i++ 改成 i = i + 1',
                explanation: '两者效果一样，问题不在于此。'
            },
            {
                id: 'd',
                label: '把 let 改成 var',
                explanation: '这里用 let 是正确的，问题不在变量声明。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'for 循环',
            description: 'for 循环包含初始化、条件、迭代表达式三部分，循环体用大括号包裹',
            example: `for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 输出: 0, 1, 2, 3, 4`,
            tip: '即使循环体只有一行，也建议使用大括号，这样添加代码时不容易出错。'
        }
    },
    {
        id: 'js-7',
        title: '对象属性',
        language: 'javascript',
        difficulty: 3,
        category: '对象',
        buggyCode: `// 创建一个学生对象
let student = {
    name: "小明",
    age: 18,
    grade: "高三"
}

console.log(student[name]);`,
        correctCode: `// 创建一个学生对象
let student = {
    name: "小明",
    age: 18,
    grade: "高三"
};

console.log(student.name);`,
        errorLine: 8,
        hint: '访问对象属性的两种方式',
        options: [
            {
                id: 'a',
                label: '使用点号访问属性：student.name',
                explanation: '正确！访问对象属性可以用点号（属性名是合法标识符时）或方括号（属性名是变量或特殊字符时）。'
            },
            {
                id: 'b',
                label: '给 name 加引号：student["name"]',
                explanation: '这也可以，方括号加字符串也是正确的访问方式。但点号更简洁常用。'
            },
            {
                id: 'c',
                label: '使用 student.getName()',
                explanation: 'JavaScript 对象没有自动生成的 getter 方法。'
            },
            {
                id: 'd',
                label: '使用 student->name',
                explanation: '-> 不是 JavaScript 的语法，那是 PHP 或 C++ 的写法。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '对象属性访问',
            description: '访问对象属性有两种方式：点号语法和方括号语法',
            example: `let obj = { name: "小明", age: 18 };

// 点号语法（更常用）
console.log(obj.name);

// 方括号语法
console.log(obj["age"]);

// 方括号支持变量
let key = "name";
console.log(obj[key]);`,
            tip: '属性名包含特殊字符或需要用变量时，使用方括号语法。其他情况推荐点号语法，更简洁。'
        }
    },
    {
        id: 'js-8',
        title: '返回值',
        language: 'javascript',
        difficulty: 3,
        category: '函数',
        buggyCode: `// 计算两个数的和
function add(a, b) {
    let sum = a + b;
}

let result = add(3, 5);
console.log("结果是：" + result);`,
        correctCode: `// 计算两个数的和
function add(a, b) {
    let sum = a + b;
    return sum;
}

let result = add(3, 5);
console.log("结果是：" + result);`,
        errorLine: 3,
        hint: '函数如何把计算结果传递出去？',
        options: [
            {
                id: 'a',
                label: '添加 return 语句返回结果',
                explanation: '正确！函数需要使用 return 语句来返回值，否则默认返回 undefined。'
            },
            {
                id: 'b',
                label: '使用 echo 输出结果',
                explanation: 'echo 不是 JavaScript 的关键字，那是 PHP 的。'
            },
            {
                id: 'c',
                label: '直接输出变量 sum',
                explanation: 'sum 是函数内部变量，外部无法直接访问，需要通过 return 返回。'
            },
            {
                id: 'd',
                label: '把函数改成箭头函数',
                explanation: '箭头函数也是函数的一种写法，但核心问题是缺少返回值。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '函数返回值',
            description: '使用 return 语句从函数中返回值，没有 return 的函数默认返回 undefined',
            example: `// 有返回值的函数
function add(a, b) {
    return a + b;
}

// 无返回值的函数（返回 undefined）
function log(msg) {
    console.log(msg);
}`,
            tip: 'return 语句会立即结束函数执行，并返回指定的值。'
        }
    },
    {
        id: 'js-9',
        title: '变量未定义',
        language: 'javascript',
        difficulty: 2,
        category: '变量',
        buggyCode: `// 计算面积
let width = 10;
let height = 5;
let area = width * hight;
console.log("面积是：" + area);`,
        correctCode: `// 计算面积
let width = 10;
let height = 5;
let area = width * height;
console.log("面积是：" + area);`,
        errorLine: 4,
        hint: '检查变量名的拼写是否一致',
        options: [
            {
                id: 'a',
                label: '把 hight 改成 height',
                explanation: '正确！变量名拼写错误会导致 "hight is not defined" 错误。JavaScript 是区分大小写的。'
            },
            {
                id: 'b',
                label: '添加变量 hight 的声明',
                explanation: '添加新变量也能运行，但这不是修复错误的正确方式，应该修正拼写。'
            },
            {
                id: 'c',
                label: '把乘号改成加号',
                explanation: '面积公式是宽乘高，不应该用加号。问题是变量名不对。'
            },
            {
                id: 'd',
                label: '给变量名加引号',
                explanation: '变量名不需要加引号，加了就变成字符串了。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '变量名与作用域',
            description: 'JavaScript 区分大小写，变量名必须正确拼写才能访问',
            example: `let myName = "小明";
console.log(myname); // 错误！大小写不一致
console.log(myName); // 正确`,
            tip: '保持变量命名一致很重要，推荐使用驼峰命名法（如 myVariableName）。'
        }
    },
    {
        id: 'js-10',
        title: '闭包与作用域',
        language: 'javascript',
        difficulty: 4,
        category: '作用域',
        buggyCode: `// 创建计数器
function createCounter() {
    let count = 0;
    return function() {
        count = count + 1;
        console.log(count);
    }
}

let counter = createCounter();
counter();
counter();
console.log(count);`,
        correctCode: `// 创建计数器
function createCounter() {
    let count = 0;
    return function() {
        count = count + 1;
        console.log(count);
    };
}

let counter = createCounter();
counter();
counter();`,
        errorLine: 12,
        hint: '变量的作用域范围是什么？',
        options: [
            {
                id: 'a',
                label: '移除最后的 console.log(count)，因为 count 是函数内部变量',
                explanation: '正确！count 是 createCounter 函数内部的局部变量，外部无法直接访问。这是闭包的特性。'
            },
            {
                id: 'b',
                label: '把 let count 改成 var count',
                explanation: 'var 也是函数作用域，外部仍然无法访问。问题不在于用 let 还是 var。'
            },
            {
                id: 'c',
                label: '在函数外部也声明一个 count 变量',
                explanation: '外部的 count 和内部的 count 是两个不同的变量，不是同一个。'
            },
            {
                id: 'd',
                label: '使用 window.count 访问',
                explanation: 'count 不是全局变量，不会挂载到 window 上。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '作用域与闭包',
            description: '函数内部声明的变量是局部变量，外部无法直接访问。闭包可以让内部函数访问外部函数的变量。',
            example: `function outer() {
    let x = 10;
    function inner() {
        console.log(x); // 内部函数可以访问外部变量
    }
    return inner;
}

let fn = outer();
fn(); // 输出 10 (闭包)
console.log(x); // 错误！x 是局部变量`,
            tip: '闭包是 JavaScript 的重要特性，可以用来实现数据私有化和封装。'
        }
    }
];
