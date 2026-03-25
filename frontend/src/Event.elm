module Event exposing (..)

import Http
import Url exposing (Url)
import Browser exposing (UrlRequest)
import Api.Backend exposing (Backend)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.RegisterModel exposing (RegisterModel)
import Model.Page.RegisterModel exposing (RegisterField)
import Model.Page.LoginModel exposing (LoginField)

type Msg
   = SetBackend Backend
   | SubmitLogin LoginModel
   | UpdateLoginField LoginField String
   | UpdateLoginSaveSession Bool
   | SubmitRegister RegisterModel
   | UpdateRegisterField RegisterField String
   | UpdateRegisterSaveSession Bool
   | GotResources (Result Http.Error (List String))
   | UrlChange Url
   | LinkClicked UrlRequest