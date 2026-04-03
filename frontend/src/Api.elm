module Api exposing (..)

import Api.Backend exposing (Backend(..))
import Api.GraphQL as GraphQL
import Api.Rest as Rest
import Event exposing (Msg)

type alias RegisterRequest =
   Rest.RegisterRequest

type alias LoginRequest =
   Rest.LoginRequest

type alias UploadAssetRequest =
   Rest.UploadAssetRequest

type alias GetAssetsRequest =
   Rest.GetAssetsRequest

type alias BrowseAssetsRequest =
   Rest.BrowseAssetsRequest

type alias GetAssetByIdRequest =
   Rest.GetAssetByIdRequest

type alias FavoriteAssetRequest =
   Rest.FavoriteAssetRequest

type alias ReportAssetRequest =
   Rest.ReportAssetRequest

type alias UpdateAssetRequest =
   Rest.UpdateAssetRequest

type alias DeleteAssetRequest =
   Rest.DeleteAssetRequest

type alias DownloadAnalyticsRequest =
   Rest.DownloadAnalyticsRequest

type alias UpdateUsernameRequest =
   Rest.UpdateUsernameRequest

type alias UpdatePasswordRequest =
   Rest.UpdatePasswordRequest

type alias DeleteAccountRequest =
   Rest.DeleteAccountRequest

register : Backend -> RegisterRequest -> Cmd Msg
register backend req =
   case backend of
      Rest ->
         Rest.register req

      GraphQL ->
         GraphQL.register req

login : Backend -> LoginRequest -> Cmd Msg
login backend req =
   case backend of
      Rest ->
         Rest.login req

      GraphQL ->
         GraphQL.login req

uploadAsset : Backend -> UploadAssetRequest -> Cmd Msg
uploadAsset backend req =
   case backend of
      Rest ->
         Rest.uploadAsset req

      GraphQL ->
         GraphQL.uploadAsset req

getAssets : Backend -> GetAssetsRequest -> Cmd Msg
getAssets backend req =
   case backend of
      Rest ->
         Rest.getAssets req

      GraphQL ->
         GraphQL.getAssets req

getFavoriteAssets : Backend -> GetAssetsRequest -> Cmd Msg
getFavoriteAssets backend req =
   case backend of
      Rest ->
         Rest.getFavoriteAssets req

      GraphQL ->
         GraphQL.getFavoriteAssets req

getLatestAssets : Backend -> Maybe String -> Cmd Msg
getLatestAssets backend token =
   case backend of
      Rest ->
         Rest.getLatestAssets token

      GraphQL ->
         GraphQL.getLatestAssets token

getBrowseAssets : Backend -> BrowseAssetsRequest -> Cmd Msg
getBrowseAssets backend req =
   case backend of
      Rest ->
         Rest.getBrowseAssets req

      GraphQL ->
         GraphQL.getBrowseAssets req

getAssetById : Backend -> GetAssetByIdRequest -> Cmd Msg
getAssetById backend req =
   case backend of
      Rest ->
         Rest.getAssetById req

      GraphQL ->
         GraphQL.getAssetById req

toggleFavoriteAsset : Backend -> FavoriteAssetRequest -> Cmd Msg
toggleFavoriteAsset backend req =
   case backend of
      Rest ->
         Rest.toggleFavoriteAsset req

      GraphQL ->
         GraphQL.toggleFavoriteAsset req

reportAsset : Backend -> ReportAssetRequest -> Cmd Msg
reportAsset backend req =
   case backend of
      Rest ->
         Rest.reportAsset req

      GraphQL ->
         GraphQL.reportAsset req

updateAsset : Backend -> UpdateAssetRequest -> Cmd Msg
updateAsset backend req =
   case backend of
      Rest ->
         Rest.updateAsset req

      GraphQL ->
         GraphQL.updateAsset req

deleteAsset : Backend -> DeleteAssetRequest -> Cmd Msg
deleteAsset backend req =
   case backend of
      Rest ->
         Rest.deleteAsset req

      GraphQL ->
         GraphQL.deleteAsset req

getDownloadAnalytics : Backend -> DownloadAnalyticsRequest -> Cmd Msg
getDownloadAnalytics backend req =
   case backend of
      Rest ->
         Rest.getDownloadAnalytics req

      GraphQL ->
         GraphQL.getDownloadAnalytics req

getMe : Backend -> String -> Cmd Msg
getMe backend token =
   case backend of
      Rest ->
         Rest.getMe token

      GraphQL ->
         GraphQL.getMe token

updateAccountUsername : Backend -> UpdateUsernameRequest -> Cmd Msg
updateAccountUsername backend req =
   case backend of
      Rest ->
         Rest.updateAccountUsername req

      GraphQL ->
         GraphQL.updateAccountUsername req

updateAccountPassword : Backend -> UpdatePasswordRequest -> Cmd Msg
updateAccountPassword backend req =
   case backend of
      Rest ->
         Rest.updateAccountPassword req

      GraphQL ->
         GraphQL.updateAccountPassword req

deleteAccount : Backend -> DeleteAccountRequest -> Cmd Msg
deleteAccount backend req =
   case backend of
      Rest ->
         Rest.deleteAccount req

      GraphQL ->
         GraphQL.deleteAccount req