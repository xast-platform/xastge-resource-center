module Component.Page.AboutView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg

view : Html msg
view =
   div [ class "container py-5 text-light" ]
      [ div [ class "about-surface border border-secondary rounded p-4 p-lg-5" ]
         [ h1 [ class "display-5 mb-3 icon-text-center" ]
            [ LucideIcon.infoIcon [ Svg.class "me-2" ]
            , text "About XastGE Resource Center"
            ]
         , p [ class "lead text-secondary" ]
            [ text "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nisl non erat mattis efficitur nec sed augue. Nulla facilisi. Duis nec justo in lorem porttitor tempor." ]
         , p [ class "text-secondary" ]
            [ text "Praesent aliquet, arcu ut luctus posuere, nunc risus sagittis eros, non vulputate est augue ut erat. Suspendisse id lorem quis lorem vestibulum cursus. Sed varius, nisl vitae vulputate facilisis, nunc risus condimentum est, nec sollicitudin massa eros id lorem." ]
         , p [ class "text-secondary mb-4" ]
            [ text "Vivamus ut turpis vitae ligula feugiat auctor. Fusce ac libero et libero laoreet luctus. Donec suscipit sem non mauris pellentesque, vel fermentum risus interdum." ]
         , div [ class "d-flex flex-wrap gap-2" ]
            [ a [ class "btn btn-outline-info icon-text-center", href "https://github.com/xast-platform", target "_blank", rel "noreferrer" ]
               [ LucideIcon.githubIcon [ Svg.class "me-1" ]
               , text "GitHub"
               ]
            , a [ class "btn btn-outline-primary icon-text-center", href "https://t.me/xast_programming", target "_blank", rel "noreferrer" ]
               [ LucideIcon.sendIcon [ Svg.class "me-1" ]
               , text "Telegram"
               ]
            ]
         ]
      ]
