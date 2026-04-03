module Api.GraphQL exposing (..)

import Api.Config exposing (graphqlUrl)
import Api.Rest as Rest
import Event exposing (Msg(..))
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Model.AccountStatus exposing (UserData)
import Model.Asset exposing (Asset, AssetAnalytics)

-- Shared GraphQL HTTP
graphqlRequest : Maybe String -> String -> Decode.Decoder a -> (Result Http.Error a -> Msg) -> Cmd Msg
graphqlRequest token query payloadDecoder toMsg =
   Http.request
      { method = "POST"
      , headers = authHeaders token
      , url = graphqlUrl
      , body =
         Http.jsonBody
            (Encode.object
               [ ( "query", Encode.string query )
               ]
            )
      , expect = Http.expectStringResponse toMsg (graphqlResolver payloadDecoder)
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

graphqlResolver : Decode.Decoder a -> Http.Response String -> Result Http.Error a
graphqlResolver dataDecoder response =
   case response of
      Http.BadUrl_ _ ->
         Err (Http.BadBody "Invalid request URL")

      Http.Timeout_ ->
         Err (Http.BadBody "Request timed out")

      Http.NetworkError_ ->
         Err (Http.BadBody "Network error, check if backend is running")

      Http.BadStatus_ _ body ->
         Err (Http.BadBody (decodeGraphqlError body))

      Http.GoodStatus_ _ body ->
         case Decode.decodeString (Decode.field "data" dataDecoder) body of
            Ok payload ->
               Ok payload

            Err _ ->
               Err (Http.BadBody (decodeGraphqlError body))

decodeGraphqlError : String -> String
decodeGraphqlError body =
   case Decode.decodeString (Decode.at [ "errors" ] (Decode.list (Decode.field "message" Decode.string))) body of
      Ok (first :: _) ->
         first

      _ ->
         case Decode.decodeString Rest.backendErrorDecoder body of
            Ok message ->
               message

            Err _ ->
               "Request failed"

escapeGraphqlString : String -> String
escapeGraphqlString value =
   value
      |> String.replace "\\" "\\\\"
      |> String.replace "\"" "\\\""
      |> String.replace "\n" "\\n"

strArg : String -> String -> String
strArg key value =
   key ++ ": \"" ++ escapeGraphqlString value ++ "\""

boolArg : String -> Bool -> String
boolArg key value =
   key ++ ": " ++ (if value then "true" else "false")

intArg : String -> Int -> String
intArg key value =
   key ++ ": " ++ String.fromInt value

maybeStrArg : String -> String -> List String
maybeStrArg key value =
   if String.trim value == "" then
      []
   else
      [ strArg key value ]

joinArgs : List String -> String
joinArgs args =
   if List.isEmpty args then
      ""
   else
      "(" ++ String.join ", " args ++ ")"

-- Decoders
userDecoder : Decode.Decoder UserData
userDecoder =
   Decode.succeed UserData
      |> Rest.andMap (Decode.field "username" Decode.string)
      |> Rest.andMap (Decode.field "email" Decode.string)
      |> Rest.andMap (Decode.succeed "")
      |> Rest.andMap (Decode.oneOf [ Decode.field "confirmed" Decode.bool, Decode.succeed False ])
      |> Rest.andMap (Decode.oneOf [ Decode.field "role" Decode.string, Decode.succeed "user" ])

authPayloadDecoder : Decode.Decoder UserData
authPayloadDecoder =
   Decode.map2
      (\token user -> { user | token = token })
      (Decode.field "token" Decode.string)
      (Decode.field "user" userDecoder)

-- Auth
register : Rest.RegisterRequest -> Cmd Msg
register req =
   let
      query =
         "mutation { register"
            ++ joinArgs
               [ strArg "username" req.username
               , strArg "email" req.email
               , strArg "password" req.password
               , boolArg "saveSession" req.saveSession
               ]
            ++ " { token user { username email confirmed role } } }"
   in
   graphqlRequest Nothing query (Decode.field "register" authPayloadDecoder) RegisterResponseReceived

login : Rest.LoginRequest -> Cmd Msg
login req =
   let
      query =
         "mutation { login"
            ++ joinArgs
               [ strArg "username" req.username
               , strArg "password" req.password
               , boolArg "saveSession" req.saveSession
               ]
            ++ " { token user { username email confirmed role } } }"
   in
   graphqlRequest Nothing query (Decode.field "login" authPayloadDecoder) LoginResponseReceived

getMe : String -> Cmd Msg
getMe token =
   let
      query =
         "query { me { user { username email confirmed role } } }"
   in
   graphqlRequest (Just token) query (Decode.at [ "me", "user" ] userDecoder) MeResponseReceived

updateAccountUsername : Rest.UpdateUsernameRequest -> Cmd Msg
updateAccountUsername req =
   let
      query =
         "mutation { updateUsername"
            ++ joinArgs
               [ strArg "username" req.username
               , strArg "password" req.password
               ]
            ++ " { user { username email confirmed role } } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "updateUsername", "user" ] userDecoder) DashboardSettingsUsernameResponseReceived

updateAccountPassword : Rest.UpdatePasswordRequest -> Cmd Msg
updateAccountPassword req =
   let
      query =
         "mutation { updatePassword"
            ++ joinArgs
               [ strArg "currentPassword" req.currentPassword
               , strArg "newPassword" req.newPassword
               ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "updatePassword", "message" ] Decode.string) DashboardSettingsPasswordResponseReceived

deleteAccount : Rest.DeleteAccountRequest -> Cmd Msg
deleteAccount req =
   let
      query =
         "mutation { deleteAccount"
            ++ joinArgs
               [ strArg "password" req.password
               ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "deleteAccount", "message" ] Decode.string) DashboardAccountDeleteResponseReceived

-- Assets
getAssets : Rest.GetAssetsRequest -> Cmd Msg
getAssets req =
   let
      query =
         "query { listAssets"
            ++ joinArgs
               [ boolArg "mine" req.mine
               , boolArg "favorites" req.favorites
               ]
            ++ " { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }"
   in
   graphqlRequest req.token query (Decode.at [ "listAssets", "assets" ] (Decode.list Rest.assetDecoder)) DashboardMyAssetsReceived

getFavoriteAssets : Rest.GetAssetsRequest -> Cmd Msg
getFavoriteAssets req =
   let
      query =
         "query { listAssets"
            ++ joinArgs
               [ boolArg "mine" False
               , boolArg "favorites" req.favorites
               ]
            ++ " { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }"
   in
   graphqlRequest req.token query (Decode.at [ "listAssets", "assets" ] (Decode.list Rest.assetDecoder)) DashboardFavoriteAssetsReceived

getLatestAssets : Maybe String -> Cmd Msg
getLatestAssets token =
   let
      query =
         "query { latestAssets(limit: 12) { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }"
   in
   graphqlRequest token query (Decode.at [ "latestAssets", "assets" ] (Decode.list Rest.assetDecoder)) HomeLatestAssetsReceived

getBrowseAssets : Rest.BrowseAssetsRequest -> Cmd Msg
getBrowseAssets req =
   let
      args =
         [ intArg "page" req.page
         , intArg "limit" req.limit
         ]
            ++ maybeStrArg "name" req.name
            ++ maybeStrArg "type" req.assetType
            ++ maybeStrArg "tag" req.tag
            ++ maybeStrArg "author" req.author
            ++ maybeStrArg "q" req.all

      query =
         "query { listAssets"
            ++ joinArgs args
            ++ " { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }"
   in
   graphqlRequest req.token query (Decode.at [ "listAssets", "assets" ] (Decode.list Rest.assetDecoder)) BrowseAssetsReceived

getAssetById : Rest.GetAssetByIdRequest -> Cmd Msg
getAssetById req =
   let
      query =
         "query { asset"
            ++ joinArgs [ strArg "id" req.id ]
            ++ " { asset { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }"
   in
   graphqlRequest req.token query (Decode.at [ "asset", "asset" ] Rest.assetDecoder) AssetPageAssetReceived

updateAsset : Rest.UpdateAssetRequest -> Cmd Msg
updateAsset req =
   let
      query =
         "mutation { updateAsset"
            ++ joinArgs
               [ strArg "id" req.id
               , strArg "assetType" req.assetType
               , strArg "description" req.description
               , strArg "tags" req.tags
               ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "updateAsset", "message" ] Decode.string) DashboardEditResponseReceived

deleteAsset : Rest.DeleteAssetRequest -> Cmd Msg
deleteAsset req =
   let
      query =
         "mutation { deleteAsset"
            ++ joinArgs [ strArg "id" req.id ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "deleteAsset", "message" ] Decode.string) DashboardDeleteResponseReceived

toggleFavoriteAsset : Rest.FavoriteAssetRequest -> Cmd Msg
toggleFavoriteAsset req =
   let
      operation =
         if req.isFavorite then
            "unfavoriteAsset"
         else
            "favoriteAsset"

      query =
         "mutation { "
            ++ operation
            ++ joinArgs [ strArg "id" req.id ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ operation, "message" ] Decode.string) AssetFavoriteResponseReceived

reportAsset : Rest.ReportAssetRequest -> Cmd Msg
reportAsset req =
   let
      query =
         "mutation { reportAsset"
            ++ joinArgs
               [ strArg "id" req.id
               , strArg "reason" req.reason
               ]
            ++ " { message } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "reportAsset", "message" ] Decode.string) AssetReportResponseReceived

getDownloadAnalytics : Rest.DownloadAnalyticsRequest -> Cmd Msg
getDownloadAnalytics req =
   let
      query =
         "query { downloadAnalytics { analytics { assetType totalDownloads assetsCount } } }"
   in
   graphqlRequest (Just req.token) query (Decode.at [ "downloadAnalytics", "analytics" ] (Decode.list Rest.analyticsDecoder)) DashboardAnalyticsReceived

-- Upload is currently routed through REST because Elm uses multipart file uploads
uploadAsset : Rest.UploadAssetRequest -> Cmd Msg
uploadAsset req =
   Rest.uploadAsset req
