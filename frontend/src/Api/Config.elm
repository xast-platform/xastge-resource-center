module Api.Config exposing (..)

-- Production: use relative URLs (Nginx proxies to backend)
-- Development: uncomment localhost URLs below

backendUrl : String
backendUrl = "/api"

graphqlUrl : String
graphqlUrl = "/graphql"

-- Development URLs (comment out above and uncomment below for local dev)
-- backendUrl = "http://localhost:3000/api"
-- graphqlUrl = "http://localhost:3000/graphql"