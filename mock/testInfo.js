export function getTestInfo (req, res) {
  const result = {
    "code": 0,
    "data": {
      "problem_id": "123",
      "problem_name": "tow sum",
      "user_name": "luwenjing",
      "user_id": "123",
      "status": 4,
      "memory_cost": 1000,
      "time_cost": 1000,
      "lang": "Go",
      "code": "代码",
      "time": "2018.04.24 00:00:00",
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
