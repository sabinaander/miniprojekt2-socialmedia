const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./backend/models/userModel');
const Post = require('./backend/models/blogPostModel');
const Role = require('./backend/models/roleModel');

const connectionString = 'mongodb://localhost:27017/socialmedia';

async function main() {
  await mongoose.connect(connectionString);

  try {
    await User.collection.drop();
  } catch {}

  try {
    await Post.collection.drop();
  } catch {}

  try {
    await Role.collection.drop();
  } catch {}

  const roleUser = new Role({ name: 'user' });
  const roleAdmin = new Role({ name: 'admin' });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin', salt);

  const userAdmin = new User({
    username: 'admin',
    email: 'admin@admin.com',
    password: hashedPassword,
    role: roleAdmin,
  });

  await roleUser.save();
  await roleAdmin.save();
  await userAdmin.save();

  console.log(
    'Default roles "user" & "admin" created, default admin account "admin" created.'
  );
}

main().finally(() => {
  process.exit(0);
});
