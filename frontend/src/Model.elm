module Model exposing (..)

import Browser.Navigation as Nav
import Event exposing (Msg)
import Url exposing (Url)

type alias Model = 
   { key : Nav.Key
   }

init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ _ key = 
   ( { key = key } 
   , Cmd.none
   )