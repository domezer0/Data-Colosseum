const knex = require('../../config/pgConn');

const censusVars =
  [
    'DP04_0001E', 'DP04_0002E', 'DP04_0003E', 'DP04_0007E', 'DP04_0008E', 'DP04_0009E', 'DP04_0010E', 'DP04_0011E', 'DP04_0012E', 'DP04_0013E', 'DP04_0017E', 'DP04_0018E', 'DP04_0019E', 'DP04_0020E', 'DP04_0021E', 'DP04_0022E', 'DP04_0023E', 'DP04_0024E', 'DP04_0025E', 'DP04_0026E', 'DP04_0040E', 'DP04_0041E', 'DP04_0042E', 'DP04_0043E', 'DP04_0044E', 'DP04_0045E', 'DP04_0046E', 'DP04_0047E', 'DP04_0048E', 'DP04_0049E', 'DP04_0051E', 'DP04_0052E', 'DP04_0053E', 'DP04_0054E', 'DP04_0055E', 'DP04_0056E', 'DP04_0126E', 'DP04_0127E', 'DP04_0128E', 'DP04_0129E', 'DP04_0130E', 'DP04_0131E', 'DP04_0132E', 'DP04_0133E', 'DP04_0134E', 'DP04_0135E', 'DP02_0001E', 'DP02_0002E', 'DP02_0004E', 'DP02_0006E', 'DP02_0008E', 'DP02_0009E', 'DP02_0010E', 'DP02_0012E', 'DP02_0013E', 'DP02_0014E', 'DP02_0015E', 'DP02_0016E', 'DP02_0017E', 'DP02_0018E', 'DP02_0019E', 'DP02_0020E', 'DP02_0021E', 'DP02_0022E', 'DP02_0023E', 'DP02_0024E', 'DP02_0044E', 'DP02_0045E', 'DP02_0046E', 'DP02_0047E', 'DP02_0048E', 'DP02_0049E', 'DP02_0050E', 'DP02_0051E', 'DP02_0052E', 'DP02_0079E', 'DP02_0080E', 'DP02_0081E', 'DP02_0082E', 'DP02_0083E', 'DP02_0084E', 'DP02_0085E', 'DP02_0086E', 'DP02_0087E', 'DP02_0112E', 'DP02_0113E', 'DP02_0114E', 'DP02_0115E', 'DP02_0116E', 'DP02_0117E', 'DP02_0118E', 'DP02_0119E', 'DP02_0120E', 'DP02_0121E', 'DP02_0122E', 'DP02_0123E', 'DP02_0152E', 'DP02_0153E', 'DP02_0154E'
  ]

module.exports.queryHouse = async function (idParam) {
  try {
    const threeMile = await knex.select(censusVars).from('three_m_app_results_2020').where({
      id: idParam
    });
    const fiveMile = await knex.select(censusVars).from('five_m_app_results_2020').where({
      id: idParam
    });
    const tenMile = await knex.select(censusVars).from('ten_m_app_results_2020').where({
      id: idParam
    });
    
    return [threeMile, fiveMile, tenMile];
  } catch (err) {
    console.log(err.stack);
  };
};
