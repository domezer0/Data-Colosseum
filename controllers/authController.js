const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../config/pgConn');


const handleLogin = async (req, res) => {
  console.log(req.body);
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.sendStatus(400).json({ 'message': 'Username and password are required.' });

  const foundUser = await knex.select('*').from('users').where('name', user);

  if (foundUser.length === 0) {
    console.log('no existing username');
    return res.sendStatus(401) //Unauthorized
  };

  const match = await bcrypt.compare(pwd, foundUser[0].password);
  if (match) {
    const roles = foundUser[0].roles
    const accessToken = jwt.sign(
      {
        "UserInfo": {
            "username": foundUser.username,
            "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser[0].name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const update = await knex('users').where('name', user).update('refresh_token', refreshToken)
    console.log(`User ${user} Logged In!`);

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'Strict', maxAge: 24 * 60 * 60 * 1000});
    res.json({ accessToken, roles });
  } else {
    return res.sendStatus(401)
  };
};

module.exports = { handleLogin }
