# apollo-server

### What is GraphQL?
GraphQL is the query language for fetchting resources over HTTP/HTTPs. It mainly used GET / POST methods. It is having single endpoint and provide only requested data. It support mutation also (update). It allows client to define the structure of the data required and the same structure of the data is returned from server. GraphQL consist of type system, query language, and execution semantics, static validations and type introspection.

It is developed by facebook in 2012 and released as open-source in 2015. It supports mostly all the platforms and languages.
It eliminate the need of firing multiple network calls, as all the data can be fetched in one call as per needs.
It fastens development, as it eliminate the dependency of changing in the response of API.
It consume less resources as deliver only requested data.

### Difference between GraphQL and REST

1. GraphQL having only one endpoint but REST having bundle of End-points

2. GraphQL serves only requested data but REST serves as predefined data.

3. GraphQL support mutation by changing keyword but rest changes methods.

4. GraphQL having typed structure and response with null in case of data is not available but REST depends on implementation.

5. In GraphQL, client is aware of data structure in before but not in REST.

### Schema
Schema is the structure of the request for the response. It is typed structure. Every key is either scalar types like string, number, null or GraphQL Object Type. A schema can be nested or use fragment for repeative structures. For not-null value of key, use ! (**Exclamation Mark**) at the end of type.

### Resolvers
Resolver is the function which return the values for response either having or fetched over network. In case of promise, it wait to resolve of promise. GraphQL select values from resolver returned object and return to client as reqeusted.

Resolvers can be nested, in nested case returned value assign to parent key. If value is not resolved then key would be null.