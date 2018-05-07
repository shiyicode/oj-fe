export function getTopList (req, res) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    list.push({
      "rank_num":i+1,
      "user_name":"luwenjing",
      "nick_name":"哈哈哈",
      "avator":"https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png",
      "ac_num":11,
      "total_num": 200,
    });
  }
  const result = {
    code: 0,
    data: {
      list,
      total: 100,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
