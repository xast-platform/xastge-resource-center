module Component.Page.DashboardView exposing (..)

import Model.Page.DashboardModel as DashboardModel exposing (DashboardModel, DashboardTab(..))
import Model.AccountStatus exposing (UserData)
import Model.Asset exposing (Asset)
import Event exposing (Msg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Event exposing (Msg(..))
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Component.Form as Form
import File

view : DashboardModel -> UserData -> Html Msg
view model userData =
   div []
      [ dashboardPanel
         { currentTab = model.tab
         , tabs =
            [ ( Home, "Home", homeTab model )
            , ( Favorite, "Favorite", favoriteTab model )
            , ( Upload, "Upload", uploadTab model userData )
            , ( Analytics, "Analytics", analyticsTab model )
            , ( Settings, "Settings", settingsTab model userData )
            ]
         }
      , editModal model
      , deleteAccountModal model
      ]

homeTab : DashboardModel -> List (Html Msg)
homeTab model =
   [ subsection "Latest favorites"
      (if List.isEmpty model.favoriteAssets then
         [ p [ class "text-secondary m-0" ] [ text "No favorite assets yet" ] ]
       else
         model.favoriteAssets
            |> List.take 4
            |> List.map assetCard
      )
   , subsection "Latest uploaded"
      (if List.isEmpty model.myAssets then
         [ p [ class "text-secondary m-0" ] [ text "No uploaded assets yet" ] ]
       else
         model.myAssets
            |> List.take 6
            |> List.map managedAssetCard
      )
   ]

favoriteTab : DashboardModel -> List (Html Msg)
favoriteTab model =
   [ subsection "Your favorites"
      (if List.isEmpty model.favoriteAssets then
         [ p [ class "text-secondary m-0" ] [ text "No favorites yet" ] ]
       else
         model.favoriteAssets |> List.map assetCard
      )
   ]

uploadTab : DashboardModel -> UserData -> List (Html Msg)
uploadTab model userData =
   [ Form.submitStatus model.listStatus
   , subsection "Upload New Asset"
      [ if userData.confirmed then
           uploadForm model
        else
           div [ class "alert alert-warning m-0" ]
              [ text "Confirm your email first to upload assets" ]
      ]
   , subsection "Uploaded assets"
      (if List.isEmpty model.myAssets then
         [ p [ class "text-secondary m-0" ] [ text "No uploaded assets yet" ] ]
       else
         model.myAssets |> List.map managedAssetCard
      )
   ]

analyticsTab : DashboardModel -> List (Html Msg)
analyticsTab model =
   [ if model.loadingAnalytics then
        p [ class "text-secondary" ] [ text "Loading analytics" ]
     else
        div [ class "table-responsive" ]
           [ table [ class "table table-dark table-striped" ]
              [ thead []
                 [ tr []
                    [ th [] [ text "Asset type" ]
                    , th [] [ text "Total downloads" ]
                    , th [] [ text "Assets count" ]
                    ]
                 ]
              , tbody []
                 (if List.isEmpty model.analytics then
                     [ tr [] [ td [ colspan 3, class "text-secondary" ] [ text "No analytics available" ] ] ]
                  else
                     model.analytics
                        |> List.map
                           (\row ->
                              tr []
                                 [ td [] [ text row.assetType ]
                                 , td [] [ text (String.fromInt row.totalDownloads) ]
                                 , td [] [ text (String.fromInt row.assetsCount) ]
                                 ]
                           )
                 )
              ]
           ]
   ]

settingsTab : DashboardModel -> UserData -> List (Html Msg)
settingsTab model userData =
   [ Form.submitStatus model.settingsStatus
   , subsection "Account"
      [ div [ class "d-flex flex-column" ]
         [ p [ class "text-light lead" ] [ strong [] [ text "Email" ], text (" : " ++ userData.email) ]
         , p [ class "text-light lead" ] [ strong [] [ text "Role" ], text (" : " ++ userData.role) ]
         , p [ class "text-light lead" ]
            [ strong [] [ text "Verification" ]
            , text (if userData.confirmed then " : confirmed" else " : not confirmed")
            ]
         ]
      ]
   , subsection "Change login"
      [ let
           trimmedUsername = String.trim model.settingsUsername
           usernameLen = String.length trimmedUsername

           usernameError =
              if trimmedUsername == "" then
                 Nothing
              else if usernameLen < DashboardModel.usernameMinLength then
                 Just ("Username must be at least " ++ String.fromInt DashboardModel.usernameMinLength ++ " characters")
              else if usernameLen > DashboardModel.usernameMaxLength then
                 Just ("Username cannot exceed " ++ String.fromInt DashboardModel.usernameMaxLength ++ " characters")
              else
                 Nothing

           passwordError =
              if String.trim model.settingsUsernamePassword == "" then
                 Just "Current password is required"
              else
                 Nothing
        in
        div []
           [ Form.formInput
              { label = "New login"
              , ty = "text"
              , value = model.settingsUsername
              , onInput = UpdateDashboardSettingsUsername
              , error = usernameError
              , maxlength = Just DashboardModel.usernameMaxLength
              }
           , Form.formInput
              { label = "Confirm password"
              , ty = "password"
              , value = model.settingsUsernamePassword
              , onInput = UpdateDashboardSettingsUsernamePassword
              , error = passwordError
              , maxlength = Nothing
              }
           , Form.submitButton "Save login" SubmitDashboardSettingsUsername model.settingsUsernameButtonDisabled
           ]
      ]
   , subsection "Change password"
      [ let
           currentPasswordError =
              if String.trim model.settingsCurrentPassword == "" then
                 Just "Current password is required"
              else
                 Nothing

           newPasswordError =
              if String.trim model.settingsNewPassword == "" then
                 Nothing
              else if not (DashboardModel.isNewPasswordValid model.settingsNewPassword) then
                 Just "New password must be at least 6 characters"
              else
                 Nothing
        in
        div []
           [ Form.formInput
              { label = "Current password"
              , ty = "password"
              , value = model.settingsCurrentPassword
              , onInput = UpdateDashboardSettingsCurrentPassword
              , error = currentPasswordError
              , maxlength = Nothing
              }
           , Form.formInput
              { label = "New password"
              , ty = "password"
              , value = model.settingsNewPassword
              , onInput = UpdateDashboardSettingsNewPassword
              , error = newPasswordError
              , maxlength = Nothing
              }
           , Form.submitButton "Save password" SubmitDashboardSettingsPassword model.settingsPasswordButtonDisabled
           ]
      ]
   , subsection "Danger zone"
      [ button [ class "btn btn-outline-danger", type_ "button", onClick OpenDashboardDeleteAccountModal ] [ text "Delete account" ]
      ]
   ]

deleteAccountModal : DashboardModel -> Html Msg
deleteAccountModal model =
   if model.showDeleteAccountModal then
      div []
         [ div
            [ class "modal show d-block"
            , attribute "tabindex" "-1"
            , attribute "role" "dialog"
            ]
            [ div [ class "modal-dialog modal-dialog-centered" ]
               [ div [ class "modal-content bg-dark text-white border border-secondary" ]
                  [ div [ class "modal-header border-secondary" ]
                     [ h5 [ class "modal-title" ] [ text "DELETE ACCOUNT" ]
                     , button
                        [ class "btn-close btn-close-white"
                        , type_ "button"
                        , onClick CloseDashboardDeleteAccountModal
                        ]
                        []
                     ]
                  , div [ class "modal-body" ]
                     [ p [ class "text-danger" ] [ text "This action is permanent and cannot be undone" ]
                     , let
                          passwordError =
                             if String.trim model.settingsDeletePassword == "" then
                                Just "Password is required"
                             else
                                Nothing
                       in
                       Form.formInput
                          { label = "Confirm your password"
                          , ty = "password"
                          , value = model.settingsDeletePassword
                          , onInput = UpdateDashboardDeletePassword
                          , error = passwordError
                          , maxlength = Nothing
                          }
                     ]
                  , div [ class "modal-footer border-secondary" ]
                     [ Form.cancelButton "Cancel" CloseDashboardDeleteAccountModal False
                     , Form.dangerSubmitButton "Delete forever" SubmitDashboardDeleteAccount model.settingsDeleteButtonDisabled
                     ]
                  ]
               ]
            ]
         , div [ class "modal-backdrop show" ] []
         ]
   else
      text ""

uploadForm : DashboardModel -> Html Msg
uploadForm model =
   div [ class "w-100" ]
      [ Form.submitStatus model.uploadStatus
      , Form.formSelect
         { label = "Asset Type"
         , value = model.assetType
         , options = [ "Scene", "Model", "Script", "Texture", "Audio" ]
         , onInput = UpdateDashboardAssetType
         , error = DashboardModel.getAssetTypeError model.uploadErrors
         }
      , Form.fileInput
         { label = "Asset file"
         , onSelect = SelectDashboardAssetFile
         , fileName = model.assetFile |> Maybe.map File.name
         , error = DashboardModel.getAssetFileError model.uploadErrors
         }
      , Form.fileInput
         { label = "Thumbnail file"
         , onSelect = SelectDashboardThumbnailFile
         , fileName = model.thumbnailFile |> Maybe.map File.name
         , error = DashboardModel.getThumbnailError model.uploadErrors
         }
      , Form.formTextarea
         { label = "Description"
         , value = model.description
         , rows = 3
         , onInput = UpdateDashboardDescription
         , error = DashboardModel.getDescriptionError model.uploadErrors
         }
      , Form.formInput
         { label = "Tags (comma separated)"
         , ty = "text"
         , value = model.tags
         , onInput = UpdateDashboardTags
         , error = Nothing
         , maxlength = Nothing
         }
      , Form.submitButton "Upload Asset" SubmitDashboardUpload model.uploadButtonDisabled
      ]

editModal : DashboardModel -> Html Msg
editModal model =
   case model.editingAsset of
      Nothing ->
         text ""

      Just _ ->
         div []
            [ div
               [ class "modal show d-block"
               , attribute "tabindex" "-1"
               , attribute "role" "dialog"
               ]
               [ div [ class "modal-dialog modal-dialog-centered" ]
                  [ div [ class "modal-content bg-dark text-white border border-secondary" ]
                     [ div [ class "modal-header border-secondary" ]
                        [ h5 [ class "modal-title" ] [ text "EDIT ASSET" ]
                        , button
                           [ class "btn-close btn-close-white"
                           , type_ "button"
                           , onClick CloseDashboardEditAsset
                           ]
                           []
                        ]
                     , div [ class "modal-body" ]
                        [ editForm model ]
                     ]
                  ]
               ]
            , div [ class "modal-backdrop show" ] []
            ]

editForm : DashboardModel -> Html Msg
editForm model =
   div [ class "w-100" ]
      [ Form.submitStatus model.editStatus
      , Form.formSelect
         { label = "Asset Type"
         , value = model.editAssetType
         , options = [ "Scene", "Model", "Script", "Texture", "Audio" ]
         , onInput = UpdateDashboardEditAssetType
         , error = Nothing
         }
      , Form.formTextarea
         { label = "Description"
         , value = model.editDescription
         , rows = 3
         , onInput = UpdateDashboardEditDescription
         , error = Nothing
         }
      , Form.formInput
         { label = "Tags (comma separated)"
         , ty = "text"
         , value = model.editTags
         , onInput = UpdateDashboardEditTags
         , error = Nothing
         , maxlength = Nothing
         }
      , div [ class "d-flex gap-2" ]
         [ Form.submitButton "Save changes" SubmitDashboardEditAsset model.editButtonDisabled
         , Form.cancelButton "Cancel" CloseDashboardEditAsset False
         ]
      ]

managedAssetCard : Asset -> Html Msg
managedAssetCard asset =
   card
      { image = asset.thumbnailUrl
      , label = asset.fileName
      , subtitle = asset.assetType ++ " | Downloads: " ++ String.fromInt asset.downloadCount
      , actions =
         [ a [ class "btn btn-sm btn-outline-info", href ("/asset/" ++ asset.id) ]
            [ LucideIcon.eyeIcon [ Svg.class "me-1" ], text "Open" ]
         , button [ class "btn btn-sm btn-outline-warning", type_ "button", onClick (OpenDashboardEditAsset asset) ]
            [ LucideIcon.pencilIcon [ Svg.class "me-1" ], text "Edit" ]
         , button [ class "btn btn-sm btn-outline-danger", type_ "button", onClick (SubmitDashboardDeleteAsset asset.id) ]
            [ LucideIcon.trash2Icon [ Svg.class "me-1" ], text "Delete" ]
         ]
      }

assetCard : Asset -> Html Msg
assetCard asset =
   card
      { image = asset.thumbnailUrl
      , label = asset.fileName
      , subtitle = asset.assetType ++ " | Favorites: " ++ String.fromInt asset.favoriteCount
      , actions =
         [ a [ class "btn btn-sm btn-outline-info", href ("/asset/" ++ asset.id) ]
            [ LucideIcon.eyeIcon [ Svg.class "me-1" ], text "Open" ]
         ]
      }

type alias CardProps msg =
   { image : String
   , label : String
   , subtitle : String
   , actions : List (Html msg)
   }

card : CardProps msg -> Html msg
card props =
   div [ class "card text-bg-dark border border-secondary", attribute "style" "width: 240px;" ]
      [ img
         [ class "card-img-top image-ratio-fixed border-bottom border-secondary"
         , src (if props.image == "" then "https://dummyimage.com/240x150/595959/ffffff.png&text=No+Thumbnail" else props.image)
         ]
         []
      , div [ class "card-body" ]
         [ p [ class "card-title mb-1 text-truncate", title props.label ] [ text props.label ]
         , p [ class "small text-secondary" ] [ text props.subtitle ]
         , div [ class "d-flex flex-wrap gap-2" ] props.actions
         ]
      ]

subsection : String -> List (Html msg) -> Html msg
subsection name comps =
   div []
      [ h2 [ class "text-light mb-2" ] [ text (String.toUpper name) ]
      , div [ class "border border-secondary rounded p-3 d-flex flex-wrap gap-3 mb-4" ] comps
      ]

type alias DashboardPanelProps =
   { currentTab : DashboardTab
   , tabs : List (DashboardTab, String, List (Html Msg))
   }

dashboardPanel : DashboardPanelProps -> Html Msg
dashboardPanel props =
   div [ class "dashboard-shell d-flex flex-column flex-lg-row" ]
      [ div [ class "dashboard-sidebar border-end border-secondary text-white p-3 col-lg-2 col-md-12 col-12 col-sm-12 flex-lg-shrink-0" ]
         [ h3 [ class "ms-2 mb-3" ] [ text "Dashboard" ]
         , ul [ class "nav nav-pills flex-column mb-auto" ]
            (props.tabs
               |> List.map
                  (\(tab, name, _) ->
                     li [ class "nav-item mb-2" ]
                        [ a
                           [ class "nav-link text-white"
                           , classList [ ( "bg-secondary active", props.currentTab == tab ) ]
                           , onClick (SelectDashboardTab tab)
                           , href "#"
                           ]
                           [ text name ]
                        ]
                  )
            )
         ]
      , case props.tabs |> List.filter (\(tab, _, _) -> tab == props.currentTab) |> List.head of
         Just (_, name, content) ->
            div [ class "dashboard-content flex-grow-1 p-4 col-12 col-lg" ]
               ([ h1 [ class "text-light display-4" ] [ text (String.toUpper name) ]
                , hr [ class "border border-secondary opacity-50 mb-4" ] []
                ]
                   ++ content
               )

         Nothing ->
            invalidView "Selected tab does not exist"
      ]

invalidView : String -> Html msg
invalidView message =
   div [ class "container-fluid mt-5 d-flex flex-column align-items-center" ]
      [ h1 [ class "display-2 text-light fw-bold mt-5 text-center" ] [ text "Invalid state" ]
      , h1 [ class "display-5 text-light text-center" ] [ text message ]
      ]
