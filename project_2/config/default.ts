export default {
  port: 1337,
  dbUri:
    "mongodb+srv://admin:admin1234@cluster0.7t3i91d.mongodb.net/?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  publicKey: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl9FLYsLnP10T98mT70e
    qdAeHA8qDU5rmY8YFFlcOcy2q1dijpgfop8WyHu1ULufJJXm0PV20/J9BD2HqTAK
    DZ+/qTv4glDJjyIlo/PIhehQJqSrdIim4fjuwkax9FOCuFQ9nesv32hZ6rbFjETe
    QSxUPjNzsYGOuULWSR3cI8FuV9InlSZQ7q6dEunLPRf/rZujxiAxGzY8zrMehjM5
    LNdl7qDEOsc109Yy3HBbOwUdJyyTg/GRPwklLogw9kkldz5+wMvwOT38IlkO2rCr
    qJpqqt1KmxdOQNbeGwNzZiGiuYIdiQWjilq5a5K9e75z+Uivx+G3LfTxSAnebPlE
    LwIDAQAB
    -----END PUBLIC KEY-----`,
  privateKey: "mySuperSecretPrivateKey",
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
