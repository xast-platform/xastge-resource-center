module Component.AppView exposing (..)

import Event exposing (Msg)
import Model exposing (Model)
import Html exposing (..)
import Component.Navbar as Navbar
import Model.PageModel exposing (PageModel(..))
import Component.Page.HomeView as HomeView
import Component.Page.LoginView as LoginView
import Component.Page.RegisterView as RegisterView
import Component.Page.DashboardView as DashboardView
import Component.Page.AssetView as AssetView
import Model.AccountStatus exposing (AccountStatus(..))

view : Model -> List (Html Msg)
view model = 
   -- Navigation
   [ Navbar.view 
      { icon = "/assets/img/favicon.svg"
      , brand = "XastGE Resource Center"
      , links = 
         [ ("Home", "/")
         , ("About", "/about")
         ]
      , accountStatus = model.accountStatus
      , backend = model.backend
      }
   -- Page content
   , case model.page of
      Home home -> 
         HomeView.view home

      Login login -> 
         LoginView.view login

      Register register -> 
         RegisterView.view register

      Dashboard dashboard ->
         case model.accountStatus of
            LoggedOut -> DashboardView.invalidView "You must be logged in to view the dashboard."
            LoggedIn userData -> DashboardView.view dashboard userData

      Asset assetModel ->
         AssetView.view assetModel model.accountStatus

      _ -> text "ERROR"
   ]