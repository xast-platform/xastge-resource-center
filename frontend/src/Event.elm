module Event exposing (..)

import Http
import Url exposing (Url)
import Browser exposing (UrlRequest)
import Api.Backend exposing (Backend)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.RegisterModel exposing (RegisterModel, RegisterField)
import Model.Page.LoginModel exposing (LoginField)
import Model.AccountStatus exposing (UserData)
import Model.Page.DashboardModel exposing (DashboardTab)

type Msg
   = SetBackend Backend
   -- Login
   | SubmitLogin LoginModel
   | UpdateLoginField LoginField String
   | UpdateLoginSaveSession Bool
   | LoginResponseReceived (Result Http.Error UserData)
   | Logout
   -- Register
   | SubmitRegister RegisterModel
   | RegisterResponseReceived (Result Http.Error UserData)
   | UpdateRegisterField RegisterField String
   | UpdateRegisterSaveSession Bool
   -- Dashboard
   | SelectDashboardTab DashboardTab
   -- Other
   | GotResources (Result Http.Error (List String))
   | UrlChange Url
   | LinkClicked UrlRequest