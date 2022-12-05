const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$8QC6V5FNIR109ReHfw7sfOyXTw1FsvaCecGlAm2zgitzbTdWn9oXe';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
