// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: `000${i}}`,
    id: i,
    status: '私人题目',
    title: '迎春舞会之三人组舞',
    difficulty: '简单',
    ac_rate: Math.ceil(Math.random() * 100),
  });
}

export function getProblemList(req, res) {
  const result = {
    code: 0,
    data: {
      list: tableListDataSource,
      current_page: 1,
      total: 100,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getProblemProgress(req, res) {
  const result = {
    code: 0,
    data: {
      ac_num: 500,
      pre_num: 100,
      fail_num: 20,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getRankList(req, res) {
  const userList = [];
  for (let i = 0; i < 5; i += 1) {
    userList.push({
      user_id: i,
      rank_num: 60 + i,
      avator: 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png',
      nick_name: '一棵树',
      ac_num:89,
    });
  }
  const result = {
    code: 0,
    data: userList,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function collection(req, res) {
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

export function getCollectionList(req, res) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    list.push(true);
  }

  const result = {
    code: 0,
    data: list,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getProblemStatusList(req, res) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    list.push(Math.round(Math.random() * 2));
  }

  const result = {
    code: 0,
    data: list,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

