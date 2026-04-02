module Component.Page.NotFoundView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg

view : String -> Html msg
view path =
   div [ class "container py-5 text-light" ]
      [ div [ class "not-found-surface border border-secondary rounded p-4 p-lg-5 text-center" ]
         [ h1 [ class "display-1 fw-bold mb-3" ] [ text "404" ]
         , h2 [ class "display-6 mb-3 icon-text-center" ]
            [ LucideIcon.ghostIcon [ Svg.class "me-2" ]
            , text "Page not found"
            ]
         , p [ class "text-secondary mb-4" ] [ text ("Requested path: /" ++ path) ]
         , div [ class "d-flex justify-content-center gap-2" ]
            [ a [ class "btn btn-info", href "/" ] [ text "Back home" ]
            , a [ class "btn btn-outline-light", href "/browse" ] [ text "Browse assets" ]
            ]
         ]
      ]
