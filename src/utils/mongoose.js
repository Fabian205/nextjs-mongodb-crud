import { connect, connection } from "mongoose";

const conn ={
  isConnected: false
} 

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);
  //const db = await connect(process.env.URI_MONGODB);

  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
}
//consultar mongoose connection events
connection.on("connected", () => {
  console.log("Connection Mongodb ok");
});

connection.on("error", (err) => {
  console.log(err);
});
