module Api.Rest exposing (..)

import Http
import File exposing (File)
import Json.Decode as Decode
import Event exposing (Msg(..))
import Api.Config exposing (backendUrl)
import Json.Encode as Encode
import Model.AccountStatus exposing (UserData)

-- Registration
type alias RegisterRequest =
   { username : String
   , email : String
   , password : String
   , saveSession : Bool
   }

register : RegisterRequest -> Cmd Msg
register req =
   Http.post
      { url = backendUrl ++ "/auth/register"
      , body = Http.jsonBody (registerEncoder req)
      , expect = Http.expectStringResponse RegisterResponseReceived retrieveUserResponseResolver
      }

registerEncoder : RegisterRequest -> Encode.Value
registerEncoder req =
   Encode.object
      [ ( "username", Encode.string req.username )
      , ( "email", Encode.string req.email )
      , ( "password", Encode.string req.password )
      , ( "saveSession", Encode.bool req.saveSession )
      ]

-- Login
type alias LoginRequest =
   { username : String
   , password : String
   , saveSession : Bool
   }

login : LoginRequest -> Cmd Msg
login req =
   Http.post
      { url = backendUrl ++ "/auth/login"
      , body = Http.jsonBody (loginEncoder req)
      , expect = Http.expectStringResponse LoginResponseReceived retrieveUserResponseResolver
      }
      
loginEncoder : LoginRequest -> Encode.Value
loginEncoder req =
   Encode.object
      [ ( "username", Encode.string req.username )
      , ( "password", Encode.string req.password )
      , ( "saveSession", Encode.bool req.saveSession )
      ]

-- Dashboard asset upload
type alias UploadAssetRequest =
   { assetType : String
   , description : String
   , tags : String
   , token : String
   , assetFile : File
   , thumbnailFile : Maybe File
   }

uploadAsset : UploadAssetRequest -> Cmd Msg
uploadAsset req =
   let
      parts =
         [ Http.stringPart "assetType" req.assetType
         , Http.stringPart "description" req.description
         , Http.stringPart "tags" req.tags
         , Http.filePart "assetFile" req.assetFile
         ]
            ++ (case req.thumbnailFile of
                  Just thumbnailFile ->
                     [ Http.filePart "thumbnailFile" thumbnailFile ]

                  Nothing ->
                     []
               )
   in
   Http.request
      { method = "POST"
      , headers = [ Http.header "Authorization" ("Bearer " ++ req.token) ]
      , url = backendUrl ++ "/assets/upload"
      , body = Http.multipartBody parts
      , expect = Http.expectStringResponse DashboardUploadResponseReceived uploadAssetResponseResolver
      , timeout = Nothing
      , tracker = Nothing
      }

-- Retrieve User
retrieveUserResponseResolver : Http.Response String -> Result Http.Error UserData
retrieveUserResponseResolver response =
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
         case Decode.decodeString retrieveUserSuccessDecoder body of
            Ok userData ->
               Ok userData

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

retrieveUserSuccessDecoder : Decode.Decoder UserData
retrieveUserSuccessDecoder =
   Decode.map3 UserData
      (Decode.at [ "user", "username" ] Decode.string)
      (Decode.at [ "user", "email" ] Decode.string)
      (Decode.field "token" Decode.string)

-- ...
getResources : Cmd Msg
getResources = 
   Http.get
      { url = "http://localhost:3000/api/resources"
      , expect = Http.expectJson GotResources resourcesDecoder
      }

resourcesDecoder : Decode.Decoder (List String)
resourcesDecoder =
   Decode.list Decode.string

uploadAssetResponseResolver : Http.Response String -> Result Http.Error String
uploadAssetResponseResolver response =
   case response of
      Http.BadUrl_ _ ->
         Err (Http.BadBody "Invalid request URL")

      Http.Timeout_ ->
         Err (Http.BadBody "Request timed out")

      Http.NetworkError_ ->
         Err (Http.BadBody "Network error, check if backend is running")

      Http.BadStatus_ _ body ->
         case Decode.decodeString backendErrorDecoder body of
            Ok message ->
               Err (Http.BadBody message)

            Err _ ->
               Err (Http.BadBody "Upload failed")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString backendMessageDecoder body of
            Ok message ->
               Ok message

            Err _ ->
               Ok "Asset uploaded successfully"

-- General
backendErrorDecoder : Decode.Decoder String
backendErrorDecoder =
   Decode.field "message" Decode.string

backendMessageDecoder : Decode.Decoder String
backendMessageDecoder =
   Decode.field "message" Decode.string