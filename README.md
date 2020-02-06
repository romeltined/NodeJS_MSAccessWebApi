# NodeJS_MSAccessWebApi
1. Create MS Access with table "TestTable", with Field1, Field2
2. Build necessary npm dependencies: node-adodb, express, body-parser
3. Try with Postman
      a. GET http://localhost:8080/api/user
      b. POST http://localhost:8080/api/user   
            {
            "Field1": "rat",
            "Field2": "data"
            }
      c. PUT http://localhost:8080/api/user/10
            {
            "Field1": "dog",
            "Field2": "number"
            }
      d. DELETE http://localhost:8080/api/user/10
