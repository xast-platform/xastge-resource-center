module Event exposing (..)

import Url exposing (Url)
import Browser exposing (UrlRequest)
import Api.Backend exposing (Backend)
import Http

type Msg
   = SetBackend Backend
   | GotResources (Result Http.Error (List String))
   | UrlChange Url
   | LinkClicked UrlRequest