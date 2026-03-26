module Model.Page.DashboardModel exposing (..)

type alias DashboardModel =
   { tab: DashboardTab
   }

type DashboardTab
   = Home
   | Favorite
   | Uploaded
   | Analytics
   | Settings

empty : DashboardModel
empty = 
   { tab = Home
   }