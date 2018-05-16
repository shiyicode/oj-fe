export function getTestList (req, res) {
  const testList = [];
  for (let i = 0; i < 10; i+=1) {
    testList.push({
      "problem_id": 1,
      "problem_name":'A+B',
      "user_name": "fightcoder",
      "nick_name": 'hahhah',
      "user_id": "123",
      "status": Math.round(Math.random() * 7) + 1,
      "memory_cost": 1000,
      "time_cost": 1000,
      "lang": "golang",
      "time": "2018.04.24 00:00:00",
      "submit_id": 1000 + i,
    });
  }
  const result = {
    code: 0,
    data: {
      list: testList,
      total: 100,
      current_page: 1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
