module Model exposing (..)

import Browser.Navigation as Nav
import Event exposing (Msg)
import Url exposing (Url)
import Api.Backend exposing (Backend(..))
import Model.Route exposing (Route)
import Model.Route exposing (parseUrl)
import Model.PageModel as PageModel
import Model.PageModel exposing (PageModel)
import Model.AccountStatus exposing (AccountStatus)
import Model.AccountStatus exposing (AccountStatus(..))
import Model.AccountStatus exposing (UserData)

type alias Flags =
   { userData : Maybe UserData
   }

type alias Model = 
   { key : Nav.Key
   , backend : Backend
   , route : Route
   , page : PageModel
   , accountStatus : AccountStatus
   }

init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key = 
   let route = parseUrl url in 
   (  { key = key 
      , backend = Rest
      , route = route
      , page = PageModel.fromRoute route
      , accountStatus =
         case flags.userData of
            Just userData ->
               LoggedIn userData

            Nothing ->
               LoggedOut
      } 
   , Cmd.none
   )