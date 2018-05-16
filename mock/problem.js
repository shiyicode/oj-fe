export function getProblemInfo(req, res) {
  const problemInfo = {
    user_name: 'picking_up_stones',
    nick_name: '哈哈哈',
    user_avator: 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png',
    is_collection: 0,
    ac_rate: 11,
    time_limit: 1000,
    memory_limit: 1000,
    title: 'K个最近的点',
    description:
      '有m种颜色是小寒所喜欢的颜色。小松希望他折的每种颜色的蝴蝶的数目是一样的。换句话说，小松必须折m*k只蝴蝶，其中k代表每种颜色蝴蝶的数目，这个数由小松自己来决定。但是小松又不能浪费纸，也就是说他买的本子中，只要是小寒喜欢的颜色的纸都要被折成蝴蝶。于是问题来了，每种类型的本子应该各买多少本，才能折出这m*k只蝴蝶呢？当然，由于小松是个很懒的人，他希望折的蝴蝶数目越少越好，只要表达',
    input_des:
      ' 输入的第一行包含2个整数n（1≤n≤8），m（1≤m≤10）。表示有n种不同类型的本子和m种小寒喜欢的颜色。接下来一个n*m的矩阵。第i行第j列的整数aij表示在第i种类型的本子中包含小寒喜欢的颜色j的纸有aij（1≤aij≤100）张。再接下来的一排n个整数b1到bn，表示每种颜色的本子在超市中有多少本（1≤bi≤5）。',
    output_des:
      '输出包含一个整数，表示小松最少需要折的蝴蝶数目，如果该数目超过1000，则输出”alternative!”。（由于可能存在多种买本子的方案，所以这里就不要求输出具体方案了）',
    input_case: '2 3 <br> 2 1 2 <br> 4 8 4 <br>5 5',
    output_case: '36',
    hint: '0≤n≤1000',
    language_limit: ['java', 'c'],
  };
  const result = {
    code: 0,
    data: problemInfo,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getCode(req, res) {
  const result = {
    code: 0,
    data: {
      code: 'luwenjing',
      language: 'c',
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

// 提交代码返回值
export function submitCode (req, res) {
  const result = {
    code: 0,
    data: '123456',
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

// 测评返回值
export function getCommomResult(req, res) {
  const result = {
      "code": 0,
      "data": {
        "problem_name": "tow sum",
        "username": "luwenjing",
        "status": 4,
        "memory_cost": 1000,
        "time_cost": 1000,
        "lang": "Go",
        "code": "代码",
        "time": "2018.04.24 00:00:00",
        "result_des": '<b>测试点#1.in </b> <b>结果</b>:<label class="text-success">AC</label>    内存使用量:  256kB     时间使用量:  1ms     <br><b>测试点#2.in </b> <b>结果</b>:<label class="text-success">AC</label>    内存使用量:  256kB     时间使用量:  1ms     <br><b>测试点#3.in </b> <b>结果</b>:<label class="text-success">AC</label>    内存使用量:  256kB     时间使用量:  1ms     <br>',
      },
    };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getTestResult (req, res) {
  const result = {
    "code": 0,
    "data": {
      "username": "fightcoder",
      "status": 4,
      "memory_cost": 1000,
      "time_cost": 1000,
      "lang": "Go",
      "code": "代码",
      "result_des": "123456",
      "time": "2018.04.24 00:00:00",
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

// 保存代码
export function saveCode(req, res) {
  const result = {
    code: 0,
    data: true,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

