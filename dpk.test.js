const {
  // deterministicPartitionKeyOriginal: deterministicPartitionKey,
  deterministicPartitionKey,
  hashData,
  TRIVIAL_PARTITION_KEY
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("with shorter partitionKey", () => {
    const event = {
      partitionKey: "foo"
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe("foo");
  });

  it("with non-string partitionKey", () => {
    const event = {
      partitionKey: 123
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe("123");
  });

  it("with non-string partitionKey with zero value", () => {
    const event = {
      partitionKey: 0
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hashData(JSON.stringify(event)));
  });

  it("with non-string partitionKey object", () => {
    const event = {
      partitionKey: { foo: "bar" }
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(JSON.stringify(event.partitionKey));
  });

  it("with longer non-string partitionKey", () => {
    const event = {
      partitionKey: 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(JSON.stringify(event.partitionKey));
  });

  it("with longer non-string partitionKey object", () => {
    const event = {
      partitionKey: {
        foo: "bar".repeat(100)
      }
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hashData(JSON.stringify(event.partitionKey)));
  });

  it("with short non-string partitionKey object", () => {
    const event = {
      partitionKey: {
        foo: "bar"
      }
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(JSON.stringify(event.partitionKey));
  });

  it("with longer partitionKey", () => {
    const event = {
      partitionKey: "foo".repeat(100)
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hashData(event.partitionKey));
  });

  it("with no partitionKey", () => {
    const event = {
      foo: "bar"
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hashData(JSON.stringify(event)));
  });

  it("with null event", () => {
    const event = null;
    const key = deterministicPartitionKey(event);
    expect(key).toBe(TRIVIAL_PARTITION_KEY);
  });
});

describe("hashData", () => {
  it("Throws an error when given a non-string", () => {
    expect(() => {
      hashData(42);
    }).toThrow();
  });

  it("Returns a string", () => {
    const result = hashData("Hello, world!");
    expect(typeof result).toBe("string");
    expect(result).toBe("8e47f1185ffd014d238fabd02a1a32defe698cbf38c037a90e3c0a0a32370fb52cbd641250508502295fcabcbf676c09470b27443868c8e5f70e26dc337288af");
  });

});