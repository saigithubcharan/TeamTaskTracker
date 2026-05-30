const redis = require("redis");

const client = redis.createClient({
  url: "redis://redis:6379"
});

client.on("error", (err) => {
  console.log(
    "Redis Error:",
    err.message
  );
});

(async () => {
  await client.connect();
  console.log(
    "Redis Connected"
  );
})();

module.exports = client;