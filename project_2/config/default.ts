export default {
  port: 1337,
  dbUri:
    "mongodb+srv://admin:admin1234@cluster0.7t3i91d.mongodb.net/?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFqX0CINCKBjZuGeXZCzu58dU7Oi
3OOb4qji8Hu8Q4F+o3a2WboppSCAPKAaB0GSsM1f32Px/rzhnCYO8W2T/RWG0Z//
Cgc70Xnzbhiq/DXuNy6ui7qswUi+/yEsfhGhUt6Pyv+7wQRpmc/QQQ6LTXKhvTfS
Rkqi7MuBVsrnAcYjAgMBAAE=
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFqX0CINCKBjZuGeXZCzu58dU7Oi3OOb4qji8Hu8Q4F+o3a2Wbop
pSCAPKAaB0GSsM1f32Px/rzhnCYO8W2T/RWG0Z//Cgc70Xnzbhiq/DXuNy6ui7qs
wUi+/yEsfhGhUt6Pyv+7wQRpmc/QQQ6LTXKhvTfSRkqi7MuBVsrnAcYjAgMBAAEC
gYA8jARODbn7QBQtrKNKJ+W4tWgQwkOxV6lISMyDVlMjxBjKKZuUgWrcaviZ5Gt/
FuRVjsMF0GH5qSusgAY5v1PA98cucVY8QqE+bKmIvhjTKqHKR/zm7ykXz+fcTti/
A0shbTDAPeIZFvHCCcBiTs2OqjUpRsjJN+xxKY2IV7ONkQJBAKimjScZ3+jk2vA1
QbGnzTapLbrD1q1LTnF2ujNTUa7gy2mspvgIM7oWpMoUjsuiQ2fedBkvVkAuINIY
78HXl+kCQQCJg5PLy3yh+cJv9hqCuLx2OszfSF4OdT3R4tQxf0CHQqc56EmQmNtj
B9dHjJoH5bEzMlb3ewav2VRRlVy7CfIrAkA6wfQxqEkjigBhahyeObk8jwq4pBx6
Od91loje8utlgzo7cgSmK61h6xu0sB7kAX98g7ttPtnM+IVEzZ1SqrtpAkEAiNE9
2nUiErJBz02IAOm2sNc+ASWqVy41DL9nKbwXQryBTy8bCl/bX4NsoMZ2dkcE8BA0
0NQ5yfosV2OJOJrjswJAKFwA1Vfgmm6qs70XzX+IwMgEj6Acbs1Aqc4c8QXQmVlz
Gdbpnldhz0eAGGYn48L/1W/ke00TklQ3IWgmo/TVCA==
-----END RSA PRIVATE KEY-----`,
  accessTokenTtl: "1m",
  refreshTokenTtl: "1y",
};
