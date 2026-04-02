module Model exposing (..)

import Browser.Navigation as Nav
import Event exposing (Msg(..))
import Url exposing (Url)
import Task
import Api.Backend exposing (Backend(..))
import Api.Backend as Backend
import Model.Route exposing (Route)
import Model.Route exposing (parseUrl)
import Model.Route as Route
import Model.PageModel as PageModel
import Model.PageModel exposing (PageModel)
import Model.AccountStatus exposing (AccountStatus)
import Model.AccountStatus exposing (AccountStatus(..))
import Model.AccountStatus exposing (UserData)

type alias Flags =
   { userData : Maybe UserData
   , backend : Maybe String
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
   let
      route = parseUrl url

      accountStatus =
         case flags.userData of
            Just userData ->
               LoggedIn userData

            Nothing ->
               LoggedOut

      redirectToHome =
         case ( accountStatus, route ) of
            ( LoggedIn _, Route.Login ) ->
               True

            ( LoggedIn _, Route.Register ) ->
               True

            _ ->
               False

      redirectToLogin =
         case ( accountStatus, route ) of
            ( LoggedOut, Route.Dashboard ) ->
               True

            _ ->
               False

      pageLoadCmd =
         case route of
            Route.Dashboard ->
               LoadDashboardData |> Task.succeed |> Task.perform identity

            Route.Asset assetId ->
               LoadAssetPage assetId |> Task.succeed |> Task.perform identity

            _ ->
               Cmd.none

      initialBackend =
         flags.backend
            |> Maybe.map Backend.fromString
            |> Maybe.withDefault Rest
   in
   (  { key = key 
      , backend = initialBackend
      , route = route
      , page = PageModel.fromRoute route
      , accountStatus = accountStatus
      } 
   , if redirectToHome then
        Nav.replaceUrl key "/"
     else if redirectToLogin then
        Nav.replaceUrl key "/login"
     else
        pageLoadCmd
   )