import { ApolloServer, gql } from "apollo-server"

/* Estos son los datos */
const persons =[
    {
        name: 'Juan',
        phone: '3156648190',
        street: 'carrera 10A este 14-35',
        city: 'Pasto',
        id: '01'
    },
    {
        name: 'Mercedes',
        phone: '3156648398',
        street: 'carrera 10A este 14-35',
        city: 'Pasto',
        id: '02'
    },
    {
        name: 'Juan',
        street: 'carrera 10A este 14-35',
        city: 'Pasto',
        id: '01'
    }
]

/* Descripcion de los datos del servidor Graphql*/
/* Definir las peticion del GRAPHQL */
const  typeDefinitions = gql`
    type persons {
        name:String!,
        phone: String
        street : String!,
        city: String!,
        id: ID!
    }

    
    
    type Query  {
        personCount:Int!,
        allPersons:[persons]!,
        findPerson(name:String!):persons
    }
`

/* De donde se van obtener los datos */
const resolvers = {
    Query:{
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson:(root, args) =>{
            const {name} = args
            return persons.find(person => person.name === name)
        }
    }
}


/* Crearmos nuestro servidor */

const server  = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

/* INICIALIZACION DEL SERVIDOR  */

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})