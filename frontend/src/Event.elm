module Event exposing (..)

import Http
import Url exposing (Url)
import Browser exposing (UrlRequest)
import Api.Backend exposing (Backend)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.RegisterModel exposing (RegisterModel)
import Model.Page.RegisterModel exposing (RegisterField)
import Model.Page.LoginModel exposing (LoginField)
import Model.AccountStatus exposing (UserData)

type Msg
   = SetBackend Backend
   -- Login
   | SubmitLogin LoginModel
   | UpdateLoginField LoginField String
   | UpdateLoginSaveSession Bool
   -- Register
   | SubmitRegister RegisterModel
   | RegisterResponseReceived (Result Http.Error UserData)
   | UpdateRegisterField RegisterField String
   | UpdateRegisterSaveSession Bool
   -- Other
   | GotResources (Result Http.Error (List String))
   | UrlChange Url
   | LinkClicked UrlRequest