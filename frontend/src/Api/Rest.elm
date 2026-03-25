module Api.Rest exposing (..)

import Http
import Json.Decode as Decode
import Event exposing (Msg(..))
import Api.Config exposing (backendUrl)
import Json.Encode as Encode
import Model.AccountStatus exposing (UserData)

-- Registration
register : RegisterRequest -> Cmd Msg
register req =
   Http.post
      { url = backendUrl ++ "/auth/register"
      , body = Http.jsonBody (registerEncoder req)
      , expect = Http.expectStringResponse RegisterResponseReceived registerResponseResolver
      }

registerResponseResolver : Http.Response String -> Result Http.Error UserData
registerResponseResolver response =
   case response of
      Http.BadUrl_ _ ->
         Err (Http.BadBody "Invalid request URL")

      Http.Timeout_ ->
         Err (Http.BadBody "Request timed out")

      Http.NetworkError_ ->
         Err (Http.BadBody "Network error, check if backend is running")

      Http.BadStatus_ metadata body ->
         case Decode.decodeString backendErrorDecoder body of
            Ok message ->
               Err (Http.BadBody message)

            Err _ ->
               if metadata.statusCode == 409 then
                  Err (Http.BadBody "Username or email already exists")
               else
                  Err (Http.BadBody "Registration failed")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString registerSuccessDecoder body of
            Ok userData ->
               Ok userData

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

backendErrorDecoder : Decode.Decoder String
backendErrorDecoder =
   Decode.field "message" Decode.string

registerSuccessDecoder : Decode.Decoder UserData
registerSuccessDecoder =
   Decode.map3 UserData
      (Decode.at [ "user", "username" ] Decode.string)
      (Decode.at [ "user", "email" ] Decode.string)
      (Decode.field "token" Decode.string)

type alias RegisterRequest =
   { username : String
   , email : String
   , password : String
   , saveSession : Bool
   }

registerEncoder : RegisterRequest -> Encode.Value
registerEncoder req =
   Encode.object
      [ ( "username", Encode.string req.username )
      , ( "email", Encode.string req.email )
      , ( "password", Encode.string req.password )
      , ( "saveSession", Encode.bool req.saveSession )
      ]

-- 
getResources : Cmd Msg
getResources = 
   Http.get
      { url = "http://localhost:3000/api/resources"
      , expect = Http.expectJson GotResources resourcesDecoder
      }

resourcesDecoder : Decode.Decoder (List String)
resourcesDecoder =
   Decode.list Decode.string