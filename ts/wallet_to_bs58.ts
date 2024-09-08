import bs58 from "bs58";
(async () => {
  const PRIVATE_KEY =
    "5gQWXvxghHYQKLm2F4vAa4JKE87YdcynKrkWT2AuheFLDKS3EAjLDWZHUkVmkov3gNRQLh6p6VSRvfc9HGjEHcZn";
  const decoded = bs58.decode(PRIVATE_KEY);

  console.log(decoded);

  const encoded = bs58.encode(decoded);

  console.log(encoded);
})();
