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
import Model.Page.BrowseModel as BrowseModel
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
            Route.Home ->
               LoadHomeData |> Task.succeed |> Task.perform identity

            Route.Browse ->
               LoadBrowseData |> Task.succeed |> Task.perform identity

            Route.Dashboard ->
               LoadDashboardData |> Task.succeed |> Task.perform identity

            Route.Asset assetId ->
               LoadAssetPage assetId |> Task.succeed |> Task.perform identity

            Route.Confirm token ->
               SendConfirm token |> Task.succeed |> Task.perform identity

            _ ->
               Cmd.none

      initialBackend =
         flags.backend
            |> Maybe.map Backend.fromString
            |> Maybe.withDefault Rest

      initialPage =
         case route of
            Route.Browse ->
               let
                  browseModel = BrowseModel.empty
               in
               PageModel.Browse { browseModel | all = getQueryParam "q" url.query }

            _ ->
               PageModel.fromRoute route
   in
   (  { key = key 
      , backend = initialBackend
      , route = route
      , page = initialPage
      , accountStatus = accountStatus
      } 
   , if redirectToHome then
        Nav.replaceUrl key "/"
     else if redirectToLogin then
        Nav.replaceUrl key "/login"
     else
        pageLoadCmd
   )


getQueryParam : String -> Maybe String -> String
getQueryParam key maybeQuery =
   case maybeQuery of
      Nothing ->
         ""

      Just query ->
         query
            |> String.split "&"
            |> List.filterMap
               (\part ->
                  case String.split "=" part of
                     [ currentKey, rawValue ] ->
                        if currentKey == key then
                           Url.percentDecode rawValue
                        else
                           Nothing

                     [ currentKey ] ->
                        if currentKey == key then
                           Just ""
                        else
                           Nothing

                     _ ->
                        Nothing
               )
            |> List.head
            |> Maybe.withDefault ""