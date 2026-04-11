module Event exposing (..)

import Http
import Url exposing (Url)
import Browser exposing (UrlRequest)
import File exposing (File)
import Api.Backend exposing (Backend)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.RegisterModel exposing (RegisterModel, RegisterField)
import Model.Page.LoginModel exposing (LoginField)
import Model.AccountStatus exposing (UserData)
import Model.Page.DashboardModel exposing (DashboardTab)
import Model.Asset exposing (Asset, AssetAnalytics)

type Msg
   = SetBackend Backend
   -- Login
   | SubmitLogin LoginModel
   | UpdateLoginField LoginField String
   | UpdateLoginSaveSession Bool
   | LoginResponseReceived (Result Http.Error UserData)
   | Logout
   -- Register
   | SubmitRegister RegisterModel
   | RegisterResponseReceived (Result Http.Error UserData)
   | UpdateRegisterField RegisterField String
   | UpdateRegisterSaveSession Bool
   -- Home
   | LoadHomeData
   | UpdateHomeQuickSearch String
   | SubmitHomeQuickSearch
   | HomeLatestAssetsReceived (Result Http.Error (List Asset))
   -- Browse
   | LoadBrowseData
   | UpdateBrowseName String
   | UpdateBrowseType String
   | UpdateBrowseTag String
   | UpdateBrowseAuthor String
   | UpdateBrowseAll String
   | SubmitBrowseSearch
   | SubmitBrowseLoadMore
   | BrowseAssetsReceived (Result Http.Error (List Asset))
   -- Dashboard
   | SelectDashboardTab DashboardTab
   | UpdateDashboardAssetType String
   | UpdateDashboardDescription String
   | UpdateDashboardTags String
   | SelectDashboardAssetFile File
   | SelectDashboardThumbnailFile File
   | SubmitDashboardUpload
   | DashboardUploadResponseReceived (Result Http.Error String)
   | LoadDashboardData
   | MeResponseReceived (Result Http.Error UserData)
   | DashboardMyAssetsReceived (Result Http.Error (List Asset))
   | DashboardFavoriteAssetsReceived (Result Http.Error (List Asset))
   | DashboardAnalyticsReceived (Result Http.Error (List AssetAnalytics))
   | OpenDashboardEditAsset Asset
   | CloseDashboardEditAsset
   | UpdateDashboardEditThumbnailFile File
   | UpdateDashboardEditDescription String
   | UpdateDashboardEditTags String
   | SubmitDashboardEditAsset
   | DashboardEditResponseReceived (Result Http.Error String)
   | SubmitDashboardDeleteAsset String
   | DashboardDeleteResponseReceived (Result Http.Error String)
   | UpdateDashboardSettingsUsername String
   | UpdateDashboardSettingsUsernamePassword String
   | SubmitDashboardSettingsUsername
   | DashboardSettingsUsernameResponseReceived (Result Http.Error UserData)
   | UpdateDashboardSettingsCurrentPassword String
   | UpdateDashboardSettingsNewPassword String
   | SubmitDashboardSettingsPassword
   | DashboardSettingsPasswordResponseReceived (Result Http.Error String)
   | OpenDashboardDeleteAccountModal
   | CloseDashboardDeleteAccountModal
   | UpdateDashboardDeletePassword String
   | SubmitDashboardDeleteAccount
   | DashboardAccountDeleteResponseReceived (Result Http.Error String)
   -- Asset page
   | LoadAssetPage String
   | AssetPageAssetReceived (Result Http.Error Asset)
   | ToggleAssetFavorite String Bool
   | AssetFavoriteResponseReceived (Result Http.Error String)
   | UpdateAssetReportReason String
   | SubmitAssetReport String
   | AssetReportResponseReceived (Result Http.Error String)
   -- Email Confirmation
   | SendConfirm String
   | EmailConfirmationReceived (Result Http.Error String)
   -- Other
   | UrlChange Url
   | LinkClicked UrlRequest
