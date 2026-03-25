module Event exposing (..)

import Http
import Url exposing (Url)
import Browser exposing (UrlRequest)
import Api.Backend exposing (Backend)
import Model.Page.LoginModel exposing (LoginModel)
import Model.Page.RegisterModel exposing (RegisterModel)

type Msg
   = SetBackend Backend
   | SubmitLogin LoginModel
   | UpdateLoginEmail String
   | UpdateLoginPassword String
   | UpdateLoginSaveSession Bool
   | SubmitRegister RegisterModel
   | UpdateRegisterUsername String
   | UpdateRegisterEmail String
   | UpdateRegisterPassword String
   | UpdateRegisterPasswordAgain String
   | UpdateRegisterSaveSession Bool
   | GotResources (Result Http.Error (List String))
   | UrlChange Url
   | LinkClicked UrlRequest