const rankListTable = [];
for (let i = 0; i < 10; i++) {
  rankListTable.push(
    {
      rankingList: 2,
      userPic:"../public/favicon.png",
      userName: "wer",
      userInfo: "Ant Design2",
      passNum: 300,
      passRate: 25,
    }
  )
}

export function getRankingList(req,res) {
  const result = {
    code : 0,
    data: {
      list: rankListTable,
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

export default {
  getRankingList,
};
