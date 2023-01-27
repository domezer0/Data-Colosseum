const knex = require('../../config/pgConn');

const censusVars =
  [
    'DP04_0080E', 'DP04_0081E', 'DP04_0082E', 'DP04_0083E', 'DP04_0084E', 'DP04_0085E', 'DP04_0086E', 'DP04_0087E', 'DP04_0088E',
    'DP04_0090E', 'DP04_0091E', 'DP04_0092E', 'DP04_0093E', 'DP04_0094E', 'DP04_0095E', 'DP04_0096E', 'DP04_0097E', 'DP04_0098E',
    'DP04_0099E', 'DP04_0100E', 'DP04_0101E', 'DP04_0102E', 'DP04_0103E', 'DP04_0104E', 'DP04_0105E', 'DP04_0106E', 'DP04_0107E',
    'DP04_0108E', 'DP04_0109E', 'DP04_0110E', 'DP04_0111E', 'DP04_0112E', 'DP04_0113E', 'DP04_0114E', 'DP04_0115E', 'DP04_0116E',
    'DP04_0117E', 'DP04_0118E', 'DP04_0119E', 'DP04_0120E', 'DP04_0121E','DP04_0122E', 'DP04_0123E', 'DP04_0124E', 'DP04_0125E',
    'DP04_0136E', 'DP04_0137E', 'DP04_0138E', 'DP04_0139E', 'DP04_0140E', 'DP04_0141E', 'DP04_0142E', 'DP04_0143E', 'DP03_0051E',
    'DP03_0052E', 'DP03_0053E', 'DP03_0054E', 'DP03_0055E', 'DP03_0056E', 'DP03_0057E', 'DP03_0058E', 'DP03_0059E',
    'DP03_0060E', 'DP03_0061E', 'DP03_0062E', 'DP03_0063E', 'DP03_0064E', 'DP03_0065E', 'DP03_0066E', 'DP03_0067E',
    'DP03_0068E', 'DP03_0069E', 'DP03_0070E', 'DP03_0071E', 'DP03_0072E', 'DP03_0073E', 'DP03_0074E', 'DP03_0075E',
    'DP03_0076E', 'DP03_0077E', 'DP03_0078E', 'DP03_0079E', 'DP03_0080E', 'DP03_0081E', 'DP03_0082E', 'DP03_0083E',
    'DP03_0084E', 'DP03_0085E', 'DP03_0086E', 'DP03_0087E', 'DP03_0088E', 'DP03_0089E', 'DP03_0090E', 'DP03_0091E',
    'DP03_0092E', 'DP03_0093E', 'DP03_0094E'
  ]

module.exports.queryIncome = async function (idParam) {
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
