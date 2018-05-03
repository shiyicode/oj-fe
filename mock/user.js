

export function getUserInfo (req, res) {
  const result = {
    "code": 0,
    "data": {
      "account_id": 2,
      "user_name": "luwenjing",
      "nick_name": "hahah",
      "sex": "女",
      "avator": "https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png",
      "blog": "https://blog.csdn.net/Picking_up_stones",
      "git": "https://github.com/lwjcode",
      "description": "如果你知道自己去哪，全世界都会为你让路",
      "birthday": "1995-01-10",
      "daily_address": ['陕西省', '西安市', '长安区'],
      "stat_school": "大学",
      "school_name": "西安邮电大学",
    },
  };
  if (res && res.json) {
    return res.json(result);
  } else {
    return result;
  }
}

export function getCount (req, res) {
  const result = {
    "code": 0,
    "data": {
      "ac_num": 89,
      "ce_num": 67,
      "me_num": 34,
      "oe_num": 23,
      "re_num": 89,
      "se_num": 12,
      "te_num": 23,
      "wa_num": 45,
    },
  }
  if (res && res.json) {
    return res.json(result);
  } else {
    return result;
  }
}

export function getRecentSubmit (req, res) {
  const list = [];
  for (let i = 0; i < 30; i += 1) {
    list.push({
      date: "2018-05-01",
      submit_num: Math.round(Math.random() * 100),
    });
  }
  const result = {
    code: 0,
    data: list,
  };
  if (res && res.json) {
    return res.json(result);
  } else {
    return result;
  }
}

export function getRecentRank (req, res) {
  const list = [];
  for (let i = 0; i < 30; i += 1) {
    list.push({
      date: "2018-05-01",
      rank_num: Math.round(Math.random() * 100),
    });
  }
  const result = {
    code: 0,
    data: list,
  };
  if (res && res.json) {
    return res.json(result);
  } else {
    return result;
  }
}

export function updateUserInfo (req, res) {
  const result = {
    code: 0,
    data: "",
  };
  if (res && res.json) {
    return res.json(result);
  } else {
    return result;
  }
}
