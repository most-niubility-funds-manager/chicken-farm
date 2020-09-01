import FundModel from "../models/fund";

export default {
  /**
 * @description: 添加多个基金
 * @param {Array} data [{ code, name, unit, state, create }]
 * @return: Promise.resolve
 */
  addAllFunds = async (data) => {
    Promise.all(
      data.map(({ code }) =>
        FundModel.getDataByKeyValue({
          key: { k: "code", v: code },
        })
      )
    ).then((res) => {
      const needAddIndex = res.reduce((arr, v, i) => {
        !v && arr.push(i);

        return arr;
      }, []);

      return FundModel.batchInsert(needAddIndex.map((v) => data[v]));
    });
  }
}