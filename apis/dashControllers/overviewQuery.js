const knex = require('../../config/pgConn');

const censusVars = [
  'DP02_0053E', 'DP02_0054E', 'DP02_0055E', 'DP02_0056E', 'DP02_0057E', 'DP02_0058E',
  'DP02_0059E', 'DP02_0060E', 'DP02_0061E', 'DP02_0062E', 'DP02_0063E', 'DP02_0064E',
  'DP02_0065E', 'DP02_0066E', 'DP02_0067E', 'DP02_0068E', 'DP03_0001E', 'DP03_0002E',
  'DP03_0003E', 'DP03_0004E', 'DP03_0005E', 'DP03_0006E', 'DP03_0007E', 'DP03_0008E',
  'DP03_0018E', 'DP03_0019E', 'DP03_0020E', 'DP03_0021E', 'DP03_0022E', 'DP03_0023E',
  'DP03_0024E', 'DP03_0025E', 'DP03_0026E', 'DP03_0027E', 'DP03_0028E', 'DP03_0029E',
  'DP03_0030E', 'DP03_0031E', 'DP03_0033E', 'DP03_0034E', 'DP03_0035E', 'DP03_0036E',
  'DP03_0037E', 'DP03_0038E', 'DP03_0039E', 'DP03_0040E', 'DP03_0041E', 'DP03_0042E',
  'DP03_0043E', 'DP03_0044E', 'DP03_0045E', 'DP03_0046E', 'DP03_0047E', 'DP03_0048E',
  'DP03_0049E', 'DP03_0050E', 'DP03_0095E', 'DP03_0096E', 'DP03_0097E', 'DP03_0098E',
  'DP03_0099E', 'DP03_0100E', 'DP03_0101E', 'DP03_0102E', 'DP03_0103E', 'DP03_0104E',
  'DP03_0105E', 'DP03_0106E', 'DP03_0107E', 'DP03_0108E', 'DP03_0109E', 'DP03_0110E',
  'DP03_0111E', 'DP03_0112E', 'DP03_0113E', 'DP03_0114E', 'DP03_0115E', 'DP03_0116E',
  'DP03_0117E', 'DP03_0118E'
];

module.exports.queryOverview = async function (idParam) {
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
