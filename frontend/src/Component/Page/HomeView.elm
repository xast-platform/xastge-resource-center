module Component.Page.HomeView exposing (..)

import Model.Page.HomeModel exposing (HomeModel)
import Model.Asset exposing (Asset)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Event exposing (Msg(..))
import Component.Form as Form
import Component.Generic exposing (container)

view : HomeModel -> Html Msg
view model =
   div [ class "text-bg-dark" ]
      [ homeHeader
         (LucideIcon.cuboidIcon [])
         "XastGE Game Assets"
         "Models, plugins, scripts and more"
      , container [ class "py-4" ]
         [ searchBar
            { title = "Quick search"
            , value = model.quickSearch
            , onChange = UpdateHomeQuickSearch
            , onSubmit = SubmitHomeQuickSearch
            , submitLabel = "Browse all"
            }
         , latestAssets "Latest uploaded assets"
         , Form.submitStatus model.status
         , if model.loadingLatest then
              p [ class "text-secondary" ] [ text "Loading latest assets" ]
           else if List.isEmpty model.latestAssets then
              p [ class "text-secondary" ] [ text "No assets yet" ]
           else
              div [ class "d-flex flex-wrap justify-content-center gap-3" ] 
               ( model.latestAssets 
                  |> List.map assetCard
               )
         ]
      ]

latestAssets : String -> Html msg
latestAssets label = 
   h2 [ class "text-light mb-3 icon-text-center" ]
      [ LucideIcon.clock3Icon [ Svg.class "me-2" ]
      , text label
      ]

homeHeader : Html msg -> String -> String -> Html msg
homeHeader icon title subtitle = 
   header [ class "header py-5" ]
      [ container [ class "px-4 px-lg-5 my-5" ]
         [ div [ class "text-center text-light" ]
            [ h1 [ class "display-4 fw-bolder" ]
               [ span [ class "me-2 display-3 align-text-bottom home-hero-icon" ] [ icon ]
               , text title
               ]
            , p [ class "lead fw-normal text-light mb-0" ]
               [ text subtitle ]
            ]
         ]
      ]

type alias SearchBarProps msg =
   { value : String
   , title : String
   , onChange : (String -> msg)
   , onSubmit : msg
   , submitLabel : String
   }

searchBar : SearchBarProps msg -> Html msg
searchBar props = 
   div [ class "home-quick-search border border-secondary rounded p-3 mb-4" ]
      [ h2 [ class "h4 text-light mb-3 icon-text-center" ]
         [ LucideIcon.searchIcon [ Svg.class "me-2" ]
         , text props.title
         ]
      , div [ class "input-group" ]
         [ input
            [ class "form-control text-bg-dark border-secondary text-light"
            , type_ "text"
            , value props.value
            , onInput props.onChange
            ]
            []
         , button [ class "btn btn-info", type_ "button", onClick props.onSubmit ]
            [ text props.submitLabel ]
         ]
      ]

assetCard : Asset -> Html Msg
assetCard asset =
   div [ class "card text-bg-dark border border-secondary", style "width" "240px" ]
      [ img
         [ class "card-img-top image-ratio-fixed card-thumbnail-fixed border-bottom border-secondary"
         , src
            (if asset.thumbnailUrl == "" then
                "https://dummyimage.com/240x240/595959/ffffff.png&text=No+Thumbnail"
             else
                asset.thumbnailUrl
            )
         ]
         []
      , div [ class "card-body" ]
         [ p [ class "card-title mb-1 text-truncate", title asset.fileName ] [ text asset.fileName ]
         , p [ class "small text-secondary mb-2" ] [ text (asset.assetType ++ " by " ++ (if asset.authorName == "" then "Unknown" else asset.authorName)) ]
         , a [ class "btn btn-sm btn-outline-info", href ("/asset/" ++ asset.id) ]
            [ text "Open" ]
         ]
      ]