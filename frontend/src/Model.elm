module Model exposing (..)

import Browser.Navigation as Nav
import Event exposing (Msg)
import Url exposing (Url)
import Api.Backend exposing (Backend(..))
import Model.Route exposing (Route)
import Model.Route exposing (parseUrl)
import Model.PageModel as PageModel
import Model.PageModel exposing (PageModel)

type alias Model = 
   { key : Nav.Key
   , backend : Backend
   , route : Route
   , page : PageModel
   }

init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key = 
   let route = parseUrl url in 
   (  { key = key 
      , backend = Rest
      , route = route
      , page = PageModel.fromRoute route
      } 
   , Cmd.none
   )