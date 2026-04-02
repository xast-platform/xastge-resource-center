module Model.PageModel exposing (..)

import Model.Route as Route
import Model.Route exposing (Route)
import Model.Page.HomeModel exposing (HomeModel)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.LoginModel as LoginModel
import Model.Page.RegisterModel exposing (RegisterModel)
import Model.Page.RegisterModel as RegisterModel
import Model.Page.DashboardModel exposing (DashboardModel)
import Model.Page.DashboardModel as DashboardModel
import Model.Page.AssetModel exposing (AssetModel)
import Model.Page.AssetModel as AssetModel

type PageModel 
   = Home HomeModel 
   | About
   | Login LoginModel
   | Register RegisterModel
   | Dashboard DashboardModel
   | Asset AssetModel
   | NotFound String

fromRoute : Route -> PageModel
fromRoute route = case route of
   Route.Home -> 
      Home {}
   Route.About -> 
      About
   Route.Login -> 
      Login LoginModel.empty
   Route.Register ->
      Register RegisterModel.empty
   Route.Dashboard ->
      Dashboard DashboardModel.empty
   Route.Asset assetId ->
      Asset (AssetModel.init assetId)
   Route.NotFound page -> 
      NotFound page
