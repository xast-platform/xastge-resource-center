module Api.Rest exposing (..)

import Http
import Json.Decode as Decode
import Event exposing (Msg(..))

getResources : Cmd Msg
getResources = 
   Http.get
      { url = "http://localhost:3000/api/resources"
      , expect = Http.expectJson GotResources resourcesDecoder
      }

resourcesDecoder : Decode.Decoder (List String)
resourcesDecoder =
   Decode.list Decode.string