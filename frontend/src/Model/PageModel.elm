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
import Model.Page.BrowseModel exposing (BrowseModel)
import Model.Page.BrowseModel as BrowseModel
import Model.Page.HomeModel as HomeModel

type PageModel 
   = Home HomeModel 
   | Browse BrowseModel
   | About
   | Login LoginModel
   | Register RegisterModel
   | Dashboard DashboardModel
   | Asset AssetModel
   | NotFound String

fromRoute : Route -> PageModel
fromRoute route = case route of
   Route.Home -> 
      Home HomeModel.empty
   Route.Browse ->
      Browse BrowseModel.empty
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
