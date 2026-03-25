module Component.Page.HomeView exposing (..)

import Model.Page.HomeModel exposing (HomeModel)
import Html exposing (..)
import Html.Attributes exposing (..)
import LucideIcons as LucideIcon

view : HomeModel -> Html msg
view _ = div [ class "text-bg-dark" ] 
   [ homeHeader 
      (LucideIcon.cuboidIcon [])
      "XastGE Game Assets" 
      "Models, Plugins, Scripts and more."
   ]

homeHeader : Html msg -> String -> String -> Html msg
homeHeader icon title subtitle = 
   header [ class "header py-5" ]
      [ div [ class "container px-4 px-lg-5 my-5" ]
         [ div [ class "text-center text-light" ]
            [ h1 [ class "display-4 fw-bolder" ]
               [ span [ class "me-2 align-text-bottom display-3" ] [ icon ]
               , text title
               ]
            , p [ class "lead fw-normal text-light mb-0" ]
               [ text subtitle ]
            ]
         ]
      ]