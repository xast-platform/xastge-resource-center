module Event exposing (..)

import Url exposing (Url)
import Browser exposing (UrlRequest)

type Msg
   = UrlChange Url
   | LinkClicked UrlRequest