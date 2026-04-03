module Component.Page.BrowseView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Event exposing (Msg(..))
import Model.Page.BrowseModel exposing (BrowseModel)
import Model.Asset exposing (Asset)
import Component.Form as Form

view : BrowseModel -> Html Msg
view model =
   div [ class "container py-4 text-light" ]
      [ h1 [ class "display-5 mb-2 icon-text-center" ]
         [ LucideIcon.scanSearchIcon [ Svg.class "me-2" ]
         , text "Browse assets"
         ]
      , p [ class "text-secondary mb-4" ]
         [ text "Use one or multiple filters to search by name, type, tag, author, or everything at once" ]
      , searchPanel model
      , Form.submitStatus model.status
      , if model.loading then
           p [ class "text-secondary mt-3" ] [ text "Searching assets" ]
        else if List.isEmpty model.assets then
           p [ class "text-secondary mt-3" ] [ text "No assets found for this query" ]
        else
           div []
              [ div [ class "d-flex flex-wrap gap-3 mt-3 justify-content-center" ] (model.assets |> List.map assetCard)
              , if model.hasMore then
                   div [ class "mt-4 d-flex justify-content-center" ]
                      [ button
                         [ class "btn btn-outline-info"
                         , type_ "button"
                         , onClick SubmitBrowseLoadMore
                         , disabled model.loadingMore
                         ]
                         [ text (if model.loadingMore then "Loading more..." else "Load next 50") ]
                      ]
                else
                   text ""
              ]
      ]

searchPanel : BrowseModel -> Html Msg
searchPanel model =
   div [ class "border border-secondary rounded p-3 bg-dark" ]
      [ div [ class "row g-3" ]
         [ div [ class "col-12 col-lg-4" ]
            [ label [ class "form-label text-light" ] [ text "Name" ]
            , input
               [ class "form-control text-bg-dark border-secondary"
               , type_ "text"
               , value model.name
               , onInput UpdateBrowseName
               ]
               []
            ]
         , div [ class "col-12 col-lg-4" ]
            [ label [ class "form-label text-light" ] [ text "Type" ]
            , select
               [ class "form-select text-bg-dark border-secondary"
               , onInput UpdateBrowseType
               ]
               [ option [ value "", selected (model.assetType == "") ] [ text "Any type" ]
               , option [ value "Scene", selected (model.assetType == "Scene") ] [ text "Scene" ]
               , option [ value "Model", selected (model.assetType == "Model") ] [ text "Model" ]
               , option [ value "Script", selected (model.assetType == "Script") ] [ text "Script" ]
               , option [ value "Texture", selected (model.assetType == "Texture") ] [ text "Texture" ]
               , option [ value "Audio", selected (model.assetType == "Audio") ] [ text "Audio" ]
               ]
            ]
         , div [ class "col-12 col-lg-4" ]
            [ label [ class "form-label text-light" ] [ text "Tag" ]
            , input
               [ class "form-control text-bg-dark border-secondary"
               , type_ "text"
               , value model.tag
               , onInput UpdateBrowseTag
               ]
               []
            ]
         , div [ class "col-12 col-lg-6" ]
            [ label [ class "form-label text-light" ] [ text "Author" ]
            , input
               [ class "form-control text-bg-dark border-secondary"
               , type_ "text"
               , value model.author
               , onInput UpdateBrowseAuthor
               ]
               []
            ]
         , div [ class "col-12 col-lg-6" ]
            [ label [ class "form-label text-light" ] [ text "All fields" ]
            , input
               [ class "form-control text-bg-dark border-secondary"
               , type_ "text"
               , value model.all
               , onInput UpdateBrowseAll
               ]
               []
            ]
         ]
      , div [ class "d-flex gap-2 mt-3" ]
         [ button [ class "btn btn-info icon-text-center", type_ "button", onClick SubmitBrowseSearch ]
            [ LucideIcon.searchIcon [ Svg.class "me-1" ]
            , text "Search"
            ]
         , a [ class "btn btn-outline-light", href "/browse" ] [ text "Reset" ]
         ]
      ]

assetCard : Asset -> Html Msg
assetCard asset =
   div [ class "card text-bg-dark border border-secondary", style "width" "240px" ]
      [ img
         [ class "card-img-top image-ratio-fixed border-bottom border-secondary"
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
         , p [ class "small text-secondary mb-1" ] [ text asset.assetType ]
         , p [ class "small text-secondary" ] [ text ("by " ++ (if asset.authorName == "" then "Unknown" else asset.authorName)) ]
         , a [ class "btn btn-sm btn-outline-info", href ("/asset/" ++ asset.id) ] [ text "Open" ]
         ]
      ]
