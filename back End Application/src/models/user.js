import { client } from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const paper = process.env.BCRYPT_PASSWORD;
const saltrounds = process.env.SALT_ROUNDS;

class userModel {
  constructor(firstName, lastName, email, password) {
    this.user = {
      firstName,
      lastName,
      email,
      password,
    };
  }

  async createUser() {
    try {
      await client.connect();
      const isExist = await client
        .db("sample_mflix")
        .collection("users")
        .findOne({ email: this.user.email });

      if (isExist) {
        console.log("User already exists");
        // Return null if the user already exists
      } else {
        const createdUser = {
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          email: this.user.email,
          password: bcrypt.hashSync(
            this.user.password + paper,
            parseInt(saltrounds)
          ),
        };

        await client
          .db("sample_mflix")
          .collection("users")
          .insertOne(createdUser);

        console.log(`success`);
        return createdUser; // Return the created user object
      }
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      await client.close();
    }
  }
  async getUsers() {
    try {
      await client.connect();
      const users = await client
        .db("sample_mflix")
        .collection("users")
        .find({})
        .toArray();
      console.log(users);
    } catch {
      console.log(Error);
    } finally {
      await client.close();
    }
  }
  async getOneUser(filter) {
    try {
      await client.connect();
      const users = await client
        .db("sample_mflix")
        .collection("users")
        .findOne(filter);

      return users;
    } catch {
      console.log(Error);
    } finally {
      await client.close();
    }
  }
  async updateUser(filter, update) {
    try {
      await client.connect();
      const result = await client
        .db("sample_mflix")
        .collection("users")
        .updateOne(filter, { $set: update });
      console.log(`${result.modifiedCount} document(s) updated`);
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async deleteUser(filter) {
    try {
      await client.connect();
      const result = await client
        .db("sample_mflix")
        .collection("users")
        .deleteOne(filter);
      console.log(`${result.deletedCount} document(s) deleted`);
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
  async logIn(email, password) {
    try {
      await client.connect();
      const user = await client
        .db("sample_mflix")
        .collection("users")
        .findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password + paper, user.password);
        if (isMatch) {
          return user;
        }
      } else {
        return console.log("User not found or password is incorrect");
      }
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}






//  const user = new userModel("John", "doe", "johdoe@mple.com", "password123")
//  user.createUser()

//const user1 = new userModel();
//user1.updateUser({email:null},{email:""});
//user1.deleteUser({email:""})
//user1.getUsers()
//user1.getOneUser({email:"abbdo30@gmail.com"})
//user1.logIn("johsdde@mple.com","password123")

export default userModel;
