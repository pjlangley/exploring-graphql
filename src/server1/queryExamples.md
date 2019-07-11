# Example queries

Get user by id & any associated friends:

```
{
  user(id: 1) {  <-- compulsory argument query
    name         <-- simple field query
    friends {    <-- sub-selection query
      name
    }
  }
}
```

Get users, optionally by location:

```
{
  users(countryCode: UK) {   <-- optional enum argument query
    name
    location
  }
}
```

Get users, specifying operation name:

```
query GetUsers {
  users {
    name
    location
  }
}
```

Get users, with aliasing:

```
{
  ukUsers: users(countryCode: UK) {
    name
    location
  }
  usaUsers: users(countryCode: USA) {
    name
    location
  }
}
```

Get users, with aliasing & with a query fragment to avoid repitition:

```
{
  ukUsers: users(countryCode: UK) {
    ...userFields
  }
  usaUsers: users(countryCode: USA) {
    ...userFields
  }
}

fragment userFields on User {
  name
  location
}
```

Add a user:

```
mutation AddUser {
  addUser(name: "Alanna", location: UK) {
    name
    location
  }
}
```
