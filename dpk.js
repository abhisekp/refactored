const crypto = require("crypto");

function hashData(data, options) {
  if (typeof data !== "string") {
    throw new Error("data should be a string");
  }

  const { algo, encoding } = Object.assign(/* Defaults */{
    algo: "sha3-512",
    encoding: "hex"
  }, options);

  return crypto.createHash(algo).update(data).digest(encoding);
}

exports.hashData = hashData;

const MAX_PARTITION_KEY_LENGTH = 256;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;

const TRIVIAL_PARTITION_KEY = "0";
exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;

exports.deterministicPartitionKey = (event) => {
  let candidate = JSON.stringify(
    event?.partitionKey ??
    hashData(JSON.stringify(event)) ??
    TRIVIAL_PARTITION_KEY
  );

  function isLongPartitionKey(partitionKey, maxPartitionKeyLength = MAX_PARTITION_KEY_LENGTH) {
    return partitionKey.length > maxPartitionKeyLength;
  }

  if (isLongPartitionKey(candidate)) {
    candidate = hashData(JSON.stringify(candidate));
  }
  return candidate;
};

exports.deterministicPartitionKeyOriginal = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  console.log(candidate);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};