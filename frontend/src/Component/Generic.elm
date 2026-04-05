module Component.Generic exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)

container : List (Html.Attribute msg) -> List (Html msg) -> Html msg
container attrs children =
   div (class "container" :: attrs) children