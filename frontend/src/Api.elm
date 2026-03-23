module Api exposing (..)

import Api.Backend exposing (Backend(..))
import Api.Rest as Rest
import Api.GraphQL as GraphQL
import Event exposing (Msg)

getResources : Backend -> Cmd Msg
getResources backend = case backend of
   Rest -> Rest.getResources
   GraphQL -> GraphQL.getResources