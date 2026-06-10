const PythonLevels = [
    {
        id: 'py-1',
        title: 'print函数',
        language: 'python',
        difficulty: 1,
        category: '基础语法',
        buggyCode: `# 输出一句问候
print "你好，世界"`,
        correctCode: `# 输出一句问候
print("你好，世界")`,
        errorLine: 2,
        hint: 'Python 中函数调用需要使用什么符号？',
        options: [
            {
                id: 'a',
                label: '给 print 的参数加上括号',
                explanation: '正确！在 Python 3 中，print 是一个函数，调用函数时必须使用括号包裹参数。'
            },
            {
                id: 'b',
                label: '把双引号换成单引号',
                explanation: '单引号也可以，但核心问题是缺少括号，不是引号的问题。'
            },
            {
                id: 'c',
                label: '去掉 print 关键字',
                explanation: '不对，print 是输出函数，是必需的。'
            },
            {
                id: 'd',
                label: '添加分号',
                explanation: 'Python 语句末尾不需要分号，而且问题不在这。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'print 函数',
            description: 'Python 3 中 print 是内置函数，使用括号传递参数',
            example: `print("你好")
print(123)
print("a =", 10)`,
            tip: 'Python 2 中 print 是语句，可以不用括号，但 Python 3 必须用括号。现在都使用 Python 3。'
        }
    },
    {
        id: 'py-2',
        title: '缩进错误',
        language: 'python',
        difficulty: 1,
        category: '缩进',
        buggyCode: `# 判断数字大小
num = 10

if num > 5:
print("大于5")`,
        correctCode: `# 判断数字大小
num = 10

if num > 5:
    print("大于5")`,
        errorLine: 5,
        hint: 'Python 使用什么来表示代码块？',
        options: [
            {
                id: 'a',
                label: '给 print 语句添加缩进（4个空格）',
                explanation: '正确！Python 使用缩进来表示代码块，而不是大括号。if 语句下面的代码必须缩进。'
            },
            {
                id: 'b',
                label: '添加大括号',
                explanation: '不对，Python 不用大括号表示代码块，而是用缩进。'
            },
            {
                id: 'c',
                label: '去掉冒号',
                explanation: '冒号是必需的，它表示下面是代码块。问题是缺少缩进。'
            },
            {
                id: 'd',
                label: '把 if 改成 ifdef',
                explanation: '没有 ifdef 这个关键字，Python 条件语句就是 if。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'Python 缩进',
            description: 'Python 使用缩进来表示代码块，通常用4个空格',
            example: `if 条件:
    # 缩进的代码属于 if 代码块
    print("条件成立")
    print("也是代码块的一部分")

# 没有缩进，不属于 if 代码块
print("总是执行")`,
            tip: '缩进是 Python 语法的一部分，必须严格保持一致。推荐使用4个空格缩进，不要混用空格和制表符。'
        }
    },
    {
        id: 'py-3',
        title: '变量定义',
        language: 'python',
        difficulty: 1,
        category: '变量',
        buggyCode: `# 定义一个变量
int age = 18
print(age)`,
        correctCode: `# 定义一个变量
age = 18
print(age)`,
        errorLine: 2,
        hint: 'Python 声明变量需要类型吗？',
        options: [
            {
                id: 'a',
                label: '去掉 int 类型声明',
                explanation: '正确！Python 是动态类型语言，不需要显式声明变量类型，直接赋值即可。'
            },
            {
                id: 'b',
                label: '把 int 改成 var',
                explanation: 'Python 没有 var 关键字，那是 JavaScript 的。'
            },
            {
                id: 'c',
                label: '添加分号',
                explanation: 'Python 不需要分号，而且问题不在这。'
            },
            {
                id: 'd',
                label: '用 Integer 代替 int',
                explanation: 'Python 没有 Integer 关键字，而且根本不需要声明类型。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '变量与动态类型',
            description: 'Python 是动态类型语言，变量不需要声明类型，直接赋值即可',
            example: `name = "小明"    # 字符串类型
age = 18         # 整数类型
height = 1.75    # 浮点数类型
is_student = True  # 布尔类型`,
            tip: 'Python 变量虽然不需要声明类型，但每个变量都有类型。可以用 type() 函数查看变量类型。'
        }
    },
    {
        id: 'py-4',
        title: '字符串引号',
        language: 'python',
        difficulty: 2,
        category: '字符串',
        buggyCode: `# 输出一句话
message = '他说："你好'
print(message)`,
        correctCode: `# 输出一句话
message = '他说："你好"'
print(message)`,
        errorLine: 2,
        hint: '字符串的引号需要注意什么？',
        options: [
            {
                id: 'a',
                label: '在字符串末尾添加单引号闭合',
                explanation: '正确！字符串的引号必须成对出现。这里用单引号包裹字符串，内部可以用双引号。'
            },
            {
                id: 'b',
                label: '把所有引号都去掉',
                explanation: '不对，字符串必须用引号包裹。'
            },
            {
                id: 'c',
                label: '把单引号都改成双引号',
                explanation: '只换引号不解决问题，关键是要闭合。而且内部有双引号的话，外部用单引号更好。'
            },
            {
                id: 'd',
                label: '添加转义字符',
                explanation: "转义字符可以用（如 \\'），但这里的问题是缺少闭合引号，不是内部引号冲突。"
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '字符串与引号',
            description: 'Python 字符串可以用单引号、双引号或三引号',
            example: `s1 = '单引号字符串'
s2 = "双引号字符串"
s3 = """三引号
可以换行"""

# 引号嵌套：外部单引号内部可以用双引号
s4 = '他说："你好"'`,
            tip: '当字符串内部包含一种引号时，外部可以用另一种引号，避免使用转义符，代码更美观。'
        }
    },
    {
        id: 'py-5',
        title: '列表索引',
        language: 'python',
        difficulty: 2,
        category: '列表',
        buggyCode: `# 获取列表的第一个元素
fruits = ["苹果", "香蕉", "橙子"]
first = fruits[1]
print("第一个水果是：" + first)`,
        correctCode: `# 获取列表的第一个元素
fruits = ["苹果", "香蕉", "橙子"]
first = fruits[0]
print("第一个水果是：" + first)`,
        errorLine: 3,
        hint: '列表的索引是从几开始的？',
        options: [
            {
                id: 'a',
                label: '把索引从 1 改成 0',
                explanation: '正确！Python 列表索引从 0 开始，第一个元素的索引是 0，不是 1。'
            },
            {
                id: 'b',
                label: '用圆括号代替方括号',
                explanation: '不对，访问列表元素使用方括号，不是圆括号。'
            },
            {
                id: 'c',
                label: '使用 first() 方法',
                explanation: 'Python 列表没有 first() 方法。'
            },
            {
                id: 'd',
                label: '使用 fruits.first',
                explanation: '列表没有 first 属性。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '列表索引',
            description: 'Python 列表索引从 0 开始，支持正向索引和反向索引',
            example: `arr = ["a", "b", "c", "d"]
print(arr[0])   # "a"  (第一个)
print(arr[-1])  # "d"  (最后一个)
print(arr[-2])  # "c"  (倒数第二个)
print(len(arr)) # 4    (元素个数)`,
            tip: 'Python 支持负数索引，-1 表示最后一个元素，-2 表示倒数第二个，非常方便！'
        }
    },
    {
        id: 'py-6',
        title: 'for循环',
        language: 'python',
        difficulty: 2,
        category: '循环',
        buggyCode: `# 打印列表中的每个水果
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits
    print(fruit)`,
        correctCode: `# 打印列表中的每个水果
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits:
    print(fruit)`,
        errorLine: 4,
        hint: 'for 语句末尾缺少什么符号？',
        options: [
            {
                id: 'a',
                label: '在 for 语句末尾添加冒号',
                explanation: '正确！Python 的 for、if、def、while 等语句后面都需要加冒号，表示下面是缩进的代码块。'
            },
            {
                id: 'b',
                label: '添加大括号',
                explanation: '不对，Python 不用大括号，用缩进表示代码块。但首先需要冒号。'
            },
            {
                id: 'c',
                label: '用 foreach 代替 for',
                explanation: 'Python 没有 foreach 关键字，就用 for...in... 遍历。'
            },
            {
                id: 'd',
                label: '给 print 添加缩进',
                explanation: '缩进确实需要，但首先得有冒号来开启代码块。冒号是必需的。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'for 循环',
            description: 'Python 使用 for...in... 遍历可迭代对象，语句末尾需要冒号',
            example: `# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)

# 遍历数字范围
for i in range(5):
    print(i)  # 输出 0,1,2,3,4`,
            tip: 'range(n) 生成 0 到 n-1 的整数序列，是 for 循环中常用的函数。'
        }
    },
    {
        id: 'py-7',
        title: '函数定义',
        language: 'python',
        difficulty: 2,
        category: '函数',
        buggyCode: `# 定义一个打招呼的函数
def say_hello(name)
    print("你好，" + name)

say_hello("小红")`,
        correctCode: `# 定义一个打招呼的函数
def say_hello(name):
    print("你好，" + name)

say_hello("小红")`,
        errorLine: 2,
        hint: '函数定义的末尾需要什么符号？',
        options: [
            {
                id: 'a',
                label: '在参数列表后添加冒号',
                explanation: '正确！def 定义函数时，参数列表后面必须加冒号，函数体需要缩进。'
            },
            {
                id: 'b',
                label: '用 function 代替 def',
                explanation: 'Python 用 def 定义函数，不是 function（那是 JavaScript 的）。'
            },
            {
                id: 'c',
                label: '添加 return 语句',
                explanation: '函数可以没有返回值，问题不在这。'
            },
            {
                id: 'd',
                label: '给函数体加大括号',
                explanation: 'Python 不用大括号，用缩进表示函数体。但首先需要冒号。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '函数定义',
            description: '使用 def 关键字定义函数，参数列表后加冒号，函数体需要缩进',
            example: `# 无参数函数
def say_hi():
    print("Hi!")

# 有参数函数
def add(a, b):
    return a + b

# 调用函数
result = add(3, 5)
print(result)`,
            tip: '函数名推荐使用蛇形命名法（snake_case），如 my_function_name，与 JavaScript 的驼峰命名法不同。'
        }
    },
    {
        id: 'py-8',
        title: '字典访问',
        language: 'python',
        difficulty: 3,
        category: '字典',
        buggyCode: `# 创建一个学生字典
student = {
    "name": "小明",
    "age": 18,
    "grade": "高三"
}

print(student.name)`,
        correctCode: `# 创建一个学生字典
student = {
    "name": "小明",
    "age": 18,
    "grade": "高三"
}

print(student["name"])`,
        errorLine: 8,
        hint: 'Python 字典如何访问值？',
        options: [
            {
                id: 'a',
                label: '使用方括号访问：student["name"]',
                explanation: '正确！Python 字典使用方括号加键名来访问值，而不是点号（那是对象属性访问方式）。'
            },
            {
                id: 'b',
                label: '使用 student.get(name)',
                explanation: 'get 方法存在，但参数应该是字符串 student.get("name")，而且这不是最常用的方式。'
            },
            {
                id: 'c',
                label: '把字典改成类',
                explanation: '没必要，问题是访问方式不对，不是数据结构不对。'
            },
            {
                id: 'd',
                label: '使用 student->name',
                explanation: '-> 不是 Python 的语法。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '字典访问',
            description: 'Python 字典使用方括号加键名访问值，或使用 get() 方法',
            example: `person = {"name": "小明", "age": 18}

# 方括号访问（常用）
print(person["name"])

# get 方法（键不存在时返回 None 或默认值）
print(person.get("age"))
print(person.get("city", "未知"))`,
            tip: '方括号访问在键不存在时会抛出异常，而 get() 方法会返回 None 或指定的默认值，更安全。'
        }
    },
    {
        id: 'py-9',
        title: '布尔值',
        language: 'python',
        difficulty: 2,
        category: '数据类型',
        buggyCode: `# 判断是否成年
age = 20
is_adult = true

if is_adult:
    print("你已经成年了")`,
        correctCode: `# 判断是否成年
age = 20
is_adult = True

if is_adult:
    print("你已经成年了")`,
        errorLine: 3,
        hint: 'Python 的布尔值是怎么写的？',
        options: [
            {
                id: 'a',
                label: '把 true 改成 True（首字母大写）',
                explanation: '正确！Python 的布尔值是 True 和 False，首字母必须大写，不像 JavaScript 是全小写。'
            },
            {
                id: 'b',
                label: '把 true 改成 1',
                explanation: '1 确实可以当作真值使用，但布尔值应该用 True，更清晰。'
            },
            {
                id: 'c',
                label: '用 "true" 字符串代替',
                explanation: '"true" 是非空字符串，也是真值，但它不是布尔类型。'
            },
            {
                id: 'd',
                label: '添加 boolean 类型声明',
                explanation: 'Python 不需要声明类型。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: '布尔类型',
            description: 'Python 的布尔值是 True 和 False，首字母必须大写',
            example: `is_student = True
is_teacher = False

print(10 > 5)   # True
print(10 == 5)  # False`,
            tip: '注意区分：Python 是 True/False，JavaScript 是 true/false。不要搞混了！'
        }
    },
    {
        id: 'py-10',
        title: '空值与异常',
        language: 'python',
        difficulty: 4,
        category: '进阶',
        buggyCode: `# 安全地获取字典值
person = {"name": "小明"}
city = person.get("city")

if city == null:
    print("城市未知")
else:
    print("城市是：" + city)`,
        correctCode: `# 安全地获取字典值
person = {"name": "小明"}
city = person.get("city")

if city is None:
    print("城市未知")
else:
    print("城市是：" + city)`,
        errorLine: 5,
        hint: 'Python 中空值用什么表示？',
        options: [
            {
                id: 'a',
                label: '把 null 改成 None，并用 is 比较',
                explanation: '正确！Python 的空值是 None，不是 null（那是 JavaScript 的）。比较 None 时推荐用 is 而不是 ==。'
            },
            {
                id: 'b',
                label: '把 null 改成 undefined',
                explanation: 'undefined 是 JavaScript 的，Python 没有这个概念。'
            },
            {
                id: 'c',
                label: '用 if not city: 判断',
                explanation: '这样写也能运行，因为 None 是假值。但如果 city 是空字符串或0，也会被当作空，不够精确。'
            },
            {
                id: 'd',
                label: '用 city == None 比较',
                explanation: '== 也能比较 None，但 PEP 8 规范推荐使用 is None，更符合 Python 风格。'
            }
        ],
        correctOptionIndex: 0,
        knowledgePoint: {
            title: 'None 空值',
            description: 'Python 使用 None 表示空值，推荐使用 is 进行比较',
            example: `x = None

# 推荐写法
if x is None:
    print("x 是空的")

# 也可以用，但不推荐
if x == None:
    print("x 是空的")`,
            tip: '比较 None 时用 is 而不是 ==，这是 Python 的官方推荐写法（PEP 8）。'
        }
    }
];
