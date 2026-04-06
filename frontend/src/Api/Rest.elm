module Api.Rest exposing (..)

import Http
import File exposing (File)
import Json.Decode as Decode
import Event exposing (Msg(..))
import Api.Config exposing (backendUrl)
import Json.Encode as Encode
import Model.AccountStatus exposing (UserData)
import Model.Asset exposing (Asset, AssetAnalytics)
import Url

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

-- Email Confirmation
confirmEmail : String -> Cmd Msg
confirmEmail token =
   Http.get
      { url = backendUrl ++ "/auth/verify-email?token=" ++ Url.percentEncode token
      , expect = Http.expectStringResponse EmailConfirmationReceived backendMessageResolver
      }

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
   Decode.map5 UserData
      (Decode.at [ "user", "username" ] Decode.string)
      (Decode.at [ "user", "email" ] Decode.string)
      (Decode.field "token" Decode.string)
      (Decode.oneOf
         [ Decode.at [ "user", "confirmed" ] Decode.bool
         , Decode.succeed False
         ]
      )
      (Decode.oneOf
         [ Decode.at [ "user", "role" ] Decode.string
         , Decode.succeed "user"
         ]
      )

getMe : String -> Cmd Msg
getMe token =
   Http.request
      { method = "GET"
      , headers = [ Http.header "Authorization" ("Bearer " ++ token) ]
      , url = backendUrl ++ "/auth/me"
      , body = Http.emptyBody
      , expect = Http.expectStringResponse MeResponseReceived meResponseResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias UpdateUsernameRequest =
   { token : String
   , username : String
   , password : String
   }

updateAccountUsername : UpdateUsernameRequest -> Cmd Msg
updateAccountUsername req =
   Http.request
      { method = "PATCH"
      , headers = [ Http.header "Authorization" ("Bearer " ++ req.token) ]
      , url = backendUrl ++ "/auth/username"
      , body =
         Http.jsonBody
            (Encode.object
               [ ( "username", Encode.string req.username )
               , ( "password", Encode.string req.password )
               ]
            )
      , expect = Http.expectStringResponse DashboardSettingsUsernameResponseReceived meResponseResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias UpdatePasswordRequest =
   { token : String
   , currentPassword : String
   , newPassword : String
   }

updateAccountPassword : UpdatePasswordRequest -> Cmd Msg
updateAccountPassword req =
   Http.request
      { method = "PATCH"
      , headers = [ Http.header "Authorization" ("Bearer " ++ req.token) ]
      , url = backendUrl ++ "/auth/password"
      , body =
         Http.jsonBody
            (Encode.object
               [ ( "currentPassword", Encode.string req.currentPassword )
               , ( "newPassword", Encode.string req.newPassword )
               ]
            )
      , expect = Http.expectStringResponse DashboardSettingsPasswordResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias DeleteAccountRequest =
   { token : String
   , password : String
   }

deleteAccount : DeleteAccountRequest -> Cmd Msg
deleteAccount req =
   Http.request
      { method = "DELETE"
      , headers = [ Http.header "Authorization" ("Bearer " ++ req.token) ]
      , url = backendUrl ++ "/auth/account"
      , body = Http.jsonBody (Encode.object [ ( "password", Encode.string req.password ) ])
      , expect = Http.expectStringResponse DashboardAccountDeleteResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

meResponseResolver : Http.Response String -> Result Http.Error UserData
meResponseResolver response =
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
               Err (Http.BadBody "Failed to refresh user")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString meSuccessDecoder body of
            Ok userData ->
               Ok userData

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

meSuccessDecoder : Decode.Decoder UserData
meSuccessDecoder =
   Decode.succeed UserData
      |> andMap (Decode.at [ "user", "username" ] Decode.string)
      |> andMap (Decode.at [ "user", "email" ] Decode.string)
      |> andMap (Decode.succeed "")
      |> andMap
         (Decode.oneOf
            [ Decode.at [ "user", "confirmed" ] Decode.bool
            , Decode.succeed False
            ]
         )
      |> andMap
         (Decode.oneOf
            [ Decode.at [ "user", "role" ] Decode.string
            , Decode.succeed "user"
            ]
         )

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

-- Asset pages
type alias GetAssetsRequest =
   { token : Maybe String
   , mine : Bool
   , favorites : Bool
   }

getAssets : GetAssetsRequest -> Cmd Msg
getAssets req =
   Http.request
      { method = "GET"
      , headers = authHeaders req.token
      , url =
         backendUrl
            ++ "/assets?mine="
            ++ boolToQuery req.mine
            ++ "&favorites="
            ++ boolToQuery req.favorites
      , body = Http.emptyBody
      , expect = Http.expectStringResponse DashboardMyAssetsReceived assetListResolver
      , timeout = Nothing
      , tracker = Nothing
      }

getFavoriteAssets : GetAssetsRequest -> Cmd Msg
getFavoriteAssets req =
   Http.request
      { method = "GET"
      , headers = authHeaders req.token
      , url =
         backendUrl
            ++ "/assets?mine=false&favorites="
            ++ boolToQuery req.favorites
      , body = Http.emptyBody
      , expect = Http.expectStringResponse DashboardFavoriteAssetsReceived assetListResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias BrowseAssetsRequest =
   { token : Maybe String
   , name : String
   , assetType : String
   , tag : String
   , author : String
   , all : String
   , page : Int
   , limit : Int
   }

getLatestAssets : Maybe String -> Cmd Msg
getLatestAssets token =
   Http.request
      { method = "GET"
      , headers = authHeaders token
      , url = backendUrl ++ "/assets?limit=12"
      , body = Http.emptyBody
      , expect = Http.expectStringResponse HomeLatestAssetsReceived assetListResolver
      , timeout = Nothing
      , tracker = Nothing
      }

getBrowseAssets : BrowseAssetsRequest -> Cmd Msg
getBrowseAssets req =
   let
      queryParams =
         [ ( "name", req.name )
         , ( "type", req.assetType )
         , ( "tag", req.tag )
         , ( "author", req.author )
         , ( "q", req.all )
         ]
            |> List.filter (
               \(_, value) ->
                  String.trim value /= ""
            )
            |> List.map (
               \(key, value) ->
                  key ++ "=" ++ Url.percentEncode value
            )

      limitParam = "limit=" ++ String.fromInt req.limit

      pageParam = "page=" ++ String.fromInt req.page

      queryString =
         String.join "&" (limitParam :: pageParam :: queryParams)
   in
   Http.request
      { method = "GET"
      , headers = authHeaders req.token
      , url = backendUrl ++ "/assets?" ++ queryString
      , body = Http.emptyBody
      , expect = Http.expectStringResponse BrowseAssetsReceived assetListResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias GetAssetByIdRequest =
   { id : String
   , token : Maybe String
   }

getAssetById : GetAssetByIdRequest -> Cmd Msg
getAssetById req =
   Http.request
      { method = "GET"
      , headers = authHeaders req.token
      , url = backendUrl ++ "/assets/" ++ req.id
      , body = Http.emptyBody
      , expect = Http.expectStringResponse AssetPageAssetReceived assetDetailResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias FavoriteAssetRequest =
   { id : String
   , token : String
   , isFavorite : Bool
   }

toggleFavoriteAsset : FavoriteAssetRequest -> Cmd Msg
toggleFavoriteAsset req =
   Http.request
      { method = if req.isFavorite then "DELETE" else "POST"
      , headers = authHeaders (Just req.token)
      , url = backendUrl ++ "/assets/" ++ req.id ++ "/favorite"
      , body = Http.emptyBody
      , expect = Http.expectStringResponse AssetFavoriteResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias ReportAssetRequest =
   { id : String
   , token : String
   , reason : String
   }

reportAsset : ReportAssetRequest -> Cmd Msg
reportAsset req =
   Http.request
      { method = "POST"
      , headers = authHeaders (Just req.token)
      , url = backendUrl ++ "/assets/" ++ req.id ++ "/report"
      , body = Http.jsonBody (Encode.object [ ( "reason", Encode.string req.reason ) ])
      , expect = Http.expectStringResponse AssetReportResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias UpdateAssetRequest =
   { id : String
   , token : String
   , assetType : String
   , description : String
   , tags : String
   }

updateAsset : UpdateAssetRequest -> Cmd Msg
updateAsset req =
   Http.request
      { method = "PUT"
      , headers = authHeaders (Just req.token)
      , url = backendUrl ++ "/assets/" ++ req.id
      , body =
         Http.jsonBody
            (Encode.object
               [ ( "assetType", Encode.string req.assetType )
               , ( "description", Encode.string req.description )
               , ( "tags", Encode.string req.tags )
               ]
            )
      , expect = Http.expectStringResponse DashboardEditResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias DeleteAssetRequest =
   { id : String
   , token : String
   }

deleteAsset : DeleteAssetRequest -> Cmd Msg
deleteAsset req =
   Http.request
      { method = "DELETE"
      , headers = authHeaders (Just req.token)
      , url = backendUrl ++ "/assets/" ++ req.id
      , body = Http.emptyBody
      , expect = Http.expectStringResponse DashboardDeleteResponseReceived backendMessageResolver
      , timeout = Nothing
      , tracker = Nothing
      }

type alias DownloadAnalyticsRequest =
   { token : String
   }

getDownloadAnalytics : DownloadAnalyticsRequest -> Cmd Msg
getDownloadAnalytics req =
   Http.request
      { method = "GET"
      , headers = authHeaders (Just req.token)
      , url = backendUrl ++ "/assets/analytics/downloads"
      , body = Http.emptyBody
      , expect = Http.expectStringResponse DashboardAnalyticsReceived analyticsResolver
      , timeout = Nothing
      , tracker = Nothing
      }

authHeaders : Maybe String -> List Http.Header
authHeaders token =
   case token of
      Just t ->
         [ Http.header "Authorization" ("Bearer " ++ t) ]

      Nothing ->
         []

boolToQuery : Bool -> String
boolToQuery val =
   if val then
      "true"
   else
      "false"

assetDecoder : Decode.Decoder Asset
assetDecoder =
   Decode.succeed Asset
      |> andMap (Decode.field "id" Decode.string)
      |> andMap (Decode.oneOf [ Decode.field "ownerId" Decode.string, Decode.succeed "" ])
      |> andMap (Decode.oneOf [ Decode.field "authorName" Decode.string, Decode.succeed "" ])
      |> andMap (Decode.field "assetType" Decode.string)
      |> andMap (Decode.field "description" Decode.string)
      |> andMap (Decode.field "tags" (Decode.list Decode.string))
      |> andMap (Decode.field "fileName" Decode.string)
      |> andMap (Decode.field "fileUrl" Decode.string)
      |> andMap (Decode.oneOf [ Decode.field "thumbnailUrl" Decode.string, Decode.succeed "" ])
      |> andMap (Decode.oneOf [ Decode.field "favoriteCount" Decode.int, Decode.succeed 0 ])
      |> andMap (Decode.oneOf [ Decode.field "downloadCount" Decode.int, Decode.succeed 0 ])
      |> andMap (Decode.oneOf [ Decode.field "isFavorite" Decode.bool, Decode.succeed False ])

andMap : Decode.Decoder a -> Decode.Decoder (a -> b) -> Decode.Decoder b
andMap decoder fnDecoder =
   Decode.map2 (|>) decoder fnDecoder

assetListResolver : Http.Response String -> Result Http.Error (List Asset)
assetListResolver response =
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
               Err (Http.BadBody "Failed to load assets")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString (Decode.field "assets" (Decode.list assetDecoder)) body of
            Ok assets ->
               Ok assets

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

assetDetailResolver : Http.Response String -> Result Http.Error Asset
assetDetailResolver response =
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
               Err (Http.BadBody "Failed to load asset")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString (Decode.field "asset" assetDecoder) body of
            Ok asset ->
               Ok asset

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

analyticsDecoder : Decode.Decoder AssetAnalytics
analyticsDecoder =
   Decode.map3 AssetAnalytics
      (Decode.field "assetType" Decode.string)
      (Decode.field "totalDownloads" Decode.int)
      (Decode.field "assetsCount" Decode.int)

analyticsResolver : Http.Response String -> Result Http.Error (List AssetAnalytics)
analyticsResolver response =
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
               Err (Http.BadBody "Failed to load analytics")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString (Decode.field "analytics" (Decode.list analyticsDecoder)) body of
            Ok analytics ->
               Ok analytics

            Err _ ->
               Err (Http.BadBody "Unexpected response from server")

backendMessageResolver : Http.Response String -> Result Http.Error String
backendMessageResolver response =
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
               Err (Http.BadBody "Request failed")

      Http.GoodStatus_ _ body ->
         case Decode.decodeString backendMessageDecoder body of
            Ok message ->
               Ok message

            Err _ ->
               Ok "Success"

-- General
backendErrorDecoder : Decode.Decoder String
backendErrorDecoder =
   Decode.field "message" Decode.string

backendMessageDecoder : Decode.Decoder String
backendMessageDecoder =
   Decode.field "message" Decode.string