module Component.Page.AssetView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Model.AccountStatus exposing (AccountStatus(..))
import Model.Page.AssetModel exposing (AssetModel)
import Model.Page.RegisterModel exposing (SubmitStatus(..))
import Model.Asset exposing (Asset)
import Event exposing (Msg(..))
import Api.Config exposing (backendUrl)
import Component.Form as Form
import Component.Generic exposing (container)

view : AssetModel -> AccountStatus -> Html Msg
view model accountStatus =
   if model.loading then
      loadingView
   else
      case model.asset of
         Just asset ->
            container [ class "py-5 text-light" ]
               [ h1 [ class "mb-4" ] [ text asset.fileName ]
               , Form.submitStatus model.status
               , div [ class "row g-4" ]
                  [ div [ class "col-lg-5" ]
                     [ img
                        [ class "img-fluid image-ratio-fixed rounded border border-secondary"
                        , src (if asset.thumbnailUrl == "" then "https://dummyimage.com/640x420/4c4c4c/ffffff.png&text=No+Thumbnail" else asset.thumbnailUrl)
                        ]
                        []
                     ]
                  , div [ class "col-lg-7" ]
                     [ p [ class "lead" ] [ text asset.description ]
                     , p [] [ strong [] [ text "Type: " ], text asset.assetType ]
                     , p [] [ strong [] [ text "Downloads: " ], text (String.fromInt asset.downloadCount) ]
                     , p [] [ strong [] [ text "Favorites: " ], text (String.fromInt asset.favoriteCount) ]
                     , p [] [ strong [] [ text "Tags: " ], text (String.join ", " asset.tags) ]
                     , div [ class "d-flex flex-wrap gap-2 mt-4" ]
                        [ a
                           [ class "btn btn-info"
                           , href (backendUrl ++ "/assets/" ++ asset.id ++ "/download")
                           ]
                           [ LucideIcon.downloadIcon [ Svg.class "me-1" ], text "Download" ]
                        , case accountStatus of
                           LoggedIn _ ->
                              button
                                 [ class (if asset.isFavorite then "btn btn-warning" else "btn btn-outline-warning")
                                 , type_ "button"
                                 , onClick (ToggleAssetFavorite asset.id asset.isFavorite)
                                 ]
                                 [ LucideIcon.starIcon [ Svg.class "me-1" ]
                                 , text (if asset.isFavorite then "Unfavorite" else "Favorite")
                                 ]

                           LoggedOut ->
                              text ""
                        ]
                     , case accountStatus of
                        LoggedIn _ ->
                           button
                              [ class "btn btn-outline-danger mt-4"
                              , type_ "button"
                              , attribute "data-bs-toggle" "modal"
                              , attribute "data-bs-target" "#reportAssetModal"
                              ]
                              [ LucideIcon.flagIcon [ Svg.class "me-1" ]
                              , text "Report asset"
                              ]

                        LoggedOut ->
                           p [ class "text-secondary mt-4" ] [ text "Log in to favorite or report assets" ]
                     ]
                  ]
               , reportModal model asset
               ]

         Nothing ->
            errorView model

loadingView : Html msg
loadingView =
   container [ class "py-5 text-light" ]
      [ h1 [] [ text "Loading asset..." ] ]

errorView : AssetModel -> Html msg
errorView model =
   container [ class "py-5 text-light" ]
      [ h1 [ class "text-danger mb-3" ] [ text "Asset not found" ]
      , p [ class "text-secondary mb-3" ] [ text "The asset you're looking for could not be loaded." ]
      , case model.status of
         Just (Error err) ->
            p [ class "text-danger small" ] [ text ("Error: " ++ err) ]

         _ ->
            text ""
      , a [ class "btn btn-outline-info", href "/" ] [ text "Back to home" ]
      ]

reportModal : AssetModel -> Asset -> Html Msg
reportModal model asset =
   div [ class "modal fade", id "reportAssetModal", attribute "tabindex" "-1", attribute "aria-labelledby" "reportAssetLabel", attribute "aria-hidden" "true" ]
      [ div [ class "modal-dialog" ]
         [ div [ class "modal-content text-bg-dark border-secondary" ]
            [ div [ class "modal-header border-secondary" ]
               [ h1 [ class "modal-title", id "reportAssetLabel" ] [ text "Report asset" ]
               , button [ class "btn-close btn-close-white", type_ "button", attribute "data-bs-dismiss" "modal", attribute "aria-label" "Close" ] []
               ]
            , div [ class "modal-body" ]
               [ Form.submitStatus model.status
               , Form.formTextarea
                  { label = "Reason for report"
                  , value = model.reportReason
                  , rows = 4
                  , onInput = UpdateAssetReportReason
                  , error = Nothing
                  }
               ]
            , div [ class "modal-footer border-secondary" ]
               [ button [ class "btn btn-outline-light", type_ "button", attribute "data-bs-dismiss" "modal" ] [ text "Cancel" ]
               , button
                  [ class "btn btn-danger"
                  , type_ "button"
                  , onClick (SubmitAssetReport asset.id)
                  , attribute "data-bs-dismiss" "modal"
                  ]
                  [ LucideIcon.flagIcon [ Svg.class "me-1" ], text "Submit report" ]
               ]
            ]
         ]
      ]
