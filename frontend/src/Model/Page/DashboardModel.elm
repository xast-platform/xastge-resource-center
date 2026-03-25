module Model.Page.DashboardModel exposing (..)

type alias DashboardModel =
   { tab: DashboardTab
   }

type DashboardTab
   = Home
   | Assets
   | Analytics
   | Settings
   
empty : DashboardModel
empty = 
   { tab = Home
   }