import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT;
async function main() {
  try {
    // await prisma.$connect();
    console.log("database conected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    // await prisma.$disconnect();
    console.error("error starting the server:", error);
  }
}

main();
